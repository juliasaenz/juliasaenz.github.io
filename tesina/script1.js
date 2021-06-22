import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js'; //'../threegit/build/three.module.js';;//'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';
import {
  Mundo
} from './Clases/Mundo.js';
import {
  Figura
} from './Clases/Figura.js'
import {
  crearFormaUsuario,
  figurasAleatorias,
  figuraPrueba,
  agregarModelos,
  agregarModelosCurado,
  moveteSiNosParecemos,
  posInicioUsuario,
  crearTexto
} from './Funciones/modelos3D.js';
import {
  aviso,
  crearFormasInicio,
  crearBotones,
  clickCustomizacionA,
  clickCustomizacionB,
  rotarObjeto3D
} from './Funciones/customizacion.js'
import {
  clickEtapa2,
  tecladoEtapa1,
  tecladoEtapa2,
  contemplacion,
  vistaTotalModelos,
  recargarVistaCurada
} from './Funciones/espacio3D.js'

///////////////////////////// Variables

// Estados: Aviso -> CustomizaciónA -> CustomizaciónB -> Etapa 1 -> Etapa2 -> Etapa 3 -> Etapa 4 -> Contemplación
var estado = "aviso";

var mundo;

var raycaster, mouse //Interacción con mouse
var orientacion = "frente";
var mov = 0;
var rota = false;

var usuario, modeloUsuario;
var red = [];
var indicesSimilitud = [];
var modelosRed;

var colision = -1;
var lastKey = -1;

var seguir = false;
var texto;
var btn;

///////////////////////////////////////////// Inicializar Estados
export function customizaciónA() {
  estado = "customizaciónA";
  // Elimino si habia otras
  while (mundo.escena.children.length > 1) {
    if (mundo.escena.children[1].children.length > 1) {
      mundo.escena.children[1].children[1].stop();
      mundo.escena.children[1].remove(mundo.escena.children[1].children[1])
    }
    mundo.escena.remove(mundo.escena.children[1]);
    mundo.escena.remove(mundo.escena.children[1]);
  }
  crearFormasInicio(mundo.escena);
}

export function customizaciónB(seleccion) {
  estado = "customizaciónB";

  // Guardo forma elegida
  if (seleccion.position.x < 0) {
    usuario.forma = "cubo";
  } else {
    usuario.forma = "cono";
  }

  // Eliminar objetos 3D no deseados
  for (var i = 1; i < mundo.escena.children.length; i++) {
    if (mundo.escena.children[i] != seleccion) {
      mundo.escena.remove(mundo.escena.children[i]);
    }
  }

  // Cambiar visualización
  seleccion.position.x = 0;
  seleccion.scale.set(1.5, 1.5, 1.5);

  // Botones
  mundo.escena.add(crearBotones(mundo.listener));

  crearTexto(mundo.escena, "<", -2.2, 0.85, 0)

  btn = document.getElementById("bContinuar");
  btn.value = "Comenzar";
  btn.style.color = "grey";
}

export function etapa1() {
  // Elimino si habia otras
  estado = "etapa1";
  while (mundo.escena.children.length > 1) {
    mundo.escena.remove(mundo.escena.children[1]);
    mundo.escena.remove(mundo.escena.children[1]);
  }
  mundo.crearFondo();

  // modelo3D usuario
  modeloUsuario = crearFormaUsuario(mundo.escena, mundo.listener, usuario);

  // red de usuarios pasados
  modelosRed = new THREE.Object3D;

  //////////////// Pruebas
  //figuraPrueba(red);
  figurasAleatorias(red);
  //agregarModelos(mundo.listener, red, modelosRed)
  agregarModelosCurado(mundo.listener, red, modelosRed, indicesSimilitud, usuario)
  //posInicioUsuario(usuario, red, indicesSimilitud);

  mundo.escena.add(modelosRed);

  /////////// tiempo
  usuario.tiempo = usuario.tiempo + mundo.reloj.getElapsedTime();
  console.log("Tiempo en la obra", usuario.tiempo);
  mundo.reloj.start();
  seguir = false;
  btn.removeEventListener("click", etapa1);
  btn.value = "";
  btn.style.color = "white";

  //////////////////////////////////////// CAMARA
  mundo.camara.position.y = 2;
  mundo.camara.lookAt({
    x: usuario.x,
    y: usuario.y,
    z: usuario.z
  });

  mov = Math.PI;
}

