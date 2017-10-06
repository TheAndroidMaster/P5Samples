var diff;
var xOffset, yOffset;
var aOffset;
var gRed, gGreen, gBlue;

var objects;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
	gRed = random(100, 200);
  gGreen = random(100, 200);
  gBlue = random(100, 200);
	background(gRed, gGreen, gBlue);

	objects = [];
	for (var i = 0; i < 50; i++) {
		objects[i] = {};
		objects[i].x = (Math.random() * (window.innerWidth - 100)) + 50;
		objects[i].y = (Math.random() * (window.innerHeight - 100)) + 50;
	}
}

function draw() {
	background(gRed, gGreen, gBlue);
  stroke(gRed + 40, gGreen + 40, gBlue + 40, 150);
	strokeWeight(20);
	fill(0, 0, 0, 0);
	for (var i = 0; i < objects.length; i++) {
		var object = objects[i];
		ellipse(object.x, object.y, 100, 100);

		var vX = 0, vY = 0;
		for (var i2 = 0; i2 < objects.length; i2++) {
			vX += (object.x - objects[i2].x) / window.innerWidth;
			vY += (object.y - objects[i2].y) / window.innerHeight;
		}

		vX -= objects.length * object.x / window.innerWidth;
		vX -= objects.length * (object.x - window.innerWidth) / window.innerWidth;
		vY -= objects.length * object.y / window.innerHeight;
		vY -= objects.length * (object.y - window.innerHeight) / window.innerHeight;

		vX -= (i + 1) * mouseX / window.innerWidth;
		vY -= (i + 1) * mouseY / window.innerHeight;

		object.x += vX / 2;
		object.y += vY / 2;
	}
}
