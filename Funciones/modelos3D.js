import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js'; //'../threegit/build/three.module.js';;//'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';
import {
  BufferGeometryUtils
} from 'https://unpkg.com/three@0.121.1/examples/jsm/utils/BufferGeometryUtils.js'
import {
  Figura
} from '../Clases/Figura.js'

////
import {
  elegirSonidoAzar,
  colorRandom,
  booleanRandom,
  scale,
  colorOscuro
} from './calculos.js'


// Crea objetos con líneas
function _geometriaCubo() {
  const geo = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0 - 0.66, 1.0,
    -1.0, 1.0 - 0.66, 1.0,
    -1.0, 1.0 - (0.66 * 2), 1.0,
    1.0, 1.0 - (0.66 * 2), 1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0 + 0.66, 1.0, 1.0,
    -1.0 + 0.66, -1.0, 1.0,
    -1.0 + (0.66 * 2), -1.0, 1.0,
    -1.0 + (0.66 * 2), 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    -1.0 + (0.66 * 2), 1.0, -1.0,
    -1.0 + (0.66 * 2), -1.0, -1.0,
    -1.0 + 0.66, -1.0, -1.0,
    -1.0 + 0.66, 1.0, -1.0,
    -1.0, 1.0, -1.0,
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, 1.0 - (0.66 * 2), -1.0,
    -1.0, 1.0 - (0.66 * 2), -1.0,
    -1.0, 1.0 - 0.66, -1.0,
    1.0, 1.0 - 0.66, -1.0,
    1.0, 1.0, -1.0,
    -1.0, 1.0, -1.0,
  ]);

  geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  const geo2 = new THREE.BufferGeometry();
  geo2.copy(geo);
  const geo3 = new THREE.BufferGeometry();
  geo3.copy(geo2);
  geo2.rotateY(-Math.PI * 0.5);
  geo3.rotateX(-Math.PI * 0.5);
  return BufferGeometryUtils.mergeBufferGeometries([geo, geo2, geo3]);
}

function _geometriaCono() {
  const vertices = new Float32Array([
    0, 1.5, 0,
    -0.5, -1, 1.2, //izq
    0.5, -1, 1.2, //derecha
    0, 1.5, 0, //arriba
    //1 triangulo
    -0.5, -1, -1.2, //izq
    0.5, -1, -1.2, // derecha
    0, 1.5, 0, //ariba
  ]);

  const geoCono = new THREE.BufferGeometry();
  geoCono.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

  const geoCono2 = new THREE.BufferGeometry();
  geoCono2.copy(geoCono)
  geoCono2.rotateY(-Math.PI * 0.5)

  const geoCono3 = new THREE.BufferGeometry();
  geoCono3.copy(geoCono2)
  geoCono3.rotateY(-Math.PI * 0.25)

  const geoCono4 = new THREE.BufferGeometry();
  geoCono4.copy(geoCono2)
  geoCono4.rotateY(Math.PI * 0.25)

  const geoFinalCono = BufferGeometryUtils.mergeBufferGeometries([geoCono, geoCono2, geoCono3, geoCono4]);
  return geoFinalCono;
}

// Crea un objeto3D líneas y uno sólido negro
export function crearInstancia(forma, colorcito, x, y, z) {
  //Crea los objetos 3D
  var geometria;
  var geo;
  if (forma === "cubo") {
    geometria = _geometriaCubo();

    geo = new THREE.BoxGeometry(2 * 0.96, 2 * 0.96, 2 * 0.96);
  } else {
    geometria = _geometriaCono();
    geo = new THREE.ConeGeometry(1.2 * 0.99, 2.4 * 0.99, 8, 8);
  }

  const material = new THREE.LineBasicMaterial({
    color: colorcito,
    linewidth: 2,
    linecap: 'round', //ignored by WebGLRenderer
    linejoin: 'round' //ignored by WebGLRenderer
  });
  const mesh = new THREE.Line(geometria, material);
  mesh.position.x = x;
  mesh.position.y = y;
  mesh.position.z = z;

  const mat = new THREE.MeshStandardMaterial({
    color: 0x010101
  });
  const interior = new THREE.Mesh(geo, mat);
  interior.position.x = x;
  interior.position.y = y;
  interior.position.z = z;

  if (forma === 'cono') {
    interior.rotation.y = 1;
  }

  return [mesh, interior];
}

