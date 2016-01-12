(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.TTT = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Board () {
  this.grid = Board.makeGrid();
}

Board.makeGrid = function (Constructor) {
  var grid = [];

  for (var i = 0; i < 3; i++) {
    grid.push([]);
    for (var j = 0; j < 3; j++) {
      if (Constructor) {
        grid[i].push(new Constructor());
      } else {
        grid[i].push(null);
      }
    }
  }

  return grid;
};

Board.prototype.isValidPos = function (pos) {
  return (
    (0 <= pos[0]) && (pos[0] < 3) && (0 <= pos[1]) && (pos[1] < 3)
  );
};

Board.prototype.isFull = function () {
  for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
    for (var colIdx = 0; colIdx < 3; colIdx++) {
      if (this.isEmptyPos([rowIdx, colIdx])) {
        return false;
      }
    }
  }
  return true;
};

Board.prototype.isOver = function () {
  if (this.winner() !== null) {
    return true;
  }

  return this.isFull();
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

module.exports = Board;
},{}],2:[function(require,module,exports){
var LargeBoard = require("./large_board");
var Player = require("./player");

function Game () {
  this.board = new LargeBoard();
  this.players = [new Player("x"), new Player("o")];
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

},{"./large_board":4,"./player":6}],3:[function(require,module,exports){
module.exports = {
  Game: require("./game")
};

},{"./game":2}],4:[function(require,module,exports){
var Board = require("./board");
var MiniBoard = require("./mini_board");

function LargeBoard () {
  this.grid = Board.makeGrid(MiniBoard);
  this.validGrids = LargeBoard.allGrids;
}

LargeBoard.prototype = Object.create(Board.prototype);

LargeBoard.marks = ["x", "o"];
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
  for (var markIdx = 0; markIdx < LargeBoard.marks.length; markIdx++) {
    var targetMark = LargeBoard.marks[markIdx];
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
},{"./board":1,"./mini_board":5}],5:[function(require,module,exports){
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

},{"./board":1}],6:[function(require,module,exports){
function Player (mark) {
  this.mark = "";
}

module.exports = Player;
},{}]},{},[3])(3)
});