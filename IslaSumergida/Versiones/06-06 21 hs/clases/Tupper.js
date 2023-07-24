class Tupper extends Objeto {
  constructor(img) {
    let tx = Math.floor(random(60,85))
    super(img, tx, tx);
    super.setNombre("basura");
    super.setVertices(3);
    super.setZ(0.7);

    super.setPeso(random(4,6));

  }

  dibujar() {
    push();
    rotate(this.rotacion);
    super.dibujar();
    pop();
  }
}
