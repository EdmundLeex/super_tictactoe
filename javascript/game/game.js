var LargeBoard = require("./large_board");
var Player = require("./player");

function Game () {
  this.board = new LargeBoard(Game.marks);
  this.players = [new Player("x"), new Player("o")];
  this.currentPlayer = this.players[0];
  this.nextPlayer = this.players[1];
}

Game.marks = ["x", "o"];

Game.prototype.isOver = function () {
  return this.board.isOver();
};

Game.prototype.playMove = function (gridPos, pos) {
  var placedMark = this.board.placeMark(gridPos, pos, this.currentPlayer.mark);
  if (placedMark) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.swapTurn = function () {
  var players = this.players;
  if (this.currentPlayer === players[0]) {
    this.currentPlayer = players[1];
    this.nextPlayer = players[0];
  } else {
    this.currentPlayer = players[0];
    this.nextPlayer = players[1];
  }
};

Game.prototype.winner = function () {
  return this.board.winner();
};

Game.prototype.reset = function () {
  this.board = new LargeBoard(Game.marks);
  this.currentPlayer = this.players[0];
  this.nextPlayer = this.players[1];
}

module.exports = Game;
