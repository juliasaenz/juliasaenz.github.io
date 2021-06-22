import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';

export class Mundo{
    // Aca creamos la escena 3D, con sus luces cámaras y etc
    constructor(){
        // Cámara (desde donde se ve)
        this.camara = new THREE.PerspectiveCamera();
        this.camara.position.set(0,0,0);

        // La escena 3D sobre la que se dibujan todos los modelos
        this.escena = new THREE.Scene();
        this.escena.add(this.camara); //---- la camara tiene que estar adentro de la escena para moverse con la escena

        // Renderizador, es el que hace que se dibujen las cosas
        this.renderizador = new THREE.WebGLRenderer({antialias:true,alpha:true}); //---- el renderer tiene que tener alpha:true
        this.renderizador.setPixelRatio( window.devicePixelRatio );
        this.renderizador.setSize( window.innerWidth, window.innerHeight );

        // Agregamos el renderizador a la página
        document.body.appendChild( this.renderizador.domElement );
    }

    iluminar(){
        // Las luces en la escena

        var light = new THREE.AmbientLight( 0xfafafa);
        this.escena.add( light ); // SIEMPRE tienen que agregarse a la escena para poder verlas

        var puntual = new THREE.PointLight( 0xF0F2A6, 0.5, 60 );
        puntual.position.set( 1, 1.5, 1.2 );
        this.escena.add( puntual );
    }

    dibujar(){
        // Esto hace que efectivamente se rendericen los modelos, cámara, luces, etc
        this.renderizador.render(this.escena,this.camara);
    }

}
