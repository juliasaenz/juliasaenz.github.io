class Soga extends Objeto {
  constructor(img, tamX, tamY) {
    super(img, tamX, tamY);
    super.setNombre("basura");

    let angle = 0;
  }

  armar() {
    for (let i = 0; i < this.vertices; i++) {
      let x = this.centroX;
      let y = this.centroY + i * (this.tamY / this.vertices);
      this.particles.push(new Particle(x, y));
    }

    for (let i = 0; i < this.vertices; i++) {
      let next = (i + 1) % this.vertices;

      let fixedDureza = next == 0 ? (this.dureza *= 0.01) : this.dureza;

      this.springs.push(
        new Spring(this.particles[i], this.particles[next], fixedDureza)
      );
    }
  }

  dibujar(colorcito = 127) {
    textureMode(NORMAL);
    texture(this.textura);
    //fill(127)
    beginShape(TESS);

    for (let i = 0; i < this.particles.length - 1; i++) {
      let angle = atan2(
        this.particles[i].y - this.particles[i + 1].y,
        this.particles[i].x - this.particles[i + 1].x
      );

      angle -= PI / 2;

      let x = cos(angle) * 10 + this.particles[i].x;
      let y = sin(angle) * 10 + this.particles[i].y;

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

      vertex(x, y, 0.9, i / this.particles.length);
    }
    endShape(CLOSE);
    this.dibujarEstructura();
  }

  seleccionar() {
    let sumX = 0;
    let sumY = 0;
    for (let i = 0; i < this.vertices; i++) {
      sumX += this.particles[i].x;
      sumY += this.particles[i].y;
    }
    sumX /= this.vertices;
    sumY /= this.vertices;
    this.seleccionado = dist(mouseX, mouseY, sumX, sumY) < this.tamY;
  }
  arrastrar() {
    
    if (this.seleccionado) {
      const { index, distance } = this.particles.reduce(
        (closest, particle, index) => {
          const distToMouse = dist(particle.x, particle.y, mouseX, mouseY);
          return distToMouse < closest.distance
            ? { index, distance: distToMouse }
            : closest;
        },
        { index: -1, distance: Infinity }
      );

      if (index !== -1) {
        this.particles[index].lock();
        this.particles[index].x += mouseX - pmouseX;
        this.particles[index].y += mouseY - pmouseY;
        this.particles[index].unlock();
      }
    }
  }


  //
}
