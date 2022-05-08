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

router.put(
  "/global/orders/multi/status",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { id } = req.currentUser;
    var { status, selected_ids } = req.body;
    const ids = new ObjectId(id);
    selected_ids.map((_id) => new ObjectId(_id));

    // const getCardsByOrderHistoryIds = await GdsSchema.find({
    //   _id: { $in: selected_ids },
    // });
    // if (getCardsByOrderHistoryIds.length === 0) {
    //   return res
    //     .status(200)
    //     .json("Ошибка сервера.Карты были удалены или не доуступны");
    // }
    const data = await GdsSchema.updateMany(
      { _id: { $in: selected_ids } },
      { $set: { status } },
      { multi: true }
    );
    return res.status(200).json(data);
    // const data = await GdsSchema.aggregate([
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
router.post(
  "/global/orders/multi/download",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    var { selected_ids } = req.body;
    selected_ids.map((_id) => new ObjectId(_id));
    const getCardsByOrderHistoryIds = await GdsSchema.find({
      _id: { $in: selected_ids },
    });
    if (getCardsByOrderHistoryIds.length === 0) {
      return res
        .status(200)
        .json("Ошибка сервера.Карты были удалены или не доуступны");
    }
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
      const generateOpenedDateFormat = opened_date
        ? opened_date.toLocaleDateString()
        : "absent";
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

router.post(
  "/global/orders/multi/download/history",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    var { orderHistoryIDS } = req.body;
    const { id } = req.currentUser;
    orderHistoryIDS = orderHistoryIDS.map((id) => new ObjectId(id));
    const getOrderById = await OrdersHistorySchema.find({
      user_id: id,
      _id: { $in: orderHistoryIDS },
    });
    var ids_hisory_elements = [];
    for (let index = 0; index < getOrderById.length; index++) {
      const element = getOrderById[index];
      if (element.user_id !== id) {
        return res.status(400).json("Пашол нахуй хакер ебливый");
      }
      if (element.user_id !== id) {
        return res.status(400).json("Пашол нахуй хакер ебливый");
      }
      if (element.cards_buy_ids.length === 0) {
        return res
          .status(200)
          .json("Server error.Go to System Administrator on the this page!");
      }
      ids_hisory_elements.push(...element.cards_buy_ids);
    }
    ids_hisory_elements = ids_hisory_elements.map((id) => new ObjectId(id));
    const getCardsByOrderHistoryIds = await GdsSchema.find({
      _id: { $in: ids_hisory_elements },
    });
    if (getCardsByOrderHistoryIds.length === 0) {
      return res
        .status(200)
        .json("Ошибка сервера.Карты были удалены или не доуступны");
    }
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
export { router as mainGlobal };
