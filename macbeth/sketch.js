var dagger;
var capture;
var graphics;
var cRotationX = 0;
var cRotationY = 0;
var cRotationZ = 0;
var translateX = 0;
var translateY = 0;
var translateZ = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  graphics = createGraphics(windowWidth, windowHeight, WEBGL);
  dagger = loadModel("dagger.obj", true);
  capture = createCapture({
    audio: false,
    video: {
      facingMode: "environment",
			width: windowWidth,
			height: windowHeight
    }
  });
  capture.size(windowWidth, windowHeight);
}

function draw() {
  graphics.resetMatrix();
  graphics.background(0, 0, 0, 0);
  background(200);
  image(capture, 0, 0, windowWidth, windowHeight);

	translateX = ((accelerationX * 10) + (translateX * 5) / 6;
	translateY = ((accelerationY * 10) + (translateY * 5) / 6;
	translateZ = ((accelerationZ * 10) + (translateZ * 5) / 6;
	if (windowWidth < 1000) {
		graphics.translate(translateX + 75 - (windowWidth / 2), translateY + 75 - (windowHeight / 2));
	} else graphics.translate(translateX, translateY);
	graphics.scale(translateZ > 0 ? Math.min(3, 1 + (translateZ / 10000)) : Math.max(1 - Math.abs(translateZ / 50000), 0));

  if (rotationX > 0 || rotationY > 0 || rotationZ > 0) {
    cRotationX = (cRotationX - radians(rotationX)) / 2;
    cRotationY = (cRotationY - radians(rotationY)) / 2;
    cRotationZ = (cRotationZ - radians(rotationZ)) / 2;
  } else {
    cRotationX = (cRotationX + (Math.PI * -(mouseY / windowHeight))) / 2;
    cRotationZ = (cRotationZ + (Math.PI * (0.5 - (mouseX / windowWidth)))) / 2;
  }

	graphics.rotateX(cRotationX);
	graphics.rotateY(cRotationY);
	graphics.rotateZ(cRotationZ);

  graphics.pointLight(100, 100, 100, 0, windowHeight / 2, 0);
  graphics.ambientMaterial(50);
  graphics.model(dagger);

  image(graphics, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  graphics.resizeCanvas(windowWidth, windowHeight);
}
