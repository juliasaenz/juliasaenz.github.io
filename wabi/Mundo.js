import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';

export class Mundo{
    constructor(){
        //this.camara = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
        this.camara = new THREE.PerspectiveCamera();
        this.camara.position.set(0,0,0);//---- la camara se inicializa en 0,0,0
        this.escena = new THREE.Scene();
        this.escena.add(this.camara);//---- la camara tiene que estar adentro de la escena para moverse con la escena
        this.renderizador = new THREE.WebGLRenderer({antialias:true,alpha:true});//---- el renderer tiene que tener alpha:true
        this.renderizador.setPixelRatio( window.devicePixelRatio );
        this.renderizador.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderizador.domElement );
    }

    iluminar(){
        var light = new THREE.AmbientLight( 0xffffff); // soft white light
        this.escena.add( light );

        var puntual = new THREE.PointLight( 0xF0F2A6, 0.5, 60 );
        puntual.position.set( 1, 1.5, 1.2 );
        this.escena.add( puntual );

      /*
        puntual = new THREE.PointLight( 0xffaa00, 1, 100 );
       puntual.position.set( -1, 1.5, 1.2 );
       this.escena.add( puntual );

       puntual = new THREE.PointLight( 0xff00ff, 1, 100 );
      puntual.position.set( 1, -1.5, 1.2 );
      this.escena.add( puntual );

      puntual = new THREE.PointLight( 0xffffff, 1, 100 );
     puntual.position.set( 1, -1.5, -1.2 );
     this.escena.add( puntual ); */
    }


    dibujar(){
        this.renderizador.render(this.escena,this.camara);
    }

}
