import express from "express";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { currentUser } from "../../../common/middlewares/current-user";

const GdsSchema = require("../../../../models/gdsSchema");
const Config = require("../../../../models/configSchema");
const User = require("../../../../models/userSchema");

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
router.get(
  "/profile/admin/order",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { number } = req.query;
    const { role } = req.currentUser;
    if (role !== "admin") return res.status(404).json("No perm");
    const data = await GdsSchema.aggregate([
      { $match: { order_number: number } },
      {
        $set: {
          cnf_id: {
            $toObjectId: "$cnf_id",
          },
        },
      },
      {
        $lookup: {
          from: "configs",
          localField: "cnf_id",
          foreignField: "_id",
          as: "info_conf",
        },
      },
      {
        $addFields: { name: "$info_conf.name" },
      },
      { $unwind: "$name" },
      {
        $addFields: { info_card: "$info_conf" },
      },
      { $unwind: "$info_card" },
      { $unset: ["info_conf"] },
    ]);

    if (Object.keys(data).length !== 0 || data !== (null || undefined)) {
      res.status(200).json(data);
    } else {
      res.status(404).json("No Items");
    }
  }
);
export { router as getConfig };
