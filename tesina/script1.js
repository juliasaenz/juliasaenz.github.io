import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js'; //'../threegit/build/three.module.js';;//'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';
import {
  PointerLockControls
} from 'https://unpkg.com/three@0.121.1/examples/jsm/controls/PointerLockControls.js'
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
  clickEtapa3,
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
var texto, textob;
var btn;

/// movimiento
let controls;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();


/// instrucciones
var cargo = true;
var play = true;

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

  var nom = document.createElement("input");
  nom.setAttribute('id', 'nombre');
  nom.setAttribute('type', 'text');
  nom.setAttribute('placeholder', 'Nombre');
  //nom.setAttribute('maxlength', '16');
  //nom.setAttribute('autocomplete', 'given-name');
  nom.setAttribute('value', '');
  nom.focus();
  document.body.appendChild(nom);
}

export function etapa1() {
  // Instrucciones
  instrucciones(" Mover: WASD o Flechas \n\n ");
  mundo.listener.setMasterVolume(0);

  //
  let inputVal = document.getElementById("nombre");
  console.log("este es el nombre: ", inputVal.value);
  document.body.removeChild(inputVal);

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
  instrucciones(" Mover: WASD o Flechas \n Rotar: Click & Drag \n\n ");
  mundo.listener.setMasterVolume(0);

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

function etapa3() {
  estado = "etapa3";
  mundo.bloomPass.strength += 0.7;

  // Tiempo
  usuario.tiempo = usuario.tiempo + mundo.reloj.getElapsedTime();
  console.log("Tiempo en la obra", usuario.tiempo);
  mundo.reloj.start();

  // Botón
  btn.value = " ";
  btn.removeEventListener("click", etapa3);
  seguir = false;

  // Texto
  texto.style.top = '45%';
  texto.style.left = '60%';
}

function etapa4() {
  borrarDatos();
  instrucciones(" Mover: WASD o Flechas \n Rotar: Click & Drag \n\n ");
  cargo = true;

  estado = "etapa4";
  mundo.bloomPass.strength += 0.7;

  // Tiempo
  usuario.tiempo = usuario.tiempo + mundo.reloj.getElapsedTime();
  console.log("Tiempo en la obra", usuario.tiempo);
  mundo.reloj.start();

  // Botón
  btn.value = " ";
  btn.removeEventListener("click", etapa4);
  seguir = false;

}

///////////////////////////////////////////// Estas idealmente se irian de aca

function instrucciones(texto) {
  const instructions = document.getElementById("instructions");
  const blocker = document.getElementById("blocker");
  instructions.style.display = 'flex';
  const t = document.getElementById("tins");
  t.innerText = texto;
  t.style.textAlign = "center";

  blocker.style.display = '';

  if (estado != "etapa3") {
    const p = document.getElementById("play");
    p.innerText = " \n\n\n Preparando espacio";
    cargo = false;
  }
  play = false;
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
  if (play && reloj.getElapsedTime() > 5) {
    seguir = !seguir;
    if (seguir) {

      btn = document.getElementById("bContinuar");
      btn.value = "Continuar";
      if (estado == "etapa1") {
        btn.addEventListener("click", etapa2);
      } else if (estado == "etapa2") {
        btn.addEventListener("click", etapa3);
      } else if (estado == "etapa3") {
        btn.addEventListener("click", etapa4);
      } else if (estado == "etapa4") {
        btn.addEventListener("click", function() {
          estado = "contemplacion";
          btn.remove();
          borrarDatos();
        });
        btn.value = "Terminar";
      }

    } else {
      seguir = true;
    }
  }
}

function borde(x, z) {
  if (x > 195 || x < -195) {
    x = 0;
  }
  if (z > 195 || x < -195) {
    z = 0;
  }
  return x, z;
}

function mostrarDatos(vel) {
  const te = document.getElementById("dato");
  if (te != null && te.style.opacity > 0) {
    te.style.opacity -= vel;
  } else if (te != null && te.style.opacity == 0) {
    te.remove();
  }
}

function borrarDatos() {
  var te = document.getElementById("dato");
  while (te != null) {
    te.remove();
    te = document.getElementById("dato");
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

  // Interacción click y teclado
  document.addEventListener('mousedown', function(event) {
    if (play) {
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
        rota = true;
      } else if (estado == "etapa3" || estado == "etapa4") {
        clickEtapa3(modelosRed.children, red, raycaster, mouse);
        rota = true;
      }
    }
  }, false); // Mouse
  document.onpointermove = function() {
    if ((estado == "etapa2" || estado == "etapa3") && rota) {
      if (mouse.x < 0 && mov < Math.PI * 3) {
        mov += 0.1;
      } else if (mouse.x > 0 && mov > 0) {
        mov -= 0.1;
      }
    } else if (estado == "etapa4" && rota) {
      if (mouse.x < 0) {
        mov += 0.1;
      } else if (mouse.x > 0) {
        mov -= 0.1;
      }
    }
  };
  document.onpointerup = function() {
    if (estado == "etapa2" || estado == "etapa3") {
      rota = false;
      calcularCaraB();
    } else if (estado == "etapa4") {
      rota = false;
    }
  };
  document.onkeydown = function(e) {
    if (play) {
      if (estado == "etapa1") {
        tecladoEtapa1(e, usuario);
      } else if (estado == "etapa2" || estado == "etapa3") {
        tecladoEtapa2(orientacion, e, usuario, colision, lastKey)
      }
    }
  };

  // Resize
  window.addEventListener('resize', onWindowResize);
  window.addEventListener("beforeunload", function(e) {

    if (estado != "contemplacion") {
      var confirmationMessage = 'La experiencia aun no termina';

      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    }
  });

  // Movimiento cámara
  controls = new PointerLockControls(mundo.camara, document.body);
  mundo.escena.add(controls.getObject());

  // Movimiento teclas
  const onKeyDown = function(event) {
    if (play) {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          moveForward = true;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          moveLeft = true;
          break;
        case 'ArrowDown':
        case 'KeyS':
          moveBackward = true;
          break;
        case 'ArrowRight':
        case 'KeyD':
          moveRight = true;
          break;
      }
    }
  };
  const onKeyUp = function(event) {
    if (play) {
      switch (event.code) {

        case 'ArrowUp':
        case 'KeyW':
          moveForward = false;
          break;

        case 'ArrowLeft':
        case 'KeyA':
          moveLeft = false;
          break;

        case 'ArrowDown':
        case 'KeyS':
          moveBackward = false;
          break;

        case 'ArrowRight':
        case 'KeyD':
          moveRight = false;
          break;

      }
    }
  };
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);

  // Instrucciones
  const ins = document.getElementById("instructions");
  const bl = document.getElementById("blocker");
  bl.addEventListener('click', function() {
    if (cargo) {
      play = true;
      ins.style.display = 'none';
      bl.style.display = 'none';

      if (estado == "aviso") {
        customizaciónA();
      }
    }
  });

}

