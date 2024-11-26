const multer = require("multer");
const path = require("path");

exports.addemail = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Send back the URL of the uploaded image
  const imageUrl = `https://192.168.1.8:8080/uploads/${req.file.filename}`;
  res.json({ imageUrl });
};
