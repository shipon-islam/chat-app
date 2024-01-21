const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL)
  .then((res) => console.log("db connected"))
  .catch((err) => console.log(err));

// MongoDB schema and model (Assuming you have a 'messages' collection)
const messageSchema = new mongoose.Schema({
  user: String,
  message: String,
});

const Message = mongoose.model("Message", messageSchema);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("connected socket");
  // Listen for new messages
  socket.on("chat message", async (data) => {
    const newMessage = new Message(data);
    await newMessage.save();
    // Broadcast the message to all connected clients
    io.emit("chat message", data);
  });
  // Load previous messages when a user connects
  Message.find({})
    .then((messages) => {
      socket.emit("load messages", messages);
    })
    .catch((err) => {
      console.error(err);
    });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
