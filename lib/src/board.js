var MiniBoard = require("./mini_board");

function Board () {
  this.grid = Board.makeGrid();
  this.validGrids = Board.allGrids;
}

Board.marks = ["x", "o"];
Board.allGrids = ['0,0', '0,1', '0,2', '1,0', '1,1', '1,2', '2,0', '2,1', '2,2'];

Board.makeGrid = function () {
  var grid = [];

  for (var i = 0; i < 3; i++) {
    grid.push([]);
    for (var j = 0; j < 3; j++) {
      grid[i].push(new MiniBoard());
    }
  }

  return grid;
};

Board.prototype.isEmptyPos = function (pos) {
  // if (!Board.isValidPos(pos)) {
  //   throw new MoveError("Is not valid position!");
  // }

  return (this.grid[pos[0]][pos[1]] !== 'x' || this.grid[pos[0]][pos[1]] !== 'o');
};

Board.isValidPos = function (pos) {
  return (
    (0 <= pos[0]) && (pos[0] < 3) && (0 <= pos[1]) && (pos[1] < 3)
  );
};

Board.prototype.placeMark = function (gridPos, pos, mark) {
  if (this.validGrids.indexOf(gridPos.toString()) !== -1) {
    this.grid[gridPos[0]][gridPos[1]].placeMark(pos, mark);
    this.setValidGrid(pos);
    return true;
  } else {
    return false;
  }
};

Board.prototype.setValidGrid = function (pos) {
  if (!this.grid[pos[0]][pos[1]].isOver()) {
    this.validGrids = [pos.toString()];
  } else {
    this.validGrids = Board.allGrids;
  }
};

Board.prototype.isOver = function () {
  if (this.winner() !== null) {
    return true;
  }

  for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
    for (var colIdx = 0; colIdx < 3; colIdx++) {
      if (this.isEmptyPos([rowIdx, colIdx])) {
        return false;
      }
    }
  }

  return true;
};

Board.prototype.winner = function () {
  var posSeqs = [
    // horizontals
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // verticals
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[2, 0], [1, 1], [0, 2]]
  ];

  for (var i = 0; i < posSeqs.length; i++) {
    var winner = this.winnerHelper(posSeqs[i]);
    if (winner !== null) {
      return winner;
    }
  }

  return null;
};

Board.prototype.winnerHelper = function (posSeq) {
  for (var markIdx = 0; markIdx < Board.marks.length; markIdx++) {
    var targetMark = Board.marks[markIdx];
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

module.exports = Board;