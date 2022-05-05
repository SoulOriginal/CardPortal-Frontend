import express from "express";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { currentUser } from "../../../common/middlewares/current-user";

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
    res.json({ payload12: data });
    // const users = await User.find(role ? { role } : null)
    //   .limit(limit * 1)
    //   .skip((page - 1) * limit)
    //   .sort({ _id: -1 })
    //   .exec();
    // const count = await User.countDocuments();
    // res.json({
    //   users,
    //   totalPages: Math.ceil(count / limit),
    //   currentPage: page,
    // });
    // } catch (error) {
    //   res.json({ payload: error });
    // }
  }
);

export { router as getUsersListRouter };
