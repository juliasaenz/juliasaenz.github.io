class Bandeja extends Objeto {
  constructor(img, carpetas, tamX, tamY, posX, nombre) {
    super(img, tamX, tamY);
    this.bordeSuperior = height * 0.7;
    super.setTop(posX - this.tamX / 2, this.bordeSuperior);
    super.setVertices(4);
    super.setZ(0.1);
    super.setNombre(nombre);

    this.carpetas = carpetas;
    this.carpeta = super.encontrarImagenPorNombre(carpetas, "vacia");

    if (nombre === "basura") this.carpeta = super.encontrarImagenPorNombre(carpetas, "basura");
  }

  armar() {
    super.armar();

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].lock();
    }
  }

  dibujar(debug) {
    push();
    translate(this.topX, this.topY);
    rotate(0.2);
    image(
      this.carpeta,
      10 * this.escala,
      -50 * this.escala,
      160 * this.escala,
      228 * this.escala
    );
    pop();

    super.dibujar(debug);
  }

  seleccionar() {
    if (this.nombre != "bandeja") {
      super.seleccionar();
    }
  }

  unObjetoEnBandeja(objetos) {
    let hay = true;
    objetos.forEach((obj) => {
      let parts = obj.getParticles();
      hay =
        hay &&
        (parts.some(
          (p) =>
            super.particulaEnRango(
              p.x,
              p.y,
              this.particles[this.particles.length - 4].x,
              this.particles[this.particles.length - 4].y,
              this.tamX * 0.5
            ) == true
        ) &&
          parts.some(
            (p) =>
              super.particulaEnRango(
                p.x,
                p.y,
                this.particles[this.particles.length - 3].x,
                this.particles[this.particles.length - 3].y,
                this.tamX * 0.5
              ) == true
          ));
    });

    return hay;
  }

  colisionObjetos(objetos) {
    objetos.forEach((obj) => {
      let tocando = false;
      obj.getParticles().forEach((p) => {
        tocando = tocando || p.y > this.bordeSuperior;
      });
      if (tocando) {
        obj.aplicarFuerza();
      }
    });
  }

  guardarObjeto(objetos, bandejas) {
    this.colisionObjetos(objetos.filter(
      (obj) => obj.getSeleccionado() == false
    ));
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
          console.log(
            "deberia guardar",
            objetosSeleccionados[0].getNombre(),
            "en ",
            this.nombre
          );

          objetosSeleccionados.forEach((obj) => {
            if (this.unObjetoEnBandeja([obj])) {
              console.log("estoy en bandeja!");
              obj.acomodarObjeto();
              obj.eliminar();
            }
          });
        } else {
          objetosSeleccionados.forEach(obj => {
            obj.aplicarFuerza();
          });
        }
      } else {
        objetosSeleccionados.forEach(obj => {
          obj.aplicarFuerza();
        });
      }
    }

    return objetos;
  }

  ubicarImagen(obj) {
    let img = obj.getImagen();
    let tamX = obj.getTamX() * 0.6;
    let tamY = obj.getTamY() * 0.6;
    let pos = random(this.topY - this.tamY * 0.6, this.topY + this.tamY * 0.6);

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
