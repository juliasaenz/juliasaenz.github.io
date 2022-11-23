/* Matter */
var Engine = Matter.Engine,
  World = Matter.World,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse;

let engine;
let world;
let mConstraint, mouseConstraint;
//
let datosJson;
let fondo;
let lonG = [-74, -52.4];
let latG = [-56, -20];
let argentina = [];

function preload() {
  datosJson = loadJSON("assets/ProvinciasArgentina.geojson");
  fondo = loadImage("assets/fondo.png");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  engine = Engine.create();
  world = engine.world;
  cositasDelMouse();
  /* Fondo */
  push();
  fondo.resize(width * 1.5, 0);
  image(fondo, 0, 0);
  pop();

  /* Mapeo de ancho */
  let ancho = ((lonG[0] + lonG[1]) * height) / (latG[0] + latG[1]) / 2.8;
  let provincias = datosJson[0].features;

  /* PISO */
  World.add(world, Matter.Bodies.rectangle(0, height - 50, width, 50, { isStatic: true }));

  /* Recorrer provincias */
  for (let i = 0; i < provincias.length; i++) {
    console.log(provincias[i].properties.nombre);

    /* Datos */
    let coords = provincias[i].geometry.coordinates[0];
    let vertices = [[]];

    /* mapear latitud y longitud del centro */
    let centro = provincias[i].properties.centro;
    console.log("aqui centro: ", centro);
    let offsetX = width / 2;
    centro[0] = map(centro[0] - Math.abs((lonG[0] - lonG[1]) / 2), lonG[0], lonG[1], 0, ancho) + offsetX;
    centro[1] = map(centro[1], latG[0], latG[1], height, 0);
    console.log("aqui centro: ", centro);
    /* Recorrer vertices de provincia y mapear */
    for (let j = 0; j < coords.length; j++) {
      let lon = coords[j][0];
      let lat = coords[j][1];
      let px = map(lon - Math.abs((lonG[0] - lonG[1]) / 2), lonG[0], lonG[1], 0, ancho) - centro[0] + offsetX;
      let py = map(lat, latG[0], latG[1], height, 0) - centro[1];
      vertices[0].push({ x: px, y: py });
    }
    /* Crear provincia */
    let prov = new Provincia(provincias[i].properties.nombre);
    argentina.push(prov);
    prov.crearCuerpo(vertices, world, centro);
  }

  //
  Engine.update(engine);
}

function draw() {
  image(fondo, 0, 0);
  push();
  for (let i = 0; i < argentina.length; i++) {
    argentina[i].show();
  }
  Engine.update(engine);
  pop();
}

function mouseClicked() {
  console.log("desktop");
  if (mConstraint.body != null) {
    seleccionarProvincia();
    moverAlFinal();
  }
}

 function touchStarted() {
  console.log("mobile");
  if (mouseConstraint.body != null) {
    seleccionarProvincia();
    moverAlFinal();
  }
} 

function recibirFiltro(datos) {
  // Qué filtro hice click y qué color muestro
  // Lista de provincias
  // Con cantidad de sueños
  /*
    [
      {
        nombre: "Provincia"
        todos: 15,
        tema1: 1,
        tema2: 3,
        tema3: 4,
        tema4: 6,
        tema5: 1,
        tema6: 0
      }
    ]

  */
}

function mostrarPuntero() {
  // cuando eligo provincia muestro puntero y cant de sueños
}

function moverme() {}

/* Click y eventos de mouse  */
function seleccionarProvincia() {
  /* Cambiar estilo de provincia seleccionada */
  argentina.forEach((provincia) => provincia.seleccionar(mConstraint.body.id));
}
function moverAlFinal() {
  let prov = argentina.find((provincia) => provincia.estaSeleccionada() == true);
  if (prov != null) {
    console.log("Provincia seleccionada: ", prov);
    argentina.splice(argentina.indexOf(prov), 1);
    argentina.push(prov);
  }
}
function cositasDelMouse() {
  // Desktop
  var mouse = Mouse.create(canvas);
  mouse.pixelRatio = pixelDensity(); // for retina displays etc
  mConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
  });
  World.add(world, mConstraint);

  // Mobile
  var m = Mouse.create(canvas);
  m.pixelRatio = pixelDensity(); // for retina displays etc
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: m,
  });
  World.add(world, mouseConstraint);
}
