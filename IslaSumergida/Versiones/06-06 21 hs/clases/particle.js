class Particle extends VerletParticle2D {
  constructor(x, y, w = 0.1) {
    super(x, y, w);
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
