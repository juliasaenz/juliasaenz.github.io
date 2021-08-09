import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js';
import { Mundo } from './Clases/Mundo.js';
import { Usuario, Red } from './Clases/Usuario.js';
import { Media } from './Clases/Media.js'
import { crearP, modificarP } from './funciones.js';
import {
  inicioCustomizacionA,
  animarCustomizacionA,
  inicioCustomizacionB,
  animarCustomizacionB,
  inicioEtapa1,
  inicioEtapa2,
  animarEtapa2,
  inicioEtapa3,
  animarEtapa3,
  inicioEtapa4,
  animarEtapa4
} from './estados.js'

let mundo;
let media;
let usuario;
let red;

//let estado = "intro"; // intro/customizacionA/customizacionB/etapa1/etapa2/etapa3/etapa4/contemplacion
let int = {
  play: false,
  raycaster: null,
  mouse: null,
  oldX: -90,
  estado: "intro",
  distancia: 0
}
let mov = {
  adelante: false,
  atras: false,
  izquierda: false,
  derecha: false,
  velocidad: null,
  direccion: null,
  controls: null,
  prevTime: performance.now(),
  rota: false,
  mov: Math.PI,
  dir: 1,
  movs: Math.PI
}

function inicializar() {
  mundo = new Mundo();
  mundo.reloj.start();
  media = new Media(mundo.listener);
  usuario = new Usuario(media.colores);
  // Controles e Interacción
  int.raycaster = new THREE.Raycaster();
  int.mouse = new THREE.Vector2();
  // Evento Resize y Condición de Salida
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('beforeunload', function(e) {
    if (int.estado != "contemplacion") {
      let confirmationMessage = 'La experiencia aun no termina';
      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    }
  });
  // Cargar JSON
  red = new Red();
  fetch('./data/figuras.json').then(response => {
    return response.json();
  }).then(function(data) {
    red.lista = data;
    int.play = true;
  });
  // para debugeo
  crearP("log", "--");
  THREE.DefaultLoadingManager.onProgress = function(url, itemsLoaded, itemsTotal) {
    //console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
  };
}

/// Estados Provisorios
///

function animar() {
  requestAnimationFrame(animar);
  modificarP("log", int.estado);
  if (int.estado === "intro") {
    // Intro --> Carga de archivos
    if (!media.cargo) {
      media.cargo = media.actualizar();
    } else if (media.cargo && int.play) {
      int.play = false;
      red.cargarUsuarios(media.colores);
      int.estado = inicioCustomizacionA(mundo, int.raycaster, int.mouse, usuario.estilo, media.colores);
    }
  } else if (int.estado === "customizacionA") {
    // Customización A -->
    animarCustomizacionA(mundo.escena);
    if (usuario.estilo.forma != "--") {
      int.estado = "customizacionB";
      inicioCustomizacionB(mundo, usuario.estilo, media, int);
    }
  } else if (int.estado === "customizacionB") {
    // Customización B -->
    animarCustomizacionB(mundo.escena, usuario);
    if (int.play) {
      inicioEtapa1(mundo, usuario, int, media.sonidos, mov, media.colores, red);
      int.play = false;
    }
  } else if (int.estado === "etapa1") {
    // Etapa 1 -->
    if (int.play) {
      inicioEtapa2(int, usuario, mundo, mov, red);
      int.play = false;
    }
  } else if (int.estado === "etapa2") {
    // Etapa 2 -->
    animarEtapa2(usuario, red, mundo.reloj);
    if (int.play) {
      inicioEtapa3(mundo, int, mov);
      int.play = false;
    }
  } else if (int.estado === "etapa3") {
    // Etapa 3 -->
    animarEtapa3();
    if (int.play){
      inicioEtapa4(int, mundo.camara, usuario.modelo);
      int.play = false;
    }
  } else if (int.estado === "etapa4") {
    // Etapa4 -->
    animarEtapa4(int, mov);
  } else if (int.estado === "contemplacion") {
    // Contemplación
  }
  // mov de la figura en espacio3D
  if (int.estado.includes("etapa")) {
    usuario.mover(mundo.camara, mov);
    usuario.actualizarPos(mundo.camara, usuario.limite(195));
  }
  mundo.renderizar();
}

/// Programa Principal
///// Programa Principal
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  texto = document.createElement('p');
  document.body.append(texto);
  texto.innerText = "Por favor use una computadora para ver esta página";
  document.getElementById("play").innerText = "";

} else {
  inicializar();
  animar();
}

/// Eventos
function onWindowResize() {
  // Reacomodar cuando se cambia tamaño de ventana
  mundo.camara.aspect = window.innerWidth / window.innerHeight;
  mundo.camara.updateProjectionMatrix();
  mundo.renderizador.setSize(window.innerWidth, window.innerHeight);
}
