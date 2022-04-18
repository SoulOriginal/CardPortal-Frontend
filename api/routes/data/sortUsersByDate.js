import express from "express";
import { validateRequest } from "../../common/middlewares/validate-request";
import { requireAuth } from "../../common/middlewares/require-auth";
import { currentUser } from "../../common/middlewares/current-user";

const User = require("../../../models/userSchema");
const router = express.Router();

router.post("/user/sort", currentUser, async (req, res) => {
  // validateRequest, currentUser, requireAuth
  //   try {
  const { page = 1, limit = 10 } = req.query;
  const { calndar } = req.body;
  console.log(new Date(calndar[0]));
  const { email } = req.currentUser;
  const existingUser = await User.findOne({ email });
  console.log(existingUser);
  if (existingUser.role !== "admin") {
    res.json({ payload: "You have no access" });
    return;
  }
  const users = await User.aggregate([
    {
      $match: {
        create_date: {
          $gte: new Date(calndar[0]),
          $lte: new Date(calndar[1]),
        },
      },
    },
  ]);

  const count = await User.countDocuments();
  res.json({
    users,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
  //   } catch (error) {
  //     res.json({ payload: error });
  //   }
});

export { router as sortUsersByDate };
