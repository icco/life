// Nat Welch (@icco) 2015
//
// From https://en.wikipedia.org/wiki/Conway's_Game_of_Life 2015-04-06:
//
// The universe of the Game of Life is an infinite two-dimensional orthogonal
// grid of square cells, each of which is in one of two possible states, alive
// or dead. Every cell interacts with its eight neighbours, which are the cells
// that are horizontally, vertically, or diagonally adjacent. At each step in
// time, the following transitions occur:
//
//  - Any live cell with fewer than two live neighbours dies, as if caused by
//  under-population.
//  - Any live cell with two or three live neighbours lives on to the next
//  generation.
//  - Any live cell with more than three live neighbours dies, as if by
//  overcrowding.
//  - Any dead cell with exactly three live neighbours becomes a live cell, as
//  if by reproduction.
//
// The initial pattern constitutes the seed of the system. The first generation
// is created by applying the above rules simultaneously to every cell in the
// seed—births and deaths occur simultaneously, and the discrete moment at
// which this happens is sometimes called a tick (in other words, each
// generation is a pure function of the preceding one). The rules continue to
// be applied repeatedly to create further generations.

var i = 0;

(function() {
  // Creates a function for getting a value out of the map.
  get_function = function(x, y) {
    if (Array.isArray(this[x])) {
      return !!this[x][y];
    }

    return false;
  }

  // Defines a function for assigning a value in the map.
  set_function = function(x, y, value) {
    if (!Array.isArray(this[x])) {
      this[x] = new Array();
    }

    // Whatever value is passed in, we turn it into a boolean.
    // TODO(icco): Unset all non-true values.
    this[x][y] = !!value;
  }

  // The actual draw loop. This is called approximately 60 times per second.
  function draw(gm) {
    i += 1;
    var lastRound = gm.slice(0);

    gm['set'] = set_function
    gm['get'] = get_function

    lastRound['set'] = set_function
    lastRound['get'] = get_function

    var canvas = document.getElementById("tutorial");
    var blockW = 10;
    var blockH = 10;

    // This if statement makes sure our browser supports the canvase API.
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      var totalW = canvas.clientWidth;
      var totalH = canvas.clientHeight;

      // Prepare to draw the grid.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "#1e1e1e";
      ctx.lineWidth = 1;
      ctx.beginPath();

      var x = 0;
      var y = 0;
      for (var i = 0; i < Math.round(totalW / blockW); i++) {
        x = i * blockW;
        y = 0;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + totalH);
      }

      for (var j = 0; j < Math.round(totalH / blockH); j++) {
        x = 0;
        y = j * blockH;

        ctx.moveTo(x, y);
        ctx.lineTo(x + totalW, y);
      }

      // Grid is not drawn until this line happens.
      ctx.stroke();

      // Go through the gm and draw the current state.
      for (var x in gm) {
        if (Array.isArray(gm[x])) {
          for (var y in gm[x]) {
            if (gm.get(x, y)) {
              ctx.fillRect(x * blockW, y * blockH, blockW, blockH);
            }
          }
        }
      }

      // Now actually follow the game rules for the next drawing.
      for (x = 0; x < totalW / blockW; x++) {
        for (y = 0; y < totalH / blockH; y++) {
          var neighbors = 0;
          neighbors += Number(lastRound.get(x - 1, y - 1));
          neighbors += Number(lastRound.get(x, y - 1));
          neighbors += Number(lastRound.get(x + 1, y - 1));
          neighbors += Number(lastRound.get(x + 1, y));
          neighbors += Number(lastRound.get(x + 1, y + 1));
          neighbors += Number(lastRound.get(x, y + 1));
          neighbors += Number(lastRound.get(x - 1, y + 1));
          neighbors += Number(lastRound.get(x - 1, y));

          if (neighbors > 3) {
            console.log(i, "neighbors > 3 killing", x, y);
            gm.set(x, y, false);
          } else if (neighbors < 2) {
            if (lastRound.get(x, y)) {
              console.log(i, "neighbors < 2 killing", x, y);
            }
            gm.set(x, y, false);
          } else if (neighbors == 3) {
            console.log(i, "neighbors = 3 growing", x, y);
            gm.set(x, y, true);
          }
        }
      }

      // Ask the browser to rerun this function again when it next gets a
      // chance.
      window.requestAnimationFrame(draw);
    }
  }

  // Initialization Code
  var gamemap = new Array();
  gamemap['set'] = set_function
  gamemap['get'] = get_function
  gamemap.set(10, 10, true);
  gamemap.set(10, 11, true);
  gamemap.set(10, 12, true);

  window.requestAnimationFrame(draw(gamemap));
})();
