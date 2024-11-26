const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
require("dotenv").config();
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
const WebSocket = require("ws");
const { planExpiry } = require("./notifications/planExpiry");

const server = new WebSocket.Server({ port: 8000 });

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
