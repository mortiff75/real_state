import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUsers = [];

const addUser = (socketId, userId) => {
  const user = onlineUsers.find((user) => user.userId === userId);

  if (!user) {
    onlineUsers.push({ socketId, userId });
  }
};

const getUser = (userId) => {
  const user = onlineUsers.find((user) => user.userId === userId);

  return user;
};

const removeUser = (id) => {
  onlineUsers = onlineUsers.filter((user) => user.id !== id);
};

io.on("connection", (client) => {
  client.on("newUser", (userId) => {
    addUser(client.id, userId);
  });

  client.on("sendMessage", ({ recId, data }) => {
    const reciverId = getUser(recId).socketId;

    io.to(reciverId).emit("getMessage", { reciverId, data });
  });

  client.on("disconnect", () => {
    removeUser(client.id);
  });
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
