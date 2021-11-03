let obras = [];
let categorias = [];
let fuente;
let imgs = [];
let imgV = [];

let dataObras; 
let dataCat;
let cantC, cantO = 0;
let alto;
let viejo = [0,0];

function preload(){
    dataObras = loadJSON("./data/obras.json");
    print(dataObras)
    dataCat = loadJSON("./data/categoriasB.json");
    print(dataCat)
    fuente = loadFont("./data/Poppins-Regular.ttf")
    // 
    imgs[0] = loadImage('data/categorias/'+'redes sociales'+'.png')
    imgV[0] = loadImage('data/categorias/'+'redes sociales'+' vacio.png')
    imgs[1] = loadImage('data/categorias/'+'experiencia'+'.png')
    imgV[1] = loadImage('data/categorias/'+'experiencia'+' vacio.png')
    imgs[2] = loadImage('data/categorias/'+'información'+'.png')
    imgV[2] = loadImage('data/categorias/'+'información'+' vacio.png')
    imgs[3] = loadImage('data/categorias/'+'conectividad'+'.png')
    imgV[3] = loadImage('data/categorias/'+'conectividad'+' vacio.png')
    imgs[4] = loadImage('data/categorias/'+'problemática social'+'.png')
    imgV[4] = loadImage('data/categorias/'+'problemática social'+' vacio.png')
    imgs[5] = loadImage('data/categorias/'+'identidad'+'.png')
    imgV[5] = loadImage('data/categorias/'+'identidad'+' vacio.png')
    imgs[6] = loadImage('data/categorias/'+'colectivo'+'.png')
    imgV[6] = loadImage('data/categorias/'+'colectivo'+' vacio.png')
    imgs[7] = loadImage('data/categorias/'+'conexión'+'.png')
    imgV[7] = loadImage('data/categorias/'+'conexión'+' vacio.png')
    imgs[8] = loadImage('data/categorias/'+'percepción'+'.png')
    imgV[8] = loadImage('data/categorias/'+'percepción'+' vacio.png')
    imgs[9] = loadImage('data/categorias/'+'virtualidad'+'.png')
    imgV[9] = loadImage('data/categorias/'+'virtualidad'+' vacio.png')
    imgs[10] = loadImage('data/categorias/'+'educación'+'.png')
    imgV[10] = loadImage('data/categorias/'+'educación'+' vacio.png')
    imgs[11] = loadImage('data/categorias/'+'concientización'+'.png')
    imgV[11] = loadImage('data/categorias/'+'concientización'+' vacio.png')
    
}

function setup() { 
  createCanvas(windowWidth, (windowHeight/8)*7);
  background('#0C0C0C');
  llenarObras();
  llenarCategorias();
  if(height > width){
    reordenarCategorias();
  }
  
  let ran = int(random(cantC));
  categorias[ran].seleccionado = true;
  for(let i = 0; i < cantO; i++){
      obras[i].seleccionado = obras[i].resaltar(categorias, cantC)
  }

}

function draw() {   
    viejo[0] = width;
    viejo[1] = height;
    background(1,1,1);
    for( let i = 0; i < cantC; i++){
        categorias[i].dibujarLineas();
        categorias[i].dibujar();
        categorias[i].hoverCategoria(fuente);
        categorias[i].mostrarTexto();
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
        categorias[i] = new Categoria(dataCat[i][0], (width/14)*(i+1),dataCat[i][1],imgs[i],imgV[i])
        categorias[i].cargarObras(obras);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, (windowHeight/8)*7);
    for( let i = 0; i < cantC; i++){
        if(height > width){
            categorias[i].x = (width/8)*(i+1)
            if(i > cantC/2-1){
                categorias[i].x = (width/8)*(i-cantC/2+1)
                categorias[i].y = height/10 * 2.5
            }
        } else {
            categorias[i].x = (width/14)*(i+1)
            categorias[i].y = height/10
        }
    }
    for(let i= 0; i < cantO; i++){
        print(viejo[0], width);
        obras[i].x =map(obras[i].x,0,viejo[0],0,width);
        obras[i].y =map(obras[i].y,0,viejo[1],0,height);
    }
  }

function reordenarCategorias(){
    for( let i = 0; i < cantC; i++){
        if(height > width){
            categorias[i].x = (width/8)*(i+1)
            if(i > cantC/2-1){
                categorias[i].x = (width/10)*(i-cantC/2+1)
                categorias[i].y = height/10 * 2.5
            }
        } else {
            categorias[i].x = (width/14)*(i+1)
        }
    }
}