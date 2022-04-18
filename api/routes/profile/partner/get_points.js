import express from "express";
import { ObjectId } from "mongodb";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { currentUser } from "../../../common/middlewares/current-user";

const Points = require("../../../../models/pointsSchema");
const User = require("../../../../models/userSchema");
const router = express.Router();
router.get(
  "/profile/B2B",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    // try {
    const {
      id_point,
      userID,
      getAllPoints,
      user_information,
      page = 1,
      limit = 10,
    } = req.query;
    // const { id } = req.currentUser;
    // const ids = new ObjectId(id);
    var data = null;
    var matchIn = new Object();
    if (id_point) {
      matchIn = { _id: new ObjectId(id_point) };
    }
    if (userID) {
      matchIn = { userID };
    }
    // if (id_point) {
    //   if (user_information) {
    //     data = await Points.findOne({ _id: id_point })
    //       .select("-create_date -NIP -admin_name")

    //       .then(async (result_point_data) => {
    //         // var localUser;
    //         // await User.findOne(
    //         //   { _id: result_point_data.userID },
    //         //   { firm_name: 1, address: 1, phone: 1, _id: 0 }
    //         // )
    //         //   .then((result_user_by_points_data) => {
    //         //     localUser = result_user_by_points_data;
    //         //   })
    //         //   .catch((error) => {
    //         //     console.log(error);
    //         //   });
    //         return { result_point_data };
    //       });
    //   } else {
    //     data = await Points.findOne({ _id: id_point }).select(
    //       "-create_date -NIP -admin_name"
    //     );
    //   }
    // } else {
    //   if (getAllPoints) {
    //     data = await Points.find()
    //       .limit(10)
    //       .then(async (result_point_data) => {
    //         // result_point_data.map((d, k) => {
    //         //   db_users_id.push(d.userID);
    //         // });

    //         // await User.find(
    //         //   { _id: { $in: db_users_id } },
    //         //   { NIP: 1, firm_name: 1, address: 1, phone: 1, _id: 0 }
    //         // )
    //         //   .then((result_user_by_points_data) => {})
    //         //   .catch((error) => {
    //         //     console.log(error);
    //         //   });
    //         return result_point_data;
    //       });
    //   } else {
    //     // data = await Points.aggregate([
    //     //   {
    //     //     $match: { userID: id },
    //     //   },
    //     //   {
    //     //     $set: {
    //     //       name: {
    //     //         $cond: [
    //     //           { $ne: ["$custom_name", false] },
    //     //           "$name",
    //     //           { $toObjectId: "$name" },
    //     //         ],
    //     //       },
    //     //     },
    //     //   },
    //     //   {
    //     //     $lookup: {
    //     //       from: "configs",
    //     //       localField: "name",
    //     //       foreignField: "points._id",
    //     //       as: "config_name",
    //     //     },
    //     //   },
    //     //   {
    //     //     $set: {
    //     //       config_name: {
    //     //         $first: {
    //     //           $filter: {
    //     //             input: { $first: "$config_name.points" },
    //     //             as: "item",
    //     //             cond: { $eq: ["$name", "$$item._id"] },
    //     //           },
    //     //         },
    //     //       },
    //     //     },
    //     //   },
    //     // ]);
    //     // работает
    //     // data = await Points.aggregate([
    //     //   {
    //     //     $set: { name: { $toObjectId: "$name" } },
    //     //   },
    //     //   {
    //     //     $lookup: {
    //     //       from: "configs",
    //     //       localField: "name",
    //     //       foreignField: "points._id",
    //     //       as: "config_name",
    //     //     },
    //     //   },
    //     //   {
    //     //     $set: {
    //     //       config_name: {
    //     //         $first: {
    //     //           $filter: {
    //     //             input: { $first: "$config_name.points" },
    //     //             as: "item",
    //     //             cond: { $eq: ["$name", "$$item._id"] },
    //     //           },
    //     //         },
    //     //       },
    //     //     },
    //     //   },
    //     // ]);
    //     // работает
    //     // data = await Points.aggregate([
    //     //   {
    //     //     $lookup: {
    //     //       from: "configs",
    //     //       let: { objName: { $toObjectId: "$name" } },
    //     //       pipeline: [
    //     //         { $unwind: "$points" },
    //     //         { $match: { $expr: { $eq: ["$points._id", "$$objName"] } } },
    //     //       ],
    //     //       as: "custom_name_output",
    //     //     },
    //     //   },
    //     // ]);
    //     // работает
    //     // data = await Points.aggregate([
    //     //   {
    //     //     $lookup: {
    //     //       localField: "points._id",
    //     //       from: "configs",
    //     //       foreignField: "name",
    //     //       as: "output",
    //     //     },
    //     //   },
    //     // ]);
    //   }
    // }

    data = await Points.aggregate([
      { $match: matchIn },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $set: {
          name: {
            $cond: [
              { $ne: ["$custom_name", false] },
              "$name",
              { $toObjectId: "$name" },
            ],
          },
        },
      },
      {
        $lookup: {
          from: "configs",
          localField: "name",
          foreignField: "points._id",
          as: "config_name",
        },
      },
      {
        $set: {
          config_name: {
            $first: {
              $filter: {
                input: { $first: "$config_name.points" },
                as: "item",
                cond: { $eq: ["$name", "$$item._id"] },
              },
            },
          },
        },
      },
      { $unset: ["create_date", "NIP", "admin_name"] },
    ]);
    console.log(data);

    if (data !== null || Object.keys(data).length !== 0) {
      if (id_point) {
        res.status(200).json(data[0]);
      } else {
        if (data.length !== 0) {
          res.status(200).json({ ...data });
        } else {
          res.status(404).json("No Items");
        }
      }
    } else {
      res.status(404).json("No Items");
    }
  }
);

export { router as get_points };
