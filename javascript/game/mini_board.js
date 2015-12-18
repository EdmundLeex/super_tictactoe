var MoveError = require("./moveError");

function MiniBoard () {
  this.grid = MiniBoard.makeGrid();
}

MiniBoard.isValidPos = function (pos) {
  return (
    (0 <= pos[0]) && (pos[0] < 3) && (0 <= pos[1]) && (pos[1] < 3)
  );
};

MiniBoard.makeGrid = function () {
  var grid = [];

  for (var i = 0; i < 3; i++) {
    grid.push([]);
    for (var j = 0; j < 3; j++) {
      grid[i].push(null);
    }
  }

  return grid;
};

MiniBoard.marks = ["x", "o"];

MiniBoard.prototype.isEmptyPos = function (pos) {
  if (!MiniBoard.isValidPos(pos)) {
    throw new MoveError("Is not valid position!");
  }

  return (this.grid[pos[0]][pos[1]] === null);
};

MiniBoard.prototype.isOver = function () {
  if (this.winner() !== null) {
    return true;
  }

  return this.isFull();
};

MiniBoard.prototype.isFull = function () {
  for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
    for (var colIdx = 0; colIdx < 3; colIdx++) {
      if (this.isEmptyPos([rowIdx, colIdx])) {
        return false;
      }
    }
  }
  return true;
};

MiniBoard.prototype.placeMark = function (pos, mark) {
  if (!this.isEmptyPos(pos)) {
    throw new MoveError("Is not an empty position!");
  }

  this.grid[pos[0]][pos[1]] = mark;
};

MiniBoard.prototype.print = function () {
  var strs = [];
  for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
    var marks = [];
    for (var colIdx = 0; colIdx < 3; colIdx++) {
      marks.push(
        this.grid[rowIdx][colIdx] ? this.grid[rowIdx][colIdx] : " "
      );
    }

    strs.push(marks.join("|") + "\n");
  }

  console.log(strs.join("-----\n"));
};

MiniBoard.prototype.winner = function () {
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
