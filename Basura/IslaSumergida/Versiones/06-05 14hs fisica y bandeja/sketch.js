const { VerletPhysics2D, VerletParticle2D, VerletSpring2D, VerletConstrainedSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

let mundo;
let gravedad;
let estado = "juego";
let fuente;
let debug = false;

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
let muyRapido = false;

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
  setAttributes('premultipliedAlpha', true);
  createCanvas(windowWidth, windowHeight, WEBGL);
  setMundo();

  /* set objetos */
  for (let i = 0; i < 3; i++) {
    objetos.push(new Tupper(imgTupper, 60, 60));
    objetos.push(new Soga(imgSoga, 20, 80));
    objetos.push(new Vieira(imgVieira, 35, 34));
    objetos.push(new Pescado(imgPescado, 180, 75));
    //objetos.push(new Centolla(partesCentolla, 180, 140));
    objetos.push(new Langostilla(imgLangostilla, 50, 70));
  }
  /* set bandejas */
  for (let i = 1; i < 11; i += 2) {
    bandejas.push(new Bandeja(imgBandeja, carpetas, 180, 288, width * (i / 10)));
  }

  /* armar objetos */
  objetos.forEach((obj) => {
    obj.armar();
  });
  /* armar bandejas */
  bandejas.forEach((b) => {
    b.armar();
  });

  /* iniciar tiempo */
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  prevTime = millis();
}

function draw() {
  /* fondo */
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
   /* juego */
  if (estado == "juego") {
    muyRapido = mouseMuyRapido(); // chequea velocidad mouse
    cambiarGravedad(); // cambia gravedad 

    translate(0,0,1);
    bandejas.forEach((bandeja) => {
      bandeja.dibujar(debug);
      objetos = bandeja.guardarObjeto(objetos, bandejas);
    });
    
    objetos.forEach((obj) => {
      translate(0,0,1);
      obj.dibujar(debug);
    });

    /* condición de GANAR */
    if ( objetos.every((obj) => obj.eliminado == true)) {
      estado = "ganar";
    }
  }
  /* infografia */
  else if (estado === "infografia") {
    let bandeja = bandejas.filter((b) => b.getSeleccionado() === true);
    bandeja[0].infografia();
  }
  /* ganar */
  else if (estado === "ganar") {
    textSize(32);
    fill(10);
    textFont(fuente);
    text("ganaste! yay! bien! wohoo! felicidades! ", width * 0.5, height * 0.6);
  }

  pop();
}

function keyPressed() {
  debug = !debug;
}

function mousePressed() {
  /* juego */
  if (estado == "juego") {
    objetos.forEach((obj) => {
      obj.seleccionar();
    });
  } 
  /* infografia */
  else if (estado == "infografia") {
    estado = "juego";
  }
}

function mouseReleased() {

}

function mouseDragged() {
  /* juego */
  if (estado === "juego" && !muyRapido) {
    objetos.forEach((obj) => {
      obj.arrastrar();
    });
  } 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  mundo.setWorldBounds(new Rect(0, 0, width, height));
}