var diff;
var xOffset, yOffset;
var gRed, gGreen, gBlue;

var objects;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
	gRed = random(200, 255);
  gGreen = random(200, 255);
  gBlue = random(200, 255);
	background(gRed, gGreen, gBlue);

	objects = [];
	for (var i = 0; i < 50; i++) {
		objects[i] = {};
		objects[i].x = (Math.random() * (window.innerWidth - 100)) + 50;
	}
}

function draw() {
	background(gRed, gGreen, gBlue);
  stroke(gRed - 40, gGreen - 40, gBlue - 40, 150);
	strokeWeight(50);
	fill(0, 0, 0, 0);
	for (var i = 0; i < objects.length; i++) {
		var object = objects[i];
		var x = (Math.sin(frameCount / (100000 / i) + object.x) * (window.innerWidth - 100)) + 50;
		x += mouseX / (i * 2);
		line(x, 0, x + ((i % 2 == 0 ? 4 : -4) * window.innerWidth / objects.length), window.innerHeight);
	}
}
