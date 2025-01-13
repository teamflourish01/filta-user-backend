const User = require("../user/userSchema");
const Qrmodel = require("./qrcodeSchema");

function handleSingleImage(fileArray, currentImage) {
  return fileArray && fileArray[0] ? fileArray[0].filename : currentImage;
}
exports.addQrcode = async (req, res) => {
  try {
    const { qrcolor } = req.body;
    let userId = req.userID;
    const existingData = await Qrmodel.findOne({ userId });
    const qrimage = handleSingleImage(
      req.files?.qrimage,
      existingData ? existingData.qrimage : ""
    );

    const qrpng = handleSingleImage(
      req.files?.qrpng,
      existingData ? existingData.qrpng : ""
    );

    const updatedQRCode = await Qrmodel.findOneAndUpdate(
      { userId },
      { qrimage, qrpng, qrcolor },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );
    await User.findByIdAndUpdate(userId, {
      $set: { qrcode: updatedQRCode._id },
    });
    res.status(201).json({
      message: "QR Code saved successfully",
      data: updatedQRCode,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};
