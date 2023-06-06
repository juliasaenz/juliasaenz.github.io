const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

let mundo;
let estado = "juego";
let fuente;

let gravedad;
let objetos = [];
let bandejas = [];
let imgTupper,
  imgBandeja,
  fondoBarco,
  imgSoga,
  imgPescado,
  imgVieira,
  imgLangostilla,
  imgCentolla;

let carpetas = [];
let partesCentolla = [];

let prevMouseX;
let prevMouseY;
let prevTime;

function preload() {
  fuente = loadFont("./data/Rajdhani-Medium.ttf");
  imgTupper = loadImage("./data/tupper01.png");
  imgSoga = loadImage("./data/soga01.png");
  imgPescado = loadImage("./data/pescado01.png");
  imgVieira = loadImage("./data/viera01.png");
  imgBandeja = loadImage("./data/bandejaVaciaParte.png");
  imgLangostilla = loadImage("./data/langostilla01.png");
  fondoBarco = loadImage("./data/fondoBarco.png");

  partesCentolla.push(loadImage("./data/centolla01Cuerpo02.png"));
  partesCentolla.push(loadImage("./data/centolla01Pierna02.png"));

  carpetas.push(["vacia", loadImage("./data/carpetaVacia.png")]);
  carpetas.push(["basura", loadImage("./data/carpetaBasura.png")]);
  carpetas.push(["centolla", loadImage("./data/carpetaCentolla.png")]);
  carpetas.push(["vieira", loadImage("./data/carpetaViera.png")]);
  carpetas.push(["langostilla", loadImage("./data/carpetaLangostilla.png")]);
  carpetas.push(["pescado", loadImage("./data/carpetaPescado.png")]);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  mundo = new VerletPhysics2D(); // mundo
  gravedad = new GravityBehavior(new Vec2D(-0.0009, 0.0001));
  mundo.addBehavior(gravedad);
  mundo.setWorldBounds(new Rect(10, 10, width - 10, height - 10)); // bordes mundo
  mundo.setDrag(0);

  //objetos.push(new Soga(imgSoga, 10, 180))
  objetos.push(new Pescado(imgPescado, 200, 75))
  //bandejas.push(new Bandeja(imgBandeja, carpetas, 86, 114, width * (i / 10)));
  //objetos.push(new Bandeja(imgBandeja, carpetas, 160, 288, width * (1 / 10)));
  objetos[0].armar();

  /* iniciar tiempo */
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  prevTime = millis();
}

function draw() {
  translate(-width * 0.5, -height * 0.5, 0);
  background(255);

  image(
    fondoBarco,
    0,
    0,
    width,
    height,
    0,
    0,
    fondoBarco.width,
    fondoBarco.height,
    COVER
  );
  mundo.update();

  push();

  objetos[0].dibujar();

  pop();
  cambiarGravedad();
}

function mousePressed() {

    //objetos[0].seleccionar();
  
}

function mouseReleased() {}

function mouseDragged() {
  if (!mouseMuyRapido()) {
    //objetos[0].arrastrar();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  mundo.setWorldBounds(new Rect(0, 0, width, height));
}

function cambiarGravedad() {
  const probabilidad = 0.01;
  const valorRandom = random(0, 1);
  if (valorRandom > probabilidad) return;

  mundo.removeBehavior(gravedad);
  gravedad = new GravityBehavior(
    new Vec2D(random(-0.009, 0.009), random(-0.009, 0.009))
  );
  mundo.addBehavior(gravedad);
}

function mouseMuyRapido() {
  // Calculate time difference
  let limite = 3;
  let currentTime = millis();
  let deltaTime = currentTime - prevTime;

  // Calculate mouse velocity
  mouseVelocityX = (mouseX - prevMouseX) / deltaTime;
  mouseVelocityY = (mouseY - prevMouseY) / deltaTime;

  mouseVelocityX.toFixed(2);
  mouseVelocityY.toFixed(2);

  // Update previous mouse position and time
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  prevTime = currentTime;

  if ( mouseVelocityX > limite || mouseVelocityY > limite ) {
    console.log("muy rapido!")
  }

  return mouseVelocityX > limite || mouseVelocityY > limite;
}
