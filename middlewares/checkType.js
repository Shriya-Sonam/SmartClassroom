const express = require("express");
const User = require("../models/User");

var checkTeacher = async (req, res, next) => {
  var user = await User.findById(req.user.id);
  if (user.Utype != "teacher") {
    return res.json({ msg: "not authorized" });
  }
  next();
};
var checkStudent = async (req, res, next) => {
  var user = await User.findById(req.user.id);
  if (user.Utype != "student") {
    return res.json({ msg: "not authorized" });
  }
  next();
};



module.exports = {
  checkStudent,
  checkTeacher
}