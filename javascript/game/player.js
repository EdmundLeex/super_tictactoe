function Player (mark, game) {
  this.mark = mark;
  this.game = game;
}

Player.prototype.makeMove = function (gridPos, pos) {
  this.game.playMove(gridPos, pos, this.mark);
  return true;
}

module.exports = Player;