//likes on teacher posts, comment on teacher posts

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  invites: [
    {
      type: Schema.Types.ObjectId,
      ref: "t_post",
    },
  ],
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "t_post",
    },
  ],
});

module.exports = S_post = mongoose.model("s_post", SProfileSchema);
