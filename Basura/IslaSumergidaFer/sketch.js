// Coding Train / Daniel Shiffman

const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

let physics;


let debug = false;

let estrellas = [];
let blobs = [];

const starCount = 19;

function setup() {
  createCanvas(windowWidth, windowHeight);

  physics = new VerletPhysics2D();
  physics.setDrag(0.0125);

  let bounds = new Rect(0, 0, width, height);
  physics.setWorldBounds(bounds);
  
  // let gravity = new GravityBehavior(new Vec2D(0, .5));
  // physics.addBehavior(gravity)
  
  let maxSize = width> height ? width : height;
  maxSize *= 0.15
  
  for (let i = 0; i< starCount; i++){
    let star = new Star(random(width), random(height), random(30, maxSize), 10);
    estrellas.push(star);
    let blob = new Blob(random(width), random(height), random(30,maxSize), 24)
    blobs.push( blob )
  }
}

function draw() {
  background(255);
  physics.update();
  push();
  
  
  
  for (let i = 0; i< starCount; i++){
    fill(250, 112, 12);
    estrellas[i].dibujar();
    fill(250, 144, 12);
    blobs[i].dibujar();
  
    if(debug){
      estrellas[i].debug();
      blobs[i].debug();
    }
  }
  
  pop();
}

function keyPressed() {
  debug = !debug;
}

function mousePressed(){
  for (let i = 0; i< starCount; i++){
    estrellas[i].seleccionar();
    blobs[i].seleccionar();
  }
  //fullscreen(true)
  physics.setDrag(0.0125);
}

function mouseReleased(){
  physics.setDrag(0.2);
}

function mouseDragged() {
  for (let i = 0; i< starCount; i++){
    estrellas[i].drag();
    blobs[i].drag();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  let bounds = new Rect(0, 0, width, height);
  physics.setWorldBounds(bounds);
}
