import express from "express";
import { ObjectId } from "mongodb";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { currentUser } from "../../../common/middlewares/current-user";

const Points = require("../../../../models/pointsSchema");
const User = require("../../../../models/userSchema");
const Order = require("../../../../models/ordersSchema");
const router = express.Router();
router.get(
  "/admin/orders",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    // try {
    const { id, role } = req.currentUser;
    if (role !== "admin") {
      return res.status(404).json("Nema Page Aga Da, idi na xui hacker ebany");
    }
    // const ids = new ObjectId(id);

    const { id_point, getAllPoints, user_information } = req.query;
    var data,
      db_users_id = [],
      db_points_id = [];

    data = await Order.find().then(async (result_orders_data) => {
      var localDataUser, localDataPoint;
      result_orders_data.map((d, k) => {
        db_users_id.push(d.B2BID);
      });
      result_orders_data.map((d, k) => {
        db_points_id.push(d.pointID);
      });

      await User.find(
        { _id: { $in: db_users_id } },
        { NIP: 1, firm_name: 1, address: 1, phone: 1, _id: 1 }
      )
        .then((result_user_by_points_data) => {
          localDataUser = result_user_by_points_data;
        })
        .catch((error) => {
          console.log(error);
        });

      await Points.find(
        { _id: { $in: db_points_id } },
        { address: 1, name: 1, userID: 1 }
      )
        .then((result_user_by_points_data) => {
          localDataPoint = result_user_by_points_data;
        })
        .catch((error) => {
          console.log(error);
        });
      return { result_orders_data, localDataUser, localDataPoint };
    });
    let allOrder = [];
    var { result_orders_data, localDataUser, localDataPoint } = data;
    let xuitad = data.result_orders;

    result_orders_data.forEach((element_order, index) => {
      //   allOrder.push(element_order);
      let forEeachLocalData = {};
      let forEeachLocalData1 = [];
      var per1;
      var per2;
      localDataUser.forEach((element_user) => {
        if (element_order.B2BID == element_user._id) {
          per1 = element_user;
          //   forEeachLocalData = Object.assign(element_order, element_user);
          //   allOrder[index].push({ ...element_user._doc });
        }
      });
      localDataPoint.forEach((element) => {
        if (element_order.pointID == element._id) {
          per2 = element;
          //   forEeachLocalData = Object.assign(forEeachLocalData, element);
          //   allOrder[index].point = { ...element._doc };
        }
      });
      Object.assign(
        forEeachLocalData,
        per1._doc,
        per2._doc,
        element_order._doc
      );
      allOrder.push({ ...forEeachLocalData });
    });
    // console.log(allOrder);

    if (
      Object.keys(allOrder).length !== 0 ||
      allOrder !== (null || undefined)
    ) {
      res.status(200).json({ ...allOrder });
    } else {
      res.status(404).json("No Items");
    }
  }
);

export { router as orders };
