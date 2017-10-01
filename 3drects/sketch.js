var diff;
var xOffset, yOffset;
var xPointOffset, yPointOffset;
var colors;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background('black');
  diff = 100;
  xOffset = 0;
  yOffset = 0;
  xPointOffset = 0;
  yPointOffset = 0;

  colors = {};
  var red = 50;
  var green = 100;
  var blue = 255;
  for (var i = 0; i < 100; i++) {
    colors[i] = {
      "red": red,
      "green": green,
      "blue": blue
    }

    red /= 1.05;
    green /= 1.05;
    blue /= 1.05;
  }
}

function draw() {
  background(colors[0].red, colors[0].green, colors[0].blue);
  noStroke();

  if (mouseIsPressed) {
    xPointOffset = (mouseX - (window.innerWidth / 2.0)) / 10;
    yPointOffset = (mouseY - (window.innerHeight / 2.0)) / 10;
  } else {
    xOffset = (mouseX - (window.innerWidth / 2.0)) / 10;
    yOffset = (mouseY - (window.innerHeight / 2.0)) / 10;
  }

  for (var x = 0; x < 10; x++) {
    var offsetX = (x * (window.innerWidth / 10));
    for (var y = 0; y < 10; y++) {
      var offsetY = (y * (window.innerHeight / 10));

      offsetX += (xOffset * y);
      offsetY += (yOffset * x);

      var color = colors[x * y];
      fill(color.red, color.green, color.blue);
      rect(offsetX, offsetY, offsetX + window.innerWidth / 10, offsetY + window.innerHeight / 10);
    }
  }
}
