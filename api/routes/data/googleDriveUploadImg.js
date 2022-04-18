import { currentUser } from "../../common/middlewares/current-user";
const express = require("express");
const User = require("../../../models/userSchema");
const router = express.Router();
import { ObjectId } from "mongodb";
const gdiu = require("google-drive-image-upload");
router.post("/data/image/upload/drive", currentUser, async (req, res) => {
  try {
    if (!req.currentUser) {
      res.json({ payload: "User not faund" });
      return;
    }
    const { email, id } = req.currentUser;
    if (email == undefined) {
      res.json({ payload: "User not faund" });
      return;
    }
    gdiu.authAccount().then(async (auth) => {
      console.log(auth);
    });
    const ids = new ObjectId(id);
    const existingUser = await User.findOne({ email });
  } catch (error) {
    res.json({ payload: error });
  }
});

export { router as googleDriveUploadImg };
