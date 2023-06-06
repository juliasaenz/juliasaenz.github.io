class Rope {
  constructor(x, y, l, n, img) {
    this.x = x;
    this.y = y;
    this.length = l;
    this.verts = n;
    this.dureza = 1;
    this.onSelect = false;

    this.img = img;

    this.particles = [];
    this.springs = [];

    this.construirCabo();
    // this.construirEstructura(); NO FUNCA BIEN TODAVÍA
  }

  construirCabo() {
    let angle = 0;
    for (let i = 0; i < this.verts; i++) {
      let x = this.x;
      let y = this.y + i * (this.length / this.verts);
      this.particles.push(new Particle(x, y));
    }

    for (let i = 0; i < this.verts; i++) {
      let next = (i + 1) % this.verts;

      let fixedDureza = next == 0 ? (this.dureza *= 0.025) : this.dureza;

      this.springs.push(
        new Spring(this.particles[i], this.particles[next], fixedDureza)
      );
    }
  }

  dibujar() {
    textureMode(NORMAL);
    texture(this.img);

    beginShape(TESS);

    for (let i = 0; i < this.particles.length - 1; i++) {
      let angle = atan2(
        this.particles[i].y - this.particles[i + 1].y,
        this.particles[i].x - this.particles[i + 1].x
      );

      angle -= PI / 2;

      let x = cos(angle) * 10 + this.particles[i].x;
      let y = sin(angle) * 10 + this.particles[i].y;

      // fill(0,0,i/this.particles.length * 255)
      //ellipse(x, y, 5);
      // TODO:
      // Lo que hay que hacer es corregir el UV, sobre todo el V
      // Una forma de calcularlo podría ser:
      //   A partir del ángulo con la particula siguiente, delimitar
      //   cuál es el vértice + próximo.
      vertex(x, y, 0.1, i / this.particles.length);
    }

    for (let i = this.particles.length - 2; i >= 0; i--) {
      if (!this.particles[i + 1]) console.log(i);

      let angle = atan2(
        this.particles[i].y - this.particles[i + 1].y,
        this.particles[i].x - this.particles[i + 1].x
      );

      angle += PI / 2;

      let x = cos(angle) * 10 + this.particles[i].x;
      let y = sin(angle) * 10 + this.particles[i].y;

      // fill(0,0,i/this.particles.length * 255)
      //ellipse(x, y, 5);
      vertex(x, y, 0.9, i / this.particles.length);
    }

    /*
      vertex(0, 0, 0, 0);
      vertex(100, 0, 1, 0);
      vertex(100, 100, 1, 1);
      vertex(0, 100, 0, 1);
      */
    endShape(CLOSE);
  }

  debug() {
    push();
    fill(0);
    for (let i = 0; i < this.springs.length; i++) {
      this.springs[i].show();

      if (this.particles[i]) this.particles[i].show();
    }
    pop();
  }

  seleccionar() {
    let sumX = 0;
    let sumY = 0;
    for (let i = 0; i < this.verts; i++) {
      sumX += this.particles[i].x;
      sumY += this.particles[i].y;
    }
    sumX /= this.verts;
    sumY /= this.verts;
    this.onSelect = dist(mouseX, mouseY, sumX, sumY) < this.length;
  }

  drag() {
    if (this.onSelect) {
      this.particles[0].lock();
      this.particles[0].x += mouseX - pmouseX;
      this.particles[0].y += mouseY - pmouseY;
      this.particles[0].unlock();
    }
  }
}
