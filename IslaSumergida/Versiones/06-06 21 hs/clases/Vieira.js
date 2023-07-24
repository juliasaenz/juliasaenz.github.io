class Vieira extends Objeto {
  constructor(img) {
    let tx = Math.floor(random (30, 45))
    super(img, tx, tx);
    super.setNombre("vieira");
    super.setVertices(3);
    //super.setZ(0.8);

    super.setPeso(random(2,6))
  }

  dibujar() {
    push();
    rotate(this.rotacion);
    super.dibujar();
    pop();
  }

}
