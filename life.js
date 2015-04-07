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
  function draw() {
    console.log("Draw!");
    var canvas = document.getElementById("tutorial");
    var blockW = 10;
    var blockH = 10;

    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      var totalW = canvas.clientWidth;
      var totalH = canvas.clientHeight;

      // Set up grid
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

      ctx.stroke();

      // Draw a box
      x = Math.floor(Math.random() * (totalW/blockW)) * blockW;
      y = Math.floor(Math.random() * (totalH/blockH)) * blockH;
      console.log(x, y);
      ctx.fillRect(x, y, blockW, blockH);

      window.requestAnimationFrame(draw);
    }
  }

  window.requestAnimationFrame(draw);
})();
