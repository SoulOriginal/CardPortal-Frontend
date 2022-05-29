import { ObjectId } from "mongodb";
import express from "express";

import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { validateRequest } from "../../../common/middlewares/validate-request";

const GdsSchema = require("../../../../models/gdsSchema");
const configSchema = require("../../../../models/configSchema");
const PayHistorySchema = require("../../../../models/payHistory");
const User = require("../../../../models/userSchema");
const router = express.Router();
router.post(
  "/pay",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { email } = req.currentUser;
    var { amount, custom_email } = req.body;
    // const ids = new ObjectId(id);
    //     const existingUser = await User.findOne({ email });
    //     if (!existingUser) {
    //       res.json({ payload: "User is not found", status: "7" });
    //       return;
    //     }

    //     if (existingUser.balance < buy_price) {
    //       return res.json({ payload: "Не хватает деняг", status: "99" });
    //     }

    //     const ConfigFind = await configSchema.find({ _id: item_id });
    //     if (!ConfigFind) {
    //       return res.json({ payload: "Ошибка Категории", status: "991" });
    //     }
    //     if (!amount) {
    //       return res.json({ payload: "Ошибка Количества", status: "992" });
    //     }
    //     amount = parseInt(amount);
    //     const GdsFind = await GdsSchema.aggregate([
    //       {
    //         $match: {
    //           cnf_id: item_id,
    //           user_id: { $exists: false },
    //         },
    //       },
    //       { $limit: amount },
    //       { $group: { _id: null, ids: { $push: "$$ROOT._id" } } },
    //       { $unwind: "$ids" },
    //       { $unset: ["_id"] },
    //     ]);
    //     if (GdsFind.length === 0) {
    //       return res.json({ payload: "Ошибка Количества", status: "993" });
    //     }
    //     await User.updateOne(
    //       { _id: ObjectId(existingUser._id) },
    //       { $inc: { balance: -buy_price } }
    //     );
    //     var ObjectIds = [];
    //     for (const gdsIdsItem of GdsFind) {
    //       ObjectIds.push(new ObjectId(gdsIdsItem.ids));
    //     }
    //     const NewDateNow = Date.now();
    //     const orderNumberRandom = Math.floor(Math.random() * 9999999999);
    //     const SetCardsByUserId = await GdsSchema.updateMany(
    //       { _id: { $in: ObjectIds } },
    //       {
    //         $set: {
    //           user_id: existingUser._id,
    //           opened_date: NewDateNow,
    //           order_number: orderNumberRandom,
    //         },
    //       },
    //       { multi: true }
    //     );
    //     console.log(ConfigFind);
    //     const OrdersHistoryCreate = new OrdersHistorySchema({
    //       user_id: existingUser._id,
    //       buy_price,
    //       amount,
    //       cnf_id: item_id,
    //       сurrency_buy: buy_сurrency,
    //       card_balance: ConfigFind[0].balance,
    //       order_number: orderNumberRandom,
    //       currency_card,
    //       cards_buy_ids: ObjectIds,
    //     });
    //     console.log(OrdersHistoryCreate);
    //     await OrdersHistoryCreate.save();
    //     if (!OrdersHistoryCreate) {
    //       res.json({ payload: "Error save User" });
    //       return;
    //     }
    //     res.json({ payload: "ok", status: 200 });
  }
);
export { router as paymentRouts };
