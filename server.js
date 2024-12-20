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
const voiceRouter = require("./modules/voice/voice.routes");

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static("uploads"));

//router
app.use("/user", userRouter);
app.use("/card", cardRouter);
app.use("/email", emailRouter);
app.use("/link",linkRouter)
app.use("/voice",voiceRouter)





app.listen(process.env.PORT, async () => {
  console.log(`Server is Running on ${process.env.PORT} Port`);
  try {
    await connection;
    console.log("Database Is Ready");
  } catch (error) {
    console.log(error);
  }
});
