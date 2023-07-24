class Langostilla extends Objeto {
  constructor(img) {
    let tx = Math.floor(random(30, 35));
    let ty = Math.floor(random(50, 55));
    super(img, tx, ty);
    super.setNombre("langostilla");
    super.setVertices(3);
    //super.setZ(3);

    super.setPeso(random(6,9))
  }

  dibujar() {
    push();
    rotate(this.rotacion);
    super.dibujar();
    pop();
  }
}
