import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js';

export class Media {
  constructor(listener) {
    this.archivos = [];
    this.cant = 1;
    this.sonidos = {};
    this.imagenes = [];
    this.cargo = false;
    this.cargando = {}
    this.cargarSonidos(listener);
    this.cargarImagenes();
    this.colores = {
      rosa: "#EC90BF",
      rosita: "#F15733",
      fucsia: "#FC3DC9",
      naranja: "#FDA449",
      anaranjado: "#F2B361",
      amarillo: "#E4BE5B",
      verde: "#7DFF9B",
      celeste: "#00FFF9",
      cian: "#39C7CB",
      azul: "#016DF6",
      violeta: "#9F34D8",
      lila: "#C86DDE"
    }
  }
  actualizar() {
    for (var key in this.cargando) {
      if (!this.cargando[key]) {
        return false;
      }
    }
    return true;
  }
  cargarImagenes() {
    for (var i = 0; i < 4; i++) {
      this.imagenes[i] = this.cargarImagen("0".concat((i + 1).toString(), "cod"));
    }
  }
  cargarImagen(nombre) {
    const loader = new THREE.TextureLoader();
    const texture = loader.load("./data/imagenes/".concat(nombre, ".png"));

    const planeGeo = new THREE.PlaneGeometry(400, 285);
    const planeMat = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    return mesh;
  }
  elegir5() {
    var lista = [];
    for (var i = 0; i < 5; i++) {
      const n = (parseInt(Math.random() * this.cant + 1)).toString();
      const clave = "a".concat((i + 1).toString(), "_", n);
      this.sonidos[clave].name = clave;
      lista.push(this.sonidos[clave]);
    }
    return lista;
  }
  cargarSonidos(listener) {
    this.guardarURLS();
    var i = 0;
    for (var key in this.sonidos) {
      console.log(key)
      this.sonidos[key] = this.cargarSonido(listener, this.archivos[i]);
      this.cargando[this.archivos[i]] = false;
      i++;
    }
  }
  cargarSonido(listener, archivo) {
    const audioLoader = new THREE.AudioLoader();
    const sonido = new THREE.PositionalAudio(listener);
    let c = this.cargando;
    audioLoader.load(archivo, function(buffer) {
      sonido.setBuffer(buffer);

      sonido.setRefDistance(0.9); // A que distancia empieza a reducir el volumen
      sonido.setRolloffFactor(1.1); // A que velocidad disminuye el volumen
      sonido.setDistanceModel("exponential");
      sonido.setMaxDistance(1000);

      sonido.setLoop(true);
      sonido.setVolume(1);
      sonido.play();
      sonido.stop();
      c[archivo] = true;
    });

    return sonido;
  }
  guardarURLS() {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < this.cant; j++) {
        this.archivos.push(this.sacarURL(i + 1, j + 1));
        const clave = "a".concat((i + 1).toString(), "_", (j + 1).toString());
        this.sonidos[clave] = {};
      }
    }
  }
  sacarURL(carpeta, archivo) {
    return "./data/sonidos/".concat(carpeta.toString(), "/Sonido (", archivo.toString(), ").mp3");
  }
  // Fin
}
