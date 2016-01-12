(function () {
  if (typeof window.TTT === "undefined") {
    var TTT = window.TTT = {};
  }

  var View = window.TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
  };

  View.prototype.initBoard = function () {
    setupBoard(this.$el, this.game);
  };

  View.prototype.bindEvents = function () {
    var that = this;
    $('#reset').on('click', function (e) {
      e.preventDefault();
      e.target.textContent = "RESTART";
      reset(that.game);
    });
  };

  function reset(game) {
    var vsAI = $('#ai-toggle').is(':checked');
    var player1 = new window.TTT.Player('x');
    var player2;

    if (vsAI) {
      player2 = new window.TTT.ComputerPlayer('o');
    } else {
      player2 = new window.TTT.Player('o');
    }
    player1.oponent = player2;
    player2.oponent = player1;
    // var game = new window.TTT.Game([player1, player2]);
    game.addPlayers([player1, player2]);
    game.reset();
    bindClick(game);
    resetView();
  }

  function makeMove(squareId, game) {
    if (game.isOver()) return;

    var idArr = squareId.split('-');
    var gridId = idArr[1];
    var id = idArr[2];
    var gridPos = [Math.floor(gridId / 3), (gridId % 3)];
    var pos = [Math.floor(id / 3), (id % 3)];

    if (game.currentPlayer.makeMove(gridPos, pos, updateView)) {
      $('#next-move').html(game.nextPlayer.mark);
    } else {
      showMessage("Invalid move");
    }
  }

  function updateView(squareId, game) {
    var $square = $('#' + squareId);
    var mark = game.currentPlayer.mark;

    $square.html("<span class='mark " + mark + "'>" + mark + "</span>");
    $square.addClass("clicked").remove('playable');
    $square.removeClass("hoverable");

    clearMessage();
    updateGridsClasses(game);
    showEndGameView(game);
  }

  function updateGridsClasses(game) {
    $('.square').each(function () {
      var $miniSquares = $(this).find('.mini-square');
      var gridPos = [Math.floor(parseInt(this.id) / 3), Math.floor(parseInt(this.id) % 3)];
      var miniBoard = game.board.grid[gridPos[0]][gridPos[1]];
      if (miniBoard.isOver()) {
        var id = gridPos[0] * 3 + gridPos[1] * 3 - (gridPos[1] * 3 - gridPos[1]);
        var wonGrid = $('#' + id.toString());
        wonGrid.addClass('won-grid-' + miniBoard.winner());
      }

      if (game.board.validGrids.indexOf(gridPos[0] + ',' + gridPos[1]) === -1) {
        $miniSquares.removeClass('playable').removeClass('hoverable');
      } else {
        $miniSquares.addClass('playable').addClass('hoverable');
      }
    });

    $('.clicked').removeClass('playable');
  }

  function showEndGameView(game) {
    var mark = game.currentPlayer.mark;

    if (game.isOver()) {
      if (game.winner()) {
        $('.playable').removeClass('playable');
        showMessage("Congratulations, " + mark.toUpperCase() + " wins!");
      } else {
        showMessage("Oops... Tied?!");
      }

      $(".square").removeClass("hoverable");
    }
  }

  function showMessage(msg) {
    $("#message").html(msg);
  }

  function clearMessage() {
    $("#message").html("");
  }

  function setupBoard($main, game) {
    var $elem = $('<ul id="board"></ul>');

    $main.append($elem);
    var toInsert = "";
    for (var i = 0; i < 9; i++) {
      toInsert = toInsert + "<li class='square grid' id=" + i + ">" + setupMiniBoard(i) + "</li>";
    }
    $elem.html(toInsert);

    // $('#next-move').html(game.nextPlayer.mark);
  }

  function setupMiniBoard(id) {
    var toInsert = "";
    for (var i = 0; i < 9; i++) {
      toInsert = toInsert + "<li class='mini-square grid hoverable' id=mini-" + id + "-" + i + "></li>";
    }

    return '<ul class="mini-grid">' + toInsert + '</ul>';
  }

  function resetView() {
    $('.won-grid-o').removeClass('won-grid-o');
    $('.won-grid-x').removeClass('won-grid-x');
    $('.mini-square')
      .removeClass('clicked')
      .addClass('hoverable')
      .addClass('playable')
      .children()
      .empty();
  }

  function bindClick(game) {
    $('#board').on('click', function (e) {
      var elId = e.target.id;
      makeMove(elId, game);
    });
  }
})();
