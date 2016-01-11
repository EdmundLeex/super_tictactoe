var LargeBoard = require("./large_board");
var MoveError = require("./moveError");

function Game () {
  this.board = new LargeBoard();
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
    this.swapTurn();
    return true;
  } else {
    return false;
  }
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

Game.prototype.reset = function () {
  this.board = new LargeBoard();
  this.currentPlayer = Game.marks[0];
  this.nextPlayer = Game.marks[1];
}

module.exports = Game;
