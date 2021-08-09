import { armarModelo } from '../funciones.js';
import { Mundo } from '../Clases/Mundo.js';

let colores = {
  rosa: "#EC90BF",
  rosita: "#F15733",
  fucsia: "#FC3DC9",
  naranja: "#FDA449",
  anaranjado: "#F2B361",
  amarillo: "#E4BE5B",
  verde: "#7DFF9B",
  celeste: "#00FFF9",
  cian: "#39C7CB",
  azul: "#016DF6",
  violeta: "#9F34D8",
  lila: "#C86DDE"
}


let mundo;
let obj;
let lista = [];
let cargo = false;

function inicializar() {
  console.log("holi");
  mundo = new Mundo();
  mundo.crearFondo();

  // Cargar guión de json
  fetch('figuras.json').then(response => {
    return response.json();
  }).then(function(data) {
    lista = data;
    cargo = true;
  });
}

function cargarModelos(m,l,col){
  for(let i = 0; i < l.length; i++){
    let obj = armarModelo(lista[i]["id"],lista[i]["estilo"],col);
    m.escena.add(obj);
  }
}

function animar() {
  requestAnimationFrame(animar);
  if(cargo){
    console.log("lista: ",lista)
    cargarModelos(mundo,lista,colores);
    cargo = false;
  }
  mundo.renderizar();
}

inicializar();
animar();
