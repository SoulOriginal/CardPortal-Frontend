import express from "express";
import { ObjectId } from "mongodb";
import { body } from "express-validator";
import { validateRequest } from "../../common/middlewares/validate-request";
import { requireAuth } from "../../common/middlewares/require-auth";
import { currentUser } from "../../common/middlewares/current-user";
const User = require("../../../models/userSchema");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post(
  "/user/me/update",
  [
    body("telegram")
      .isString()
      .notEmpty()
      .withMessage({ payload: "Invalid credentials telegram" }),
    body("email")
      .isString()
      .notEmpty()
      .withMessage({ payload: "Invalid credentials email" }),
  ],
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    // try {
    const { id, status, role } = req.currentUser;
    const ids = new ObjectId(id);
    const { telegram, email } = req.body;
    const EditUser = await User.updateMany(
      { _id: ids },
      { $set: { telegram, email } }
    ).exec();
    const userJwt = jwt.sign(
      {
        id,
        email,
        status,
        role,
      },
      process.env.JWT_KEY
    );
    req.session = {
      jwt: userJwt,
    };
    res.json({ payload: "ok" });
    // } catch (error) {
    //   res.json({ payload: error });
    // }
  }
);

export { router as updateMe };
