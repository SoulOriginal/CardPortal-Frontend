import { currentUser } from "../../common/middlewares/current-user";
import { validateRequest } from "../../common/middlewares/validate-request";
const express = require("express");
const User = require("../../../models/userSchema");

const router = express.Router();

router.get("/user/me", currentUser, validateRequest, async (req, res) => {
  try {
    if (req.currentUser) {
      const { email } = req.currentUser;
      if (!email) {
        return res.json({ code: 404 });
      }
      var existingUser = await User.findOne({ email }).select(
        "-__v -password -remember_token"
      );
      if (!existingUser) {
        return res.json({ code: 303 });
      }
      res.json({ ...existingUser._doc });
    } else {
      res.status(401).json({ message: "Unauthenticated." });
    }
  } catch (error) {
    res.json({ payload1: error.message });
  }
});

export { router as aboutMeRouter };
