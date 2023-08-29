class Soga extends Objeto {
  constructor(img) {
    let tx = Math.floor( random( 15, 18));
    let ty = Math.floor(random(75, 90));
    super(img, tx,ty);
    super.setNombre("basura");
    super.setVertices(18);
    //super.setZ(0.06);

    this.dureza = 0.2

  }

  armar() {
    for (let i = 0; i < this.vertices; i++) {
      let x = this.topX;
      let y = this.topY + i * (this.tamY / (this.vertices-1));
      this.particles.push(new Particle(x, y));

      x = this.topX + this.tamX;
      y = this.topY + i * (this.tamY / (this.vertices-1));
      this.particles.push(new Particle(x, y));
    }
    for (let i = 0; i < this.particles.length - 2; i++) {
      this.springs.push(new Spring(this.particles[i], this.particles[i + 2], 1)); //lados
    }
    this.springs.push(new Spring(this.particles[0], this.particles[1], 1)); //arriba
    this.springs.push(new Spring(this.particles[this.particles.length-2], this.particles[this.particles.length-1], 1)); //abajo
    // criss cross
    this.springs.push(
      new Spring(this.particles[0], this.particles[this.particles.length -1], this.dureza*0.5)
    );
    this.springs.push(
      new Spring(this.particles[1], this.particles[this.particles.length-2], this.dureza*0.5)
    );

    if (this.vertices > 2) {
      //extra criss cross
      for (let i = 0; i < this.particles.length -2; i += 2) {
        this.springs.push(
          new ConstrainSpring(this.particles[i], this.particles[i+1], this.dureza)
        );
      }
    }

  }

  seleccionar() {
    if (this.eliminado) return;
   
    let cercaLados = false;
    for (let i = 2; i < this.particles.length-2; i++) {
      cercaLados = cercaLados || this.mouseEnRango(this.particles[i], this.tamX)
    }


    let cercaArriba =
      this.mouseEnRango(this.particles[0], this.tamY) &&
      this.mouseEnRango(this.particles[1], this.tamY) &&
      this.mouseEnRango(this.particles[this.particles.length-2], this.tamY) &&
      this.mouseEnRango(this.particles[this.particles.length-1], this.tamY);

    this.seleccionado = cercaArriba && cercaLados;
  }

  //
}
