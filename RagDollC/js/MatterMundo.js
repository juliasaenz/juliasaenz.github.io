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

    this.bordes;
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
    image(this.bordes, width+this.bordes.width/3,0);
    pop();

    /* Fondo juego */
    push();
    translate(width/2,height/2);
    scale(this.escalarImgAltura(this.actFondo.height));
    imageMode(CENTER);
    image(this.actFondo,0, 0);
    pop();

    
    Engine.update(this.engine);
  }

  escalarImgAltura(altura){
    return height/altura;
  }

  agregarObjeto(obj) {
    /* Agregar objeto al mundo */
    Composite.add(this.mundo,obj);
  }

  armarCaja() {
    /* Arma la caja que contiene el ragdoll */
    var piso = Bodies.rectangle(width / 2, height, width, 60, { label: "piso", isStatic: true });
    var techo = Bodies.rectangle(width / 2, 0, width, 60, { label: "techo", isStatic: true });
    var paredDer = Bodies.rectangle(width, height / 2, 60, height, { label: "paredDer", isStatic: true });
    var paredIzq = Bodies.rectangle(0, height / 2, 60, height, { label: "paredDer", isStatic: true });
    var caja = Composite.create({
      bodies: [piso, techo, paredDer, paredIzq]
    });
    Composite.add(this.mundo,caja);
  }

  dibujarPared(pared) {
    /* Dibuja la caja que contiene el ragdoll */
    noStroke(255);
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(pared.position.x, pared.position.y, width, 20);
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
