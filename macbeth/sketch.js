var dagger;
var capture;
var graphics;

function setup() {
  createCanvas(windowWidth, windowHeight);
  graphics = createGraphics(windowWidth, windowHeight, WEBGL);
  dagger = loadModel("dagger.obj", true);
  //capture = createCapture(VIDEO);
  //capture.size(windowWidth, windowHeight);
}

function draw() {
  graphics.resetMatrix();
  graphics.background(0, 0, 0, 0);
  background(200);
  //image(capture, 0, 0, windowWidth, windowHeight);

  graphics.translate(-windowWidth / 8, -windowHeight / 8);
  if (rotationX > 0 || rotationY > 0 || rotationZ > 0) {
    graphics.rotateX(-radians(rotationX));
    graphics.rotateY(-radians(rotationY));
    graphics.rotateZ(-radians(rotationZ));
  } else {
    graphics.rotateX(Math.PI * -(mouseY / windowHeight));
    graphics.rotateZ(Math.PI * (0.5 - (mouseX / windowWidth)));
  }

  //graphics.translate(-windowWidth / 2, -windowHeight / 2, -0.5);

  graphics.pointLight(100, 100, 100, 0, windowHeight / 2, 0);
  graphics.ambientMaterial(50);
  graphics.model(dagger);

  image(graphics, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  graphics.resizeCanvas(windowWidth, windowHeight);
}
