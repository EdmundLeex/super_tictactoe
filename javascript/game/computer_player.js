var Util = require("./util");
var Player = require("./player");

// Computer Player
function ComputerPlayer(mark, game) {
  Player.call(this, mark, game);
}

ComputerPlayer.prototype = Object.create(Player.prototype);

ComputerPlayer.prototype.play = function (updateView) {
  var validPosArr = this.game.board.validGrids;
  var randIdx = Util.randomIdx(validPosArr.length);
  var gridPos = Util.parsePosFromStr(validPosArr[randIdx]);
  validPosArr = this.game.board.grid[gridPos[0]][gridPos[1]].validGrids;
  randIdx = Util.randomIdx(validPosArr.length);
  var pos = Util.parsePosFromStr(validPosArr[randIdx]);

  setTimeout(
    this.makeMove.bind(this, gridPos, pos, updateView),
    500
  );
};

module.exports = ComputerPlayer;
