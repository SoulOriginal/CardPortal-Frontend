const mongoose = require("mongoose");

const OrdersHistorySchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true }, // Количество
    buy_price: { type: Number, required: true }, // Цена заказа
    сurrency_buy: { type: String, required: true }, // Валюта покупки
    currency_card: { type: String, required: true }, // Валюта карты на момент покупки
    card_balance: { type: Number, required: true }, // Баланс карт покупки
    user_id: { type: String, required: true }, // Кто купил?
    cnf_id: { type: String, required: true },
    cards_buy_ids: { type: Array, default: [], required: true },
    create_date: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);
const userEntity = mongoose.model("OrdersHistorySchema", OrdersHistorySchema);
module.exports = userEntity;
