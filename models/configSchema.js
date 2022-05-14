const mongoose = require("mongoose");

const configSchema = new mongoose.Schema(
  {
    image: { type: String },
    name: { type: String },
    price: { type: Number },
    balance: { type: Number },
    availability: { type: Number },
    currency_card: { type: String },
    сurrency_sale: { type: String },
    active: { type: Boolean, default: true },
    create_date: { type: Date, default: Date.now },
    imgURL: { type: String, default: "https://i.imgur.com/2UfCEHF.png" },
  },
  {
    versionKey: false,
  }
);
const userEntity = mongoose.model("config", configSchema);
module.exports = userEntity;
