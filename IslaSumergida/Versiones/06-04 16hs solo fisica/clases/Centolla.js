class Centolla extends Objeto {
  constructor(imgArr, tamX, tamY) {
    super(imgArr[0], tamX, tamY);
    super.setCentro(
      random(width * 0.1, width * 0.9),
      random(height * 0.1, height * 0.55)
    );

    super.setNombre("centolla");

    this.pata = imgArr[1];

    this.pPata = [["derechaAbajo", [], []]];
  }

  armar() {
    for (let i = 0; i < this.vertices; i++) {
      let x = this.centroX;
      let y = this.centroY + i * (this.tamY / this.vertices);
      this.particles.push(new Particle(x, y));

      x = this.centroX + this.tamX;
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

    this.armarPataDerecha();
  }

  armarPataDerecha() {
    let posX = this.particles[5].x - 30;
    let posY = this.particles[5].y - 20;

    this.pPata[0][1].push(new Particle(posX, posY));

    this.pPata[0][1].push(
      new Particle(posX + this.tamY/3, posY)
    );

    this.pPata[0][1].push(
      new Particle(posX + this.tamY / 3, posY + this.tamY/3)
    );

    this.pPata[0][1].push(new Particle(posX, posY + this.tamY/3));

    
    this.pPata[0][2].push(
      new Spring(this.pPata[0][1][0], this.pPata[0][1][1], 1)
    );
    this.pPata[0][2].push(
      new Spring(this.pPata[0][1][1], this.pPata[0][1][2], 1)
    );
    this.pPata[0][2].push(
      new Spring(this.pPata[0][1][2], this.pPata[0][1][3], 1)
    );
    this.pPata[0][2].push(
      new Spring(this.pPata[0][1][3], this.pPata[0][1][0], 1)
    );
    this.pPata[0][2].push(
      new Spring(this.pPata[0][1][0], this.pPata[0][1][2], 1)
    );
    this.pPata[0][2].push(
      new Spring(this.pPata[0][1][1], this.pPata[0][1][3], 1)
    );
  }

  dibujarPataDerecha() {
    //let particulas = this.particulasPata[0][1];
    fill(127);

    textureMode(NORMAL);
    textureWrap(CLAMP);
    //texture(this.pata);
    let posX = this.particles[5].x - 10;
    let posY = this.particles[5].y - 20;

    beginShape();

    /*vertex(posX, posY, 0.1, 1, 1);
    vertex(posX + this.tamY / 3, posY, 0.01, 1, 0);
    vertex(posX + this.tamY / 3, posY + this.tamY / 3, 0.01, 0, 0);
    vertex(posX, posY + this.tamY / 3, 0.01, 0, 1); */

    vertex(this.pPata[0][1][0].x, this.pPata[0][1][0].y)
    vertex(this.pPata[0][1][1].x, this.pPata[0][1][1].y)
    vertex( this.pPata[0][1][2].x, this.pPata[0][1][2].y)
    vertex( this.pPata[0][1][3].x, this.pPata[0][1][3].y)

    endShape();

    this.pPata[0][1].forEach((particle) => {
      //particle.show();
    });

    this.pPata[0][2].forEach((spring) => {
      spring.show();
    });

    this.pPata[0][1][0].lock();
    this.pPata[0][1][0].x = this.particles[5].x;
    this.pPata[0][1][0].y = this.particles[5].y;
    this.pPata[0][1][0].unlock();
  }

  dibujar(colorcito = 127) {
    this.dibujarPataDerecha(this.particles[1]);

    fill(127);

    textureMode(NORMAL);
    textureWrap(CLAMP);
    texture(this.textura);

    beginShape(TRIANGLE_STRIP);

    vertex(this.particles[0].x, this.particles[0].y, 0.01, 0, 0);
    vertex(this.particles[1].x, this.particles[1].y, 0.01, 1, 0);
    vertex(this.particles[4].x, this.particles[4].y, 0.01, 0, 1);
    vertex(this.particles[5].x, this.particles[5].y, 0.01, 1, 1);

    endShape(CLOSE);
    this.dibujarEstructura();
  }

  seleccionar() {
    let cercaLados =
      super.mouseEnRango(this.particles[2], this.tamX) &&
      super.mouseEnRango(this.particles[3], this.tamX);

    let cercaArriba =
      super.mouseEnRango(this.particles[0], this.tamY) &&
      super.mouseEnRango(this.particles[1], this.tamY) &&
      super.mouseEnRango(this.particles[4], this.tamY) &&
      super.mouseEnRango(this.particles[5], this.tamY);

    console.log(cercaLados);

    this.seleccionado = cercaLados && cercaArriba;
  }

  arrastrar() {
    if (this.seleccionado) {
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].lock();

        this.particles[i].x += mouseX - pmouseX;
        this.particles[i].y += mouseY - pmouseY;

        this.particles[i].unlock();
      }

      /*this.particles[2].lock();
      
      this.particles[2].unlock(); */
    }
  }
}
