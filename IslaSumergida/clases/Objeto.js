class Objeto {
  constructor(radio = 30, dureza = 0.9) {
    this.centroX = random(width*0.2, width*0.9);
    this.centroY = random(height*0.2, height*0.6);
    this.nombre = "objeto";

    this.particles = [];
    this.springs = [];

    this.ultima = 0;
    this.radio = radio;
    this.dureza = dureza;
  }

  armar(mundo) {
    this.particles.push(
      new Particle(mundo, this.centroX - this.radio, this.centroY - this.radio)
    );
    this.particles.push(
      new Particle(mundo, this.centroX - this.radio, this.centroY + this.radio)
    );
    this.particles.push(
      new Particle(mundo, this.centroX + this.radio, this.centroY + this.radio)
    );
    this.particles.push(
      new Particle(mundo, this.centroX + this.radio, this.centroY - this.radio)
    );
    this.particles.push(new Particle(mundo, this.centroX, this.centroY));
    this.springs.push(
      new Spring(mundo, this.particles[0], this.particles[1], this.dureza)
    );
    this.springs.push(
      new Spring(mundo, this.particles[0], this.particles[3], this.dureza)
    );
    this.springs.push(
      new Spring(mundo, this.particles[1], this.particles[2], this.dureza)
    );
    this.springs.push(
      new Spring(mundo, this.particles[3], this.particles[2], this.dureza)
    );

    this.springs.push(
      new Spring(mundo, this.particles[0], this.particles[4], this.dureza)
    );
    this.springs.push(
      new Spring(mundo, this.particles[1], this.particles[4], this.dureza)
    );
    this.springs.push(
      new Spring(mundo, this.particles[2], this.particles[4], this.dureza)
    );
    this.springs.push(
      new Spring(mundo, this.particles[3], this.particles[4], this.dureza)
    );

    this.ultima = this.particles.length - 1;
  }

  dibujar(colorcito = 127) {
    fill(colorcito);
    noStroke();
    beginShape();
    for (let i = 0; i < this.particles.length - 1; i++) {
      vertex(this.particles[i].x, this.particles[i].y);
    }
    endShape(CLOSE);

    this.dibujarEstructura();
    this.centroX = this.particles[this.ultima].x;
    this.centroY = this.particles[this.ultima].y;
  }

  dibujarEstructura() {
    this.particles.forEach((particle) => {
      particle.show();
    });

    this.springs.forEach((spring) => {
      spring.show();
    });
  }

  seleccionar() {
    this.seleccionado =
      dist(mouseX, mouseY, this.centroX, this.centroY) < this.radio;
  }

  arrastrar() {
    if (this.seleccionado) {
      this.particles[this.ultima].lock();
      this.particles[this.ultima].x = mouseX;
      this.particles[this.ultima].y = mouseY;
      this.particles[this.ultima].unlock();
    }
  }

  // getters y setters
  setCentro(x, y) {
    this.centroX = x;
    this.centroY = y;
  }
  setNombre(nom) {
    this.nombre = nom;
  }
  getSeleccionado() {
    return this.seleccionado;
  }
  getNombre() {
    return this.nombre;
  }
}

/*

class Objeto {
  constructor(x, y, vertices, radio, nombre) {
    this.x = x;
    this.y = y;
    this.vertices = vertices;
    this.radio = radio;
    this.dureza = 0.05;
    this.seleccionado = false;
    this.nombre = nombre;

    this.particles = [];
    this.springs = [];

    this.structureParts = [];
    this.structureSprings = [];

    ///
    this.armar();
  }

  armar() { */
/* esto lo copie del de fer */
/*  let angle = 0;
    for (let i = 0; i < this.vertices; i++) {
      angle = TWO_PI * (i / this.vertices);
      let x = this.x + cos(angle) * this.radio;
      let y = this.y + sin(angle) * this.radio;
      this.particles.push(new Particle(x, y));
    }

    for (let i = 0; i < this.vertices; i++) {
      let prev = (i - 1) % this.vertices;
      let next = (i + 1) % this.vertices;
      let nnext = (i + 4) % this.vertices;
      let nnnext = (i + 3) % this.vertices;

      this.springs.push(
        new Spring(this.particles[i], this.particles[next], this.dureza * 0.5)
      );

      this.springs.push(
        new Spring(this.particles[i], this.particles[nnext], this.dureza)
      );

      this.springs.push(
        new Spring(this.particles[i], this.particles[nnnext], this.dureza)
      );
    }
  }

  dibujar() {
    fill(255, 165, 0); // Set fill color to orange

    beginShape();
    for (let particle of this.particles) {
      vertex(particle.x, particle.y);
    }
    endShape(CLOSE);

    /*if (this.seleccionado) {
      this.x = mouseX - this.radio / 2;
      this.y = mouseY - this.radio / 2;
    }
    rect(this.x, this.y, this.radio, this.radio); // Draw the orange rectangle

    textSize(16);
    fill(0);
    text(this.nombre, this.x + this.radio / 2, this.y + this.radio / 2); */
/* }

  debug() {
    push();
    fill(0);
    for (let i = 0; i < this.springs.length; i++) {
      this.springs[i].show();

      if (this.particles[i]) this.particles[i].show();
      if (this.structureParts[i]) this.structureParts[i].show();
      if (this.structureSprings[i]) this.structureSprings[i].show();
    }
    pop();
  }

  seleccionar() {
    // solo selecciono si está dentro del rango clickeable
    let sumX = 0;
    let sumY = 0;
    for (let i = 0; i < this.verts; i++) {
      sumX += this.particles[i].x;
      sumY += this.particles[i].y;
    }
    sumX /= this.vertices;
    sumY /= this.vertices;
    this.seleccionado = dist(mouseX, mouseY, sumX, sumY) < this.radio;
  }

  deseleccionar() {
    this.seleccionado = false;
  }

  drag() {
    if (this.seleccionado) {
      this.particles[0].lock();
      this.particles[0].x += mouseX - pmouseX;
      this.particles[0].y += mouseY - pmouseY;
      this.particles[0].unlock();
    }
  }

  // getters
  getNombre() {
    return this.nombre;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getSeleccionado() {
    return this.seleccionado;
  }
} */
