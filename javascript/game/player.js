var Util = require("./util");

function Player(mark, game, oponent) {
  this.mark = mark;
  this.game = game;
  this.oponent = oponent;
}

Player.prototype.makeMove = function (gridPos, pos, updateView) {
  var moveMade = this.game.playMove(gridPos, pos, this.mark);

  if (moveMade) {
    var squareId = Util.posToId(gridPos, pos);
    updateView(squareId, this.game);
    if (!this.game.winner()) {
      this.game.swapTurn();
      this.oponent.play(updateView);
    }
    return true;
  } else {
    return false;
  }
};

Player.prototype.play = function () {};



module.exports = Player;