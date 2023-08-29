class Pescado extends Objeto {
  constructor(img, tamX, tamY) {
    super(img, tamX, tamY);
    super.setNombre("pescado");
    super.setVertices(3);

    this.dureza = 0.5
  }

  armar() {
    for (let i = 0; i < this.vertices; i++) {
      let x = this.topX + i * (this.tamX / (this.vertices-1));
      let y = this.topY;
      this.particles.push(new Particle(x, y));

      x = this.topX + i * (this.tamX / (this.vertices-1));
      y = this.topY + this.tamY;
      this.particles.push(new Particle(x, y));
    }
    for (let i = 0; i < this.particles.length - 2; i++) {
      this.springs.push(new Spring(this.particles[i], this.particles[i + 2], this.dureza)); //lados
    }
    this.springs.push(new Spring(this.particles[0], this.particles[1], this.dureza)); //arriba
    this.springs.push(new Spring(this.particles[this.particles.length-2], this.particles[this.particles.length-1], this.dureza)); //abajo

    // criss cross
    this.springs.push(
      new ConstrainSpring(this.particles[0], this.particles[this.particles.length -1], this.dureza)
    );
    this.springs.push(
      new ConstrainSpring(this.particles[1], this.particles[this.particles.length-2], this.dureza)
    );

    if (this.vertices > 2) {
      //extra criss cross
      for (let i = 2; i < this.particles.length -2; i += 2) {
        this.springs.push(
          new Spring(this.particles[i], this.particles[i+1], this.dureza)
        );
      }
    }
  }



  seleccionar() {
    
    if (this.eliminado) return;
   
    let cercaArriba = true;
    for (let i = 2; i < this.particles.length-2; i++) {
      cercaArriba = cercaArriba && this.mouseEnRango(this.particles[i], this.tamY)
    }

    
    let cercaLados =
      this.mouseEnRango(this.particles[0], this.tamX) &&
      this.mouseEnRango(this.particles[1], this.tamX) &&
      this.mouseEnRango(this.particles[this.particles.length-2], this.tamX) &&
      this.mouseEnRango(this.particles[this.particles.length-1], this.tamX);

    this.seleccionado = cercaLados && cercaArriba;
  }


}
