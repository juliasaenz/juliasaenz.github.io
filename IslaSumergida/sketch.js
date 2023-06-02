const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

let mundo;
let estado = "juego";
let fuente; 

let objetos = [];
let cajas = [];
let nombres = ["objeto", "otro1", "otro2", "otro3", "otro4"];
let imgTupper;

function preload(){
  imgTupper = loadImage('./data/tupper01.png');
  fuente = loadFont('./data/Rajdhani-Medium.ttf')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  mundo = new VerletPhysics2D(); // mundo
  mundo.addBehavior(new GravityBehavior(new Vec2D(0.0009, 0.0001)));
  mundo.setWorldBounds(new Rect(0, 0, width, height)); // bordes mundo
  //mundo.setDrag(0);

  for (let i = 0; i < 5; i++) {
    objetos.push(new Objeto());
    cajas.push(new Caja(i * 210 + 100, height * 0.85, 80, nombres[i]));
  }

  objetos.forEach((obj) => {
    obj.armar(mundo);
    obj.cargarImagen(imgTupper);
  });
  cajas.forEach((caja) => {
    caja.armar(mundo);
  });

  //this.setupJuego();
}

function draw() {
  translate(-width*.5, -height*.5, 0)
  //this.drawJuego();
  background(255);
  mundo.update();

  cajas.forEach((caja) => {
    caja.dibujar();
    objetos = caja.colisionObjeto(objetos);
  });

  objetos.forEach((obj) => {
    obj.dibujar();
  });
}

function mousePressed() {
  //this.mousePressedJuego();

  objetos.forEach((obj) => {
    obj.seleccionar();
  });
}

function mouseReleased() {
  //this.mouseReleasedJuego();
}

function mouseDragged() {
  objetos.forEach((obj) => {
    obj.arrastrar();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  mundo.setWorldBounds(new Rect(0, 0, width, height));
}

/// ESTADO -- JUEGO ///
function setupJuego() {
  /* Las cosas que necesita para funcionar el juego */

  background(200);

  for (let i = 0; i < 5; i++) {
    objetos.push(new Soga());
  }
  for (let i = 0; i < 2; i++) {
    cajas.push(new Caja(width / 9, height - height / 6, 100, 100, "objeto"));
    cajas.push(
      new Caja((width / 9) * 3, height - height / 6, 100, 100, "soga")
    );
  }
  // let gravity = new GravityBehavior(new Vec2D(0, .5));
  // mundo.addBehavior(gravity)
}

function drawJuego() {
  /* Todo lo de draw de juego */
  mundo.update();
  push();

  cajas.forEach((caja) => {
    objetos = caja.colisionObjeto(objetos);
    caja.dibujar();
  });

  objetos.forEach((objeto) => {
    objeto.dibujar();
  });

  pop();
}

function mousePressedJuego() {
  objetos.forEach((objeto) => {
    objeto.seleccionar();
  });
}

function mouseReleasedJuego() {
  objetos.forEach((objeto) => {
    objeto.deseleccionar();
  });
}
