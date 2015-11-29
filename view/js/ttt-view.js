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
    $('.mini-square').on('click', function (e) {
      that.makeMove($(e.target));
    });
  };

  View.prototype.makeMove = function ($square) {
    if (this.game.isOver()) {
      return;
    }
    var idArr = $square.attr("id").split('-');
    var gridId = idArr[1];
    var id = idArr[2];
    var gridPos = [Math.floor(gridId / 3), (gridId % 3)];
    var pos = [Math.floor(id / 3), (id % 3)];

    if (this.game.playMove(gridPos, pos)) {
      this.clearMessage();
      this.updateView($square);
    } else {
      this.showMessage("Invalid move");
    }
  };

  View.prototype.updateView = function ($square) {
    var mark = this.game.currentPlayer;
    var game = this.game;
    $square.html("<span class='mark " + mark + "'>" + mark + "</span>");
    $square.addClass("clicked");
    $square.removeClass("hoverable");

    $('.square').each(function () {
      var miniSquare = $(this).find('.mini-square');
      var gridPos = [Math.floor(parseInt(this.id) / 3), Math.floor(parseInt(this.id) % 3)];
      var miniBoard = game.board.grid[gridPos[0]][gridPos[1]];
      if (miniBoard.isOver()) {
        var id = gridPos[0] * 3 + gridPos[1] * 3 - (gridPos[1] * 3 - gridPos[1]);
        $('#' + id.toString()).addClass('won-grid-' + miniBoard.winner());
      }

      if (game.board.validGrids.indexOf(gridPos[0] + ',' + gridPos[1]) === -1) {
        miniSquare.each(function () {
          this.classList.remove('playable');
          this.classList.remove('hoverable');
        })
      } else {
        miniSquare.each(function () {
          this.classList.add('playable');
          this.classList.add('hoverable');
        })
      }
    })

    $('.clicked').each(function () {
      this.classList.remove('playable');
    })

    if (this.game.isOver()) {
      if (this.game.winner()) {
        // debugger
        $('.' + mark).parent().addClass("winner");
        this.showMessage("Congratulations, " + mark.toUpperCase() + " wins!")
      } else {
        this.showMessage("Are you stupid? No one wins.");
      }

      $(".square").removeClass("hoverable");
    }
  };

  View.prototype.showMessage = function (msg) {
    $(".message").html(msg);
  };

  View.prototype.clearMessage = function () {
    $(".message").html("");
  };

  View.prototype.setupBoard = function () {
    var $elem = $('<ul id="board"></ul>');

    this.$el.append($elem);
    var toInsert = "";
    for (var i = 0; i < 9; i++) {
      toInsert = toInsert + "<li class='square grid' id=" + i + ">" + this.setupMiniBoard(i) + "</li>";
    }
    $elem.html(toInsert);
  };

  View.prototype.setupMiniBoard = function (id) {
    var toInsert = "";
    for (var i = 0; i < 9; i++) {
      toInsert = toInsert + "<li class='mini-square playable grid hoverable' id=mini-" + id + "-" + i + "></li>";
    }

    return '<ul class="mini-grid">' + toInsert + '</ul>';

    // this.$square.append($elem);
    // $square.html(toInsert);
  };
})();