// Crea un objeto sonido
export function cargarSonido(listener, archivo, fig) {
  const audioLoader = new THREE.AudioLoader();

  const sonido = new THREE.PositionalAudio(listener);
  audioLoader.load(archivo, function(buffer) {
    sonido.setBuffer(buffer);
    sonido.setRefDistance(0.7);

    var m = 0.8;
    if (fig != null && !fig.activo) {
      m = Math.random() * 1.5 + 0.8;
    }
    sonido.setRolloffFactor(m);
    //console.log(m);
    //entre 0.5 y 0.22
    sonido.setLoop(true);
    ////sonido.setVolume(4);
    sonido.setVolume(1);
    sonido.play();
    sonido.setDistanceModel("exponential");
  });

  return sonido;
}

export function eliminarSonido(lista){
  if (lista[1].children.length > 1) {
    lista[1].children[1].stop();
    lista[1].remove(lista[1].children[1])
  }
}

/////////////////////////////// Espacio 3D ////////////////////////////////////
export function crearFormaUsuario(escena, listener, usuario) {
  var modelo = [];
  modelo = crearInstancia(usuario.forma, usuario.color, usuario.x, usuario.y, usuario.z);
  escena.add(modelo[0]);
  modelo[0].add(modelo[1]);
  modelo[1].position.y = 0;
  modelo[0].add( cargarSonido(listener, usuario.sonido));

  modelo[0].geometry.computeBoundingBox();
  return modelo[0];
}

export function figurasAleatorias(red) {
  for (var i = 0; i < 10; i++) {
    var ran = Math.floor(Math.random() * (1 - 0 + 1) + 0);
    var tipo = 'cubo';
    if (ran >= 1) {
      tipo = 'cono';
    }
    var f = new Figura(-1, tipo, colorRandom(), 40 - Math.random() * 80, 40 - Math.random() * 80, "juph-prueba", elegirSonidoAzar(), booleanRandom());
    red.push(f);
  }
}

export function figuraPrueba(red) {
  var f;
  f = new Figura(-1, "cubo", 0x550000, 0, -10, "prueba", "../data/sonidosB/Sonido (6).wav", true);
  red.push(f);
}

function agregarModelo(listener, f) {
  var m = crearInstancia(f.forma, f.color, f.x, f.y, f.z);
  m[1].position.set(0, 0, 0);
  m[0].add(m[1]);
  m[0].add(cargarSonido(listener, f.sonido, f));
  if (f.activo) {
    //m[1].material.color.set(m[0].material.color);
    m[1].material.color.set(colorOscuro(m[0].material.color));
  }

  m[0].geometry.computeBoundingBox();
  return m[0];
}

export function agregarModelos(listener, red, modelosRed) {
  // Paso la red a modelos 3D
  for (var i = 0; i < red.length; i++) {
    modelosRed.add(agregarModelo(listener, red[i]));
  }
}

export function agregarModelosCurado(listener, red, modelosRed, indicesSimilitud, usuario) {
  console.log("eran: ", red.length);
  for (var i = 0; i < red.length; i++) {
    red[i].calcularConexiones(red);
    indicesSimilitud.push(usuario.ecuacionDeUsuarioA(red[i]));
    if (indicesSimilitud[i] >= 0.6 || red[i].activo) {
      modelosRed.add(agregarModelo(listener, red[i]));
      red[i].pos = modelosRed.children.length - 1;
    }
  }
  console.log("veo: ", modelosRed.children.length);
}

export function moveteSiNosParecemos(figuras, indice) {
  //calcula cuanto se va a mover la figura segun el indice de similitud
  for (var i = 0; i < figuras.length; i++) {
    //const j = Math.random() * 10;
    const m = scale(indice[i], 0, 1, 0, 0.008);
    figuras[i].rotation.y += m;
  }
}

export function posInicioUsuario(usuario, red, indicesSimilitud) {
  var max = -1;
  var maxPos = -1;
  for (var i = 0; i < red.length; i++) {
    if (indicesSimilitud[i] > max) {
      max = indicesSimilitud[i];
      maxPos = i;
    }
  }
  // encontre el más similar
  const k = Math.random() * 3.5 + 1;
  const j = Math.random() * 3.5 + 1;
  usuario.x = red[maxPos].x + k;
  usuario.z = red[maxPos].z + j;
}

////////// Para debuggeo

export function crearInstanciaB(forma, color, x, y, z) {
  //Crea objeto 3D
  const material = new THREE.MeshPhongMaterial({
    color
  });

  var geometria;
  if (forma == 'cubo') {
    geometria = new THREE.BoxGeometry(1, 1, 1); // Geometria 1
  } else {
    geometria = new THREE.ConeGeometry(0.7, 1, 12); // Geometria 2
  }

  const instancia = new THREE.Mesh(geometria, material);
  instancia.position.x = x;
  instancia.position.y = y;
  instancia.position.z = z;
  return instancia;
}
