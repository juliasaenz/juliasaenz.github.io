// module aliases
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Common = Matter.Common;
Body = Matter.Body;

class Cabeza {
  constructor(x, y, scale = 1, options = null) {
    var options = Common.extend(
      {
        id: 1,
        label: "cabeza",
        collisionFilter: {
          group: Body.nextGroup(true),
        },
      },
      options
    );

    this.w = 70 * scale;
    this.h = 90 * scale;
    this.body = Bodies.rectangle(x, y - 120 * scale, this.w, this.h, options);

    this.imagenes = [];
    this.imgActual = int(random(5));
    this.cargarImagenes();
  }

  cargarImagenes() {
    for (let i = 1; i <= 5; i++) {
      this.imagenes.push(loadImage("./img/cabeza0" + i + ".png"));
    }
  }

  siguienteImagen() {
    if (this.imgActual < this.imagenes.length - 1) {
      this.imgActual++;
    } else {
      this.imgActual = 0;
    }
  }

  resetearPosicion(){
    this.x = this.body.position.x;
    this.y = this.body.position.y;
    this.angle = this.body.angle;
  }

  show(debug) {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);

    if (debug) {
      rectMode(CENTER);
      fill(255, 0, 0);
      rect(0, 0, this.w, this.h);
    }

    imageMode(CENTER);
    image(this.imagenes[this.imgActual], 0, 0);
    pop();
  }

  // fin clase
}