function etapa2() {
  estado = "etapa2";
  console.log("pasando a vista total")
  vistaTotalModelos(mundo.listener, red, modelosRed);
  mundo.escena.fog.near = 20;
  mundo.bloomPass.strength += 0.8;

  // Tiempo
  usuario.tiempo = usuario.tiempo + mundo.reloj.getElapsedTime();
  console.log("Tiempo en la obra", usuario.tiempo);
  mundo.reloj.start();

  // Botón
  btn.value = " ";
  btn.removeEventListener("click", etapa2);
  seguir = false;
}

///////////////////////////////////////////// Estas idealmente se irian de aca

function colisiones(obj, lista) {
  const x = obj.position.x;
  const z = obj.position.z;
  const w = obj.geometry.boundingBox.max.x + 0.1;
  const d = obj.geometry.boundingBox.max.z + 0.1;
  for (var i = 0; i < lista.length; i++) {
    const xL = lista[i].position.x;
    const zL = lista[i].position.z;
    const wL = lista[i].geometry.boundingBox.max.x;
    const dL = lista[i].geometry.boundingBox.max.z;

    if (x - w > xL - wL && x - w < xL + wL || x + w > xL - wL && x + w < xL + wL) {
      //x adentro
      if (z - d > zL - dL && z - d < zL + dL || z + d > zL - dL && z + d < zL + dL) {
        //z adentro
        console.log("bonk")
        colision = lastKey;
      } else {
        colision = -1;
      }
    } else {
      colision = -1;
    }

  }
  //console.log(colision)
}

function calcularCaraB() {
  const v = [Math.abs(0 - mov), Math.abs(Math.PI - mov), Math.abs(Math.PI * 2 - mov), Math.abs(Math.PI * 3 - mov)];
  const index = v.indexOf(Math.min(...v))

  if (index == 0) {
    orientacion = "izquierda"
    mov = 0;
  } else if (index == 1) {
    orientacion = "frente"
    mov = Math.PI;
  } else if (index == 2) {
    orientacion = "derecha"
    mov = Math.PI * 2;
  } else {
    orientacion = "espalda"
    mov = Math.PI * 3;
  }
}

function botonSeguir(reloj) {
  if (reloj.getElapsedTime() > 15) {
    seguir = !seguir;
    if (seguir) {
      btn = document.getElementById("bContinuar");
      btn.value = "Continuar";
      if (estado == "etapa1") {
        btn.addEventListener("click", etapa2);
      } else if (estado == "etapa2") {
        btn.addEventListener("click", function(){
          estado = "contemplacion";
          btn.value = " ";
        });
        btn.value = "Terminar";
      }
    } else {
      seguir = true;
    }
  }
}

///// ThreeJS

