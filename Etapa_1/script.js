import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js'; //'../threegit/build/three.module.js';;//'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';
import {
  Mundo
} from '../Clases/Mundo.js';
import {
  Figura
} from '../Clases/Figura.js';
import {
  crearInstancia,
  crearInstanciaB,
  actualizarPosicion,
  cargarSonido,
  vista,
  colorRandom,
  calcularConexionesFiguras,
  elegirSonidoAzar
} from './funciones.js';
import {
  BufferGeometryUtils
} from 'https://unpkg.com/three@0.121.1/examples/jsm/utils/BufferGeometryUtils.js';

var mundo;
var usuario;
var objetoUsuario = [];
var figuras = [];
var objetosFiguras = [];
var stop = false;


var p; //plano prueba distancia

// Control
var vistaCenital = false;

function inicializar() {
  mundo = new Mundo();
  mundo.crearFondo();

  /////// Datos y ObjetoUsuario
  usuario = new Figura(-1, 'cono', 0xff0055);
  objetoUsuario = crearInstanciaB(usuario.forma, usuario.color, usuario.x, usuario.y, usuario.z);
  mundo.escena.add(objetoUsuario[0]);
  mundo.escena.add(objetoUsuario[1]);
  console.log(objetoUsuario[0].position.x);
  //objetoUsuario[0].add( cargarSonido(mundo.listener, usuario.sonido));

  ////// Figuras
  // crear figuras
  for (var i = 0; i < 15; i++) {
    var ran = Math.floor(Math.random() * (1 - 0 + 1) + 0);
    var tipo = 'cubo';
    if (ran >= 1) {
      tipo = 'cono';
    }
    var f = new Figura(-1, tipo, colorRandom(), 40 - Math.random() * 80, 40 - Math.random() * 80, "juph-prueba", elegirSonidoAzar());
    figuras.push(f);
    objetosFiguras.push(crearInstanciaB(f.forma, f.color, f.x, f.y, f.z));
    mundo.escena.add(objetosFiguras[i][0]);
    mundo.escena.add(objetosFiguras[i][1]);
    objetosFiguras[i][0].add(cargarSonido(mundo.listener, f.sonido));
  }
  calcularConexionesFiguras(figuras);


  ////Ver distancia graficamente
  const g = new THREE.PlaneGeometry(14, 14);
  const m = new THREE.LineBasicMaterial(0x444444);
  p = new THREE.Line(g, m);
  p.position.set(usuario.x, 0, usuario.z);
  p.rotation.x = Math.PI * -.5;
  //mundo.escena.add(p);


  ///// PARA CUANDO NECESITAS UN CUBITO DE PRUEBA
  /*
  var f;
  f = new Figura(-1,"cubo",0x550000,0,-20,"prueba",  "../Sonidos/Sound (2).mp3");
  figuras.push(f);
  objetosFiguras.push(crearInstanciaB(f.forma, f.color, f.x, f.y, f.z));
  mundo.escena.add(objetosFiguras[0][0]);
  mundo.escena.add(objetosFiguras[0][1]);
  const s = cargarSonido(mundo.listener, figuras[0].sonido);
  objetosFiguras[0][1].add(s);
  */

  ////// Movimiento usuario
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37:
        if (!stop) {
          usuario.x -= 0.2;
        }
        break;
      case 38:
        if (!stop) {
          usuario.z -= 0.2;
        }
        break;
      case 39:
        if (!stop) {
          usuario.x += 0.2;
        }
        break;
      case 40:
        if (!stop) {
          usuario.z += 0.2;
        }
        break;
      case 81:
        //q
        if (!stop) {
          vistaCenital = !vistaCenital;
        }
        break;
      case 49:
        //1
        stop = !stop;
        console.log("stop", stop);
        break;
    }
  };

}

function animar() {
  requestAnimationFrame(animar); //Animación

  if (!stop) {
    vista(vistaCenital, mundo.camara, usuario.x, usuario.z); //Cambiar de cámara POV a cámara cenital
  } else {
    mundo.camara.position.x = 0;
    mundo.camara.position.z = usuario.z;
    mundo.camara.position.y = 2;
    mundo.camara.rotation.x = -0.1;
    mundo.camara.rotation.y += 0.01;
  }

  actualizarPosicion(objetoUsuario, usuario.x, usuario.z); //Mover el objetoUsuario
  usuario.calcularConexiones(figuras); //Calcular figuras que estan cerca de usuario
  //usuario.calcularConexionesVisual(figuras,mundo,objetosFiguras);

  p.position.set(usuario.x, 0, usuario.z);
  //
  mundo.renderizar();

}


////////////////////////////////
inicializar();
animar();
