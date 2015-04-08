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

(function() {
  // Initializes the game map.
  var gamemap = new Array();

  // Creates a function for getting a value out of the map. This will later be
  // added to the Array instances that are 2D arrays for storing game state.
  get_function = function(x, y) {
    if (Array.isArray(this[x])) {
      // !! is a shortcut for casting to a boolean. This is particularly useful
      // so that we always return a value that we can use in addition
      // (undefined is the particular value we don't want).
      return !!this[x][y];
    }

    return false;
  }
  gamemap['get'] = get_function

  // Defines a function for assigning a value in the map. This will later be
  // added to the Array instances that are 2D arrays for storing game state.
  set_function = function(x, y, value) {
    if (!Array.isArray(this[x])) {
      this[x] = new Array();
    }

    // Whatever value is passed in, we turn it into a boolean.
    //
    // TODO(icco): Unset all non-true values.
    this[x][y] = !!value;
  }
  gamemap['set'] = set_function

  // The actual draw loop. This is called approximately 60 times per second.
  function draw(t) {

    // Deep copy over gamemap into the new map.
    var nextRound = Array()
    nextRound['set'] = set_function
    nextRound['get'] = get_function
    for (var x in gamemap) {
      for (var y in gamemap[x]) {
        nextRound.set(x, y, gamemap.get(x,y))
      }
    }

    // Define the canvas and environment.
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

      // Go through the gamemap and draw the current state.
      for (var x in gamemap) {
        if (Array.isArray(gamemap[x])) {
          for (var y in gamemap[x]) {
            if (gamemap.get(x, y)) {
              ctx.fillRect(x * blockW, y * blockH, blockW, blockH);
            }
          }
        }
      }

      // Now actually follow the game rules for the next drawing.
      for (x = 0; x <= totalW / blockW; x++) {
        for (y = 0; y <= totalH / blockH; y++) {
          var neighbors = 0;
          neighbors += Number(gamemap.get(x - 1, y - 1));
          neighbors += Number(gamemap.get(x, y - 1));
          neighbors += Number(gamemap.get(x + 1, y - 1));
          neighbors += Number(gamemap.get(x + 1, y));
          neighbors += Number(gamemap.get(x + 1, y + 1));
          neighbors += Number(gamemap.get(x, y + 1));
          neighbors += Number(gamemap.get(x - 1, y + 1));
          neighbors += Number(gamemap.get(x - 1, y));

          // This could be simpler, but writing it out as a direct copy of the
          // wikipedia version of the rules made this easier for me to debug
          // initially.
          if (gamemap.get(x, y)) {
            if (neighbors < 2) {
              nextRound.set(x, y, false);
              console.log(x, y, neighbors, "die");
            }

            if (neighbors == 3 || neighbors == 2) {
              nextRound.set(x, y, true);
              console.log(x, y, neighbors, "live");
            }

            if (neighbors > 3) {
              nextRound.set(x, y, false);
              console.log(x, y, neighbors, "die");
            }
          } else {
            if (neighbors == 3) {
              nextRound.set(x, y, true);
              console.log(x, y, neighbors, "grow");
            }
          }
        }
      }

      // Now just point gamemap at our new state.
      gamemap = nextRound;
    }
  }

  function main(tFrame) {
    // Ask the browser to rerun this function again when it next gets a chance. Also save a hanlder called stopMain incase we want to stop the main loop.
    stopMain = window.requestAnimationFrame(main);

    // Call draw with timestamp.
    //
    // TODO(icco): Split into update and draw.
    draw(tFrame);
  }

  // Initialization which draws the first world.

  /*
  // Oscilation
  gamemap.set(4, 2, true);
  gamemap.set(4, 3, true);
  gamemap.set(4, 4, true);
  */

  // Acorn
  gamemap.set(40, 30, true);
  gamemap.set(41, 30, true);
  gamemap.set(41, 28, true);
  gamemap.set(43, 29, true);
  gamemap.set(44, 30, true);
  gamemap.set(45, 30, true);
  gamemap.set(46, 30, true);

  main(0); // Start the animation cycle
})();
