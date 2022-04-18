import express from "express";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { currentUser } from "../../../common/middlewares/current-user";

const Config = require("../../../../models/configSchema");
const router = express.Router();

router.get(
  "/config",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    try {
      const { role } = req.currentUser;
      // if (role === "admin") {
      const PointsConfig = await Config.find();
      res.json(...PointsConfig);
      // } else {
      //   res.json({ payload: "You have no access" });
      // }
    } catch (error) {
      res.json({ payload: error });
    }
  }
);

export { router as getConfig };
