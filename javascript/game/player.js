function Player(mark, game, oponent) {
  this.mark = mark;
  this.game = game;
  this.oponent = oponent;
}

Player.prototype.makeMove = function (gridPos, pos) {
  this.game.playMove(gridPos, pos, this.mark);
  return true;
}

// Computer Player
function ComputerPlayer(mark, game) {
  Player.call(mark, game);
}

ComputerPlayer.prototype = Object.create(Player.prototype);

ComputerPlayer.prototype.makeMove = function (arguments) {
  // body...
}

module.exports = Player;