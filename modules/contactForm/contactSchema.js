const mongoose = require("mongoose");

const contactFormSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String },
    email: { type: String },
    number: { type: String },
    message: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const Contactform = mongoose.model("Contactform", contactFormSchema);

module.exports = Contactform;
