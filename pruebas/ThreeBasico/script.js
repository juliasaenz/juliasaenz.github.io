import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js'; //'../threegit/build/three.module.js';;//'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';
import {
  Mundo
} from './Mundo.js'
import {
  BufferGeometryUtils
} from 'https://unpkg.com/three@0.121.1/examples/jsm/utils/BufferGeometryUtils.js'
//import { OrbitControls } from 'https://unpkg.com/three@0.121.1/examples/jsm/controls/OrbitControls.js';
console.log("hola three.js");
var mundo;
var cubo;
var mesh;
var meshCono;

function inicializar() {
  mundo = new Mundo();
  mundo.iluminar();
  mundo.crearOrbitControl();

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
  geo2.copy(geo)
  const geo3 = new THREE.BufferGeometry();
  geo3.copy(geo2)
  geo2.rotateY(-Math.PI * 0.5)
  geo3.rotateX(-Math.PI * 0.5)
  const geoFinal = BufferGeometryUtils.mergeBufferGeometries([geo, geo2, geo3])

  const material2 = new THREE.LineBasicMaterial({
    color: 0xffffff,
    linewidth: 2,
    linecap: 'round', //ignored by WebGLRenderer
    linejoin: 'round' //ignored by WebGLRenderer
  });
  mesh = new THREE.Line(geoFinal, material2);
  mesh.position.x += 1;
  //mundo.escena.add(mesh);
  var geometry = new THREE.BoxGeometry(2 * 0.8, 2 * 0.8, 2 * 0.8);
  var material = new THREE.MeshStandardMaterial({
    color: 0x111111
  });
  cubo = new THREE.Mesh(geometry, material);
  cubo.position.x += 1
  //mundo.escena.add( cubo );


  var verticesEpiral = [
    0, 2.5, 0,
    -0.5, 0, 1.2, //izq
    0.5, 0, 1.2,  //derecha
    0, 2.5, 0,    //arriba
    //1 triangulo
    -0.5, 0,-1.2, //izq
    0.5, 0, -1.2, // derecha
    0, 2.5, 0, //ariba
  ];
  /*var cantPuntos = 15;
  for(var i=0;i<cantPuntos;i++){
      var angulo = THREE.MathUtils.mapLinear(i,0,cantPuntos,0,Math.PI*7)
      var radio = THREE.MathUtils.mapLinear(i,0,cantPuntos,1,0)
      var x = radio * Math.cos(angulo)
      var y = THREE.MathUtils.mapLinear(i,0,cantPuntos,-1,1)
      var z = radio * Math.sin(angulo)
      verticesEpiral.push(x,y,z)
  }*/

  const geoCono = new THREE.BufferGeometry();
  const vertices32Espiral = new Float32Array(verticesEpiral);
  geoCono.setAttribute('position', new THREE.BufferAttribute(vertices32Espiral, 3));

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

  meshCono = new THREE.Line(geoFinalCono, material2);
  mundo.escena.add(meshCono);
  meshCono.position.x -= 1;


}

function animar() {
  requestAnimationFrame(animar);
  cubo.rotation.x += 0.01;
  cubo.rotation.y += 0.01;

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  //  meshCono.rotation.x += 0.01;
  //meshCono.rotation.y += 0.01;
  mundo.renderizar();
}
inicializar();
animar();
