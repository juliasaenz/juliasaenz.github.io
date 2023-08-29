import * as THREE from "https://unpkg.com/three@0.121.1/build/three.module.js";
const extrudeSettings = { depth: 2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

export class Provincia {
  constructor(prov) {
    this.nombre = prov.nombre;
    this.puntos = prov.puntos; // los que copie de p5
    this.vectores = [];
    this.figura;
    this.mesh; 
    this.color = prov.color;
    this.seleccionado = false;
    this.contador = new Contador();
  }
  crearVector(pos) {
   /*let px = (pos[1]+180)*(window.innerWidth/360);
   const latRad = pos[0]*Math.PI/180;
   const mercN = Math.log(Math.tan((Math.PI/4)+(latRad/2)));
   let py = (window.innerHeight/2)-(window.innerWidth*mercN/(2*Math.PI));*/
   let px = pos[0];
   let py = pos[1];
    return new THREE.Vector2(px, py);
  }
  crearFigura(offset) {
    this.puntos.forEach((punto) => {
      this.vectores.push(this.crearVector(punto));
    });
    this.figura = new THREE.Shape(this.vectores);

    
    let geometry = new THREE.ExtrudeGeometry(this.figura, extrudeSettings);

    this.mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: this.color }));
    this.mesh.position.set(offset[0], offset[1], 100);
    this.mesh.rotation.set(3.08, 0, 0);
    return this.mesh;
  }
  crearLinea(offset){
   this.figura.autoClose = true;
   const points = this.figura.getPoints();
   const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );
   let line = new THREE.Line( geometryPoints, new THREE.LineBasicMaterial( { color: 0xFFFFFF, linewidth: 5, linecap: 'round', alphaToCoverage: true,} ) );
		line.position.set( offset[0], offset[1], 101 );
		line.rotation.set( 3.08, 0, 0);
   return line
  }
  getID(){
   return this.mesh.id;
  }
  getFigura() {
    return this.figura;
  }
  seleccionar(id, tema){
   if(tema == undefined || String(tema).length == 0){
   if(this.mesh.id == id){
      this.seleccionado = !this.seleccionado;
   } else {
      this.seleccionado = false;
   }
   }

   if(this.seleccionado){
      this.mesh.material.color.set(0xFFBF02);
      //this.mesh.position.z = 101;
      this.contador.hacerVisible();
   } else {
      this.mesh.material.color.set(this.color);
      this.contador.hacerInvisible();
   }
   
   this.contador.actualizarTema(tema);
  }
  crearCirculo(datos){
      return this.contador.crearCirculo(datos, this.mesh);
  }
}


//////////////
export class Contador{
   constructor(){
      this.circle = null;
      this.datos = {};
      this.colores = {
         todos: 0xe3e3e3,
         tema1: 0xff0000,
         tema2: 0xf0ff00,
         tema3: 0x00ffff,
         tema4: 0xffdfd0,
         tema5: 0x5f5f50,
         tema6:0xf6f3E0
      }
   }
   actualizarTema(tema){
      let nueCol = this.colores[tema];
      console.log("nueCol: ", nueCol)
      if(nueCol != undefined){
         console.log("ping")
         if(String(nueCol).length > 0){
         
         this.circle.material.color.set(this.colores[tema]);
         console.log(this.circle.material);
      }
      } 
   }
   hacerVisible(){
      this.circle.visible = true;
   }
   hacerInvisible(){
      this.circle.visible = false;
   }
   crearCirculo(datos, mesh){
      this.datos = {
         tema1: 15, 
         tema2: 3,
         tema3: 7,
         tema4: 8,
         tema5: 2,
         tema6: 1
      }

      const geometry = new THREE.CircleGeometry( 9, 36);
      const material = new THREE.MeshBasicMaterial( { color: this.colores.tema2} );
      this.circle = new THREE.Mesh( geometry, material );
      this.circle.position.set(mesh.position.x, mesh.position.y, mesh.position.z + 20);
      this.circle.visible = false;
      return this.circle;
   }
}