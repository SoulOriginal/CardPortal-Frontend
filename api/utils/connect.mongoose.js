// import mongoose from "mongoose";
const mongoose = require("mongoose");

module.exports = async function MongoDBConnect() {
  await mongoose
    .connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Connected to MongoDB");
      return true;
    })
    .catch((err) => {
      console.log("Error connected to MongoDB");
      return false;
    });
};
