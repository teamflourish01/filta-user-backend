const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

const About = mongoose.model("About", aboutSchema);

module.exports = About;
