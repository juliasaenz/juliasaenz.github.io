class Vieira extends Objeto {
  constructor(img, tamX, tamY) {
    super(img, tamX, tamY);
    super.setNombre("vieira");
  }

  armar() {
    this.particles = [];
    this.springs = [];
    this.particles.push(new Particle(this.centroX, this.centroY))
    this.particles.push(new Particle(this.centroX + this.tamX, this.centroY))
    this.springs.push(new Spring(this.particles[0], this.particles[1], 0.5))
  }

  dibujar(colorcito = 127) {
    push();

    this.centroX = this.particles[0].x - (this.particles[0].x - this.particles[1].x) * 0.5;
    this.centroY = this.particles[0].y - (this.particles[0].y - this.particles[1].y) * 0.5;

    translate(this.centroX, this.centroY);
    rotate(atan2(this.particles[0].y - this.particles[1].y, this.particles[0].x - this.particles[1].x))
    imageMode(CENTER);
    image(this.textura, 0, 0, this.tamX, this.tamX);
    pop();
    //this.dibujarEstructura();
  }

  seleccionar() {
    this.seleccionado = dist(mouseX, mouseY, this.centroX, this.centroY) < this.tamX;
  }

  arrastrar() {
    if(!this.seleccionado) return;
    
    this.particles[0].lock();
    this.particles[0].x += mouseX - pmouseX;
    this.particles[0].y += mouseY - pmouseY;
    this.particles[0].unlock();
  }
}
