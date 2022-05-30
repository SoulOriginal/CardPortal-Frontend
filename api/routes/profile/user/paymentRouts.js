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
import axios from "axios";
const { PAYMENT_API_KEY, PAYMENT_DEFOULT_CURRENCY, PAYMENT_SHOP_ID } =
  process.env;
// const AxiosPaymentApi = async (method, url, params) => {
//   const config = {
//     headers: { Authorization: `Token ${PAYMENT_API_KEY}` },
//   };
//   const data = await axios.get(
//     `https://cryptocloud.plus/api/v2/invoice/create`,
//     params
//   );
//   return data;
// };
const instancePayment = axios.create({
  baseURL: "https://cryptocloud.plus/api/v2",
  timeout: 50000,
  headers: { Authorization: "Token " + PAYMENT_API_KEY },
});
router.post(
  "/pay",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { email, id } = req.currentUser;
    var { custom_amount } = req.body;
    const PaymentHistoryCreate = new PayHistorySchema({ user_id: id });
    await PaymentHistoryCreate.save();
    const { amount, currency, invoice_id, pay_url, status, amount_usd } =
      await instancePayment
        .post("/invoice/create", {
          shop_id: PAYMENT_SHOP_ID,
          amount: custom_amount,
          email,
          order_id: PaymentHistoryCreate._id,
          currency: PAYMENT_DEFOULT_CURRENCY,
        })
        .then((response) => {
          return response.data;
        });
    await PayHistorySchema.updateOne(
      {
        _id: new ObjectId(PaymentHistoryCreate._id),
      },
      {
        $set: {
          status,
          currency,
          invoice_id,
          url: pay_url,
          amount,
          amount_usd,
        },
      }
    );
    res.json({ pay_url });
  }
);
const updateStatusPayment = async (uuid) => {
  const { status, status_invoice, error } = await instancePayment
    .get("/invoice/status", { params: { uuid } })
    .then((response) => {
      return response.data;
    });
  if (error) {
    return res.json({ error });
  }
  await PayHistorySchema.updateOne(
    {
      invoice_id: uuid,
    },
    {
      $set: {
        status_invoice,
      },
    }
  );
  return { status, status_invoice, error };
};
router.get(
  "/pay/status",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { email, id } = req.currentUser;
    var { uuid } = req.query;
    const { status, status_invoice, error } = await updateStatusPayment(uuid);
    // const { status, status_invoice, error } = await instancePayment
    //   .get("/invoice/status", { params: { uuid: "44KSZ1" } })
    //   .then((response) => {
    //     return response.data;
    //   });
    // if (error) {
    //   return res.json({ error });
    // }
    // await PayHistorySchema.updateOne(
    //   {
    //     invoice_id: uuid,
    //   },
    //   {
    //     $set: {
    //       status_invoice,
    //     },
    //   }
    // );
    res.json({ status, status_invoice, error });
  }
);
router.get(
  "/pay/history",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { email, id } = req.currentUser;
    var { user_id, user_email } = req.query;
    const existingUserPaymentHistory = await PayHistorySchema.find({
      user_id: id,
    });
    for (let index = 0; index < existingUserPaymentHistory.length; index++) {
      const { status, status_invoice, invoice_id } =
        existingUserPaymentHistory[index];
      if (status_invoice !== "paid" && status_invoice !== "canceled") {
        console.log(123);
        const { status, status_invoice, error } = await updateStatusPayment(
          invoice_id
        );
      }
    }
    const existingUserPaymentHistory2 = await PayHistorySchema.find({
      user_id: id,
    });
    res.json([...existingUserPaymentHistory2]);
  }
);
router.post("/pay/result", async (req, res) => {
  // const { email, id } = req.currentUser;
  var { status, invoice_id, amount_crypto, currency, order_id } = req.body;
  console.log(status, invoice_id, amount_crypto, currency, order_id);
  const { user_id, amount_usd } = await PayHistorySchema.findOne({
    _id: new ObjectId(order_id),
  });
  if (!user_id && !amount_usd) return;
  const abc = await User.updateOne(
    { _id: ObjectId(user_id) },
    { $inc: { balance: +amount_usd } }
  );
  await PayHistorySchema.updateOne(
    {
      _id: new ObjectId(order_id),
    },
    {
      $set: {
        status,
        amount_crypto,
        currency,
      },
    }
  );
  return;
});
export { router as paymentRouts };
