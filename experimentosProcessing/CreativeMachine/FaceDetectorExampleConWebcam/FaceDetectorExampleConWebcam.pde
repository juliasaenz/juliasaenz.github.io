import ml.*;
import processing.video.*;

FaceDetector detector;
Capture cam;
PImage img;
MLFace[] faces;

void setup() {
  size(640, 480);
  background(255);

  // load face detector model
  detector = new FaceDetector(this);

  // load image
  img = loadImage("friends.jpg");

  //inicializo camara elegida
  cam = new Capture(this, "pipeline:autovideosrc");
  cam.start();

  // detect faces
  faces = detector.predict(img);
}

void draw() {
  // draw faces
  if (cam.available() == true) {
    cam.read();
  }
  faces = detector.predict(cam);
  image(cam, 0, 0);
  for (int i = 0; i < faces.length; i++) {
    // get each face
    MLFace face = faces[i];
    // draw bounding box
    noFill();
    stroke(240, 121, 81);
    rect(face.getX(), face.getY(), face.getWidth(), face.getHeight());
    // draw each facial landmark
    noStroke();
    fill(250, 255, 112);
    for (int j = 0; j < face.getKeyPoints().size(); j++) {
      MLKeyPoint keyPoint = face.getKeyPoints().get(j);
      circle(keyPoint.getX(), keyPoint.getY(), 5);
    }
  }
}
