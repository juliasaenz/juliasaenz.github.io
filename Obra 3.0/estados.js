import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js';
import { PointerLockControls } from 'https://unpkg.com/three@0.121.1/examples/jsm/controls/PointerLockControls.js'
import { armarModelo, movimientoTeclas, crearP, modificarP, scale, mostrarDatos, mostrarInstucciones, borrarDatos } from './funciones.js';

export function animarContemplacion(camara, userP, mov, modeloP) {
  mov.movs += 0.01;
  camara.position.x = userP.x + 5 * Math.cos(0.5 * mov.movs);
  camara.position.z = userP.z + 5 * Math.sin(0.5 * mov.movs);
  camara.lookAt(modeloP);
}
// Contemplación
export function inicioContemplacion(int, cam) {
  int.estado = "contemplacion";
  cam.position.y = 2;
  document.getElementById("dato").remove();
  borrarDatos();
  crearP("fin","Gracias por interactuar :) \n tu figura quedará en este espacio \n (aun no funciona)","80%","10%");
}
// Etapa 4
export function animarEtapa4(int, mov) {
  //movimiento
  if (mov.rota) {
    if (int.mouse.x > int.oldX) {
      mov.dir = 1;
    } else if (int.mouse.x < int.oldX) {
      mov.dir = -1;
    }
    mov.movs += 0.1 * mov.dir;
  }
  mostrarDatos(0.03);
}
export function inicioEtapa4(int, camara, modelo) {
  int.estado = "etapa4";
  document.addEventListener('wheel', function(event) {
    event.preventDefault();
    if (event.deltaY > 0 && camara.position.y > -1) {
      camara.position.y -= 0.1;
    } else if (event.deltaY < 0 && camara.position.y < 2.5) {
      camara.position.y += 0.1;
    }
    camara.lookAt(modelo.position);
  });
  document.getElementById("botonC").disabled = false;
}
// Etapa 3
export function animarEtapa3() {
  mostrarDatos(0.03);
}
export function inicioEtapa3(mundo, int, mov) {
  int.estado = "etapa3";
  let canvas = document.getElementsByTagName("canvas");
  canvas[0].onpointerdown = function() {
    mov.rota = true;
    int.oldX = int.mouse.x;
    int.distancia = int.mouse.x;
    console.log("pling")
  }
  canvas[0].onpointermove = function() {
    if (mov.rota) {
      console.log("rotando")
      int.oldX = int.mouse.x;
      int.mouse.x = (event.clientX / mundo.renderizador.domElement.clientWidth) * 2 - 1;
    }
  }
  canvas[0].onpointerup = function() {
    mov.rota = false;
    const dist = Math.abs(Math.abs(int.mouse.x) - Math.abs(int.distancia)) * 100;
    if (int.estado === "etapa3" && dist > 10) {
      if (int.oldX > int.mouse.x) {
        mov.movs -= Math.PI
      } else {
        mov.movs += Math.PI
      }
    }
  }
  ///sacar de aca
  document.getElementById("botonC").disabled = false;
}
// Etapa 2
export function animarEtapa2(user, red, reloj) {
  modificarP("dato", user.texto(reloj.getElapsedTime()), "55%", "55%");
  mostrarDatos(0.02);
  user.calcularDistancias(red.usuarios, red.visible);
  red.calcularDistanciasRed(user);
}
export function inicioEtapa2(int, user, m, mov, red) {
  int.estado = "etapa2";
  user.vel = 25.0;
  crearP("dato", user.texto(m.reloj.getElapsedTime()), "55%", "55%");
  // click
  let mods = red.sacarModelos();
  document.onpointerdown = function() {
    if (int.estado != "contemplacion") {
      int.oldX = int.mouse.x;
      int.mouse.x = (event.clientX / m.renderizador.domElement.clientWidth) * 2 - 1;
      int.mouse.y = -(event.clientY / m.renderizador.domElement.clientHeight) * 2 + 1;
      clickDatos(int, m.camara, mods, red);
    }
  }

  ///sacar de aca
  document.getElementById("botonC").disabled = false;
}

