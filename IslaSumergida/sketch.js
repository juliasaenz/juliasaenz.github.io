const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

let mundo;
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
  imgLangostilla,
  imgCentolla;

let carpetas = [];

function preload() {
  fuente = loadFont("./data/Rajdhani-Medium.ttf");
  imgTupper = loadImage("./data/tupper01.png");
  imgSoga = loadImage("./data/soga01.png");
  imgPescado = loadImage("./data/pescado01.png");
  imgVieira = loadImage("./data/viera01.png");
  imgBandeja = loadImage("./data/bandejaVacia.png");
  imgCentolla = loadImage("./data/centolla01.png");
  imgLangostilla = loadImage("./data/langostilla01.png");
  fondoBarco = loadImage("./data/fondoBarco.png");

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
  mundo.addBehavior(new GravityBehavior(new Vec2D(0.0009, 0.0001)));
  mundo.setWorldBounds(new Rect(0, 0, width, height)); // bordes mundo
  //mundo.setDrag(0);

  for (let i = 0; i < 8; i++) {
    objetos.push(new Tupper(imgTupper, 40, 40));
    objetos.push(new Soga(imgSoga, 8, 60));
    objetos.push(new Pescado(imgPescado, 100, 31));
    objetos.push(new Vieira(imgVieira, 25, 24));
    objetos.push(new Centolla(imgCentolla, 100, 66));
    objetos.push(new Langostilla(imgLangostilla, 20, 24));
  }

  for (let i = 1; i < 11; i += 2) {
    bandejas.push(new Bandeja(imgBandeja, carpetas, 86, 114, width * (i / 10)));
  }
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
    bandejas.forEach((bandeja) => {
      bandeja.dibujar();
      objetos = bandeja.guardarObjeto(objetos, bandejas);
    });

    objetos.forEach((obj) => {
      obj.dibujar();
      //obj.colisionObjeto(bandejas[0])
    });

    if (objetos.length == 0) {
      /* condición de juego */
      estado = "ganar";
    }
  }
  else if (estado === "infografia") {
    let bandeja = bandejas.filter((b) => b.getSeleccionado() === true)
    bandeja[0].infografia();
  }
  else if (estado === "ganar") {
    textSize(32);
    fill(10);
    textFont(fuente);
    text("ganaste! yay! bien! wohoo! felicidades! ", width * 0.5, height * 0.6);
  }

  pop();
}

function mousePressed() {
  if (estado == "juego") {
    objetos.forEach((obj) => {
      obj.seleccionar();
    });

    bandejas.forEach((bandeja) => {
      bandeja.seleccionar();
    });

    /* condicion de cambio */
    if (bandejas.some((bandeja) => bandeja.getSeleccionado())) {
      estado = "infografia";
      console.log("alguna hay");
    }
  }
  else if (estado == "infografia") {
    estado = "juego";
  }
  
}

function mouseReleased() {}

function mouseDragged() {
  if (estado === "juego") {
    objetos.forEach((obj) => {
      obj.arrastrar();
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  mundo.setWorldBounds(new Rect(0, 0, width, height));
}
