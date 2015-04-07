/**
 * Nat Welch (@icco) 2015
 *
 * From https://en.wikipedia.org/wiki/Conway's_Game_of_Life 2015-04-06:
 *
 * The universe of the Game of Life is an infinite two-dimensional orthogonal
 * grid of square cells, each of which is in one of two possible states, alive
 * or dead. Every cell interacts with its eight neighbours, which are the cells
 * that are horizontally, vertically, or diagonally adjacent. At each step in
 * time, the following transitions occur:
 *
 *  - Any live cell with fewer than two live neighbours dies, as if caused by
 *  under-population.
 *  - Any live cell with two or three live neighbours lives on to the next
 *  generation.
 *  - Any live cell with more than three live neighbours dies, as if by
 *  overcrowding.
 *  - Any dead cell with exactly three live neighbours becomes a live cell, as
 *  if by reproduction.
 *
 * The initial pattern constitutes the seed of the system. The first generation
 * is created by applying the above rules simultaneously to every cell in the
 * seed—births and deaths occur simultaneously, and the discrete moment at
 * which this happens is sometimes called a tick (in other words, each
 * generation is a pure function of the preceding one). The rules continue to
 * be applied repeatedly to create further generations.
 */


(function() {
  var canvas = document.getElementById('tutorial');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect (10, 10, 55, 50);

    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect (30, 30, 55, 50);
  }
})();
