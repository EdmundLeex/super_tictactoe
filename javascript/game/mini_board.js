var Board = require("./board");

function MiniBoard (marks) {
  this.grid = Board.makeGrid(null);
  this.validGrids = Board.allGrids;
  this.marks = marks;
}

MiniBoard.prototype = Object.create(Board.prototype);

MiniBoard.prototype.isEmptyPos = function (pos) {
  return (this.grid[pos[0]][pos[1]] === null);
};

MiniBoard.prototype.placeMark = function (pos, mark) {
  if (!this.isEmptyPos(pos)) return false;
  this.grid[pos[0]][pos[1]] = mark;
  this.validGrids = this.validGrids.filter(function (posStr) {
    return posStr !== pos.join(',');
  });

  return true;
};

MiniBoard.prototype.winnerHelper = function (posSeq) {
  for (var markIdx = 0; markIdx < this.marks.length; markIdx++) {
    var targetMark = this.marks[markIdx];
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