function animar() {
  requestAnimationFrame(animar);

  if (estado == "aviso") {
    // Aca iria imagen o algo
    texto.innerText = "Último upadte: 01/07 18pm ";
  } else if (estado == "customizaciónA") {
    rotarObjeto3D(mundo.escena.children[1]);
    rotarObjeto3D(mundo.escena.children[2]);
    texto.innerText = " ";
  } else if (estado == "customizaciónB") {
    rotarObjeto3D(mundo.escena.children[1]);
    texto.innerText = " ";

    if (usuario.color != '#FF0000' && usuario.sonido != '../data/sonidos/1/Sonido (1).wav') {
      // Botón para siguiente etapa
      seguir = !seguir;
      if (seguir) {
        btn.style.color = "white";
        btn.addEventListener("click", etapa1);
      } else {
        seguir = true;
      }
    }

  } else if (estado == "etapa1" || estado == "etapa2" || estado == "etapa3") {
    modeloUsuario.position.set(usuario.x, usuario.y, usuario.z);
    usuario.limite(190);
    usuario.calcularConexiones(red);
    moveteSiNosParecemos(modelosRed.children, indicesSimilitud);

    mundo.camara.position.x = usuario.x + 3.5 * Math.cos(0.5 * mov);
    mundo.camara.position.z = usuario.z + 3.5 * Math.sin(0.5 * mov);
    mundo.camara.lookAt(modeloUsuario.position);

    botonSeguir(mundo.reloj);

    /*if (usuario.x > 30 || usuario.x < -30){
      usuario.x = 0;
    }
    if (usuario.z > 30 || usuario.z < -30){
      usuario.z = 0;
    }*/

    if (estado == "etapa3") {
      if (play) {
        texto.innerText = usuario.texto(mundo.reloj.getElapsedTime(), orientacion);
      } else {
        texto.innerText = "";
      }
      mostrarDatos(0.02);
    } else {
      texto.innerText = " ";

    }

  } else if (estado == "etapa4") {
    usuario.calcularConexiones(red);
    usuario.limite(190);
    moveteSiNosParecemos(modelosRed.children, indicesSimilitud);
    botonSeguir(mundo.reloj);

    if (play) {
      texto.innerText = usuario.texto(mundo.reloj.getElapsedTime(), orientacion);
    } else {
      texto.innerText = "";
    }
    mostrarDatos(0.008);


    /// movimiento
    const time = performance.now();
    const delta = (time - prevTime) / 1000;

    if (rota) {
      mundo.camara.position.x = usuario.x + 3.5 * Math.cos(0.5 * mov);
      mundo.camara.position.z = usuario.z + 3.5 * Math.sin(0.5 * mov);
      mundo.camara.lookAt(modeloUsuario.position);
    } else {
      velocity.x -= velocity.x * 20.0 * delta;
      velocity.z -= velocity.z * 20.0 * delta;

      direction.z = Number(moveForward) - Number(moveBackward);
      direction.x = Number(moveRight) - Number(moveLeft);
      direction.normalize(); // this ensures consistent movements in all directions

      if (moveForward || moveBackward) velocity.z -= direction.z * 100.0 * delta;
      if (moveLeft || moveRight) velocity.x -= direction.x * 100.0 * delta;

      controls.moveRight(-velocity.x * delta);
      controls.moveForward(-velocity.z * delta);

      var angulo = Math.atan2(mundo.camara.getWorldDirection().z, mundo.camara.getWorldDirection().x)
      usuario.x = mundo.camara.position.x + 3.5 * Math.cos(angulo);
      usuario.z = mundo.camara.position.z + 3.5 * Math.sin(angulo);

      prevTime = time;
    }

    modeloUsuario.position.set(usuario.x, usuario.y, usuario.z);

  } else if (estado == "contemplacion") {
    mov += 0.01;
    mundo.camara.position.x = usuario.x + 5 * Math.cos(0.5 * mov);
    mundo.camara.position.z = usuario.z + 5 * Math.sin(0.5 * mov);
    mundo.camara.lookAt(modeloUsuario.position);
    texto.innerText = " ";
  } // etapa1

  //console.log(mundo.reloj.getElapsedTime())
  ////////
  THREE.DefaultLoadingManager.onProgress = function(url, itemsLoaded, itemsTotal) {

    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

  };
  THREE.DefaultLoadingManager.onLoad = function() {
    console.log('Loading Complete!');
    cargo = true;
    const bl = document.getElementById("blocker");
    const ins = document.getElementById("play");
    ins.innerText = ("\n\n\n Hace click para empezar");

    for (let i = 0; i <= 1; i += 0.001) {
      mundo.listener.setMasterVolume(i);
    }
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
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  // true for mobile device
  console.log("celular");
  texto = document.createElement('p');
  document.body.append(texto);
  texto.innerText = "Por favor use una computadora para ver esta página";
  document.getElementById("play").innerText = "";

} else {
  // false for not mobile device
  console.log("web");
  inicializar();
  animar();
}
