import { body } from "express-validator";

const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../../models/userSchema");
const router = express.Router();

router.post(
  "/user/restore/password",
  [
    body("newPassword")
      .isString()
      .notEmpty()
      .withMessage({ payload: "Invalid credentials" }),
    body("repeatNewPassword")
      .isString()
      .notEmpty()
      .withMessage({ payload: "Invalid credentials" }),
    body("email")
      .isEmail()
      .notEmpty()
      .withMessage({ payload: "Invalid credentials" }),
  ],
  async (req, res) => {
    try {
      const { newPassword, repeatNewPassword, email } = req.body;
      // const { email } = req.currentUser
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        res.json({ payload: "User do not match" });
        return;
      }
      if (newPassword === repeatNewPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await User.findOneAndUpdate(
          { email },
          { $set: { password: hashedPassword } },
          { useFindAndModify: false, new: true }
        );
        res.json({ payload: hashedPassword, newPassword });
      } else {
        res.json({ payload: "passwords do not match" });
      }
    } catch (error) {
      res.json(error.message);
    }
  }
);

export { router as changePasswordByEmailRouter };
