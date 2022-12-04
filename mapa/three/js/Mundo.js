import * as THREE from "https://unpkg.com/three@0.121.1/build/three.module.js";
import { MapControls } from "https://unpkg.com/three@0.121.1/examples/jsm/controls/OrbitControls.js";

export class Mundo {
  constructor() {
    /////////// Escena
    this.escena = new THREE.Scene();

    /////////// Cámara
    this.camara = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 9000);
    this.camara.rotation.y = 0;
    this.camara.position.set(0, 0, 1000);

    ////////// Listener
    this.listener = new THREE.AudioListener();
    this.camara.add(this.listener);

    ////////// Renderizador
    this.renderizador = new THREE.WebGLRenderer({ antialias: true });
    this.renderizador.setPixelRatio(window.devicePixelRatio);
    this.renderizador.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderizador.domElement);

    ////////// Controles
    this.controles = null;
    this.setControles();
    /*this.controles = new OrbitControls(this.camara, this.renderizador.domElement);
    this.controles.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controles.dampingFactor = 0.05;
    this.controles.screenSpacePanning = false;
    this.controles.minDistance = 300;
    this.controles.maxDistance = 950;
    this.controles.maxPolarAngle = Math.PI / 2;
    this.controles.minPolarAngle = Math.PI / 2.5;
    this.controles.minAzimuthAngle = -0.5;
    this.controles.maxAzimuthAngle = 0.5;
    this.controles.enableRotate = false;
    this.controles.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE,
    };
    this.controles.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };*/
  }
  setControles(){
    this.controles = new MapControls( this.camara, this.renderizador.domElement );
    this.controles.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
		this.controles.dampingFactor = 0.05;
		this.controles.screenSpacePanning = true;
		this.controles.minDistance = 400;
		this.controles.maxDistance = 1000;
		
    this.controles.enableRotate = false;
    this.controles.maxPolarAngle = Math.PI / 2;
    this.controles.minPolarAngle = Math.PI / 2.5;
    this.controles.minAzimuthAngle = -0.2;
    this.controles.maxAzimuthAngle = 0.2;
  }
  agregar(figura) {
    this.escena.add(figura);
  }
  crearFondo() {
    this.escena.background = new THREE.Color(0xffffff);
    const light = new THREE.AmbientLight(0xb4afb0); //Luz
    light.position.set(-2, 2, 6);
    this.escena.add(light);

    const light2 = new THREE.AmbientLight(0x404040); // soft white light
    this.escena.add(light2);

    this.imagenFondo();
  }
  imagenFondo() {
    // Create a texture loader so we can load our image file
    var loader = new THREE.TextureLoader();

    // Load an image file into a custom material
    var material = new THREE.MeshLambertMaterial({
      map: loader.load("./assets/fondo.png"),
    });
    // create a plane geometry for the image with a width of 10
    // and a height that preserves the image's aspect ratio
    var geometry = new THREE.PlaneGeometry(3020*0.6, 3936*0.6);
    // combine our image geometry and material into a mesh
    var mesh = new THREE.Mesh(geometry, material);
    // set the position of the image mesh in the x,y,z dimensions
    mesh.position.set(0, 0, 70);
    mesh.rotation.set(0,0,0);
    // add the image to the scene
    this.escena.add(mesh);
    //console.log(mesh);
  }
  renderizar() {
    this.controles.update();
    this.renderizador.render(this.escena, this.camara);
  }
}
