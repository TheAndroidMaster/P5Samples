var diff;
var xOffset, yOffset;
var gRed, gGreen, gBlue;
var cRed, cGreen, cBlue;
var cRedD, cGreenD, cBlueD;

var objects;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
	gRed = random(200, 255);
  gGreen = random(200, 255);
  gBlue = random(200, 255);
  cRed = 255;
  cGreen = 255;
  cBlue = 255;
  cRedD = 255;
  cGreenD = 255;
  cBlueD = 255;
	background(gRed, gGreen, gBlue);

	objects = [];
	for (var i = 0; i < 50; i++) {
		objects[i] = {};
		objects[i].x = (Math.random() * (window.innerWidth - 100)) + 50;
	}
}

function draw() {
  cRed = ((cRed * 99) + gRed) / 100;
  cGreen = ((cGreen * 99) + gGreen) / 100;
  cBlue = ((cBlue * 99) + gBlue) / 100;
  cRedD = ((cRedD * 99) + gRed - 40) / 100;
  cGreenD = ((cGreenD * 99) + gGreen - 40) / 100;
  cBlueD = ((cBlueD * 99) + gBlue - 40) / 100;

	background(cRed, cBlue, cBlue);
  stroke(cRedD, cBlueD, cBlueD, 150);
	strokeWeight(50);
	fill(0, 0, 0, 0);
	for (var i = 0; i < objects.length; i++) {
		var object = objects[i];
		var x = (Math.sin(frameCount / (100000 / i) + object.x) * (window.innerWidth - 100)) + 50;
		x += mouseX / (i * 2);
		line(x, 0, x + ((i % 2 == 0 ? 4 : -4) * window.innerWidth / objects.length), window.innerHeight);
	}
}
