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

    ctx.beginPath();
    ctx.moveTo(75,50);
    ctx.lineTo(100,75);
    ctx.lineTo(100,25);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(75,75,50,0,Math.PI*2,true); // Outer circle
    ctx.moveTo(110,75);
    ctx.arc(75,75,35,0,Math.PI,false);  // Mouth (clockwise)
    ctx.moveTo(65,65);
    ctx.arc(60,65,5,0,Math.PI*2,true);  // Left eye
    ctx.moveTo(95,65);
    ctx.arc(90,65,5,0,Math.PI*2,true);  // Right eye
    ctx.stroke();

    // Filled triangle
    ctx.beginPath();
    ctx.moveTo(25,25);
    ctx.lineTo(105,25);
    ctx.lineTo(25,105);
    ctx.fill();

    // Stroked triangle
    ctx.beginPath();
    ctx.moveTo(125,125);
    ctx.lineTo(125,45);
    ctx.lineTo(45,125);
    ctx.closePath();
    ctx.stroke();

    for (var i=0;i<4;i++) {
      for (var j=0;j<3;j++) {
        ctx.beginPath();
        var x = 200+j*50; // x coordinate
        var y = 200+i*50; // y coordinate
        var radius = 20; // Arc radius
        var startAngle = 0; // Starting point on circle
        var endAngle = Math.PI+(Math.PI*j)/2; // End point on circle
        var anticlockwise = i%2==0 ? false : true; // clockwise or anticlockwise

        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        if (i>1) {
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }
    }

    var rectangle = new Path2D();
    rectangle.rect(200, 200, 50, 50);

    var circle = new Path2D();
    circle.moveTo(125, 350);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.stroke(rectangle);
    ctx.fill(circle);

    var p = new Path2D("M10 10 h 80 v 80 h -80 Z");

  }
})();
