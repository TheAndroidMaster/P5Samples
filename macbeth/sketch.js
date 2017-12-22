var dagger;
var capture;
var graphics;
var cRotationX = 0;
var cRotationY = 0;
var cRotationZ = 0;
var cTranslateX = 0;
var cTranslateY = 0;
var cTranslateZ = 0;

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
}

function draw() {
  graphics.resetMatrix();
  graphics.background(0, 0, 0, 0);
  background(200);
  image(capture, 0, 0, windowWidth, windowHeight);
  background(200, 200, 200, 100);

	cTranslateX = ((accelerationX * 10) + (cTranslateX * 5)) / 6;
	cTranslateY = ((accelerationY * 10) + (cTranslateY * 5)) / 6;
	cTranslateZ = ((accelerationZ * 10) + (cTranslateZ * 5)) / 6;

  if (rotationX > 0 || rotationY > 0 || rotationZ > 0) {
		var tempRotationX = -radians(rotationX);
		var tempRotationY = -radians(rotationY);
		var tempRotationZ = -radians(rotationZ);

    if (Math.abs(Math.sin(cRotationX) - Math.sin(tempRotationX)) < 0.1)
			cRotationX = tempRotationX;
		else cRotationX = (cRotationX - radians(rotationX)) / 2;

		if (Math.abs(Math.sin(cRotationY) - Math.sin(tempRotationY)) < 0.1)
			cRotationY = tempRotationY;
		else cRotationY = (cRotationY - radians(rotationY)) / 2;

		if (Math.abs(Math.sin(cRotationZ) - Math.sin(tempRotationZ)) < 0.1)
			cRotationZ = tempRotationZ;
		else cRotationZ = (cRotationZ - radians(rotationZ)) / 2;
  } else {
    cRotationX = (cRotationX + (Math.PI * -(mouseY / windowHeight))) / 2;
    cRotationZ = (cRotationZ + (Math.PI * (0.5 - (mouseX / windowWidth)))) / 2;
  }

	cTranslateX += 10 * Math.cos((Math.PI / 2) - cRotationZ);
	cTranslateY += 10 * Math.sin((Math.PI / 2) - cRotationZ);
	if (cRotationX < -Math.PI / 2)
		cTranslateY += 10 * Math.sin((Math.PI / 2) + cRotationX) - 10;
	else cTranslateY += 10 * Math.sin(cRotationX + (Math.PI / 2)) - 10;

	if (windowWidth < 1000) {
		graphics.translate(cTranslateX + 75 - (windowWidth / 2), cTranslateY + 75 - (windowHeight / 2));
	} else graphics.translate(cTranslateX, cTranslateY);
	graphics.scale(cTranslateZ > 0 ? Math.min(3, 1 + (cTranslateZ / 10000)) : Math.max(1 - Math.abs(cTranslateZ / 50000), 0));

	graphics.rotateX(cRotationX);
	graphics.rotateY(cRotationY);
	graphics.rotateZ(cRotationZ);

  graphics.pointLight(200, 20, 20, 0, windowHeight / 2, 0);
	var alphaX = frameCount / 150;
  graphics.ambientMaterial(20, 20, 20, (Math.pow(Math.sin(alphaX), 2) - Math.cos(alphaX + 4) + Math.atan(Math.pow(alphaX, 2))) * 60);
  graphics.model(dagger);

  image(graphics, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  graphics.resizeCanvas(windowWidth, windowHeight);
}
