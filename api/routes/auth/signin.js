import { body } from "express-validator";
import { BadRequestError, validateRequest } from "../../common";

const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../../models/userSchema");
const router = express.Router();

router.post(
  "/user/signin",
  [
    body("email")
      .isEmail()
      .withMessage({ errorCode: "1", messageText: "Email must be valid" }),
    body("password").trim().isLength({ min: 6, max: 32 }).withMessage({
      errorCode: "2",
      messageText: "Password must be between 6 and 32 characters",
    }),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        res.json({ payload: "User is not found", errorCode: "7" });
        return;
      }
      const existingPassword = existingUser.password;
      if (existingUser.status == "BLOCKED") {
        res.json({ payload: "Your account is blocked", errorCode: "5" });
        return;
      }
      const comparePasswords = await bcrypt.compare(password, existingPassword);
      if (existingUser.verified === false) {
        return res.json({ payload: "Unconfirmed mail", errorCode: "6" });
      }
      if (!comparePasswords) {
        res.json({ payload: "Passwords do not match", errorCode: "3" });
      } else {
        const userJwt = jwt.sign(
          {
            id: existingUser.id,
            email: existingUser.email,
            status: existingUser.status,
            role: existingUser.role,
          },
          process.env.JWT_KEY
        );
        req.session = {
          jwt: userJwt,
        };
        const user = {
          user: existingUser,
        };
        res.json({ payload: user, userJwt });
      }
    } catch (error) {
      res.json(error.message);
    }
  }
);

export { router as sighInRouter };
