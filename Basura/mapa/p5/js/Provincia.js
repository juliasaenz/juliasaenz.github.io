var Bodies = Matter.Bodies;
Body = Matter.Body;
World = Matter.World;

class Provincia {
  constructor(nom) {
    this.nombre = nom; // nombre provincia
    this.cuerpo = null; // Matter.Bodies
    this.vertices = []; // vertices del geoJSON
    this.centro = []; // centro del geoJSON 
    this.seleccionado = false; 

    this.burbuja = new Burbuja();
  }

  crearCuerpo(vertices, world, centro) {
    /* Crea la provincia */
    // Guardar datos
    this.vertices = vertices[0];
    this.centro = centro;
    
    // Crear y guardar Bodies
    this.cuerpo = Bodies.fromVertices(centro[0], centro[1], vertices, { isStatic: true });
    Body.scale(this.cuerpo,1.5,1.5);
    //World.add(world, this.cuerpo);
    this.show();

    console.log(this.centro, this.cuerpo.position); 
  }

  show() {
    /* La dibuja con p5 */
    let pos = this.cuerpo.position;
    let angulo = this.cuerpo.angle;

   push();
    translate(pos.x,pos.y);
    rotate(angulo);

    this.estilo();
    
    beginShape();
    for (let i = 0; i < this.vertices.length; i++) {
      //vertex(this.cuerpo.vertices[i].x, this.cuerpo.vertices[i].y);
      vertex(this.vertices[i].x, this.vertices[i].y);
    }
    endShape(CLOSE);
    /*
    //centro
    fill(200, 50, 120);
    ellipse(0,0, 10, 10);
    */ 
    pop();    
  }

  estilo(){
    /* Estilo de cada provincia */
    if(this.seleccionado){
      fill("#FDF0C9");
      strokeWeight(3);
      stroke("#FFBF02"); //amarillo
      return;
    }
    fill("#FFF");
    strokeWeight(2.5);
    stroke("#FFD9E1"); //violeta
  }


  seleccionar(provincia){
    /* Seleccionar provincia */
    if(provincia == this.cuerpo.id){
      this.seleccionado = !this.seleccionado;
      return;
    } 
    this.seleccionado = false;
  }

  estaSeleccionada(){
    return this.seleccionado;
  }

  dibujarBurbuja(){
    this.burbuja.show(this.centro);
  }
}