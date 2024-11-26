const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const userRouter = require("./modules/user/user.routes");
const cardRouter = require("./modules/card/card.routes");
const emailRouter = require("./modules/emailSignture/emailRouter");
require("dotenv").config();
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static("uploads"));
//router
app.use("/user", userRouter);
app.use("/card", cardRouter);
app.use("/email", emailRouter);

app.listen(process.env.PORT, async () => {
  console.log(`Server is Running on ${process.env.PORT} Port`);
  try {
    await connection;
    console.log("Database Is Ready");
  } catch (error) {
    console.log(error);
  }
});
