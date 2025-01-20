const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const userRouter = require("./modules/user/user.routes");
const cardRouter = require("./modules/card/card.routes");
const emailRouter = require("./modules/emailSignture/emailRouter");
const linkRouter = require("./modules/socialLink/link.routes");
require("dotenv").config();
const { planExpiry } = require("./notifications/planExpiry");
const { expiryDate } = require("./notifications/expiryDate");
const path = require("path");
const multiMediaRouter = require("./modules/multimedia/multimedia.routes");
const ctaRouter = require("./modules/ctaButton/cta.routes");
const teamRouter = require("./modules/teammember/team.routes");
const autoRouter = require("./modules/automated/automated.routes");
const spRouter = require("./modules/social proof/sp.routes");
const photoRouter = require("./modules/photos/photo.routes");
const pgRouter = require("./modules/photo gallery/pg.routes");
const addressRouter = require("./modules/address/address.routes");
const nfcStandardRouter = require("./modules/NFC Standard Card/nfcStandard.routes");

const voiceRouter = require("./modules/voice/voice.routes");
const aboutRouter = require("./modules/about/about.routes");
const docRouter = require("./modules/documents/doc.routes");
const contactFormRouter = require("./modules/contactForm/contact.routes");
const {
  tsOffferRouter,
} = require("./modules/timesensitive/timesensitive.routes");

const qrcodeRouter = require("./modules/qrcode/qrcode.routes");
const fontsRouter = require("./modules/customfonts/fonts.routes");

const paymentRouter = require("./modules/payment/payment.routes");
const nfcPremiumRouter = require("./modules/NFCPremiumCard/premium.routes");

const shuffleRouter = require("./modules/shuffle/shuffle.routes");

const requestFeatureRouter = require("./modules/requestFeature/feature.routes");
const feedbackRouter = require("./modules/feedback/feedback.routes");



const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static("uploads"));
app.use("/font", express.static(path.join(__dirname, "fonts")));

//router
app.use("/user", userRouter);
app.use("/card", cardRouter);
app.use("/signature", emailRouter);

app.use("/link", linkRouter);
app.use("/multimedia", multiMediaRouter);
app.use("/cta", ctaRouter);
app.use("/team", teamRouter);
app.use("/automated", autoRouter);
app.use("/social", spRouter);
app.use("/photo", photoRouter);
app.use("/gallery", pgRouter);
app.use("/address", addressRouter);
app.use("/nfc-standard", nfcStandardRouter);
app.use("/timesoffer", tsOffferRouter);

app.use("/voice", voiceRouter);
app.use("/about", aboutRouter);
app.use("/doc", docRouter);
app.use("/email", contactFormRouter);
app.use("/feature",requestFeatureRouter)
app.use("/qr", qrcodeRouter);
app.use("/font", fontsRouter);
app.use("/feedback",feedbackRouter)
app.use("/payment",paymentRouter);
app.use("/nfcpremium",nfcPremiumRouter)
app.use("/shuffle",shuffleRouter)

app.listen(process.env.PORT, async () => {
  console.log(`Server is Running on ${process.env.PORT} Port`);
  try {
    await connection;
    console.log("Database Is Ready");
  } catch (error) {
    console.log(error);
  }
});
