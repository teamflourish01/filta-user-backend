const mongoose = require("mongoose");

const loginemailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: Boolean, default: true },
    email: { type: Boolean, default: true },
    number: { type: Boolean, default: true },
    message: { type: Boolean, default: true },
    loginemail: { type: String, default: "" },
    loginmessage: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

const Loginemail = mongoose.model("Loginemail", loginemailSchema);

module.exports = Loginemail;
