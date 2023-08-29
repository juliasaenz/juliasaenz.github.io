class Objeto {
  constructor(img, tamX, tamY) {
    this.escala = 1;
    this.centroX = random(width * 0.1, width * 0.9);
    this.centroY = random(height * 0.1, height * 0.6);
    this.nombre = "objeto";

    this.textura;
    this.cargarImagen(img);
    this.tamX = tamX;
    this.tamY = tamY;
    this.radio = tamX;

    this.vertices = [];
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
    this.vertices = [];

    const topLeftX = this.centroX - this.tamX * this.escala;
    const topLeftY = this.centroY - this.tamY * this.escala;
    const bottomRightX = this.centroX + this.tamX * this.escala;
    const bottomRightY = this.centroY + this.tamY * this.escala;

    this.vertices.push([topLeftX, topLeftY]);
    this.vertices.push([topLeftX, bottomRightY]);
    this.vertices.push([bottomRightX, bottomRightY]);
    this.vertices.push([bottomRightX, topLeftY]);
  }

  encontrarImagenPorNombre(arreglo, nombre) {
    for (let i = 0; i < arreglo.length; i++) {
      if (arreglo[i][0] === nombre) {
        return arreglo[i][1];
      }
    }
    return null;
  }

  dibujar(colorcito = 127) {
    this.armar();
    texture(this.textura);
    textureMode(NORMAL);
    //fill(colorcito);
    beginShape();

    vertex(this.vertices[0][0], this.vertices[0][1], 0, 0);
    vertex(this.vertices[1][0], this.vertices[1][1], 0, 1);
    vertex(this.vertices[2][0], this.vertices[2][1], 1, 1);
    vertex(this.vertices[3][0], this.vertices[3][1], 1, 0);

    endShape(CLOSE);
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
    mouseX >= this.centroX - this.tamX * this.escala &&
    mouseX <= this.centroX + this.tamX * this.escala &&
    mouseY >= this.centroY - this.tamY * this.escala &&
    mouseY <= this.centroY + this.tamY * this.escala
    //console.log("seleccionado? ", this.seleccionado);
  }

  arrastrar() {
    if (this.seleccionado) {
      this.centroX = mouseX;
      this.centroY = mouseY;
    }
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
}
