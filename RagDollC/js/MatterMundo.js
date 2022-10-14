// module aliases
var Engine = Matter.Engine,
  Bodies = Matter.Bodies,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Events = Matter.Events;

class MatterMundo {
  constructor() {
    this.engine = Engine.create();
    this.engine.gravity.y = 1;
    this.engine.timing.timeScale = 0.5;
    this.mundo = this.engine.world;

    this.fondos = [];
    this.actFondo;

    this.bordes; // imagen de fondo cuando no alcanza el resize
    this.caja;  // bordes de colisiones
  }

  cargarFondo() {
    /* Carga las imagenes de fondo e inicializa la primera */
    this.bordes = loadImage("./img/carton.jpg");

    this.fondos.push(loadImage("./img/fondo01.jpg"));
    this.fondos.push(loadImage("./img/fondo02.jpg"));

    this.actFondo = this.fondos[0];
  }

  actualizar() {
    /* Actualiza la engine */

    /* Bordes cartón */
    push();
    scale(this.escalarImgAltura(this.bordes.height));
    image(this.bordes,0,0);
    image(this.bordes, innerWidth+this.bordes.width/3,0);
    pop();

    /* Fondo juego */
    push();

    let escala = this.escalarImgAltura(this.actFondo.height);
    //console.log("escala fondo: ", escala);
    translate(innerWidth/2,innerHeight/2);
    if (escala >= 1.3 ) { escala = 1.3 };
    scale(escala);
    imageMode(CENTER);
    image(this.actFondo,0, 0);
    pop();

    
    Engine.update(this.engine);
  }

  escalarImgAltura(altura){
    return innerHeight/altura;
  }

  agregarObjeto(obj) {
    /* Agregar objeto al mundo */
    Composite.add(this.mundo,obj);
  }

  armarCaja() {
    /* Arma la caja que contiene el ragdoll */
    let w = this.actFondo.width;
    let h = this.actFondo.height;
    var piso = Bodies.rectangle(width / 2, height, width, 60, { label: "piso", isStatic: true });
    var techo = Bodies.rectangle(width / 2, 0, width, 60, { label: "techo", isStatic: true });
    
    var paredDer = Bodies.rectangle(width, height / 2, 20, height, { label: "paredDer", isStatic: true });
    var paredIzq = Bodies.rectangle(0, height / 2, 20, height, { label: "paredDer", isStatic: true });
    this.caja = Composite.create({
      bodies: [piso, techo, paredDer, paredIzq]
    });
    Composite.add(this.mundo,this.caja);
  }

  dibujarParedes() {
    /* Dibuja la caja que contiene el ragdoll */
    let c = this.caja.bodies;
      noStroke(255);
      fill(255, 0, 0);
      rectMode(CENTER);
      rect(c[0].position.x,c[0].position.y,width,20); //piso
      rect(c[1].position.x,c[1].position.y,width,20); //techo
      rect(c[2].position.x,c[2].position.y,20,height); //der
      rect(c[3].position.x,c[3].position.y,20,height); //izq

  }

  activarMouse(canvas,cuerpo) {
    var canvasMouse = Mouse.create(canvas.elt); // la variable canvas.elt devuelve el mouse
    canvasMouse.pixelRatio = pixelDensity(); // Hacer que el mouse funcione en diferentes resoluciones
    var options = {
      mouse: canvasMouse,
    };
    mouseC = MouseConstraint.create(this.engine, options);
    this.agregarObjeto(mouseC);

        // an example of using mouse events on a mouse
    Events.on(mouseC, 'startdrag', function(event) {
      if(estado == "elegir"){
        //console.log('Estoy tocando tu ', event.body.label);
        cuerpo.estoyTocando(event.body.label);
      }
    });
  }
  // fin clase
}
