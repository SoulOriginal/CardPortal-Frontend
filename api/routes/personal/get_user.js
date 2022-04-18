const express = require("express");
const User = require("../../../models/userSchema");
const router = express.Router();

router.get("/user", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.json({ code: 404 });
    }
    var get_user = await User.findOne({ email }).select(
      "avatar create_date name role verified"
    );
    if (!get_user) {
      return res.json({ code: 303 });
    }
    res.json({ get_user });
  } catch (error) {
    res.json({ payload: error.message });
  }
});

export { router as get_user };
