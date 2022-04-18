import { ObjectId } from "mongodb";
import express from "express";

import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { validateRequest } from "../../../common/middlewares/validate-request";

// const InterviewSchema = require("../../../models/interviewSchema");
const Points = require("../../../../models/pointsSchema");

const router = express.Router();
router.post(
  "/profile/B2B/add",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    const { id } = req.currentUser;
    const ids = new ObjectId(id);
    const { edit, _id } = req.body;

    const entries = Object.keys(req.body);
    const updates = {};

    for (let i = 0; i < entries.length; i++) {
      updates[entries[i]] = Object.values(req.body)[i];
    }

    if (edit) {
      delete updates._id;
      const Update = await Points.updateOne(
        {
          _id: new ObjectId(_id),
        },
        {
          $set: updates,
        }
      );
      res.json({ payload: Update });
    } else {
      const point = new Points({ ...updates, userID: ids });
      await point.save();
      if (!point) {
        res.json({ payload: "Error save User" });
        return;
      }
      res.json({ payload: "ok", PointId: point._id });
    }
  }
);

export { router as add };
