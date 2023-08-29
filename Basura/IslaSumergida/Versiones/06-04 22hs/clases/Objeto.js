class Objeto {
  constructor(img, tamX, tamY) {
    this.escala = 1;
    this.centroX = random(width * 0.1, width * 0.9);
    this.centroY = random(height * 0.1, height * 0.6);
    this.nombre = "objeto";

    this.eliminado = false

    this.textura;
    this.cargarImagen(img);
    this.tamX = tamX;
    this.tamY = tamY;
    this.radio = tamX;

    this.vertices = 3;
    this.particles = [];
    this.springs = [];
    this.dureza = 1;
  }

  cargarImagen(img) {
    if (img instanceof p5.Image) {
      this.textura = img;
      //console.log("la imagen es correcta");
    } else {
      console.error("Invalid image object:", img);
    }
  }

  armar() {
  }

  encontrarImagenPorNombre(arreglo, nombre) {
    for (let i = 0; i < arreglo.length; i++) {
      if (arreglo[i][0] === nombre) {
        return arreglo[i][1];
      }
    }
    return null;
  }

  dibujar() {
    if (this.eliminado) return;
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
    if (this.eliminado) return;
  }

  mouseEnRango(pos, limite) {
    return dist(pos.x, pos.y, mouseX, mouseY) < limite;
  }

  particulaEnRango(posX1, posY1, posX2, posY2, limite) {
    if (dist(posX1, posY1, posX2, posY2) < limite) {
      //console.log("ping")
    }
    //console.log(dist(posX1, posY1, posX2, posY2), limite)
    return dist(posX1, posY1, posX2, posY2) < limite;
  }

  arrastrar() {
    if (this.eliminado) return;
  }

  eliminar() {
    this.particles.forEach(particle => {
      particle.eliminar();
      this.eliminado = true;
    });
  }

  colisionObjeto(objeto) {
    /* principalmente para bandejas */
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
  setNombre(nom) {
    this.nombre = nom;
  }
  setEscala(num) {
    this.escala = num;
  }
  setRadio(radio) {
    this.radio = radio;
  }
  getRadio() {
    return this.radio;
  }
  getVertices() {
    return this.vertices;
  }
  getImagen() {
    return this.textura;
  }
  getTamX() {
    return this.tamX
  }
  getTamY() {
    return this.tamY
  }
  getParticles() {
    return this.particles;
  }
}
