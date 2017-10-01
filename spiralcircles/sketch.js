var diff;
var xOffset, yOffset;
var aOffset;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background('black');
  diff = 100;
  xOffset = 0;
  yOffset = 0;
  aOffset = 0;
}

function draw() {

  xOffset = (((mouseX - (window.innerWidth / 2.0)) / 10000) + (xOffset * 5)) / 6;
  yOffset = (((mouseY - (window.innerHeight / 2.0)) / 10000) + (yOffset * 5)) / 6;

  var aRed = Math.sin(.05 * aOffset) * 100 + 100;
  var aGreen = Math.sin(.05 * aOffset + 2) * 100 + 100;
  var aBlue = Math.sin(.05 * aOffset + 4) * 100 + 100;

  background(aRed, aGreen, aBlue);
  noStroke();

  for (var r = Math.max(window.innerWidth / 2, window.innerHeight / 2), a = 0; r > 0; r -= 3) {
    var x = window.innerWidth / 2, y = window.innerHeight / 2;
    x += Math.cos((a + (aOffset * a / 1000)) * Math.PI / 180) * r;
    y += Math.sin((a + (aOffset * a / 1000)) * Math.PI / 180) * r;

    fill(aRed, aGreen, aBlue);
    ellipse(x + (xOffset * a), y + (yOffset * a), 100, 100);
    a += 10;

    aRed *= 1.005;
    aGreen *= 1.005;
    aBlue *= 1.005;
  }

  aOffset++;
}
