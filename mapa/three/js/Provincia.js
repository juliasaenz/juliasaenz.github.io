import * as THREE from "https://unpkg.com/three@0.121.1/build/three.module.js";
const extrudeSettings = { depth: 30, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

export class Provincia {
  constructor(prov) {
    this.nombre = prov.nombre;
    this.puntos = prov.puntos; // los que copie de p5
    this.vectores = [];
    this.figura;
    this.mesh; 
    this.color = 0xFFFFFF;
    this.seleccionado = false;
  }
  crearVector(pos) {
   /*let px = (pos[1]+180)*(window.innerWidth/360);
   const latRad = pos[0]*Math.PI/180;
   const mercN = Math.log(Math.tan((Math.PI/4)+(latRad/2)));
   let py = (window.innerHeight/2)-(window.innerWidth*mercN/(2*Math.PI));*/
   let px = pos[0];
   let py = pos[1];
    return new THREE.Vector2(px, py);
  }11
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
   let line = new THREE.Line( geometryPoints, new THREE.LineBasicMaterial( { color: 0xFFBF02, linewidth: 5, linecap: 'round', alphaToCoverage: true,} ) );
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
  seleccionar(id){
   if(this.mesh.id == id){
      this.seleccionado = !this.seleccionado;
   } else {
      this.seleccionado = false;
   }

   if(this.seleccionado){
      this.color = 0xFFBF02;
      this.mesh.position.z = 115;
   } else {
      this.mesh.position.z = 100;
      this.color = 0xFFFFFF;
   }
   this.mesh.material.color.set(this.color);
  }
}
