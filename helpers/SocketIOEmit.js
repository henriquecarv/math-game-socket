"use strict";
const challengeHelper = require("./Challenge");

class SocketIOEvents {
  constructor(io) {
    this.io = io;
    this.init();
  }

  init() {
    challengeHelper.getFirstChallenge();
    this.sendConnectedPlayers();
  }

  sendNewChallenge() {
    this.io.emit("challenge", challengeHelper.newChallenge());
  }

  sendAnswered(data) {
    this.io.emit("answered", data);
  }

  sendConnectedPlayers() {
    this.io.emit("connected", this.io.clients().server.engine.clientsCount);
  }
}

module.exports = SocketIOEvents;
