const express = require("express");
const app = express();
const http = require("http");
const server = http.Server(app);
const socketIO = require("socket.io");
const io = socketIO(server);

const helper = require("./helpers/Challenge");

const port = process.env.PORT || 3000;

let connected = 0;

io.on("connection", socket => {
  io.emit("connected", io.clients().server.engine.clientsCount);

  io.emit("challenge", helper.newChallenge());

  socket.on("answer", data => {
    io.emit("answered", data);
  });

  socket.on("disconnect", () => {
    io.emit("connected", io.clients().server.engine.clientsCount);
  });

  socket.on("new-challenge", data => {
    io.emit("challenge", helper.newChallenge());
  });
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
