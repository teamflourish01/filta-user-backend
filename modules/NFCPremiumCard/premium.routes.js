const express = require("express");
const nfcPremiumRouter = express.Router();
const premiumController = require("./premiumController");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../../middleware/auth");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/nfcpremium");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

nfcPremiumRouter.post(
  "/add",
  upload.fields([{ name: "logo" }]),
  authMiddleware,
  premiumController.addPremium
);
nfcPremiumRouter.patch(
  "/deleteimage",
  authMiddleware,
  premiumController.deleteLogoPremium
);

module.exports = nfcPremiumRouter;
