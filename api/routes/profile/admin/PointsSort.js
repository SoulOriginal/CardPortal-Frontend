import express from "express";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { currentUser } from "../../../common/middlewares/current-user";

const Points = require("../../../../models/pointsSchema");
const router = express.Router();

router.post(
  "/admin/points/sort",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    // try {
    const {
      sortBy,
      pin_status,
      pin_type,
      name,
      brand,
      page = 1,
      limit = 10,
    } = req.body;
    const { role } = req.currentUser;

    if (role === "admin") {
      var sortIn,
        matchIn = new Object();

      switch (sortBy) {
        case "old":
          sortIn = { _id: -1 };
          break;
        case "new":
          sortIn = { _id: 1 };
          break;
        case "abc":
          sortIn = { name: 1 };
          break;
        default:
          sortIn = { _id: 1 };
          break;
      }
      if (pin_status !== null) {
        matchIn.pin_status = pin_status;
      }
      if (brand !== null) {
        // matchIn.pin_status = pin_status;
      }
      if (pin_type) {
        matchIn.pin_type = pin_type;
      }
      if (name) {
        matchIn.name = { $regex: name };
      }

      const PointsResult = await Points.aggregate([
        { $match: { ...matchIn } },
        { $sort: sortIn },

        { $skip: (page - 1) * limit },
        { $limit: limit },
        // { $match: { pin_status } },
        // { $match: { pin_type } },
      ]);

      const count = await Points.countDocuments();

      res.json({
        PointsResult,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } else {
      res.json({ payload: "You have no access" });
    }
    // } catch (error) {
    //   res.json({ payload: error, suka: 2 });
    // }
  }
);
// if (sortBy == "old") {
//   sortIn = { _id: -1 };
// } else if (sortBy == "new") {
//   sortIn = { _id: 1 };
// } else if (sortBy == "abc") {
//   sortIn = { email: 1 };
// } else {
//   sortIn = { _id: 1 };
// }
export { router as PointsSort };
