var LargeBoard = require("./large_board");
var Player = require("./player");

function Game () {
  this.board = new LargeBoard();
  this.players = [new Player("x"), new Player("o")];
  this.currentPlayer = this.players[0].mark;
  this.nextPlayer = this.players[1].mark;
}

Game.marks = ["x", "o"];

Game.prototype.isOver = function () {
  return this.board.isOver();
};

Game.prototype.playMove = function (gridPos, pos) {
  var placedMark = this.board.placeMark(gridPos, pos, this.currentPlayer);
  if (placedMark) {
    // this.swapTurn();
    return true;
  } else {
    return false;
  }
};

Game.prototype.swapTurn = function () {
  var players = this.players;
  if (this.currentPlayer === players[0].mark) {
    this.currentPlayer = players[1].mark;
    this.nextPlayer = players[0].mark;
  } else {
    this.currentPlayer = players[0].mark;
    this.nextPlayer = players[1].mark;
  }
};

Game.prototype.winner = function () {
  return this.board.winner();
};

Game.prototype.reset = function () {
  this.board = new LargeBoard();
  this.currentPlayer = this.players[0].mark;
  this.nextPlayer = this.players[1].mark;
}

module.exports = Game;
