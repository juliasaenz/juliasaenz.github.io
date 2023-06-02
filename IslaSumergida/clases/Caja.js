class Caja extends Objeto {
  constructor(x, y, radio, nombre) {
    super(radio, 1);
    super.setCentro(x, y);
    this.nombre = nombre;
    this.cantidadObjetos = 0;
    this.estado = "vacio";
  }

  armar(mundo) {
    this.particles.push(
      new Particle(
        mundo,
        this.centroX - this.radio,
        this.centroY - this.radio * 1.5
      )
    );
    this.particles.push(
      new Particle(
        mundo,
        this.centroX - this.radio,
        this.centroY + this.radio * 1.5
      )
    );
    this.particles.push(
      new Particle(
        mundo,
        this.centroX + this.radio,
        this.centroY + this.radio * 1.5
      )
    );
    this.particles.push(
      new Particle(
        mundo,
        this.centroX + this.radio,
        this.centroY - this.radio * 1.5
      )
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

    this.particles.forEach((part) => {
      part.lock();
    });
  }

  dibujar() {
    super.dibujar("#F43EDA");

    textSize(32);
    textAlign(CENTER, CENTER);
    text(this.nombre, this.centroX, this.centroY);
  }

  colisionObjeto(objetos) {
    // si el objeto es del tipo del contenedor
    let objetosSeleccionados = objetos.filter(
      (obj) => obj.getSeleccionado() == true
    ); // acá deberia agarrar los seleccionados

    textSize(32);
    fill(10);
    text(objetosSeleccionados.length, 40, 40);
    /* si todos los selecciondos coindicen con el nombre de la caja */
    if (
      objetosSeleccionados.length > 0 &&
      objetosSeleccionados.every((obj) => obj.getNombre() === this.nombre)
    ) {
      /* si colisionan */
      if (
        mouseX >= this.centroX - this.radio &&
        mouseX <= this.centroX + this.radio &&
        mouseY >= this.centroY - this.radio * 1.5 &&
        mouseY <= this.centroY + this.radio * 1.5
      ) {
        console.log("Colisión de: ", objetosSeleccionados);
        this.cantidadObjetos += objetosSeleccionados.length;
        //console.log(this.cantidadObjetos);
        /* borramos de objetos todos los seleccionados*/
        objetos = objetos.filter((obj) => !objetosSeleccionados.includes(obj));
      }
    }
    return objetos;
  }

  // fin clase
}
