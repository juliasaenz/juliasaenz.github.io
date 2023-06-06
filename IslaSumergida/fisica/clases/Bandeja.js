class Bandeja extends Objeto {
  constructor(img, carpetas, tamX, tamY, posX) {
    super(img, tamX, tamY);
    super.setCentro(posX, height * 0.7);
    super.setNombre("bandeja");

    this.cantidadObjetos = 0;
    this.objetosClasificados = [];
    this.carpetas = carpetas;
    this.carpeta = super.encontrarImagenPorNombre(carpetas, "vacia");
  }

  armar() {
    for (let i = 0; i < this.vertices; i++) {
      let x = this.centroX - this.tamX/2;
      let y = this.centroY + i * (this.tamY / this.vertices);
      this.particles.push(new Particle(x, y));

      x = this.centroX + this.tamX/2;
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

    for (let i = 0; i < this.particles.length; i++){
      this.particles[i].lock();
    }


  }

  dibujar(colorcito = 127) {
    push();
    translate(this.centroX, this.centroY);
    rotate(0.2);
    image(
      this.carpeta,
      -70 * this.escala,
      -40 * this.escala,
      160 * this.escala,
      228 * this.escala
    );
    pop();

    fill(127)

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
    this.dibujarEstructura();
  }

  seleccionar() {
    if (this.nombre != "bandeja") {
      super.seleccionar();
    }
  }

  guardarObjetoB(objetos, bandejas) {
    /* cuales son los objetos seleccionados */
    let objetosSeleccionados = objetos.filter(
      (obj) => obj.getSeleccionado() == true
    );

    if (objetosSeleccionados.length == 0) {
      /* si no seleccione nada */
      return objetos;
    }

    if (this.unObjetoEnBandeja(objetosSeleccionados)) {
      console.log("un objeto en bandeja");
      /* si todos los selecciondos tienen el mismo nombre */
      if (
        objetosSeleccionados.every(
          (obj) => obj.getNombre() === objetosSeleccionados[0].getNombre()
        )
      ) {
        /* si no había asignado tipo de objeto a la bandeja y no hay ninguna de ese tipo */
        if (
          this.nombre === "bandeja" &&
          bandejas.every(
            (band) => band.getNombre() != objetosSeleccionados[0].getNombre()
          )
        ) {
          /* si no había asignado tipo de bandeja y todos los objetos son del mismo tipo */
          this.nombre = objetosSeleccionados[0].getNombre();
          this.actualizarCarpeta(objetosSeleccionados[0].getNombre());
        }
        if (this.nombre === objetosSeleccionados[0].getNombre()) {
          /* si los objetos coinciden con la bandeja */
          
          let objetosPerdidos = []; // para los objetos que quedan fuera de la bandeja
          objetosSeleccionados.forEach((obj) => {
            if (this.unObjetoEnBandeja([obj])) {
              this.objetosClasificados.push(obj);
              obj.eliminar();
              this.cantidadObjetos++;
            } else {
              objetosPerdidos.push(obj);
            }
          });
          //console.log(this.objetosClasificados.length);

          objetos = objetos.filter(
            (obj) => !objetosSeleccionados.includes(obj)
          );

          objetosPerdidos.forEach(obj => {
            objetos.push(obj);
          });
        }
      }
    }
    return objetos;
  }

  unObjetoEnBandeja(objetos) {
    let hay = false;
    objetos.forEach((obj) => {
      let parts = obj.getParticles();
      hay =
        hay ||
        parts.some(
          (p) =>
            super.particulaEnRango(
              p.x,
              p.y,
              this.centroX,
              this.centroY,
              this.tamX/2
            ) == true
        );
    });

    return hay;
  }

  guardarObjeto(objetos, bandejas) {
    /* cuales son los objetos seleccionados */
    let objetosSeleccionados = objetos.filter(
      (obj) => obj.getSeleccionado() == true
    );

    if (objetosSeleccionados.length == 0) {
      /* si no seleccione nada */
      return objetos;
    }

    /* si hay colision */
    if (
      mouseX >= this.centroX - this.tamX * this.escala &&
      mouseX <= this.centroX + this.tamX * this.escala &&
      mouseY >= this.centroY - this.tamY * this.escala &&
      mouseY <= this.centroY + this.tamY * this.escala
    ) {
      /* si todos los selecciondos tienen el mismo nombre */
      if (
        objetosSeleccionados.every(
          (obj) => obj.getNombre() === objetosSeleccionados[0].getNombre()
        )
      ) {
        /* si no había asignado tipo de objeto a la bandeja y no hay ninguna de ese tipo */
        if (
          this.nombre === "bandeja" &&
          bandejas.every(
            (band) => band.getNombre() != objetosSeleccionados[0].getNombre()
          )
        ) {
          /* si no había asignado tipo de bandeja y todos los objetos son del mismo tipo */
          this.nombre = objetosSeleccionados[0].getNombre();
          this.actualizarCarpeta(objetosSeleccionados[0].getNombre());
        }
        if (this.nombre === objetosSeleccionados[0].getNombre()) {
          /* si los objetos coinciden con la bandeja */
          //console.log("Colision de: ", objetosSeleccionados, this.nombre);
          this.cantidadObjetos += objetosSeleccionados.length;

          objetosSeleccionados.forEach((obj) => {
            this.objetosClasificados.push(obj);
            obj.eliminar();
          });
          //console.log(this.objetosClasificados.length);

          objetos = objetos.filter(
            (obj) => !objetosSeleccionados.includes(obj)
          );
        }
      }
    }

    return objetos;
  }

  ubicarImagen(obj) {
    let img = obj.getImagen();
    let tamX = obj.getTamX() * 0.6;
    let tamY = obj.getTamY() * 0.6;
    let pos = random(
      this.centroY - this.tamY * 0.6,
      this.centroY + this.tamY * 0.6
    );

    imageMode(CENTER);
    image(img, pos, pos, tamX, tamY);
  }

  actualizarCarpeta(nom) {
    this.carpeta = super.encontrarImagenPorNombre(this.carpetas, nom);
  }

  infografia() {
    textSize(32);
    fill(10);
    textFont(fuente);
    let str = "acá iría la infografía de " + this.nombre;
    text(str, width * 0.5, height * 0.5);
    text("click para volver al juego", width * 0.5, height * 0.6);
  }

  dibujarObjetosClasificados() {
    this.objetosClasificados.forEach((obj) => {
      obj.dibujar();
    });
  }

  // fin clase
}
