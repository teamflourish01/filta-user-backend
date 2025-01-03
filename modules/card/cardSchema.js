const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, trim: true, },
    jobtitle: { type: String, trim: true,  },
    company: { type: String, trim: true, },
    email: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    location: { type: String, trim: true },
    bio: { type: String, trim: true },
    profileimg: { type: String },
    style: { type: Boolean, default: true },
    coverimg: { type: String },
    logoimg: { type: String },

    design: {
      layout: { type: String, default: "left" },
      card_color: {
        primary_color: { type: String, default: "#000000" },
        secondary_color: { type: String, default: "#000000" },
        neutral_color: { type: String, default: "#000000" },
      },
      font_style: {
        font_family: { type: String, default: "popins" },
        primary_text_color: { type: String, default: "#000000" },
        secondary_text_color: { type: String, default: "#000000" },
      },
      card_background: {
        flat_color: { type: String, default: "#000000" },
        gradient_color1: { type: String, default: "#000000" },
        gradient_color2: { type: String, default: "#000000" },
      },
      theme_color: {
        type: String,
        default: "#000000",
      },
    },
  },
  { timestamps: true }
);
const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
