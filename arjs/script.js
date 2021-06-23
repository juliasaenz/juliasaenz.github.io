import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';
import {
  Mundo
} from './Mundo.js';
import {
  cargarModelo,
  cargarModeloAnimado
} from './CargarModelo.js';
import {
  ContextoAR
} from './ContextoAR.js';

var mundo;
var contextoAR;
let clock = new THREE.Clock();


/* Si quieren usar más modelos solo hacen variable modelo2 (y mixer2 si es animado)
  y así sucesivamente los que quieran */
var modelo, modelo2;
var mixer = [];


function iniciar() {
  /* Creamos la escena sobre la que vamos a poner modelos 3D */
  mundo = new Mundo();
  mundo.iluminar();
  contextoAR = new ContextoAR(mundo);

  /* Creamos el MARCADOR que vamos a usar */
  //////// --> Link donde hacer marcadores https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
  //////// --> Para cambiar de marcador solo hace falta agregar un nuevo archivo a la carpeta y cambiar el string en la siguiente función
  var marcador = contextoAR.crearMarcador('./marcadores/wabi2.patt', 'nombreModelo');

  /* Cargamos el MODELO 3D que vamos a usar */
  //////// --> Cambiar de modelo tmb es solo cambiar el string de la función
  modelo = new THREE.Object3D();
  cargarModelo('./modelo/smore/scene.gltf', modelo); // Sin animación
  //cargarModeloAnimado('./modelo/fire/scene.gltf', modelo, mixer); // Con animación
  marcador.add(modelo); // Lo hacemos hijo del marcador

  //////// --> Podemos cambiar la posición, escala y rotación inicial del modelo
  modelo.scale.set(0.5, 0.5, 0.5);
  modelo.rotation.x = Math.PI;
  modelo.rotation.y = -Math.PI / 2;

  document.onkeydown = function(e) {
    //marcador.add(modelo);
  };

}

function animacion() {
  requestAnimationFrame(animacion); // Loop animación

  /* Si quisieran animar el modelo de forma simple (que rote, o vaya de un lado a otro), se puede hacer acá */
  //modelo.rotation.z += 0.05;

  /* Esto solo se usa si el modelo viene con animación, igual si no es se puede dejar */
  if (mixer[0] != undefined) {
    mixer[0].update(clock.getDelta());
  }

  /* Estas líneas tienen que quedar sí o si, hacen que se actualice la página */
  contextoAR.actualizar();
  mundo.dibujar();
}


/////////////////////// Programa principal
iniciar();
animacion();
