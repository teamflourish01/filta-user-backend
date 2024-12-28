const mongoose = require("mongoose");
const photoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image:{
        type:Array
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const PhotoModel=new mongoose.model("Photo",photoSchema)
module.exports=PhotoModel
