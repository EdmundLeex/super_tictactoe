var Board = require("./board");
var MiniBoard = require("./mini_board");

function LargeBoard (marks) {
  this.grid = Board.makeGrid(MiniBoard.bind(null, marks));
  this.validGrids = LargeBoard.allGrids;
  this.marks = marks;
}

LargeBoard.prototype = Object.create(Board.prototype);

LargeBoard.allGrids = ['0,0', '0,1', '0,2', '1,0', '1,1', '1,2', '2,0', '2,1', '2,2'];

LargeBoard.prototype.isEmptyPos = function (pos) {
  return (!this.grid[pos[0]][pos[1]].winner() && !this.grid[pos[0]][pos[1]].isFull());
};

LargeBoard.prototype.placeMark = function (gridPos, pos, mark) {
  if (this.validGrids.indexOf(gridPos.toString()) !== -1) {
    this.grid[gridPos[0]][gridPos[1]].placeMark(pos, mark);
    this.setValidGrid(pos);
    return true;
  } else {
    return false;
  }
};

LargeBoard.prototype.setValidGrid = function (pos) {
  if (!this.grid[pos[0]][pos[1]].isFull()) {
    this.validGrids = [pos.toString()];
  } else {
    this.validGrids = LargeBoard.allGrids;
  }
};

LargeBoard.prototype.winnerHelper = function (posSeq) {
  for (var markIdx = 0; markIdx < this.marks.length; markIdx++) {
    var targetMark = this.marks[markIdx];
    var winner = true;
    for (var posIdx = 0; posIdx < 3; posIdx++) {
      var pos = posSeq[posIdx];
      var mark = this.grid[pos[0]][pos[1]].winner();

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

module.exports = LargeBoard;