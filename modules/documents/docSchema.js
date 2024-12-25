const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    document: { type: String },
    heading: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;
