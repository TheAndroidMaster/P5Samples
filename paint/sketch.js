var diff;
var xOffset, yOffset;
var aOffset;
var points;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background('black');
  diff = 100;
  xOffset = 0;
  yOffset = 0;
  aOffset = 0;
  points = [];
}

function draw() {
  if (mouseIsPressed && mouseButton == LEFT) {
    points[points.length] = {
      "x": mouseX,
      "y": mouseY
    };
  }

  background(0, 0, 0);
  xOffset = (((mouseX - (window.innerWidth / 2.0)) / 1000) + (xOffset * 5)) / 6;
  yOffset = (((mouseY - (window.innerHeight / 2.0)) / 1000) + (yOffset * 5)) / 6;

  var aRed = Math.sin(.05 * frameCount) * 100 + 100;
  var aGreen = Math.sin(.05 * frameCount + 2) * 100 + 100;
  var aBlue = Math.sin(.05 * frameCount + 4) * 100 + 100;

  noStroke();

  var a = 0;
  for (var i = 0, a = 0; i < points.length; i++) {
    if (points.length - i < 255) {
      fill(color(aRed, aGreen, aBlue, 255.0 - (points.length - i)));
      ellipse(points[i].x + (xOffset * a), points[i].y + (yOffset * a), 10, 10);
      a++;

      aRed *= 1.005;
      aGreen *= 1.005;
      aBlue *= 1.005;
    }
  }

  aOffset++;
}

function mouseClicked() {
  return false;
}