function clickDatos(int, camara, modelos, red) {
  int.raycaster.setFromCamera(int.mouse, camara);
  let intersects = int.raycaster.intersectObjects(modelos);
  if (intersects.length > 0) {
    const inter = intersects[0].object;
    for (let i = 0; i < red.usuarios.length; i++) {
      if (inter.name === red.usuarios[i].id && red.visible[i]) {
        const x = (scale(int.mouse.x, -1, 1, 0, window.innerWidth) - 10).toString().concat("px");
        const y = (scale(-int.mouse.y, -1, 1, 0, window.innerHeight) - 10).toString().concat("px");;
        crearP("uDato", red.usuarios[i].texto(), x, y);
        return
      }
    }
    console.log("no hay click")
  }
}
// Etapa 1
export function inicioEtapa1(m, user, int, sonidos, mov, colores, red) {
  int.estado = "etapa1";
  document.getElementById("botonera").remove();
  m.escena.remove(m.escena.getObjectByName("f"));
  m.crearFondo();
  //// usuario
  user.crearModelo(colores);
  user.crearID();
  user.agregarSonido(sonidos);
  user.tiempo = m.reloj.getElapsedTime();
  m.escena.add(user.modelo);
  m.camara.lookAt(user.modelo.position);
  //// movimiento usuario
  mov.velocidad = new THREE.Vector3();
  mov.direccion = new THREE.Vector3();
  mov.controls = new PointerLockControls(m.camara, document.body);
  m.escena.add(mov.controls.getObject());
  movimientoTeclas(int.play, mov);
  m.reloj.start();
  //// red
  red.calcularSimilitud(user);
  red.mostrarEnMundo(m.escena, sonidos, 0);
  //// boton?
  let b = botonContinuar();
  document.body.appendChild(b);
  document.getElementById("botonC").disabled = false;
  b.onclick = function() {
    mostrarInstucciones(int);
    b.disabled = true;
  }
}
// Customización B
export function inicioCustomizacionB(m, estilo, media, int) {
  int.play = false;
  let f1 = m.escena.getObjectByName("f1");
  let f2 = m.escena.getObjectByName("f2");
  if (estilo.forma == "cubo") {
    m.escena.remove(f2);
    f1.position.x = 0;
    f1.name = "f";
  } else {
    m.escena.remove(f1);
    f2.position.x = 0;
    f2.name = "f";
  }
  const sonidos = media.elegir5();
  const f = m.escena.getObjectByName("f");
  const d = document.getElementById("botonera");
  agregarBotones(d, media.colores, sonidos);
  d.addEventListener('click', function clickB() {
    const ult = event["target"];
    if (ult.id in media.colores) {
      // si el botón es uno de color
      //console.log("color");
      f.material.color.set(media.colores[ult.id]);
      // solo poder seleccionar 1
      if (ult.id == estilo.color) {
        document.getElementById(ult.id).checked = true;
      } else {
        estilo.color = ult.id;
      }
      for (let key in media.colores) {
        if (key !== ult.id) {
          document.getElementById(key).checked = false;
        }
      }
    } else if (ult.id == "continuar") {
      for (let i = 0; i < sonidos.length; i++) {
        if (sonidos[i].isPlaying) {
          sonidos[i].stop();
        }
      }
      mostrarInstucciones(int);
      d.removeEventListener('click', clickB);
    } else if (ult.id != "botonera" && ult.id != "nme" && ult.id.length > 0) {
      // si es sonido
      // solo puede seleccionar 1
      if (ult.id == estilo.sonido) {
        document.getElementById(ult.id).checked = true;
      } else {
        estilo.sonido = ult.id;
      }
      for (let i = 0; i < sonidos.length; i++) {
        if (ult.id !== sonidos[i].name) {
          document.getElementById(sonidos[i].name).checked = false;
          if (sonidos[i].isPlaying) {
            sonidos[i].stop();
          }
        } else {
          if (!sonidos[i].isPlaying) {
            sonidos[i].play();
            estilo.sonido = ult.id;
          }
        }
      }
    }
    console.log(ult.id);
  })
}

