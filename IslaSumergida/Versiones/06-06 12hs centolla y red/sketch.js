const {
  VerletPhysics2D,
  VerletParticle2D,
  VerletSpring2D,
  VerletConstrainedSpring2D,
} = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

let mundo;
let gravedad;
let estado = "red";
let fuente;
let debug = false;

let objetos = [];
let bandejas = [];
let imgTupper,
  imgTupper02,
  imgTupper03,
  imgBandeja,
  imgTacho,
  fondoBarco,
  imgSoga,
  imgPescado,
  imgVieira,
  imgLangostilla,
  imgLangostilla02,
  imgCoral,
  imgCoral02,
  imgRed;
let partesCentolla = [];
let carpetas = [];

let prevMouseX;
let prevMouseY;
let prevTime;
let muyRapido = false;

let i;

function preload() {
  fuente = loadFont("./data/Rajdhani-Medium.ttf");
  imgTupper = loadImage("./data/tupper01.png");
  imgTupper02 = loadImage("./data/tupper02.png");
  imgTupper03 = loadImage("./data/tupper03.png");
  imgCoral = loadImage("./data/coral01.png");
  imgCoral02 = loadImage("./data/coral02.png");
  imgSoga = loadImage("./data/soga01.png");
  imgPescado = loadImage("./data/pescado01.png");
  imgVieira = loadImage("./data/viera01.png");
  imgBandeja = loadImage("./data/bandejaVaciaParte.png");
  imgTacho = loadImage("./data/tachoBasura.png");
  imgLangostilla = loadImage("./data/langostilla01.png");
  imgLangostilla02 = loadImage("./data/langostilla02.png");
  fondoBarco = loadImage("./data/fondoBarco.png");
  imgRed = loadImage("./data/red01.png");

  partesCentolla.push(loadImage("./data/centolla01Cuerpo03.png"));
  partesCentolla.push(loadImage("./data/centolla01Pierna03.png"));

  carpetas.push(["vacia", loadImage("./data/carpetaVacia.png")]);
  carpetas.push(["basura", loadImage("./data/carpetaBasura.png")]);
  carpetas.push(["centolla", loadImage("./data/carpetaCentolla.png")]);
  carpetas.push(["vieira", loadImage("./data/carpetaViera.png")]);
  carpetas.push(["langostilla", loadImage("./data/carpetaLangostilla.png")]);
  carpetas.push(["pescado", loadImage("./data/carpetaPescado.png")]);
  carpetas.push(["coral", loadImage("./data/carpetaCoral.png")]);
}

function setObjetos() {
  objetos = [];
  bandejas = [];


  /* set objetos */
  for (let i = 0; i < 2; i++) {
    objetos.push(new Centolla(partesCentolla));
  }
  for (let i = 0; i < 4; i++) {
    objetos.push(new Pescado(imgPescado)); // pescado
    objetos.push(new Langostilla(imgLangostilla)); // langostilla
    objetos.push(new Langostilla(imgLangostilla02)); // langostilla
    objetos.push(new Coral(imgCoral)); // coral
    objetos.push(new Soga(imgSoga));
    objetos.push(new Vieira(imgVieira));
  }
  for (let i = 0; i < 3; i++) {
    objetos.push(new Tupper(imgTupper)); // tupper
    objetos.push(new Tupper(imgTupper02)); // tupper
    objetos.push(new Tupper(imgTupper03)); // tupper
    
  }

  /* set bandejas */
  for (let i = 1; i <11; i += 2) {
    bandejas.push(
      new Bandeja(imgBandeja, carpetas, width/7, height*0.3, width * (i / 12), "bandeja")
    );
  }
  bandejas.push(
    new Bandeja(imgTacho, carpetas, width/7, width/7, width * (11 / 12), "basura")
  );

  /* armar objetos */
  objetos.forEach((obj) => {
    obj.armar();
  });
  /* armar bandejas */
  bandejas.forEach((b) => {
    b.armar();
  });
}

function setup() {
  setAttributes("premultipliedAlpha", true);
  createCanvas(windowWidth, windowHeight, WEBGL);
  setMundo();

  setObjetos();

  /* iniciar tiempo */
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  prevTime = millis();

  /* pos red */
  i = 0 + imgRed.height / 4;
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
  /* ///////////////////////// juego */
  if (estado == "juego") {
    muyRapido = mouseMuyRapido(); // chequea velocidad mouse
    cambiarGravedad(); // cambia gravedad

    //translate(0, 0, 1);
    bandejas.forEach((bandeja) => {
      bandeja.dibujar(debug);
      bandeja.guardarObjeto(objetos, bandejas);
    });

    /* condición de GANAR */
    if (objetos.every((obj) => obj.eliminado == true)) {
      estado = "ganar";
    }
  }
  /* ////////////////////////// dibujarobjetos */
  if (estado === "juego" || estado === "red") {
    objetos.forEach((obj) => {
      translate(0, 0, 0.5);
      obj.dibujar(debug);
    });
  }
  /* ////////////////////////////// subir Red */
  if (estado == "red") {
    if (objetos.some((obj) => obj.algunaParticulaSobreLimite())) {
      mundo.removeBehavior(gravedad);
      gravedad = new GravityBehavior(new Vec2D(0, 0));
      mundo.addBehavior(gravedad);
    }

    translate(0, 0, 1);
    push();
    imageMode(CENTER);
    image(
      imgRed,
      width / 2,
      i,
      width,
      height,
      0,
      0,
      imgRed.width,
      imgRed.height,
      COVER
    );
    i--;
    console.log(i);
    if (i == -240) {
      mundo.removeBehavior(gravedad);
      gravedad = new GravityBehavior(
        new Vec2D(random(-0.09, 0.09), random(-0.09, 0.09))
      );
      mundo.addBehavior(gravedad);
      estado = "juego";
    }
    pop();
  }
  /* ////////////////////// infografia */
  if (estado === "infografia") {
    let bandeja = bandejas.filter((b) => b.getSeleccionado() === true);
    bandeja[0].infografia();
  }
  /* ////////////////////////// ganar */
  if (estado === "ganar") {
    setObjetos();
    i = 0 + imgRed.height / 4;
    mundo.removeBehavior(gravedad);
    gravedad = new GravityBehavior(new Vec2D(0, -0.05));
    mundo.addBehavior(gravedad);
    estado = "red";
  }

  pop();
}

function keyTyped() {
  debug = !debug;
}

function mousePressed() {
  /* juego */
  if (estado == "juego") {
    objetos.forEach((obj) => {
      obj.seleccionar();
    });
  } else if (estado == "infografia") {
    /* infografia */
    estado = "juego";
  }
}

function mouseReleased() {}

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
