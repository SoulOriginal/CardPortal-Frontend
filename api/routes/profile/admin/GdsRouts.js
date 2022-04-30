import { ObjectId } from "mongodb";
import express from "express";

import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { validateRequest } from "../../../common/middlewares/validate-request";

const GdsSchema = require("../../../../models/gdsSchema");

const router = express.Router();
router.post(
  "/profile/admin/gds",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { id } = req.currentUser;
    const ids = new ObjectId(id);
    const { card_cvv, card_month, card_year, cnf_id, card_number, type } =
      req.body;

    const order = new GdsSchema({
      card_cvv,
      card_number,
      type,
      card_month,
      card_year,
      cnf_id,
    });
    await order.save();
    if (!order) {
      res.status(401).json({ payload: "Error save Card" });
      return;
    }
    res.json({ payload: "ok" });
  }
);
router.post(
  "/profile/admin/gds/txt",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { id } = req.currentUser;
    const { data_txt } = req.body;

    await GdsSchema.create(data_txt, function (err) {
      if (err) {
        return res
          .status(401)
          .json({ payload: "Error save Upload datx Txt", err });
      }
    });

    res.json({ payload: "ok" });
  }
);
router.get(
  "/profile/admin/gds",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { id } = req.currentUser;
    const ids = new ObjectId(id);
    // const data = await GdsSchema.find();
    const data = await GdsSchema.aggregate([
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
  "/profile/admin/gds",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { card_cvv, card_number, type, card_month, card_year, cnf_id, id } =
      req.body;
    await GdsSchema.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          card_cvv,
          card_number,
          type,
          card_month,
          card_year,
          cnf_id,
        },
      }
    );
    res.json({ payload: "ok" });
  }
);
router.delete(
  "/profile/admin/gds/:id",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { id } = req.params;
    await GdsSchema.remove({ _id: new ObjectId(id) });

    res.json({ payload: "ok" });
  }
);
export { router as GdsRouts };
