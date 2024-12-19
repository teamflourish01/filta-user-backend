const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, trim: true, required: true },
    jobtitle: { type: String, trim: true, required: true },
    company: { type: String, trim: true, required: true },
    email: { type: String, trim: true },
    phonenumber: { type: String, trim: true },
    location: { type: String, required: true, trim: true },
    bio: { type: String, trim: true },
    profileimg: { type: String },
    style: { type: Boolean, default: true },
    coverimg: { type: String },
    logoimg: { type: String },
  },
  { timestamps: true }
);
const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
