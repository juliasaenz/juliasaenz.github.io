import gab.opencv.*;
import processing.video.*;

OpenCV opencv;
Capture cam;

void setup() {
  size(640, 480);
  
  opencv = new OpenCV(this, 640, 480);  
  
  //inicializo camara elegida
  cam = new Capture(this, "pipeline:autovideosrc");
  cam.start();
}

void draw() {
  if (cam.available() == true) {
    cam.read();
  }
  opencv.loadImage(cam);
  PVector loc = opencv.min();
  image(cam, 0, 0);
  
  stroke(255, 0, 0);
  strokeWeight(4);
  noFill();
  ellipse(loc.x, loc.y, 10, 10);
}
