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
  elegirSonido,
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

// Crea un objeto texto
export function crearTexto(escena, mensaje = "no hay mensaje", x = 0, y = 0, z = 0){
  //crear texto
  var text;
  const loader = new THREE.FontLoader();

  loader.load('../tesina/data/Fonts/Source Code Pro_Regular.json', function(font) {
    const matLite = new THREE.MeshBasicMaterial({
      color: 0xFAFAFA,
    });

    const shapes = font.generateShapes(mensaje, 0.1);
    const geometry = new THREE.ShapeGeometry(shapes);

    geometry.computeBoundingBox();
    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);

    text = new THREE.Mesh(geometry, matLite);
    text.position.set(x,y,z)
    escena.add(text);

  });

}

// Crea un objeto sonido
export function cargarSonido(listener, archivo, fig) {
  const audioLoader = new THREE.AudioLoader();

  const sonido = new THREE.PositionalAudio(listener);
  audioLoader.load(archivo, function(buffer) {
    sonido.setBuffer(buffer);

    sonido.setRefDistance(0.9); // A que distancia empieza a reducir el volumen
    sonido.setRolloffFactor(1.4); // A que velocidad disminuye el volumen
    sonido.setDistanceModel("exponential");
    sonido.setMaxDistance(1000);

    sonido.setLoop(true);
    sonido.setVolume(1);
    sonido.play();

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
  var audio = cargarSonido(listener, usuario.sonido);
  modelo[0].add(audio);
  audio.setVolume(0.4);

  modelo[0].geometry.computeBoundingBox();
  return modelo[0];
}

export function figurasAleatorias(red) {
  for (var i = 0; i < 0; i++) {
    var ran = Math.floor(Math.random() * (1 - 0 + 1) + 0);
    var tipo = 'cubo';
    if (ran >= 1) {
      tipo = 'cono';
    }
    var f = new Figura(-1, tipo, colorRandom(), 40 - Math.random() * 80, 40 - Math.random() * 80, "juph-prueba", elegirSonidoAzar(), booleanRandom());
    f.crearID();
    red.push(f);
  }
}

export function figurasFijas(red){
  /////// 1
  var f = new Figura(-1,'cubo',"#EC90BF",10,10,"julia01",elegirSonido('1','1'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#E4BE5B",-100,5,"julia02",elegirSonido('1','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#F2B361",-150,50,"julia03",elegirSonido('1','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#FC3DC9",-20,-53,"julia04",elegirSonido('1','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#9F34D8",-100,-125,"julia05",elegirSonido('1','1'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#EC90BF",17,-73,"julia06",elegirSonido('1','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#E4BE5B",25,39,"julia07",elegirSonido('1','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#F2B361",-78,7,"julia08",elegirSonido('1','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#FC3DC9",152,-165,"julia09",elegirSonido('1','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#EC90BF",-14,-26,"julia10",elegirSonido('1','4'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#FDA449",130,183,"julia11",elegirSonido('1','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#E4BE5B",-116,91,"julia12",elegirSonido('1','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#E4BE5B",177,-134,"julia13",elegirSonido('1','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#7DFF9B",165,-10,"julia14",elegirSonido('1','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#9F34D8",190,-143,"julia15",elegirSonido('1','4'),false);
  f.crearID();
  red.push(f);
  //
  ///////// 2
  f = new Figura(-1,'cono',"#EC90BF",-22,2,"julia01",elegirSonido('2','1'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#FC3DC9",181,-16,"julia02",elegirSonido('2','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#F2B361",-68,142,"julia03",elegirSonido('2','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#FDA449",154,143,"julia04",elegirSonido('2','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#39C7CB",76,-136,"julia05",elegirSonido('2','1'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#016DF6",-110,118,"julia06",elegirSonido('2','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#E4BE5B",84,-182,"julia07",elegirSonido('2','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#F2B361",-49,18,"julia08",elegirSonido('2','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#FC3DC9",119,133,"julia09",elegirSonido('2','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#39C7CB",-167,-128,"julia10",elegirSonido('2','4'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#FDA449",-3,93,"julia11",elegirSonido('2','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#00FFF9",-42,184,"julia12",elegirSonido('2','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#39C7CB",177,-134,"julia13",elegirSonido('2','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#7DFF9B",165,-10,"julia14",elegirSonido('2','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#9F34D8",190,-143,"julia15",elegirSonido('2','4'),false);
  f.crearID();
  red.push(f);
  //
  //////////////////// 3
  f = new Figura(-1,'cono',"#00FFF9",15,-6,"julia01",elegirSonido('3','1'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#FC3DC9",-106,-187,"julia02",elegirSonido('3','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#F2B361",39,30,"julia03",elegirSonido('3','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#FDA449",-56,176,"julia04",elegirSonido('3','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#39C7CB",106,-91,"julia05",elegirSonido('3','1'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#016DF6",-160,-54,"julia06",elegirSonido('3','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#00FFF9",129,93,"julia07",elegirSonido('3','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#F2B361",-16,59,"julia08",elegirSonido('3','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#FC3DC9",141,165,"julia09",elegirSonido('3','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#39C7CB",87,-147,"julia10",elegirSonido('3','4'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#FDA449",147,57,"julia11",elegirSonido('3','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#00FFF9",38,-131,"julia12",elegirSonido('3','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#39C7CB",83,75,"julia13",elegirSonido('3','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#7DFF9B",32,-5,"julia14",elegirSonido('3','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#9F34D8",-185,160,"julia15",elegirSonido('3','4'),false);
  f.crearID();
  red.push(f);
  //
  //////////////////// 4
  f = new Figura(-1,'cubo',"#00FFF9",-139,-183,"julia01",elegirSonido('4','1'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#9F34D8",-53,91,"julia02",elegirSonido('4','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#F2B361",187,-24,"julia03",elegirSonido('4','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#FDA449",-90,15,"julia04",elegirSonido('4','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#9F34D8",-150,-74,"julia05",elegirSonido('4','1'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#016DF6",-181,-96,"julia06",elegirSonido('4','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#00FFF9",-106,31,"julia07",elegirSonido('4','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#9F34D8",74,94,"julia08",elegirSonido('4','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#FC3DC9",-181,-41,"julia09",elegirSonido('4','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#39C7CB",-57,24,"julia10",elegirSonido('4','4'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#FDA449",-101,74,"julia11",elegirSonido('4','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#9F34D8",-119,-164,"julia12",elegirSonido('4','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#39C7CB",170,146,"julia13",elegirSonido('4','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#9F34D8",-102,-45,"julia14",elegirSonido('4','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#9F34D8",169,153,"julia15",elegirSonido('4','4'),false);
  f.crearID();
  red.push(f);
  //

  //////////////////// 5
  f = new Figura(-1,'cubo',"#00FFF9",-145,-159,"julia01",elegirSonido('5','1'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#9F34D8",-106,-61,"julia02",elegirSonido('5','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#F2B361",-136,-2,"julia03",elegirSonido('5','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#FDA449",-187,72,"julia04",elegirSonido('5','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#9F34D8",-72,-21,"julia05",elegirSonido('5','1'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#016DF6",-65,186,"julia06",elegirSonido('5','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#00FFF9",29,47,"julia07",elegirSonido('5','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#9F34D8",-6,-41,"julia08",elegirSonido('5','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#FC3DC9",140,116,"julia09",elegirSonido('5','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#39C7CB",-57,24,"julia10",elegirSonido('5','4'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#FDA449",130,25,"julia11",elegirSonido('5','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#9F34D8",155,21,"julia12",elegirSonido('5','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#39C7CB",93,-142,"julia13",elegirSonido('5','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#9F34D8",-90,85,"julia14",elegirSonido('5','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#9F34D8",-70,-69,"julia15",elegirSonido('5','4'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#9F34D8",-190,-190,"julia15",elegirSonido('5','4'),false);
  f.crearID();
  red.push(f);
  //

  //////
  f = new Figura(-1,'cubo',"#EC90BF",-38,-40,"julia01",elegirSonido('1','1'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#F15733",-22,9,"julia02",elegirSonido('2','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#FC3DC9",16,-8,"julia03",elegirSonido('3','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#FDA449",-14,17,"julia04",elegirSonido('4','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#F2B361",-10,-16,"julia05",elegirSonido('5','1'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#E4BE5B",-35,29,"julia06",elegirSonido('5','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#7DFF9B",-23,5,"julia07",elegirSonido('1','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#00FFF9",-7,-22,"julia08",elegirSonido('2','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#39C7CB",-17,-31,"julia09",elegirSonido('3','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#016DF6",-15,14,"julia10",elegirSonido('4','4'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#9F34D8",9,31,"julia11",elegirSonido('5','2'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#C86DDE",-7,-33,"julia12",elegirSonido('1','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#9F34D8",-5,-7,"julia13",elegirSonido('2','5'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cubo',"#016DF6",-20,22,"julia14",elegirSonido('3','3'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#F15733",-34,14,"julia15",elegirSonido('4','4'),false);
  f.crearID();
  red.push(f);
  //
  f = new Figura(-1,'cono',"#00FFF9",-9,-12,"julia15",elegirSonido('5','4'),false);
  f.crearID();
  red.push(f);
  //
}

export function figuraPrueba(red) {
  var f;
  f = new Figura(-1, "cubo", 0x550000, 0, -10, "prueba", "../data/sonidosB/Sonido (6).wav", true);
  red.push(f);
}

export function agregarModelo(listener, f) {
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

export function agregarModelos(listener, red, modelosRed, usuario, indicesSimilitud) {
  // Paso la red a modelos 3D
  indicesSimilitud.splice(0, indicesSimilitud.length)
  for (var i = 0; i < red.length; i++) {
    red[i].calcularConexiones(red);
    indicesSimilitud.push(usuario.ecuacionDeUsuarioA(red[i]));
    modelosRed.add(agregarModelo(listener, red[i]));
    red[i].pos = modelosRed.length-1;
  }
}

export function agregarModelosCurado(listener, red, modelosRed, indicesSimilitud, usuario) {
  console.log("eran: ", red.length);
  for (var i = 0; i < red.length; i++) {
    red[i].calcularConexiones(red);
    indicesSimilitud.push(usuario.ecuacionDeUsuarioA(red[i]));
    if (indicesSimilitud[i] >= 0.5 || red[i].activo) {
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
