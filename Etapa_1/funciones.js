import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js';
import {
  BufferGeometryUtils
} from 'https://unpkg.com/three@0.121.1/examples/jsm/utils/BufferGeometryUtils.js'
import { PositionalAudioHelper } from 'https://unpkg.com/three@0.121.1/examples/jsm/helpers/PositionalAudioHelper.js';

////////////////////////////////////// THREEJS ////////////////////////////////////////////////
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

export function crearInstanciaB(forma, colorcito, x, y, z) {
  //Crea los objetos 3D
  var geometria;
  var geo;
  if (forma === "cubo") {
    geometria = _geometriaCubo();

    geo = new THREE.BoxGeometry(2 * 0.96, 2 * 0.96, 2 * 0.96);
  } else {
    geometria = _geometriaCono();
    geo = new THREE.ConeGeometry(1.44 * 0.99, 3 * 0.99, 6, 6);
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
    color: 0x000000
  });
  const interior = new THREE.Mesh(geo, mat);
  interior.position.x = x;
  interior.position.y = y;
  interior.position.z = z;

  if (forma === 'cono') {
    interior.rotation.y = 0;
  }

  return [mesh, interior];
}

export function cargarSonido(listener, archivo) {
  const audioLoader = new THREE.AudioLoader();

  const sonido = new THREE.PositionalAudio(listener);
  audioLoader.load(archivo, function(buffer) {
    sonido.setBuffer(buffer);
    sonido.setRefDistance(0.7);
    //sonido.setRolloffFactor(2.2);
    const m = Math.random() * 1.5 + 0.8;
    sonido.setRolloffFactor(m);
    console.log(m);
    //entre 0.5 y 0.22
    sonido.setLoop(true);
    sonido.setVolume(2);
    sonido.play();
    sonido.setDistanceModel("exponential");
    //sonido.setDistanceModel("linear");
  });

  return sonido;
}

export function actualizarPosicion(objeto, x, z) {
  //actualiza posicion de objeto 3D
  objeto[0].position.x = x;
  objeto[0].position.z = z;
  objeto[1].position.x = x;
  objeto[1].position.z = z;
}

export function calcularConexionesFiguras(figuras) {
  for (var i = 0; i < figuras.length; i++) {
    figuras[i].calcularConexiones(figuras);
    //console.log(figuras[i].id, figuras[i].conexiones.length);
  }
}

////////////////////////////////////// CONTROL PROTOTIPO /////////////////////////////////////////////
export function vista(vistaCenital, camara, x, z) {
  //Cambia la vista de la escena
  if (!vistaCenital) {
    camara.position.x = x;
    camara.position.z = z + 2;
    camara.position.y = 2;
    camara.rotation.x = -0.1;
  } else {
    camara.position.x = 0;
    camara.position.y = 40;
    camara.position.z = 0;
    camara.rotation.x = -1.5;
  }
  camara.rotation.y = 0 ;
}

export function colorRandom() {
  const n1 = parseInt(Math.random() * 200).toString(16);
  const n2 = parseInt(Math.random() * 200).toString(16);
  const n3 = parseInt(Math.random() * 200).toString(16);
  var c = "#".concat(n1, n2, n3);
  while (c.length < 7) {
    c = c.concat("0");
  }
  return c;
}

export function elegirSonidoAzar() {
  const n1 = parseInt(Math.random() * 15 + 1).toString();
  return "../Sonidos/Sound (".concat(n1, ").mp3");
}

/// ESTA NO ESTA EN USO
export function crearInstancia(forma, color, x, y, z) {
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
