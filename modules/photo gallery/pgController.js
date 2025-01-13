const { response } = require("express");
const GalleryModel = require("./pgSchema");
const User = require("../user/userSchema");

exports.addGallery = async (req, res) => {
  try {
    const userId = req.userID;
    const newGallery = new GalleryModel({
      userId,
      ...req.body,
      image: req.file ? req.file.filename : null,
    });

    const savedGallery = await newGallery.save();
    await User.findByIdAndUpdate(
      userId,
      { $push: { productGallary: savedGallery._id } },
      { new: true }
    );
    return res.status(201).json({
      msg: "Gallery added successfully",
      data: savedGallery,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Gallary not Added", message: error.message });
  }
};

exports.editGallery = async (req, res) => {
  try {
    const galleryId = req.params.id;
    const userId = req.userID;

    // Find the gallery item
    const gallery = await GalleryModel.findOne({ _id: galleryId, userId });
    if (!gallery) {
      return res.status(404).json({ error: "Gallery item not found" });
    }

    // Update the fields
    gallery.title = req.body.title || gallery.title;
    gallery.price = req.body.price || gallery.price;
    gallery.button_type = req.body.button_type || gallery.button_type;
    gallery.button_link = req.body.button_link || gallery.button_link;
    gallery.description = req.body.description || gallery.description;

    if (req.file) {
      gallery.image = req.file.filename;
    }

    // Save the updated gallery
    const updatedGallery = await gallery.save();

    return res.status(200).json({
      msg: "Gallery updated successfully",
      data: updatedGallery,
    });

  } catch (error) {
    res.status(500).json({
      error: "Failed to update gallery",
      message: error.message,
    });
  }
};

exports.deleteGallery = async (req, res) => {
  const galleryId = req.params.galleryId;
  const userId = req.userID;

  try {
    const galleryItem = await GalleryModel.findById(galleryId);

    if (!galleryItem) {
      return res.status(404).send({ msg: "Gallery item not found" });
    }

    if (galleryItem.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .send({ msg: "You are not authorized to delete this gallery item" });
    }

    let data = await GalleryModel.findByIdAndDelete(galleryId);

    res.status(200).send({
      msg: "Gallery deleted successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "An error occurred while deleting the gallery",
    });
  }
};
