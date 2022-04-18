import express from "express";
import { ObjectId } from "mongodb";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { currentUser } from "../../../common/middlewares/current-user";

const Order = require("../../../../models/ordersSchema");
const router = express.Router();
router.post(
  "/admin/order/status",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { id, role } = req.currentUser;
    if (role !== "admin") {
      return res.status(404).json("Nema Page Aga Da, idi na xui hacker ebany");
    }

    const { orderID, orderStatus } = req.body;

    const Update = await Order.updateOne(
      {
        _id: new ObjectId(orderID),
      },
      {
        $set: { delivered: orderStatus },
      }
    );
    res.json({ payload: Update });
  }
);

export { router as setOrderStatus };
