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

let totalAnswers = 0;

io.on("connection", socket => {
  const socketIOEmitHelper = new SocketIOEmit(io);

  socket.on("new-answer", data => {
    totalAnswers++;
    if (totalAnswers === io.clients().server.engine.clientsCount) {
      socketIOEmitHelper.sendAnswered(data);
    }
  });

  socket.on("answer", data => {
    socketIOEmitHelper.sendAnswered(data);
  });

  socket.on("disconnect", () => {
    socketIOEmitHelper.sendConnectedPlayers();
  });

  socket.on("new-challenge", data => {
    socketIOEmitHelper.sendNewChallenge();
    totalAnswers = 0;
  });
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
