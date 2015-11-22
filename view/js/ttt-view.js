(function () {
  if (typeof window.TTT === "undefined") {
    var TTT = window.TTT = {};
  }

  var View = window.TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
  };

  View.prototype.bindEvents = function () {
    var that = this;
    $('.square').on('click', function (e) {
      that.makeMove($(e.target));
    });
  };

  View.prototype.makeMove = function ($square) {
    if (this.game.isOver()) {
      return;
    }
    var id = $square.attr("id");
    var pos = [Math.floor(id/3), (id%3)];
    var mark = this.game.currentPlayer;
    this.game.playMove(pos);
    $square.html("<span class='mark " + mark + "'>" + mark + "</span>");
    $square.addClass("clicked");
    $square.removeClass("hoverable-square");
    if (this.game.isOver()) {
      if (this.game.winner()) {
        // debugger
        $('.' + mark).parent().addClass("winner");
        $(".message").html("Congratulations, " + mark.toUpperCase() + " wins!");
      } else {
        $(".message").html("Are you stupid? No one wins.");
      }

      $(".square").removeClass("hoverable-square");
    }
  };

  View.prototype.setupBoard = function () {
    var $elem = $('<ul class="grid"></ul>');

    this.$el.append($elem);
    var toInsert = "";
    for (var i = 0; i < 9; i++) {
      toInsert = toInsert + "<li class='square hoverable-square' id=" + i + ">" + this.setupMiniBoard(i) + "</li>";
    }
    $elem.html(toInsert);
  };

  View.prototype.setupMiniBoard = function (id) {
    var toInsert = "";
    for (var i = 0; i < 9; i++) {
      toInsert = toInsert + "<li class='mini-square hoverable-square' id=mini-" + id + "-" + i + "></li>";
    }

    return '<ul class="mini-grid">' + toInsert + '</ul>';

    // this.$square.append($elem);
    // $square.html(toInsert);
  }
})();
