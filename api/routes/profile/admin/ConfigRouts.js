import { ObjectId } from "mongodb";
import express from "express";

import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { validateRequest } from "../../../common/middlewares/validate-request";

const GdsSchema = require("../../../../models/gdsSchema");
const configSchema = require("../../../../models/configSchema");
const User = require("../../../../models/userSchema");

const router = express.Router();
router.post(
  "/profile/admin/conf",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { availability, currency_card, сurrency_sale, name, price, balance } =
      req.body;

    const order = new configSchema({
      name,
      price,
      availability,
      currency_card,
      сurrency_sale,
      balance,
    });
    await order.save();
    if (!order) {
      res.status(401).json({ payload: "Error save Config" });
      return;
    }
    res.json({ payload: "ok" });
  }
);
router.put(
  "/profile/admin/conf",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const {
      name,
      price,
      availability,
      currency_card,
      сurrency_sale,
      _id,
      balance,
    } = req.body;
    const Update = await configSchema.updateOne(
      {
        _id: new ObjectId(_id),
      },
      {
        $set: {
          name,
          price,
          availability,
          currency_card,
          сurrency_sale,
          balance,
        },
      }
    );
    res.json({ payload: "ok" });
  }
);
router.put(
  "/profile/admin/conf/active",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { active, _id } = req.body;
    await configSchema.updateOne(
      {
        _id: new ObjectId(_id),
      },
      {
        $set: { active },
      }
    );
    res.json({ payload: "ok" });
  }
);
router.delete(
  "/profile/admin/conf/:id",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { id } = req.params;
    await configSchema.remove({ _id: new ObjectId(id) });

    res.json({ payload: "ok" });
  }
);
router.get(
  "/profile/admin/conf",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { id } = req.currentUser;
    const ids = new ObjectId(id);
    const data = await configSchema.aggregate([
      {
        $set: {
          new_id: {
            $toString: "$_id",
          },
        },
      },
      {
        $lookup: {
          from: "gds",
          localField: "new_id",
          foreignField: "cnf_id",
          as: "gds_items",
        },
      },
      { $unset: ["availability"] },
      {
        $set: {
          availability: {
            $reduce: {
              input: "$gds_items",
              initialValue: 0,
              in: {
                $cond: {
                  if: {
                    $lte: ["$$this.user_id", null],
                  },
                  then: { $add: ["$$value", 1] },
                  else: { $add: ["$$value", 0] },
                },
              },
            },
          },
        },
      },
    ]);
    if (Object.keys(data).length !== 0 || data !== (null || undefined)) {
      res.status(200).json(data);
    } else {
      res.status(404).json("No Items");
    }
  }
);
router.get(
  "/profile/admin/order",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    var { number } = req.query;
    const { role } = req.currentUser;
    if (role !== "admin") return res.status(404).json("No perm");
    number = parseInt(number);
    const data = await GdsSchema.aggregate([
      { $match: { order_number: number } },
      {
        $set: {
          cnf_id: {
            $toObjectId: "$cnf_id",
          },
          user_id: {
            $toObjectId: "$user_id",
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
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user_conf",
        },
      },
      {
        $addFields: { name: "$info_conf.name" },
      },
      { $unwind: "$name" },
      {
        $addFields: { info_card: "$info_conf" },
      },
      // { $unwind: "$info_card" },
      // { $unwind: "$user_conf" },
      { $unset: ["info_conf"] },
    ]);

    if (Object.keys(data).length !== 0 || data !== (null || undefined)) {
      res.status(200).json(data);
    } else {
      res.status(404).json("No Items");
    }
  }
);
export { router as ConfigRouts };
