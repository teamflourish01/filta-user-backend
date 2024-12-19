const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const userRouter = require("./modules/user/user.routes");
const cardRouter = require("./modules/card/card.routes");
const emailRouter = require("./modules/emailSignture/emailRouter");
const linkRouter = require("./modules/socialLink/link.routes");
require("dotenv").config();
const WebSocket = require("ws");
const { planExpiry } = require("./notifications/planExpiry");
const server = new WebSocket.Server({ port: 8000 });

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static("uploads"));
//router
app.use("/user", userRouter);
app.use("/card", cardRouter);
app.use("/email", emailRouter);
app.use("/link",linkRouter)

app.listen(process.env.PORT, async () => {
  console.log(`Server is Running on ${process.env.PORT} Port`);
  try {
    await connection;
    console.log("Database Is Ready");
  } catch (error) {
    console.log(error);
  }
});



server.on("connection", (ws) => {
  console.log("Client connected");

  ws.send( planExpiry("2024-11-14T12:30:23.367+00:00"));

  // Handle messages from clients
  ws.on("message", (message) => {
    console.log("Received from client:", message);
  });

  // Handle client disconnect
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

app.listen(process.env.PORT, async () => {
  console.log(`Server is Running on ${process.env.PORT} Port`);
  try {
    await connection;
    console.log("Database Is Ready");
  } catch (error) {
    console.log(error);
  }
});
