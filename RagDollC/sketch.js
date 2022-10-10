// module aliases
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies;
(Composite = Matter.Composite), (Mouse = Matter.Mouse), (MouseConstraint = Matter.MouseConstraint), (Events = Matter.Events), (Body = Matter.Body);

/* Globales */
var mundo;
var cuerpo, box;

var mouseC;

/* Control de estados: intro // elegir // jugar // reset */
var estado = "elegir";

function preload() {
  mundo = new MatterMundo();
  mundo.cargarFondo();
}

function setup() {
  var canvas = createCanvas(720, 540);
  canvas.position(innerWidth / 2 - width / 2, innerHeight / 2 - height / 2);

  /* Armar y agregar cuerpo */
  cuerpo = new Cuerpo(1);
  mundo.agregarObjeto(cuerpo.body);

  /* Armar mundo */
  mundo.armarCaja();
  mundo.activarMouse(canvas, cuerpo, estado);

  /* Debug: se agregaron todos los bodies? */
  //console.log("Constraints en cuerpo: ", Composite.allConstraints(cuerpo.body));
  //console.log("Bodies en cuerpo: ", Composite.allBodies(cuerpo.body));
  //console.log("Constraints en mundo: ", Composite.allConstraints(mundo.mundo));
  console.log("Bodies en el mundo: ", Composite.allBodies(mundo.mundo));

  /* hm? */
}

function draw() {
  mundo.actualizar();

  /* Muestra el cuerpo */
  cuerpo.mostrar(estado);
}

function keyPressed() {
  // Cambio de elegir a jugar
   switch (estado){
      case "elegir":
         if (keyCode === RIGHT_ARROW){
            console.log("Soltando cuerpo");
            cuerpo.body.bodies.forEach((parte) => Body.setStatic(parte, false));
            estado = "jugar";
         }
         break;
      case "jugar":
         if (keyCode === LEFT_ARROW){
            resetearCuerpo(mundo,cuerpo);
         }
         break;
   }
}

function mousePressed() {
  // boxes.push(new Box(mouseX, mouseY, 60, 100,2));
}

function resetearCuerpo(mundo, cuerpo){
   console.log("Volviendo a elegir");
   estado = "reset";

   Composite.remove(mundo.mundo,cuerpo.body,true);
   console.log(cuerpo.body.bodies[0].position);
   Object.assign(cuerpo, new Cuerpo(1));
   console.log(cuerpo.body.bodies[0].position);
   mundo.agregarObjeto(cuerpo.body);

   estado = "elegir";
}
