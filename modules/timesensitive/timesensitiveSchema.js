const mongoose = require("mongoose");
const tsOfferSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: [],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const TsOfferModel = new mongoose.model("TsOffer", tsOfferSchema);

module.exports=TsOfferModel
