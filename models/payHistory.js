const mongoose = require("mongoose");

const payHistorySchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    status_invoice: { type: String, required: false },
    error: { type: String, required: false },
    invoice_id: { type: String, required: true },
    amount_crypto: { type: Number, required: true },
    amount_usd: { type: Number, required: false },
    currency: { type: String, required: true },
    user_id: { type: String, required: true },
    pay_date: { type: Date },
    type: { type: Number, default: 1 }, // 1 == Автоматическая 2 == Админ
    create_date: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);
const userEntity = mongoose.model("payHistory", payHistorySchema);
module.exports = userEntity;
