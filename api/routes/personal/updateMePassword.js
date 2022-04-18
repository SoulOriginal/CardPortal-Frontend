import express from "express";
import { ObjectId } from "mongodb";
import { body } from "express-validator";
import { validateRequest } from "../../common/middlewares/validate-request";
import { requireAuth } from "../../common/middlewares/require-auth";
import { currentUser } from "../../common/middlewares/current-user";
const bcrypt = require("bcrypt");
const User = require("../../../models/userSchema");

const router = express.Router();

router.post(
  "/user/me/update/password",
  [
    body("password_old")
      .isString()
      .notEmpty()
      .withMessage({ payload: "Invalid credentials password_old" }),
    body("password")
      .isString()
      .notEmpty()
      .withMessage({ payload: "Invalid credentials password" }),
    body("password_confirmation")
      .isString()
      .notEmpty()
      .withMessage({ payload: "Invalid credentials password_confirmation" }),
  ],
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    // try {
    const { id, email } = req.currentUser;
    const ids = new ObjectId(id);
    const { password_old, password, password_confirmation } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.json({ payload: "User do not match", errorCode: "2" });
      return;
    }
    const existingPassword = existingUser.password;
    const comparePasswords = await bcrypt.compare(
      password_old,
      existingPassword
    );
    if (!comparePasswords) {
      res.json({ payload: "Passwords do not match", errorCode: "3" });
      return;
    }
    if (password !== password_confirmation) {
      res.json({ payload: "Password mismatch", errorCode: "32" });
      return;
    }
    const SetPass = await User.findOneAndUpdate(
      { _id: ids },
      { $set: { password: password } },
      { useFindAndModify: false, new: true }
    );
    res.json({ payload: "ok" });
    // const EditUser = await User.updateMany({ _id: ids },
    //   { $set: { name, email } }).exec()
    // res.json({ payload: 'ok' })

    // } catch (error) {
    //   res.json({ payload1: error })
    // }
  }
);

export { router as updateMePassword };
