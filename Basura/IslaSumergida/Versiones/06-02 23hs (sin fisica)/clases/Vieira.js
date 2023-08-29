class Vieira extends Objeto {
  constructor(img, tamX, tamY) {
    super(img, tamX, tamY);
    super.setNombre("vieira");
  }

  dibujar(colorcito = 127) {
    texture(this.textura);
    textureMode(NORMAL);
    //fill(colorcito);
    beginShape();
    vertex(this.centroX - this.tamX* this.escala, this.centroY - this.tamY* this.escala, 0, 0);
    vertex(this.centroX - this.tamX* this.escala, this.centroY + this.tamY* this.escala, 0, 1);
    vertex(this.centroX + this.tamX* this.escala, this.centroY + this.tamY* this.escala, 1, 1);
    vertex(this.centroX + this.tamX* this.escala, this.centroY - this.tamY* this.escala, 1, 0);

    endShape(CLOSE);
  }
}
