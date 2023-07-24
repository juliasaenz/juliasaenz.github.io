class Coral extends Objeto {
  constructor(img) {
    let tx = Math.floor(random(50,85))
    super(img, tx, tx);
    super.setNombre("coral");
    super.setVertices(3);
    //super.setZ(0.3);

    super.setPeso(random(6,11));
  }

  dibujar() {
    push();
    rotate(this.rotacion);
    super.dibujar();
    pop();
  }
}
