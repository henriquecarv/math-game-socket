"use strict";
const challengeHelper = require("./Challenge");

class SocketIOEvents {
  constructor(io) {
    this.io = io;
    this.init();
  }

  init() {
    this.firstChallenge = challengeHelper.getFirstChallenge();
    this.sendConnectedPlayers();
    this.sendNewChallenge(this.firstChallenge);
  }

  sendNewChallenge(challenge) {
    this.io.emit(
      "challenge",
      challenge !== undefined ? challenge : challengeHelper.newChallenge()
    );
  }

  // sendEndOfRoundSignal() {
  //   this.io.emit("endround", true);
  // }

  sendAnswered(data) {
    this.io.emit("answered", data);
  }

  sendConnectedPlayers() {
    this.io.emit("connected", this.io.clients().server.engine.clientsCount);
  }
}

module.exports = SocketIOEvents;
