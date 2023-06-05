class Particle extends VerletParticle2D {
  constructor(x, y) {
    super(x, y);
    this.r = 2;
    mundo.addParticle(this);
  }

  show() {
    fill(0);
    circle(this.x, this.y, this.r * 2);
  }

  eliminar() {
    mundo.removeParticle(this);
  }
}
