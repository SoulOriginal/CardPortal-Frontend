import { currentUser } from "../../common/middlewares/current-user";
import { validateRequest } from "../../common/middlewares/validate-request";
// import { requireAuth } from '../../common/middlewares/require-auth'
const express = require("express");

const User = require("../../../models/userSchema");

const router = express.Router();

router.get("/user/all", currentUser, validateRequest, async (req, res) => {
  try {
    const existingUser = await User.find();
    if (existingUser) {
      res.json({ existingUser });
    } else {
      res.json({ payload: "no data" });
    }
  } catch (error) {
    res.json({ payload: error });
  }
});

export { router as getAllUsers };
