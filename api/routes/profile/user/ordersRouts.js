import { ObjectId } from "mongodb";
import express from "express";

import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { validateRequest } from "../../../common/middlewares/validate-request";

const GdsSchema = require("../../../../models/gdsSchema");
const configSchema = require("../../../../models/configSchema");
const User = require("../../../../models/userSchema");
const OrdersHistorySchema = require("../../../../models/ordersHistorySchema");

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
router.get(
  "/profile/user/orders/history",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { id } = req.currentUser;
    const ids = new ObjectId(id);
    const data = await OrdersHistorySchema.aggregate([
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
router.get(
  "/profile/user/orders/history/download",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { orderHistoryID } = req.query;
    const { id } = req.currentUser;
    const ids = new ObjectId(id);
    const getOrderById = await OrdersHistorySchema.findOne({
      user_id: id,
      _id: new ObjectId(orderHistoryID),
    });
    if (getOrderById.user_id !== id) {
      return res.status(400).json("Пашол нахуй хакер ебливый");
    }
    if (getOrderById.cards_buy_ids.length === 0) {
      return res
        .status(200)
        .json("Server error.Go to System Administrator on the this page!");
    }
    const getCardsByOrderHistoryIds = await GdsSchema.find({
      _id: { $in: getOrderById.cards_buy_ids },
    });
    if (getCardsByOrderHistoryIds.length === 0) {
      return res
        .status(200)
        .json("Ошибка сервера.Карты были удалены или не доуступны");
    }
    //   {
    //     "status": true,
    //     "_id": "62604afab6ee732300552d4f",
    //     "balance": 124,
    //     "card_number": 20030008800,
    //     "card_month": "12",
    //     "card_year": "2022",
    //     "сфкв,смм": 456,
    //     "cnf_id": "625adc5dc859b424a89bbcd4",
    //     "type": "visa",
    //     "create_date": "2022-04-20T18:03:38.153Z",
    //     "opened_date": "2022-04-20T18:20:15.880Z",
    //     "user_id": "625c6488eede9750a010afca"
    // }
    var rowsTxt = [];
    for (const [index, iterator] of getCardsByOrderHistoryIds.entries()) {
      rowsTxt[index] = [];
      const {
        balance,
        card_number,
        type,
        status,
        comment,
        card_cvv,
        opened_date,
        custom_name,
      } = iterator;
      console.log(iterator);
      const generateStatus = status ? "active" : "blocked";
      const generateComment = comment ? comment : "absent";
      const generateCustomName = custom_name ? custom_name : "absent";
      const generateOpenedDateFormat = opened_date.toLocaleDateString();
      const gernerateDate = `${iterator.card_month}/${iterator.card_year.slice(
        2,
        4
      )}`;
      rowsTxt[index].push(
        balance,
        card_number,
        gernerateDate,
        card_cvv,
        type,
        generateStatus,
        generateComment,
        generateCustomName,
        generateOpenedDateFormat
      );
    }
    // getCardsByOrderHistoryIds.redux
    res.status(200).json({ rows: rowsTxt });
    // const data = await OrdersHistorySchema.aggregate([
    //   { $match: { user_id: id } },
    //   {
    //     $set: {
    //       cnf_id: {
    //         $toObjectId: "$cnf_id",
    //       },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "configs",
    //       localField: "cnf_id",
    //       foreignField: "_id",
    //       as: "info_conf",
    //     },
    //   },
    //   {
    //     $addFields: { name: "$info_conf.name" },
    //   },
    //   { $unwind: "$name" },
    //   {
    //     $addFields: { info_card: "$info_conf" },
    //   },
    //   { $unwind: "$info_card" },
    //   { $unset: ["info_conf"] },
    // ]);

    // if (Object.keys(data).length !== 0 || data !== (null || undefined)) {
    //   res.status(200).json(data);
    // } else {
    //   res.status(404).json("No Items");
    // }
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
