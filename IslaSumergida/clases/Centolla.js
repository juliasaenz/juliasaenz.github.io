class Centolla extends Objeto {
    constructor(img, tamX, tamY) {
      super(img, tamX, tamY);
      super.setCentro(random(width * 0.1, width * 0.9), random(height * 0.1, height * 0.55))
      
      super.setNombre("centolla");
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
  