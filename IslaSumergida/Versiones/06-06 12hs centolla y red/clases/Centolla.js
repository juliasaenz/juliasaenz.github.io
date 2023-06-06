class Centolla extends Objeto {
  constructor(imgArr) {
    let tx = Math.floor(random(120, 120));
    let ty = Math.floor(random(120, 120));
    super(imgArr[0], tx, ty);
    super.setNombre("centolla");
    super.setVertices(5);
    //super.setZ(15);

    this.particlesPierna = [];
    this.particlesPiernaIzq = [];
    this.texturaPierna = imgArr[1];

    
  }

  _particulasCentolla() {
    let xIzq = this.topX;
    let xDer = this.topX + this.tamX;
    let y = this.topY;
    this.particles.push(new Particle(xIzq, y));

    this.particles.push(new Particle(xDer, y));

    y = this.topY + this.tamY * 0.33;
    this.particles.push(new Particle(xIzq, y));
    this.particles.push(new Particle(xDer, y));

    y = this.topY + this.tamY * 0.63;
    this.particles.push(new Particle(xIzq, y));
    this.particles.push(new Particle(xDer, y));

    y = this.topY + this.tamY * 0.89;
    this.particles.push(new Particle(xIzq, y));
    this.particles.push(new Particle(xDer, y));

    y = this.topY + this.tamY;
    this.particles.push(new Particle(xIzq, y));
    this.particles.push(new Particle(xDer, y));

    this._armarPierna(this.particles[3], this.particles[5]);
    this._armarPierna(this.particles[5], this.particles[7]);
    this._armarPierna(this.particles[7], this.particles[9]);
    this._armarPiernaIzq(this.particles[2], this.particles[4]);
    this._armarPiernaIzq(this.particles[4], this.particles[6]);
    this._armarPiernaIzq(this.particles[6], this.particles[8]);
  }

  _armarPiernaIzq(particula, particulaBajo) {
    //this.particlesPierna.push(new Particle(particula.x, particula.y));
    let tam = this.tamX * 0.3;
    this.particlesPierna.push(new Particle(particula.x - tam, particula.y));
    this.particlesPierna.push(new Particle(particula.x, particula.y + tam));
    this.particlesPierna.push(
      new Particle(particula.x - tam, particula.y + tam)
    );
    let t = this.particlesPierna.length;

    this.springs.push(
      new ConstrainSpring(particula, this.particlesPierna[t - 3], 1)
    );
    this.springs.push(
      new ConstrainSpring(
        this.particlesPierna[t - 3],
        this.particlesPierna[t - 1],
        1
      )
    );
    this.springs.push(
      new ConstrainSpring(
        this.particlesPierna[t - 1],
        this.particlesPierna[t - 2],
        1
      )
    );
    this.springs.push(
      new ConstrainSpring(this.particlesPierna[t - 2], particula, 1)
    );
    this.springs.push(
      new ConstrainSpring(particula, this.particlesPierna[t - 1], 1)
    );
    this.springs.push(
      new ConstrainSpring(
        this.particlesPierna[t - 2],
        this.particlesPierna[t - 3],
        1
      )
    );

    this.springs.push(
      new Spring(particulaBajo, this.particlesPierna[t - 2], 0.005)
    );
  }

  _armarPierna(particula, particulaBajo) {
    //this.particlesPierna.push(new Particle(particula.x, particula.y));
    let tam = this.tamX * 0.3;
    this.particlesPierna.push(new Particle(particula.x + tam, particula.y));
    this.particlesPierna.push(new Particle(particula.x, particula.y + tam));
    this.particlesPierna.push(
      new Particle(particula.x + tam, particula.y + tam)
    );
    let t = this.particlesPierna.length;

    this.springs.push(
      new ConstrainSpring(particula, this.particlesPierna[t - 3], 1)
    );
    this.springs.push(
      new ConstrainSpring(
        this.particlesPierna[t - 3],
        this.particlesPierna[t - 1],
        1
      )
    );
    this.springs.push(
      new ConstrainSpring(
        this.particlesPierna[t - 1],
        this.particlesPierna[t - 2],
        1
      )
    );
    this.springs.push(
      new ConstrainSpring(this.particlesPierna[t - 2], particula, 1)
    );
    this.springs.push(
      new ConstrainSpring(particula, this.particlesPierna[t - 1], 1)
    );
    this.springs.push(
      new ConstrainSpring(
        this.particlesPierna[t - 2],
        this.particlesPierna[t - 3],
        1
      )
    );

    this.springs.push(
      new Spring(particulaBajo, this.particlesPierna[t - 2], 0.005)
    );
  }

  armar() {
    this._particulasCentolla();

    for (let i = 0; i < this.particles.length - 2; i++) {
      this.springs.push(
        new ConstrainSpring(this.particles[i], this.particles[i + 2], 1)
      ); //lados
    }
    this.springs.push(
      new ConstrainSpring(this.particles[0], this.particles[1], 1)
    ); //arriba
    this.springs.push(
      new ConstrainSpring(
        this.particles[this.particles.length - 2],
        this.particles[this.particles.length - 1],
        1
      )
    ); //abajo
    // criss cross
    this.springs.push(
      new ConstrainSpring(
        this.particles[0],
        this.particles[this.particles.length - 1],
        this.dureza
      )
    );
    this.springs.push(
      new ConstrainSpring(
        this.particles[1],
        this.particles[this.particles.length - 2],
        this.dureza
      )
    );

    if (this.vertices > 2) {
      //extra criss cross
      for (let i = 0; i < this.particles.length - 2; i += 2) {
        this.springs.push(
          new ConstrainSpring(
            this.particles[i],
            this.particles[i + 3],
            this.dureza
          )
        );
        this.springs.push(
          new ConstrainSpring(
            this.particles[i + 1],
            this.particles[i + 2],
            this.dureza
          )
        );
      }
    }
  }

  _dibujarPiernas() {
    fill(127);
    textureMode(NORMAL);
    textureWrap(CLAMP);
    texture(this.texturaPierna);

    let j = 0;
    for (let i = 3; i < 9; i += 2) {
      beginShape(TRIANGLE_STRIP);
      vertex(this.particles[i].x, this.particles[i].y, this.z - 0.3, 0, 0);
      vertex(this.particlesPierna[j].x, this.particlesPierna[j].y, this.z - 0.2, 1, 0);
      vertex(this.particlesPierna[j+1].x, this.particlesPierna[j+1].y, this.z - 0.4, 0, 1);
      vertex(this.particlesPierna[j+2].x, this.particlesPierna[j+2].y, this.z - 0.6, 1, 1); 
  
      endShape();
      j += 3;
    }
    for (let i = 2; i < 8; i += 2) {
      beginShape(TRIANGLE_STRIP);

      vertex(this.particles[i].x, this.particles[i].y, this.z - 0.3, 0, 0);
      vertex(this.particlesPierna[j].x, this.particlesPierna[j].y, this.z -0.2 , 1, 0);
      vertex(this.particlesPierna[j+1].x, this.particlesPierna[j+1].y, this.z -0.4 , 0, 1);
      vertex(this.particlesPierna[j+2].x, this.particlesPierna[j+2].y, this.z -0.6, 1, 1); 
  
      endShape();
      j += 3;
    }
  }

  dibujar(debug) {
    push();
    rotate(this.rotacion);
    this._dibujarPiernas();
    fill(127);

    textureMode(NORMAL);
    textureWrap(CLAMP);
    texture(this.textura);

    beginShape(TRIANGLE_STRIP);

    vertex(this.particles[0].x, this.particles[0].y, this.z, 0, 0);
    vertex(this.particles[1].x, this.particles[1].y, this.z, 1, 0);
    vertex(
      this.particles[this.particles.length - 2].x,
      this.particles[this.particles.length - 2].y,
      this.z,
      0,
      1
    );
    vertex(
      this.particles[this.particles.length - 1].x,
      this.particles[this.particles.length - 1].y,
      this.z,
      1,
      1
    );

    endShape();
    if (debug) this.dibujarEstructura();
    pop();
  }

  seleccionar() {
    if (this.eliminado) return;

    let cercaLados = true;
    for (
      let i = this.particles.length / 2 - 1;
      i < this.particles.length / 2;
      i++
    ) {
      cercaLados =
        cercaLados && this.mouseEnRango(this.particles[i], this.tamX);
    }

    let cercaArriba =
      this.mouseEnRango(this.particles[0], this.tamY) &&
      this.mouseEnRango(this.particles[1], this.tamY) &&
      this.mouseEnRango(this.particles[this.particles.length - 2], this.tamY) &&
      this.mouseEnRango(this.particles[this.particles.length - 1], this.tamY);

    this.seleccionado = cercaArriba && cercaLados;
  }
}
