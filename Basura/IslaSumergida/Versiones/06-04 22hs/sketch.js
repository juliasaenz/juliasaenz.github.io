const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

let mundo;
let gravedad;
let estado = "juego";
let fuente;

let objetos = [];
let bandejas = [];
let imgTupper,
  imgBandeja,
  fondoBarco,
  imgSoga,
  imgPescado,
  imgVieira,
  imgLangostilla;
let partesCentolla = [];
let carpetas = [];

let prevMouseX;
let prevMouseY;
let prevTime;

function preload() {
  fuente = loadFont("./data/Rajdhani-Medium.ttf");
  imgTupper = loadImage("./data/tupper01.png");
  imgSoga = loadImage("./data/soga01.png");
  imgPescado = loadImage("./data/pescado01.png");
  imgVieira = loadImage("./data/viera01.png");
  imgBandeja = loadImage("./data/bandejaVacia.png");
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
  mundo.setWorldBounds(new Rect(0, 0, width, height)); // bordes mundo
  mundo.setDrag(0.05);

  for (let i = 0; i < 1; i++) {
    
    objetos.push(new Tupper(imgTupper, 60, 60));
    objetos.push(new Soga(imgSoga, 5, 100));

    objetos.push(new Vieira(imgVieira, 35, 34));
    objetos.push(new Pescado(imgPescado, 230, 75));
    //objetos.push(new Centolla(partesCentolla, 180, 140));
    objetos.push(new Langostilla(imgLangostilla, 50, 90));
  }

  for (let i = 1; i < 11; i += 2) {
    bandejas.push(new Bandeja(imgBandeja, carpetas, 86, 114, width * (i / 10)));
  }

  objetos.forEach((obj) => {
    obj.armar();
  });

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

  if (estado == "juego") {
    cambiarGravedad();

    bandejas.forEach((bandeja) => {
      bandeja.dibujar();
      objetos = bandeja.guardarObjetoB(objetos, bandejas);
    });

    objetos.forEach((obj) => {
      obj.dibujar();
    });

    if (objetos.length == 0) {
      /* condición de juego */
      estado = "ganar";
    }
  } else if (estado === "infografia") {
    let bandeja = bandejas.filter((b) => b.getSeleccionado() === true);
    bandeja[0].infografia();
  } else if (estado === "ganar") {
    textSize(32);
    fill(10);
    textFont(fuente);
    text("ganaste! yay! bien! wohoo! felicidades! ", width * 0.5, height * 0.6);
  }

  mouseMuyRapido();

  pop();
}

function mousePressed() {
  if (estado == "juego" && !mouseMuyRapido()) {
    objetos.forEach((obj) => {
      obj.seleccionar();
    });
  } else if (estado == "infografia") {
    estado = "juego";
  }
}

function mouseReleased() {}

function mouseDragged() {
  if (estado === "juego" && !mouseMuyRapido()) {
    objetos.forEach((obj) => {
      obj.arrastrar();
    });
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
    new Vec2D(random(-0.09, 0.09), random(-0.09, 0.09))
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

  if (mouseVelocityX > limite || mouseVelocityY > limite) {
    //console.log("muy rapido!");
  } else {
    //console.log("vamos bien")
  }

  //console.log(mouseVelocityX);

  return mouseVelocityX > limite || mouseVelocityY > limite;
}
