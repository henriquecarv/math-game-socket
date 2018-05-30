let express = require("express");
let app = express();

let http = require("http");
let server = http.Server(app);

let socketIO = require("socket.io");
let io = socketIO(server);

const port = process.env.PORT || 3000;

let connected = 0;
// app.get("/connected", function(req, res) {
//   res.json({ connected: connected });

//   // res.sendFile(__dirname + "/index.html");
// });

let firstOperand;
let secondOperand;
let result;
let operator;
const operators = {
  1: "*",
  2: "+",
  3: "-",
  4: "/"
};

function getRandomNumber(max) {
  const min = 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newChallenge() {
  firstOperand = getRandomNumber(10);
  secondOperand = getRandomNumber(10);
  operator = operators[getRandomNumber(4)];
  result = eval(firstOperand + operator + secondOperand);

  switch (getRandomNumber(2)) {
    case 1:
      result = eval(result + operator + getRandomNumber(10));
      break;
    default:
      break;
  }

  return {
    firstOperand: firstOperand,
    operator: operator,
    secondOperand: secondOperand,
    result: result
  };
}

console.log(newChallenge());
// console.log(`${firstOperand} ${operator} ${secondOperand} = ${result}`);

io.on("connection", socket => {
  io.emit("connected", io.clients().server.engine.clientsCount);
  io.emit("challenge", {
    firstOperand: firstOperand,
    operator: operator,
    secondOperand: secondOperand,
    result: result
  });

  socket.on("answer", data => {
    io.emit("answered", data);
  });

  socket.on("disconnect", () => {
    io.emit("connected", io.clients().server.engine.clientsCount);
  });

  socket.on("new-message", message => {
    console.log(message);
  });
  socket.on("new-challenge", data => {
    console.log(data);
    io.emit("challenge", newChallenge());
  });
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
