//Name,email,(student/teacher),password,avatar,date

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    Utype: {
      type: String,
      enum: ["student", "teacher"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("users", UserSchema);
