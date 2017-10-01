var diff;
var xOffset, yOffset;
var xPointOffset, yPointOffset;
var colors;
var rects;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background('black');
  diff = 100;
  xOffset = 0;
  yOffset = 0;
  xPointOffset = 0;
  yPointOffset = 0;
  rects = 10;

  colors = {};
  var red = 50;
  var green = 100;
  var blue = 255;
  for (var i = 0; i < rects * rects; i++) {
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
    xPointOffset = (mouseX - (window.innerWidth / 2.0)) / rects;
    yPointOffset = (mouseY - (window.innerHeight / 2.0)) / rects;
  } else {
    xOffset = (mouseX - (window.innerWidth / 2.0)) / rects;
    yOffset = (mouseY - (window.innerHeight / 2.0)) / rects;
  }

  for (var x = 0; x < rects; x++) {
    var offsetX = (x * (window.innerWidth / rects));
    for (var y = 0; y < 10; y++) {
      var offsetY = (y * (window.innerHeight / rects));

      offsetX += (xOffset * y);
      offsetY += (yOffset * x);

      var color = colors[x * y];
      fill(color.red, color.green, color.blue);
      rect(offsetX, offsetY, offsetX + window.innerWidth / rects, offsetY + window.innerHeight / rects);
    }
  }
}

function mouseClicked() {
  var red = Math.random() * 245 + 10;
  var green = Math.random() * 245 + 10;
  var blue = Math.random() * 245 + 10;
  for (var i = 0; i < rects * rects; i++) {
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
