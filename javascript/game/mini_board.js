var Board = require("./board");

function MiniBoard () {
  this.grid = Board.makeGrid(null);
}

MiniBoard.prototype = Object.create(Board.prototype);

MiniBoard.marks = ["x", "o"];

MiniBoard.prototype.isEmptyPos = function (pos) {
  return (this.grid[pos[0]][pos[1]] === null);
};

MiniBoard.prototype.placeMark = function (pos, mark) {
  this.grid[pos[0]][pos[1]] = mark;
};

MiniBoard.prototype.loser = function () {
  if (this.winner()) {
    return this.winner() === 'o' ? 'x' : 'o';
  }

  return null;
};

MiniBoard.prototype.winnerHelper = function (posSeq) {
  for (var markIdx = 0; markIdx < MiniBoard.marks.length; markIdx++) {
    var targetMark = MiniBoard.marks[markIdx];
    var winner = true;
    for (var posIdx = 0; posIdx < 3; posIdx++) {
      var pos = posSeq[posIdx];
      var mark = this.grid[pos[0]][pos[1]];

      if (mark != targetMark) {
        winner = false;
      }
    }

    if (winner) {
      return targetMark;
    }
  }

  return null;
};

module.exports = MiniBoard;
