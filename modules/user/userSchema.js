const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    card: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
    socialLinks: [{ type: mongoose.Schema.Types.ObjectId, ref: "SocialLink" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
