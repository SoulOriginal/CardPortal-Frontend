import { ObjectId } from "mongodb";
import express from "express";

import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { validateRequest } from "../../../common/middlewares/validate-request";

const GdsSchema = require("../../../../models/gdsSchema");
const configSchema = require("../../../../models/configSchema");
const OrdersHistorySchema = require("../../../../models/OrdersHistorySchema");
const User = require("../../../../models/userSchema");
const router = express.Router();
router.post(
  "/profile/user/buy",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { email } = req.currentUser;
    var { buy_price, buy_сurrency, currency_card, item_id, amount } = req.body;
    // const ids = new ObjectId(id);
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.json({ payload: "User is not found", status: "7" });
      return;
    }
    if (existingUser.balance < buy_price) {
      return res.json({ payload: "Не хватает деняг", status: "99" });
    }

    const ConfigFind = await configSchema.find({ _id: item_id });
    if (!ConfigFind) {
      return res.json({ payload: "Ошибка Категории", status: "991" });
    }
    if (!amount) {
      return res.json({ payload: "Ошибка Количества", status: "992" });
    }
    amount = parseInt(amount);
    const GdsFind = await GdsSchema.aggregate([
      {
        $match: {
          cnf_id: item_id,
          user_id: { $exists: false },
        },
      },
      { $limit: amount },
      { $group: { _id: null, ids: { $push: "$$ROOT._id" } } },
      { $unwind: "$ids" },
      { $unset: ["_id"] },
    ]);
    if (GdsFind.length === 0) {
      return res.json({ payload: "Ошибка Количества", status: "993" });
    }
    await User.updateOne(
      { _id: ObjectId(existingUser._id) },
      { $inc: { balance: -buy_price } }
    );
    var ObjectIds = [];
    for (const gdsIdsItem of GdsFind) {
      ObjectIds.push(new ObjectId(gdsIdsItem.ids));
    }
    const NewDateNow = Date.now();
    const SetCardsByUserId = await GdsSchema.updateMany(
      { _id: { $in: ObjectIds } },
      { $set: { user_id: existingUser._id, opened_date: NewDateNow } },
      { multi: true }
    );
    console.log(ConfigFind);
    const OrdersHistoryCreate = await new OrdersHistorySchema({
      user_id: existingUser._id,
      buy_price,
      amount,
      сurrency_buy: buy_сurrency,
      card_balance: ConfigFind[0].balance,
      currency_card,
    });
    console.log(OrdersHistoryCreate);
    await OrdersHistoryCreate.save();
    if (!OrdersHistoryCreate) {
      res.json({ payload: "Error save User" });
      return;
    }
    res.json({ payload: "ok", status: 200 });
  }
);
// router.post(
//   "/profile/admin/gds/txt",
//   validateRequest,
//   currentUser,
//   requireAuth,
//   async (req, res) => {
//     const { id } = req.currentUser;
//     const { data_txt } = req.body;

//     await GdsSchema.create(data_txt, function (err) {
//       if (err) {
//         return res
//           .status(401)
//           .json({ payload: "Error save Upload datx Txt", err });
//       }
//     });

//     res.json({ payload: "ok" });
//   }
// );
// router.get(
//   "/profile/user/orders",
//   validateRequest,
//   currentUser,
//   requireAuth,
//   async (req, res) => {
//     const { id } = req.currentUser;
//     const ids = new ObjectId(id);
//     const data = await GdsSchema.find({ user_id: id });

//     if (Object.keys(data).length !== 0 || data !== (null || undefined)) {
//       res.status(200).json(data);
//     } else {
//       res.status(404).json("No Items");
//     }
//   }
// );
// router.put(
//   "/profile/admin/gds",
//   validateRequest,
//   currentUser,
//   requireAuth,
//   async (req, res) => {
//     const { card_cvv, card_number, type, card_month, card_year, cnf_id, id } =
//       req.body;
//     await GdsSchema.updateOne(
//       {
//         _id: new ObjectId(id),
//       },
//       {
//         $set: {
//           card_cvv,
//           card_number,
//           type,
//           card_month,
//           card_year,
//           cnf_id,
//         },
//       }
//     );
//     res.json({ payload: "ok" });
//   }
// );
// router.delete(
//   "/profile/admin/gds/:id",
//   validateRequest,
//   currentUser,
//   requireAuth,
//   async (req, res) => {
//     const { id } = req.params;
//     await GdsSchema.remove({ _id: new ObjectId(id) });

//     res.json({ payload: "ok" });
//   }
// );
export { router as BuyRouts };
