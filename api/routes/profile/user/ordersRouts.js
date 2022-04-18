import { ObjectId } from "mongodb";
import express from "express";

import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { validateRequest } from "../../../common/middlewares/validate-request";

const GdsSchema = require("../../../../models/gdsSchema");
const configSchema = require("../../../../models/configSchema");
const User = require("../../../../models/userSchema");
const router = express.Router();

router.get(
  "/profile/user/orders",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { id } = req.currentUser;
    const ids = new ObjectId(id);
    const data = await GdsSchema.aggregate([
      { $match: { user_id: id } },
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

router.put(
  "/profile/user/orders/edit",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { gds_id, custom_name, balance, comment } = req.body;
    const { id } = req.currentUser;
    const ids = new ObjectId(gds_id);
    const data = await GdsSchema.updateOne(
      { _id: ids, user_id: id },
      {
        custom_name,
        balance,
        comment,
      }
    );

    if (Object.keys(data).length !== 0 || data !== (null || undefined)) {
      res.status(200).json(data);
    } else {
      res.status(404).json("No Items");
    }
  }
);

router.put(
  "/profile/user/orders/active",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { active, gds_id } = req.body;
    const { id } = req.currentUser;
    const resp = await GdsSchema.updateOne(
      {
        _id: new ObjectId(gds_id),
        user_id: id,
      },
      { status: active }
    );
    res.json({ payload: "ok", resp });
  }
);
export { router as ordersRouts };
