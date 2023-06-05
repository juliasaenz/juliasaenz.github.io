class Bandeja extends Objeto {
  constructor(img, carpetas, tamX, tamY, posX) {
    super(img, tamX, tamY);
    super.setCentro(posX, height * 0.9);
    super.setNombre("bandeja");

    this.cantidadObjetos = 0;
    this.objetosClasificados = [];
    this.carpetas = carpetas;
    this.carpeta = super.encontrarImagenPorNombre(carpetas, "vacia");
  }

  dibujar(colorcito = 127) {
    push();
    translate(this.centroX, this.centroY);
    rotate(0.2);
    image(
      this.carpeta,
      -95 * this.escala,
      -145 * this.escala,
      160 * this.escala,
      228 * this.escala
    );
    pop();

    texture(this.textura);
    textureMode(NORMAL);
    //fill(colorcito);
    beginShape();
    vertex(this.centroX - this.tamX, this.centroY - this.tamY, 0, 0);
    vertex(this.centroX - this.tamX, this.centroY + this.tamY, 0, 1);
    vertex(this.centroX + this.tamX, this.centroY + this.tamY, 1, 1);
    vertex(this.centroX + this.tamX, this.centroY - this.tamY, 1, 0);

    endShape(CLOSE);

    this.dibujarObjetosClasificados();
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
