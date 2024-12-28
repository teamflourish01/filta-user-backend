const { response } = require("express");
const GalleryModel = require("./pgSchema");

exports.addGallery = async (req, res) => {
  try {
    let file = req.files[0]?.gallery;
    let userId = req.userID;
    let existData = await GalleryModel.find({ userId });
    if (existData) {
      let data = await GalleryModel.findOneAndUpdate(
        { userId, _id: req.body.id },
        { ...req.body , image:file },
        { new: true }
      );
      res.status(200).send({
        msg: "Gallery Updated Successfully",
        data,
      });
    } else {
      let data = await GalleryModel({
        userId,
        ...req.body,
        image:file
      });
      await data.save();
    }
  } catch (error) {
    console.log(error);
  }
};


exports.deleteGallery=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await GalleryModel.findByIdAndDelete(id)
        res.status(200).send({
            msg:"Gallery deleted successfully",
            data
        })
    } catch (error) {
        console.log(error);
        
    }
}