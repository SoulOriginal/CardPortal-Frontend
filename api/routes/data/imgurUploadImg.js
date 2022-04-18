import { currentUser } from "../../common/middlewares/current-user";
const express = require("express");
const User = require("../../../models/userSchema");
const router = express.Router();
const imgur = require("imgur");
import { ObjectId } from "mongodb";
const formidable = require("formidable");
router.post("/data/image/upload", currentUser, async (req, res) => {
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
    const ids = new ObjectId(id);
    const existingUser = await User.findOne({ email });
    new formidable.IncomingForm()
      .parse(req)
      .on("field", (name, field) => {
        //     console.log(2)
        //   res.json({ payload: 'Field', name, field })
        //   return;
      })
      .on("file", (name, file) => {
        console.log(1);
        imgur
          .uploadFile(file.path)
          .then(async (json) => {
            const SetImage = await User.findOneAndUpdate(
              { _id: ids },
              { $set: { avatar: json.link } },
              { useFindAndModify: false, new: true }
            );
            res.json({ link: json.link });
            return;
          })
          .catch((err) => {
            res.json({ payload: err.message });
            return;
          });
      })
      .on("aborted", () => {
        res.json({ payload: "Request aborted by the user" });
        return;
      })
      .on("error", (err) => {
        res.json({ payload: err });
        return;
      });
  } catch (error) {
    res.json({ payload: error });
  }
});

export { router as imgurUploadImg };