function agregarBotones(d, colores, sonidos) {
  // Colores
  let i = 4;
  for (let key in colores) {
    let l = document.createElement("label");
    l.className = "checkbox";
    let b = document.createElement("input");
    b.type = "checkbox";
    b.setAttribute("id", key);
    l.style.top = (4 * i).toString().concat("%");
    l.style.left = "10%";
    l.appendChild(b);
    d.appendChild(l);
  }
  // sonidos
  for (i = 0; i < 5; i++) {
    let l = document.createElement("label");
    l.className = "checkbox";
    let b = document.createElement("input");
    b.type = "checkbox";
    b.setAttribute("id", sonidos[i].name);
    l.style.top = "-40%"
    l.style.left = "85%";
    l.appendChild(b);
    d.appendChild(l);
  }
  //nombre
  let b = document.createElement("input");
  b.type = "text";
  b.setAttribute("name", "name");
  b.setAttribute("class", "question");
  b.setAttribute("id", "nme");
  b.setAttribute("required", "required");
  b.setAttribute("autocomplete", "off");
  b.setAttribute("maxLength", "25");
  d.appendChild(b);
  let lb = document.createElement("label");
  lb.setAttribute("for", "nme");
  let s = document.createElement("span");
  s.textContent = "Nombre de usuario";
  lb.appendChild(s);
  d.appendChild(lb);
  //continuar
  d.appendChild(botonContinuar());
}

function botonContinuar() {
  let c = document.createElement("button");
  c.setAttribute("class", "continuar");
  c.setAttribute("id", "botonC");
  c.setAttribute("disabled", "true");
  let sC = document.createElement("span");
  sC.setAttribute("id", "continuar");
  sC.textContent = "Continuar";
  c.appendChild(sC);
  return c;
}
export function animarCustomizacionB(escena, usuario) {
  let f = escena.getObjectByName("f");
  f.rotation.z += 0.01;
  f.rotation.x += 0.01;
  f.scale.set(1.3, 1.3, 1.3);
  let nme = document.getElementById("nme")
  if (nme.value.length > 0) {
    usuario.nombre = nme.value;
  } else {
    document.getElementById("botonC").disabled = true;
    usuario.nombre = "";
  }
  //habilitar continuar
  if (usuario.estilo.color != "" && usuario.estilo.sonido != "" && usuario.nombre != "" && document.getElementById("blocker").style.display === "none") {
    let c = document.getElementById("botonC");
    c.disabled = false;
  }
}
// Customización A
export function inicioCustomizacionA(m, int, estilo, colores) {
  m.crearFondoCustomizacion();
  var f1 = armarModelo("f1", { forma: "cubo", color: "--", pos: { x: -2.5, y: 0, z: -3 } }, colores);
  var f2 = armarModelo("f2", { forma: "cono", color: "--", pos: { x: 2.5, y: 0, z: -3 } }, colores);
  m.escena.add(f1);
  m.escena.add(f2);
  window.addEventListener('click', function clickA() {
    //console.log("clickA")
    int.mouse.x = (event.clientX / m.renderizador.domElement.clientWidth) * 2 - 1;
    int.mouse.y = -(event.clientY / m.renderizador.domElement.clientHeight) * 2 + 1;
    int.raycaster.setFromCamera(int.mouse, m.camara);
    let intersects = int.raycaster.intersectObjects([f1, f2]);
    if (intersects.length > 0) {
      let inter = intersects[0].object.name;
      if (inter == "f1") {
        estilo.forma = "cubo";
      } else {
        estilo.forma = "cono";
      }
      window.removeEventListener('click', clickA);
    }
  })
  int.estado = "customizacionA";
}
export function animarCustomizacionA(escena) {
  var f1 = escena.getObjectByName("f1");
  f1.rotation.z += 0.01;
  f1.rotation.x += 0.01;
  var f2 = escena.getObjectByName("f2");
  f2.rotation.z += 0.01;
  f2.rotation.x += 0.01;
}
