import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.122.0/examples/jsm/loaders/GLTFLoader.js';

export function cargarModelo(archivo,modelo){
    var loader = new GLTFLoader();
    loader.load( archivo, function ( gltf ) {
        modelo.add(gltf.scene);
        document.getElementsByClassName("arjs-loader")[0].style.display='none'
    });
}
