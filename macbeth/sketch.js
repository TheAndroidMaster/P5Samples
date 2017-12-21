var dagger;
var capture;
var graphics;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  graphics = createGraphics(window.innerWidth, window.innerHeight, WEBGL);
  dagger = loadModel("dagger.obj", true);
  capture = createCapture(VIDEO);
  capture.size(window.innerWidth, window.innerHeight);
}

function draw() {
  graphics.resetMatrix();
  graphics.background(0, 0, 0, 0);
  background(200);
  image(capture, 0, 0, window.innerWidth, window.innerHeight);

  if (rotationX > 0 || rotationY > 0 || rotationZ > 0) {
    graphics.rotateX(-radians(rotationX));
    graphics.rotateY(-radians(rotationY));
    graphics.rotateZ(-radians(rotationZ));
  } else {
    graphics.rotateX(Math.PI * -(mouseY / window.innerHeight));
    graphics.rotateZ(Math.PI * (0.5 - (mouseX / window.innerWidth)));
  }

  graphics.pointLight(100, 100, 100, 0, window.innerHeight / 2, 0);
  graphics.ambientMaterial(50);
  graphics.model(dagger);

  image(graphics, 0, 0);
}
