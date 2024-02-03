const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
//external import
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const converstionRoute = require("./routes/conversationRoute");
const { PORT } = require("./envVariable");
const { dbConnect } = require("./db");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");
const messageModel = require("./models/messageModel");
const userModel = require("./models/userModel");
const { cloudUploadStream } = require("./lib/cloudnary");

//for cors policy
app.use(cors());

//parce request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();

//setup api routes
app.use("/api", userRoute);
app.use("/api", messageRoute);
app.use("/api", converstionRoute);

//--------deploy setup start----------
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("welcome to chat app mount path");
  });
}
//--------deploy setup end----------

//error handleling
app.use(notFoundHandler);
app.use(errorHandler);

//-------------socket io setup start-----------
let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const findUser = (userId) => {
  const existUser = users.find((user) => user.userId === userId);
  return existUser;
};
const findBySocket = (socketId) => {
  const existUser = users.find((user) => user.socketId === socketId);
  return existUser;
};
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", async (socket) => {
  console.log("new user connected");
  socket.on("add user", async (userId) => {
    addUser(userId, socket.id);
    await userModel.findOneAndUpdate({ _id: userId }, { status: "online" });
    io.emit("get users", users);
  });

  socket.on("send message", async (data) => {
    const {
      conversationId,
      senderId,
      receiverId,
      avatar,
      message,
      attachment,
    } = data;

    io.emit("load message", {
      _id: new Date().getTime().toString(),
      sender: { _id: senderId, avatar: { url: avatar } },
      message,
      conversation: conversationId,
      image: attachment ? attachment?.toString("base64") : "",
    });
    try {
      let messageObj;
      if (attachment) {
        const cloudImage = await cloudUploadStream("chat-app/messages", attachment);
        messageObj = {
          sender: senderId,
          message,
          image: cloudImage.url,
          conversation: conversationId,
        };
      } else {
        messageObj = {
          sender: senderId,
          message,
          conversation: conversationId,
        };
      }
      await messageModel.create(messageObj);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  });

  socket.on("start typing", (selectedUser) => {
    const user = findUser(selectedUser);
    io.to(user?.socketId).emit("typing", {
      userId: selectedUser,
      isTyping: true,
    });
  });
  socket.on("stop typing", (selectedUser) => {
    const user = findUser(selectedUser);
    io.to(user?.socketId).emit("typing", {
      userId: selectedUser,
      isTyping: false,
    });
  });
  socket.on("disconnect", async () => {
    console.log("User disconnected");
    const user = findBySocket(socket.id);
    await userModel.findOneAndUpdate(
      { _id: user?.userId },
      { status: "ofline" }
    );

    removeUser(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
