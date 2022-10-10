// module aliases
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Common = Matter.Common;
Body = Matter.Body;

class BrazoSDer {
  constructor(x, y, scale = 1, options = null) {
    var options = Common.extend(
      {
        id: 3,
        label: "brazo-der-sup",
        collisionFilter: {
          group: Body.nextGroup(true),
        },
        chamfer: {
          radius: 10 * scale,
        },
      },
      options
    );

    this.w = 30 * scale;
    this.h = 100 * scale;
    this.body = Bodies.rectangle(x + 80 * scale, y - 20 * scale, this.w, this.h, options);
    this.body.angle = -0.8;

    this.imagenes = [];
    this.imgActual = 0;
    this.cargarImagenes();
  }

  cargarImagenes() {
    for (let i = 1; i <= 5; i++) {
      this.imagenes.push(loadImage("./img/brazoSDer0" + i + ".png"));
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
