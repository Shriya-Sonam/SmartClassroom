const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const checkType = require('../middlewares/checkType');

const User = require("../models/User");
const Profile = require("../models/Teacher_Profile");


//Get logged in user profile
router.get("/me", auth, checkType.checkTeacher, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile does not exist" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Create or Update Profile
router.post("/", auth, checkType.checkTeacher , async (req, res) => {
  var { skills, education, social } = req.body;
  try {
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: req.body },
      { new: true, upsert: true }
    );
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
