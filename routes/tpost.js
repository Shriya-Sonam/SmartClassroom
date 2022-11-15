const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
var multer = require("multer");
var path = require("path");
let fs = require("fs-extra");
const checkType = require("../middlewares/checkType");

let lectures = [];
let notes = [];

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var reqPath = path.join(__dirname, `../uploads/${file.fieldname}`);
    fs.mkdirsSync(reqPath);
    cb(null, reqPath);
  },
  filename: function (req, file, cb) {
    var tmp = file.originalname;
    var pname =
      tmp.substr(0, tmp.lastIndexOf(".")) + path.extname(file.originalname);
    var reqPath = path.join(__dirname, `../uploads/${file.fieldname}`);
    if (file.fieldname == "lectures") {
      lectures.push({
        name: pname,
        path: reqPath,
      });
    } else if (file.fieldname == "notes") {
      notes.push({
        name: pname,
        path: reqPath,
      });
    }

    cb(null, pname);
  },
});
const filefilter = (req, file, cb) => {
  if (file.fieldname == "lectures") {
    if (file.mimetype == "video/mp4") cb(null, true);
    else {
      cb(null, false);
    }
  } else if (file.fieldname == "notes") {
    if (file.mimetype == "application/pdf") cb(null, true);
    else cb(null, false);
  } else {
    cb(null, false);
  }
};

var upload = multer({ storage: storage, fileFilter: filefilter });
var cpUpload = upload.fields([
  { name: "lectures", maxCount: 8 },
  { name: "notes", maxCount: 8 },
]);

const User = require("../models/User");
const Profile = require("../models/Teacher_Profile");
const Tpost = require("../models/Teacher_Post");

//Create  Post
router.post("/", auth, checkType.checkTeacher , cpUpload, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newTPost = new Tpost({
      user: req.user.id,
      topic: req.body.topic,
      lectures: lectures,
      Notes: notes,
    });
    const post = await newTPost.save();
    res.json(post);
    lectures = [];
    notes = [];
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Get all post of teacher by id
router.get("/:tid", auth, async (req, res) => {
  try {
    const posts = await Tpost.find({ user: req.params.tid })
      .select("topic -_id")
      .sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.get('/comment/:pid', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = await Tpost.findById(req.params.pid); 
    // const post = await Tpost.find({_id:req.params.pid}); returns an array
    const newcomment = {
      text: req.body.text,
      name:user.name,
      user: req.user.id
    };
    console.log(post[0].comments)
    //post[0].comments.unshift(newcomment)   
    post[0].comments.unshift(newcomment) 
    await post[0].save();

    res.json(post)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");    
  }
})

//get specific post of a specific teacher by post id
router.get("/:tid/:pid", auth, async (req, res) => {
  try {
    const posts = await Tpost.find({ _id: req.params.pid })
      // .select("topic -_id")
      // .sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//adding comment to a post


module.exports = router;
