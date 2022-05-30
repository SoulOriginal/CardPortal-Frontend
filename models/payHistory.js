const mongoose = require("mongoose");

const payHistorySchema = new mongoose.Schema(
  {
    status: { type: String },
    status_invoice: { type: String },
    error: { type: String },
    invoice_id: { type: String },
    amount_crypto: { type: Number },
    amount_usd: { type: Number, required: false },
    currency: { type: String },
    user_id: { type: String },
    url: { type: String },
    result_status: { type: String },
    amount_crypto: { type: Number },
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
