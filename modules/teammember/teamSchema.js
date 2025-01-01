const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: [],
    },
    job_title: {
      type: [],
    },
    number: {
      type: [],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const TeamModel = new mongoose.model("Teammember", teamSchema);

module.exports = TeamModel;
