let obras = [];
let categorias = [];
let fuente;

let dataObras; 
let dataCat;
let cantC, cantO = 0;

function preload(){
    dataObras = loadJSON("./data/obras.json");
    print(dataObras)
    dataCat = loadJSON("./data/categoriasB.json");
    print(dataCat)
    fuente = loadFont("./data/Poppins-Regular.ttf")
}

function setup() { 
  createCanvas(1400, 500);
  background('#0C0C0C');
  llenarObras();
  llenarCategorias();
  
  let ran = int(random(cantC));
  categorias[ran].seleccionado = true;
  for(let i = 0; i < cantO; i++){
      obras[i].seleccionado = obras[i].resaltar(categorias, cantC)
  }

}

function draw() {   
    background(1,1,1);
    for( let i = 0; i < cantC; i++){
        categorias[i].dibujarLineas();
        categorias[i].dibujar();
        categorias[i].hoverCategoria(fuente);
    }
    for( let i = 0; i < cantO; i++){
        obras[i].mover();
        obras[i].dibujar();
        obras[i].hoverObra();
    }
}

function mouseClicked() {
    for( let i = 0; i < cantC; i++){
        categorias[i].toqueCategoria();
    }
    for( let i = 0; i < cantO; i++){
        obras[i].seleccionado = obras[i].resaltar(categorias, cantC)
        obras[i].destoqueObra();
        obras[i].toqueObra();
        
    }
}

function touchStarted() {
    console.log("TOUCH");
    background(255,0,0);
}

function llenarObras(){
    cantO = Object.keys(dataObras).length
    for( let i = 0; i < cantO; i++){
        obras[i] = new Obra(dataObras[i].nombre,dataObras[i].autor,dataObras[i].categorias,dataObras[i].link)
        obras[i].posicionar(obras);
        obras[i].dibujar();
        //print(obras[i])
    }
}

function llenarCategorias(){
    cantC = Object.keys(dataCat).length
    for( let i = 0; i < cantC; i++){
        categorias[i] = new Categoria(dataCat[i][0], 100*(i+1),dataCat[i][1])
        categorias[i].cargarObras(obras);
    }
}