function inicializar() {
  ///// texto
  texto = document.createElement('p');
  document.body.append(texto);

  // Mundo
  mundo = new Mundo();
  mundo.crearFondoCustomizacion();
  // usuario
  usuario = new Figura();
  // Interacción
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  ////////////////////// Interacción click y teclado
  document.addEventListener('mousedown', function(event) {
    event.preventDefault();
    // mouse
    mouse.x = (event.clientX / mundo.renderizador.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / mundo.renderizador.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, mundo.camara);

    if (estado == "customizaciónA") {
      clickCustomizacionA(mundo.escena.children, raycaster, usuario, mundo.listener, mundo.escena, estado);
    } else if (estado == "customizaciónB") {
      clickCustomizacionB(mundo.escena.children, raycaster, usuario, mundo.listener);

    } else if (estado == "etapa2") {
      clickEtapa2(modelosRed.children, red, raycaster);
      rota = true;
    }

  }, false); // Mouse
  document.onpointermove = function() {
    if (estado == "etapa2" && rota) {
      if (mouse.x < 0 && mov < Math.PI * 3) {
        mov += 0.1;
      } else if (mouse.x > 0 && mov > 0) {
        mov -= 0.1;
      }
    }
  };
  document.onpointerup = function() {
    if (estado == "etapa2") {
      rota = false;
      calcularCaraB();
    }
  };
  document.onkeydown = function(e) {
    if (estado == "aviso" || estado == "customizaciónB") {
      if (e.keyCode == 81) {
        //q
        customizaciónA();
      }
    } // ESTO ES PROVISORIO, DESPUES VA A HABER UN BOTÓN
    if (estado == "etapa1") {
      tecladoEtapa1(e, usuario);
    } else if (estado == "etapa2" || estado == "etapa3") {
      tecladoEtapa2(orientacion, e, usuario, colision, lastKey)
    }
    ///// Pruebas de vistas
    if (estado == "etapa1" || estado == "etapa2" || estado == "contemplacion") {
      switch (e.keyCode) {
        /////////////////////////// Pruebas
        case 69:
          //q
          estado = contemplacion(estado);
          if (estado != "contemplacion") {
            //calcularCaraB();
            orientacion = "frente";
            mov = Math.PI;
          }
          break;
        case 65:
          //a
          if (estado == "etapa1") {
            etapa2();
          } else if (estado == "etapa2") {
            estado = "etapa1";
            recargarVistaCurada(mundo.listener, red, modelosRed, indicesSimilitud, usuario);
            mundo.escena.fog.near = 0.1;
            mundo.bloomPass.strength -= 1;
          }
          break;
      } //switch
    }
  };
  // Resize
  window.addEventListener('resize', onWindowResize);

  // Para cuando me quiero saltar la customizacion
  if (estado == "etapa1") {
    etapa1();
  } else {
    crearTexto(mundo.escena, "Presione Q para comenzar")
  }

}

function animar() {
  requestAnimationFrame(animar);

  if (estado == "aviso") {
    // Aca iria imagen o algo
    texto.innerText = "prototipo tip: usen compu para verlo :) \n Último upadte: 21/06 18pm ";
  } else if (estado == "customizaciónA") {
    rotarObjeto3D(mundo.escena.children[1]);
    rotarObjeto3D(mundo.escena.children[2]);
    texto.innerText = " ";
  } else if (estado == "customizaciónB") {
    rotarObjeto3D(mundo.escena.children[1]);
    texto.innerText = " ";

    if(usuario.color != '#FF0000' && usuario.sonido != '../data/sonidos/1/Sonido (1).wav'){
      // Botón para siguiente etapa
      seguir = !seguir;
      if (seguir) {
        btn.style.color = "white";
        btn.addEventListener("click", etapa1);
      } else {
        seguir = true;
      }
    }

  } else if (estado == "etapa1" || estado == "etapa2") {
    modeloUsuario.position.set(usuario.x, usuario.y, usuario.z);
    usuario.calcularConexiones(red);
    moveteSiNosParecemos(modelosRed.children, indicesSimilitud);

    colisiones(modeloUsuario, modelosRed.children); // no funciona

    mundo.camara.position.x = usuario.x + 3.5 * Math.cos(0.5 * mov);
    mundo.camara.position.z = usuario.z + 3.5 * Math.sin(0.5 * mov);
    mundo.camara.lookAt(modeloUsuario.position);

    botonSeguir(mundo.reloj);

    if (estado == "etapa2") {
      texto.innerText = usuario.texto(mundo.reloj.getElapsedTime(), orientacion);
    } else {
      texto.innerText = " ";
    }

  } else if (estado == "contemplacion") {
    mov += 0.01;
    mundo.camara.position.x = usuario.x + 5 * Math.cos(0.5 * mov);
    mundo.camara.position.z = usuario.z + 5 * Math.sin(0.5 * mov);
    mundo.camara.lookAt(modeloUsuario.position);
    texto.innerText = " En realidad falta una etapa en medio :)";
  } // etapa1

  //console.log(mundo.reloj.getElapsedTime())
  ////////
  THREE.DefaultLoadingManager.onLoad = function() {
    console.log('Loading Complete!');
  };

  ////////
  mundo.renderizar();
}

function onWindowResize() {

  mundo.camara.aspect = window.innerWidth / window.innerHeight;
  mundo.camara.updateProjectionMatrix();

  mundo.renderizador.setSize(window.innerWidth, window.innerHeight);

}
///// Programa Principal

inicializar();
animar();
