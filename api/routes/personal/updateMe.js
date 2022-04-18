import express from "express";
import { ObjectId } from "mongodb";
import { body } from "express-validator";
import { validateRequest } from "../../common/middlewares/validate-request";
import { requireAuth } from "../../common/middlewares/require-auth";
import { currentUser } from "../../common/middlewares/current-user";
const User = require("../../../models/userSchema");

const router = express.Router();

router.post(
  "/user/me/update",
  [
    body("name")
      .isString()
      .notEmpty()
      .withMessage({ payload: "Invalid credentials name" }),
    body("email")
      .isString()
      .notEmpty()
      .withMessage({ payload: "Invalid credentials email" }),
  ],
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    try {
      const { id } = req.currentUser;
      const ids = new ObjectId(id);
      const { name, email } = req.body;
      const EditUser = await User.updateMany(
        { _id: ids },
        { $set: { name, email } }
      ).exec();
      res.json({ payload: "ok" });
    } catch (error) {
      res.json({ payload: error });
    }
  }
);

export { router as updateMe };
