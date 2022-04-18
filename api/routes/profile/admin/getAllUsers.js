import express from "express";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { currentUser } from "../../../common/middlewares/current-user";

const User = require("../../../../models/userSchema");
const router = express.Router();

router.get(
  "/admin/users/all",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    try {
      const { page = 1, limit = 10, role = "user" } = req.query;
      const { email } = req.currentUser;
      const existingUser = await User.findOne({ email });
      if (existingUser.role === "admin") {
        const users = await User.find(role ? { role } : null)
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .sort({ _id: -1 })
          .exec();
        const count = await User.countDocuments();
        res.json({
          users,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
        });
      } else {
        res.json({ payload: "You have no access" });
      }
    } catch (error) {
      res.json({ payload: error });
    }
  }
);

export { router as getUsersListRouter };
