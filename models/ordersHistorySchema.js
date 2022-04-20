const mongoose = require("mongoose");

const OrdersHistorySchema = new mongoose.Schema(
  {
    availability: { type: Number, required: true },
    сurrency_buy: { type: String, required: true },
    currency_card: { type: String, required: true },
    card_balance: { type: Number, required: true },
    user_id: { type: String, required: true },
    create_date: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);
const userEntity = mongoose.model("OrdersHistory", OrdersHistorySchema);
module.exports = userEntity;
