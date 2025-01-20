const mongoose = require("mongoose");
const shuffleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    shuffle: [
      {
        id: {
          type: String,
        },
        component: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Shuffle = new mongoose.model("Shuffle", shuffleSchema);
module.exports = Shuffle;
