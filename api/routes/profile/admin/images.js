import { currentUser } from "../../../common/middlewares/current-user";
const express = require("express");
const router = express.Router();
var path = require("path");
import * as fs from "fs";
import { ObjectId } from "mongodb";
const Points = require("../../../../models/pointsSchema");
const formidable = require("formidable");
router.post("/profile/B2B/images", currentUser, async (req, res) => {
  try {
    if (!req.currentUser) {
      res.json({ payload: "User not faund" });
      return;
    }
    const { email, id } = req.currentUser;
    const { pointID, filesIsNull } = req.query;
    if (email == undefined) {
      res.json({ payload: "User not faund" });
      return;
    }
    if (!pointID) {
      res.json({ payload: "pointID not faund" });
      return;
    }
    async function UpdateDatabasePointCount(count) {
      const UpdateCountImages = await Points.updateOne(
        {
          _id: new ObjectId(pointID),
        },
        {
          $set: { image_count: count },
        }
      );
      await res.status(200).json({
        status: "Done",
        message: UpdateCountImages,
      });
    }
    var indexFile = 0;
    const localpath = `/static/userimages/${id}/${pointID}/`;
    async function deleteImagesByIndex() {
      if (indexFile !== 6) {
        for (let index = indexFile; index <= 5; index++) {
          if (fs.existsSync(process.env.PWD + localpath + index + ".png")) {
            fs.unlinkSync(process.env.PWD + localpath + index + ".png");
          }
        }
      }
    }
    if (filesIsNull) {
      await deleteImagesByIndex();
      return await UpdateDatabasePointCount(null);
    }

    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.maxFileSize = 100 * 1024 * 1024;

    form.parse(req, async (err, fields, files) => {
      let files_names = [];

      if (!fs.existsSync(localpath)) {
        fs.mkdirSync(process.env.PWD + localpath, { recursive: true });
      }

      for (const key in files) {
        if (Object.hasOwnProperty.call(files, key)) {
          const element = files[key];
          fs.renameSync(
            element.path,
            path.join(process.env.PWD, localpath + indexFile + ".png"),
            () => {}
          );
        }
        indexFile++;
      }
      await deleteImagesByIndex();
      await UpdateDatabasePointCount(indexFile - 1);
    });
  } catch (error) {
    res.json({ payload: error });
  }
});

export { router as images };
