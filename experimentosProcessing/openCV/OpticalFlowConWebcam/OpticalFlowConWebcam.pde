import gab.opencv.*;
import processing.video.*;

OpenCV opencv;
Capture cam;

void setup() {

  size(1280, 480);

  opencv = new OpenCV(this, 640, 480);

  //inicializo camara elegida
  cam = new Capture(this, "pipeline:autovideosrc");
  cam.start();
}

void draw() {
  background(0);
  if (cam.available() == true) {
    cam.read();
  }
  opencv.loadImage(cam);
  opencv.calculateOpticalFlow();

  image(cam, 0, 0);
  translate(cam.width, 0);
  stroke(255, 0, 0);
  opencv.drawOpticalFlow();

  PVector aveFlow = opencv.getAverageFlow();
  int flowScale = 50;

  stroke(255);
  strokeWeight(2);
  line(cam.width/2, cam.height/2, cam.width/2 + aveFlow.x*flowScale, cam.height/2 + aveFlow.y*flowScale);
}
