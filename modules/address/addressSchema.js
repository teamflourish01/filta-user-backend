const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const AddressModel = new mongoose.model("Address", addressSchema);

module.exports = AddressModel;
