class Pescado extends Objeto {
  constructor(img) {
    let tx = Math.floor( random(160,170));
    let ty = Math.floor( random(55,65));
    super(img, tx, ty);
    super.setNombre("pescado");
    super.setVertices(3);
    //super.setZ(5.34)

    super.setPeso(random(2,5))

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

  dibujar() {
    push();
    rotate(this.rotacion);
    super.dibujar();
    pop();
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
