import { currentUser } from "../../../common/middlewares/current-user";
const express = require("express");
const router = express.Router();
var path = require("path");
import * as fs from "fs";
import { ObjectId } from "mongodb";
const Config = require("../../../../models/configSchema");
const ConfigPoints = require("../../../../models/config_arrays/points");
const formidable = require("formidable");
router.post("/profile/admin/brands/images", currentUser, async (req, res) => {
  // try {
  if (!req.currentUser) {
    res.json({ payload: "User not faund" });
    return;
  }

  const { pointID = false, name, brand, image, trash = false } = req.query;
  if (trash && pointID) {
    const findCommentById = await Config.updateOne(
      { find: true },
      { $pull: { points: { _id: new ObjectId(pointID) } } }
    );
    await res.status(200).json({
      status: "Done",
      message: "Traser",
    });
    return;
  }
  if (pointID) {
    var findOrders = await Config.updateOne(
      { "points._id": new ObjectId(pointID) },
      {
        $set: {
          "points.$.name": name,
          "points.$.brand": brand,
        },
      }
    );
  }

  const localpath = `/static/brands/`;
  async function deleteImagesByIndex() {
    if (indexFile !== 6) {
      for (let index = indexFile; index <= 5; index++) {
        if (fs.existsSync(process.env.PWD + localpath + index + ".png")) {
          fs.unlinkSync(process.env.PWD + localpath + index + ".png");
        }
      }
    }
  }
  async function saveNameReturnId() {
    if (!name && !brand && !image) {
      return { id: null, status: 401 };
    }
    if (!pointID) {
      const newPoint = new ConfigPoints({
        name,
        brand,
        image,
      });
      const chek = await Config.updateMany(
        { find: true },
        {
          $push: {
            points: newPoint,
          },
        },
        { upsert: false, new: false }
      );

      if (chek.n !== 0) {
        return { id: newPoint._id, status: 200 };
      } else {
        return { id: null, status: 400 };
      }
    } else {
      return { id: pointID, status: 200 };
    }
  }
  // if (filesIsNull) {
  //   await deleteImagesByIndex();
  //   return await UpdateDatabasePointCount(null);
  // }

  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.maxFileSize = 100 * 1024 * 1024;

  form.parse(req, async (err, fields, files, name) => {
    let files_names = [];

    if (!fs.existsSync(localpath)) {
      fs.mkdirSync(process.env.PWD + localpath, { recursive: true });
    }

    // var localObject = new Object();
    // for (const key in fields) {
    //   if (key !== "file") {
    //     localObject[key] = fields[key];
    //   }
    // }
    // localObject.brand = localObject.brand === `true`;
    // localObject.image = localObject.image === `true`;

    const resultModified = await saveNameReturnId();
    if (resultModified.status == 200) {
      for (const key in files) {
        if (Object.hasOwnProperty.call(files, key)) {
          const element = files[key];
          fs.renameSync(
            element.path,
            path.join(process.env.PWD, localpath + resultModified.id + ".png")
          );
        }
      }
    }
  });
  await res.status(200).json({
    message: "ok",
  });
  // } catch (err) {
  //   res.json({ payload: err });
  // }
});

export { router as uploadBrands };
