import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.122.0/examples/jsm/loaders/GLTFLoader.js';
import {Mundo} from './Mundo.js';
import {cargarModelo} from './CargarModelo.js';
import {ContextoAR} from './ContextoAR.js';

var modelo;
var mundo;
var contextoAR;

function iniciar(){
    // Creamos la escena sobre la que vamos a poner modelos 3D
    mundo = new Mundo();
    mundo.iluminar();
    contextoAR = new ContextoAR(mundo);


    // Cargamos el marcador (Para cambiarlo solo se cambia el link)
    var marcador = contextoAR.crearMarcador('./marcadores/wabi2.patt','nombreModelo');
    maceta = new THREE.Object3D();

    // Cargamos el modelo (Para cambiarlo solo se cambia el link)
    cargarModelo('./modelo/macetaF002.glb',modelo);
    // Podemos cambiar la escala, rotación y posición del modelo
    modelo.scale.x = 0.2;
    modelo.scale.y = 0.2;
    modelo.scale.z = 0.2;
    modelo.position.z = 0.7;
    // Agregamos al modelo como hijo del marcador
    marcador.add(modelo);
}

function animacion(){
    // Si quisieran animar el modelo, por ejemplo se puede hacer acá


    // Estas tres líneas tienen que quedar sí o si, hacen que se actualice la página
    requestAnimationFrame(animacion);
    contextoAR.actualizar();
    mundo.dibujar();
}


/////////////////////// Programa principal
iniciar();
animacion();
