//Assigments, Video lectures, Live videos,Like for posts

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const T_PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    topic: {
      type: String,
      required: true,
      unique: true,
    },
    lectures: [
      {
        name: String,
        path: String,
      },
    ],
    Notes : [
      {
        name: String,
        path: String,
      },
    ],
    comments: [
      {
        text: String,
        name: String,
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = T_post = mongoose.model("t_post", T_PostSchema);
