const express = require("express");
const app = express();
const http = require("http");
const server = http.Server(app);
const socketIO = require("socket.io");
const io = socketIO(server);
const SocketIOEmit = require("./helpers/SocketIOEmit");
const challengeHelper = require("./helpers/Challenge");

const port = process.env.PORT || 3000;

challengeHelper.newChallenge();

io.on("connection", socket => {
  const socketIOEmitHelper = new SocketIOEmit(io);

  socket.on("answer", data => {
    socketIOEmitHelper.sendAnswered(data);
  });

  socket.on("disconnect", () => {
    socketIOEmitHelper.sendConnectedPlayers();
  });

  socket.on("new-challenge", data => {
    socketIOEmitHelper.sendNewChallenge();
  });
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
