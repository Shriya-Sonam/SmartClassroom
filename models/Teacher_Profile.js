//experiance,education,social media links etc

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  skills: [
    {
      _id: false,
      field: String,
      year: Number,
    },
  ],
  education: [
    {
      _id: false,
      name: String,
      degree: String,
    },
  ],
  social: {
    github: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
});

module.exports = Profile = mongoose.model("profile", TProfileSchema);
