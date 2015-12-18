var Board = require("./board");
var MoveError = require("./moveError");

function Game () {
  this.board = new Board();
  this.currentPlayer = Game.marks[0];
  this.nextPlayer = Game.marks[1];
}

Game.marks = ["x", "o"];

Game.prototype.isOver = function () {
  return this.board.isOver();
};

Game.prototype.playMove = function (gridPos, pos) {
  var placedMark = this.board.placeMark(gridPos, pos, this.currentPlayer);
  if (placedMark) {
    this.swapTurn()
    return true;
  } else {
    return false;
  }
};

Game.prototype.run = function (reader, gameCompletionCallback) {
  this.promptMove(reader, (function (move) {
    try {
      this.playMove(move);
    } catch (e) {
      if (e instanceof MoveError) {
        console.log(e.msg);
      } else {
        throw e;
      }
    }

    if (this.isOver()) {
      this.board.print();
      if (this.winner()) {
        console.log(this.winner() + " has won!");
      } else {
        console.log("NO ONE WINS!");
      }
      gameCompletionCallback();
    } else {
      // continue loop
      this.run(reader, gameCompletionCallback);
    }
  }).bind(this));
};

Game.prototype.swapTurn = function () {
  if (this.currentPlayer === Game.marks[0]) {
    this.currentPlayer = Game.marks[1];
    this.nextPlayer = Game.marks[0];
  } else {
    this.currentPlayer = Game.marks[0];
    this.nextPlayer = Game.marks[1];
  }
};

Game.prototype.winner = function () {
  return this.board.winner();
};

module.exports = Game;