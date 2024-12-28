const mongoose = require("mongoose");
const pgSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
    },
    price: {
      type: String,
    },
    button_type: {
      type: String,
    },
    button_link: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const  GalleryModel=new mongoose.model("Gallery",pgSchema)

module.exports=GalleryModel