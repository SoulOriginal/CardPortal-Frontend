import { ObjectId } from "mongodb";
import express from "express";

import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { validateRequest } from "../../../common/middlewares/validate-request";
const Points = require("../../../../models/pointsSchema");

const router = express.Router();
router.post(
  "/profile/B2C/near",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { location } = req.body;
    if (!location || (!location[0] && !location[1])) {
      return res.status(400).json("err params");
    }
    // const resNear = await Points.find(
    //   {
    //     location: {
    //       $near: {
    //         $geometry: {
    //           type: `Point`,
    //           coordinates: location,
    //         },
    //         $maxDistance: 50 * 100,
    //       },
    //     },
    //   },
    //   function (err, result) {
    //     console.warn(err);
    //     console.log(result);
    //   }
    // );
    const resNear = await Points.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: location },
          distanceField: "distance",
          maxDistance: 50 * 100,

          spherical: true,
        },
      },
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
    // data = await Points.aggregate([
    //   { $match: matchIn },
    //   { $skip: (page - 1) * limit },
    //   { $limit: limit },
    //   {
    //     $set: {
    //       name: {
    //         $cond: [
    //           { $ne: ["$custom_name", false] },
    //           "$name",
    //           { $toObjectId: "$name" },
    //         ],
    //       },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "configs",
    //       localField: "name",
    //       foreignField: "points._id",
    //       as: "config_name",
    //     },
    //   },
    //   {
    //     $set: {
    //       config_name: {
    //         $first: {
    //           $filter: {
    //             input: { $first: "$config_name.points" },
    //             as: "item",
    //             cond: { $eq: ["$name", "$$item._id"] },
    //           },
    //         },
    //       },
    //     },
    //   },
    //   { $unset: ["create_date", "NIP", "admin_name"] },
    // ]);
    if (!resNear || resNear.length == 0 || typeof resNear == "string")
      return res.status(404).json("not found");
    return res.status(200).json(new Array(...resNear));
  }
);

export { router as nearPoint };
