

let diasEspeciales = {
  enero: [],
}
let fondos = [];
let headers = [];
let meses = [];
let pos = 0;

function preload() {
  fondos.push(loadImage("./data/fondoEnero.png"))
  headers.push(loadImage("./data/headerEnero.png"));
  headers.push(loadImage("./data/headerFebrero.png"));
  diasEspeciales.enero.push(loadImage("./data/01_23.png"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  meses.push(new Mes(fondos[0], headers[0], diasEspeciales.enero, 0));
  meses.push(new Mes(fondos[0], headers[1], [], 1.2));
}

function draw() {
  background("#512E8D");
  translate(0, pos);
  
  meses[0].dibujar();
  meses[1].dibujar();
}

function mouseWheel(event) {
  
  //move the square according to the vertical scroll amount
  pos -= event.delta;
  if (pos > 0) pos = 0;
  print(pos);

  return false;
}

function mousePressed() {

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

