class Mes {
  constructor(fondo, header, diasEspeciales, orden) {
    this.posY = height * orden;
    this.fondo = fondo;
    this.header = header;
    this.diasEspeciales = diasEspeciales;

    this.dias = [];
    this.diasSemana = [
      "lunes",
      "martes",
      "miercoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
    ];

    this.tamCelda = height * 0.15;
    this.offsetCelda = 6;
    this.posXCelda = width - this.tamCelda * 0.7;

    this.armarGrilla();
  }

  armarGrilla() {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        let x = this.posXCelda - (this.tamCelda + this.offsetCelda) * j;
        let y = this.posY + (this.tamCelda + this.offsetCelda) * i;
        this.dias.push(
          new Dia(
            x,
            y,
            this.tamCelda,
            this.offsetCelda,
            this.diasSemana[i],
            this.posY
          )
        );
      }
    }
  }

  _dibujarGrilla() {
    this.tamCelda = height * 0.15;
    this.offsetCelda = 6;
    this.posXCelda = width - this.tamCelda * 0.7;

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        let x = this.posXCelda - (this.tamCelda + this.offsetCelda) * j;
        let y = this.posY + (this.tamCelda + this.offsetCelda) * i;
        this.dias[i * 7 + j].dibujar(x, y, this.tamCelda);
        //console.log(i * 7 + j);
      }
    }
  }

  dibujar() {
    this._dibujarFondo();
    this._dibujarHeader();
    this._dibujarGrilla();
    this._dibujarEspeciales();
  }

  _dibujarEspeciales() {
    if (this.diasEspeciales.length == 0) return;
    let ancho = this.tamCelda * 1.5;
    let escala = ancho / this.diasEspeciales[0].width;
    let alto = this.diasEspeciales[0].height * escala;
    image(
      this.diasEspeciales[0],
      width * 0.52,
      this.posY + height * 0.7,
      ancho,
      alto
    );

    //console.log(this.diasEspeciales);
  }

  _dibujarHeader() {
    // Scale the image's height to a specific width
    let ancho = width * 0.4; // Specify the desired width
    let escala = ancho / this.header.width; // Calculate the scale factor
    let alto = this.header.height * escala; // Calculate the scaled height
    imageMode(CENTER);
    image(this.header, width * 0.25, this.posY + height / 2, ancho, alto);
  }

  _dibujarFondo() {
    imageMode(CORNER);
    image(
      this.fondo,
      0,
      this.posY,
      width,
      height,
      0,
      0,
      this.fondo.width,
      this.fondo.height,
      COVER
    );
  }
}
