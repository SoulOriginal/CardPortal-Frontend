import { body } from "express-validator";
import { validateRequest } from "../../common";
import { requireAuth } from "../../common/middlewares/require-auth";
import { currentUser } from "../../common/middlewares/current-user";

const md5 = require("md5");
const nodeMailer = require("nodemailer");
const express = require("express");
const User = require("../../../models/userSchema");
const router = express.Router();

router.post(
  "/user/chek/email",
  [
    body("remember_token")
      .notEmpty()
      .withMessage({ payload: "Invalid credentials" }),
    body("email")
      .isEmail()
      .notEmpty()
      .withMessage({ payload: "Invalid credentials" }),
    body("type").notEmpty().withMessage({ payload: "Invalid credentials" }),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { remember_token, email, type } = req.body;
      const existingUser = await User.findOne({ email });
      if (remember_token === existingUser.remember_token) {
        if (type == "verified") {
          await User.updateOne({ email }, { verified: true });
          await User.updateOne({ email }, { remember_token: null });
          res.json({ payload: "ok" });
        } else if (type == "restore") {
          await User.updateOne({ email }, { remember_token: null });
          res.json({ payload: "ok" });
        }
      } else {
        res.json({ payload: "Neok" });
      }

      // if (existingUser.status === 'USER' || existingUser.status === 'ADMIN' || existingUser.status === 'SUPERADMIN') {
      //   if (email === existingUser.email) {
      //     let transporter = nodeMailer.createTransport({
      //       host: "ssl://smtp.gmail.com",
      //       port: 465,
      //       secure: true,
      //       service: 'gmail',
      //       auth: {
      //         user: 'booster.fun.control@gmail.com',
      //         pass: 'bbuiymujnzybiccq'
      //       }
      //     })
      //     var blink = process.env.LINK || 'http://localhost:3000'
      //     var SecretCode = md5(Date.now())
      //     let mailOptions = {
      //       from: 'booster.fun.control@gmail.com', // email {req.body}
      //       to: email,
      //       subject: 'Restore access Booster',
      //       text: `Follow this link to restore your password ${blink}/auth/restore-password/${SecretCode}`
      //     }
      //     var UpdateCode = await User.updateOne({ email }, { code: SecretCode })
      //     var TransporterData = await transporter.sendMail(mailOptions, function (error, info) {
      //       if (error) {
      //         res.json({ payload: error, ok:"neOk" })
      //       } else {
      //         res.json({ payload: 'Email sent: ' + info.response, ok:"ok" })
      //       }
      //     })
      //   } else {
      //     res.json({ payload: 'email not found' })
      //   }
      // } else {
      //   res.json({ payload: 'You have no access' })
      // }
    } catch (error) {
      res.json(error.message);
    }
  }
);

export { router as chekCodeEmail };
