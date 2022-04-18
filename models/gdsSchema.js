const mongoose = require("mongoose");

const gdsSchema = new mongoose.Schema(
  {
    card_number: { type: Number, required: true },
    card_month: { type: String, required: true },
    card_year: { type: String, required: true },
    card_cvv: { type: Number, required: true },
    type: { type: String, required: true },
    balance: { type: Number },
    cnf_id: { type: String, required: true },
    user_id: { type: String },
    custom_name: { type: String },
    comment: { type: String },
    status: { type: Boolean, default: true },
    opened_date: { type: Date },
    create_date: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);
const userEntity = mongoose.model("Gds", gdsSchema);
module.exports = userEntity;
