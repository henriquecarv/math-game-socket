"use strict";

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

class Challenge {
  getFirstChallenge() {
    return {
      firstOperand: firstOperand,
      operator: operator,
      secondOperand: secondOperand,
      result: result
    };
  }

  getRandomNumber(max) {
    const min = 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  newChallenge() {
    firstOperand = this.getRandomNumber(10);
    secondOperand = this.getRandomNumber(10);
    operator = operators[this.getRandomNumber(4)];
    result = eval(firstOperand + operator + secondOperand);

    switch (this.getRandomNumber(2)) {
      case 1:
        result = eval(result + operator + this.getRandomNumber(10));
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
}

module.exports = new Challenge();
