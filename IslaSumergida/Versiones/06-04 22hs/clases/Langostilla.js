class Langostilla extends Objeto {
  constructor(img, tamX, tamY) {
    super(img, tamX, tamY);
    super.setNombre("langostilla");
  }

  armar() {
    for (let i = 0; i < this.vertices; i++) {
      let x = this.centroX;
      let y = this.centroY + i * (this.tamY / this.vertices);
      this.particles.push(new Particle(x, y));

      x = this.centroX + this.tamX;
      y = this.centroY + i * (this.tamY / this.vertices);
      this.particles.push(new Particle(x, y));
    }

    this.springs.push(
      new Spring(this.particles[0], this.particles[1], this.dureza)
    );
    this.springs.push(
      new Spring(this.particles[1], this.particles[3], this.dureza)
    );
    this.springs.push(
      new Spring(this.particles[3], this.particles[5], this.dureza)
    );
    this.springs.push(
      new Spring(this.particles[5], this.particles[4], this.dureza)
    );

    this.springs.push(
      new Spring(this.particles[4], this.particles[2], this.dureza)
    );
    this.springs.push(
      new Spring(this.particles[2], this.particles[0], this.dureza)
    );
    // criss cross
    this.springs.push(
      new Spring(this.particles[0], this.particles[5], this.dureza)
    );
    this.springs.push(
      new Spring(this.particles[1], this.particles[4], this.dureza)
    );
    // extra criss cross
    this.springs.push(
      new Spring(this.particles[0], this.particles[3], this.dureza)
    );
    this.springs.push(
      new Spring(this.particles[1], this.particles[2], this.dureza)
    );
    this.springs.push(
      new Spring(this.particles[2], this.particles[5], this.dureza)
    );
    this.springs.push(
      new Spring(this.particles[3], this.particles[4], this.dureza)
    );
    //
    this.springs.push(
      new Spring(this.particles[2], this.particles[3], this.dureza)
    );
  }

  dibujar(colorcito = 127) {
    fill(127);

    textureMode(NORMAL);
    textureWrap(CLAMP);
    texture(this.textura);

    beginShape(TRIANGLE_STRIP);

    vertex(this.particles[0].x, this.particles[0].y, 0.01, 0, 0);
    vertex(this.particles[1].x, this.particles[1].y, 0.01, 1, 0);
    vertex(this.particles[2].x, this.particles[2].y, 0.01, 0, 0.5);
    vertex(this.particles[3].x, this.particles[3].y, 0.01, 1, 0.5);
    vertex(this.particles[4].x, this.particles[4].y, 0.01, 0, 1);
    vertex(this.particles[5].x, this.particles[5].y, 0.01, 1, 1);

    endShape();
    //this.dibujarEstructura();
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
}
