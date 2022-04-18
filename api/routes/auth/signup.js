import { body } from "express-validator";
import { validateRequest } from "../../common";

const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../../models/userSchema");

const router = express.Router();

router.post(
  "/user/signup",
  [
    body("email").isEmail().withMessage({ payload: "Invalid credentials" }),
    body("password")
      .trim()
      .isLength({ min: 6, max: 32 })
      .withMessage("Password must be between 6 and 32 characters"),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { email, firm_name, password, type, NIP, address, phone } =
        req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.json({ payload: "email_use" });
        return;
      }

      const NewRole = type == "user" ? "user" : "partner";
      if (NewRole === `user`) {
        const user = new User({
          email,
          password: hashedPassword,
          role: NewRole,
          verified: false,
        });
        await user.save();
        if (!user) {
          res.json({ payload: "Error save User" });
          return;
        }
      }
      if (NewRole === `partner`) {
        const user = new User({
          email,
          firm_name,
          NIP,
          address,
          phone,
          password: hashedPassword,
          role: NewRole,
          verified: false,
        });
        await user.save();
        if (!user) {
          res.json({ payload: "Error save User" });
          return;
        }
      }

      res.json({ payload: "ok" });
    } catch (error) {
      res.json(error.message);
    }
  }
);

export { router as signupRouter };
