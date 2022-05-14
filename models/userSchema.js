const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    verified: { type: Boolean },
    remember_token: { type: String },
    role: { type: String },
    balance: { type: Number, default: 0 },
    balance_сurrency: { type: String, default: "USD" },
    telegram: { type: String, default: "" },
    create_date: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);
const userEntity = mongoose.model("User", userSchema);
module.exports = userEntity;
