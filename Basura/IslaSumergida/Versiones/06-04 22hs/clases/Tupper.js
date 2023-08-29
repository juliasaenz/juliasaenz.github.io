class Tupper extends Objeto {
  constructor(img, tamX, tamY) {
    super(img, tamX, tamY);
    super.setNombre("basura");
  }

  armar() {
    const leftX = this.centroX - (this.tamX / 2) * this.escala;
    const topY = this.centroY - (this.tamY / 2) * this.escala;
    const rightX = this.centroX + (this.tamX / 2) * this.escala;
    const bottomY = this.centroY + (this.tamY / 2) * this.escala;

    this.particles.push(new Particle(leftX, topY));
    this.particles.push(new Particle(leftX, bottomY));
    this.particles.push(new Particle(rightX, bottomY));
    this.particles.push(new Particle(rightX, topY));

    this.springs.push(
      new Spring(this.particles[0], this.particles[1], this.dureza)
    );
    this.springs.push(
      new Spring(this.particles[1], this.particles[2], this.dureza)
    );
    this.springs.push(
      new Spring(this.particles[2], this.particles[3], this.dureza)
    );
    this.springs.push(
      new Spring(this.particles[3], this.particles[0], this.dureza)
    );
    this.springs.push(
      new Spring(this.particles[0], this.particles[2], this.dureza)
    );
    this.springs.push(
      new Spring(this.particles[1], this.particles[3], this.dureza)
    );
  }

  dibujar(colorcito = 127) {
    fill(colorcito);

    textureMode(NORMAL);
    texture(this.textura);

    this.centroX =
      this.particles[0].x - (this.particles[0].x - this.particles[2].x) * 0.5;
    this.centroY =
      this.particles[0].y - (this.particles[0].y - this.particles[2].y) * 0.5;

    push();
    translate(this.centroX, this.centroY);
    rotate(
      atan2(
        this.particles[0].y - this.particles[1].y,
        this.particles[0].x - this.particles[1].x
      )
    );

    imageMode(CENTER);
    image(this.textura, 0, 0, this.tamX, this.tamX);

    pop();

    //this.dibujarEstructura();
  }

  seleccionar() {
    this.seleccionado = this.particles.every(
      (part) => dist(mouseX, mouseY, part.x, part.y) < this.tamX
    );

    let distanc = dist(
      this.particles[0].x,
      this.particles[0].y,
      mouseX,
      mouseY
    );
    //console.log("seleccionado? ", this.seleccionado, distanc, this.tamX / 2);
  }

  arrastrar() {
    if (!this.seleccionado) return;

    this.particles[0].lock();
    this.particles[0].x = mouseX;
    this.particles[0].y = mouseY;
    this.particles[0].unlock();
  }

  colisionObjeto(objeto) {
    /* principalmente para bandejas */
  }
}
