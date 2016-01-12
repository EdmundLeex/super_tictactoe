var Util = require("./util");

function Player(mark, game, oponent) {
  this.mark = mark;
  this.game = game;
  this.oponent = oponent;
}

Player.prototype.makeMove = function (gridPos, pos, updateView) {
  this.game.playMove(gridPos, pos, this.mark);

  var squareId = Util.posToId(gridPos, pos);
  updateView(squareId, this.game);
  this.game.swapTurn();
  this.oponent.play(updateView);

  return true;
};

Player.prototype.play = function () {};



module.exports = Player;