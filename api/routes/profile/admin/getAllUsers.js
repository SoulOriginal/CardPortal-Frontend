import express from "express";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { currentUser } from "../../../common/middlewares/current-user";
import { ObjectId } from "mongodb";
const User = require("../../../../models/userSchema");
const GdsSchema = require("../../../../models/gdsSchema");
const configSchema = require("../../../../models/configSchema");
const OrdersHistorySchema = require("../../../../models/ordersHistorySchema.js");
const router = express.Router();

router.post(
  "/admin/users/all",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    // try {
    var {
      page = 1,
      limit = 10,
      role = "user",
      category = "users",
      sortIn = 1,
    } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    sortIn = parseInt(sortIn);
    const { users = {} } = req.body;
    // users > email role balance create_date verified
    const { email } = req.currentUser;
    const existingUser = await User.findOne({ email });
    if (existingUser.role !== "admin") return res.json("no perm");
    var data = null;
    var sortType = { _id: sortIn };
    switch (category) {
      case "users":
        if (!users) return res.json("err users case");
        console.log(users);
        data = await User.aggregate([
          { $match: users },
          { $sort: sortType },
          { $skip: (page - 1) * limit },
          { $limit: limit },
        ]);
        break;
      case "users1":
        console.log(1);
        break;
      default:
        console.log(0);
        break;
    }
    if (Object.keys(data).length !== 0 || data !== (null || undefined)) {
      const count = await User.countDocuments();
      res.status(200).json({
        data,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } else {
      res.status(404).json("No Items");
    }
  }
);
router.put(
  "/admin/user",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    // try {
    const existingUser = await User.findOne({ email: req.currentUser.email });
    if (existingUser.role !== "admin") return res.json("no perm");
    let { balance = 0, email, _id } = req.body;
    const ids = new ObjectId(_id);
    const data = await User.updateOne(
      { _id: ids },
      {
        email,
        balance,
      }
    );

    if (Object.keys(data).length !== 0 || data !== (null || undefined)) {
      res.status(200).json(data);
    } else {
      res.status(404).json("No Items");
    }
  }
);
export { router as getUsersListRouter };
