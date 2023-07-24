class Objeto {
  constructor(img, tamX, tamY) {
    this.escala = 1;
    this.topX = random(width * 0.16, width * 0.86);
    this.topY = random(height * 0.5, height*0.6);
    this.nombre = "objeto";

    this.eliminado = false
    this.seleccionado = false;

    this.textura;
    this.cargarImagen(img);
    this.tamX = tamX;
    this.tamY = tamY;

    this.vertices = 4;
    this.particles = [];
    this.springs = [];
    this.dureza = 1;
    this.z = 0.1

    this.rotacion = 0;
    this.peso = 1;
    
  }

  armar() {
    //push();
    for (let i = 0; i < this.vertices; i++) {
      let x = this.topX;
      let y = this.topY + i * (this.tamY / (this.vertices-1));
      this.particles.push(new Particle(x, y, this.peso));

      x = this.topX + this.tamX;
      y = this.topY + i * (this.tamY / (this.vertices-1));
      this.particles.push(new Particle(x, y, this.peso));
    }
    for (let i = 0; i < this.particles.length - 2; i++) {
      this.springs.push(new ConstrainSpring(this.particles[i], this.particles[i + 2], 1)); //lados
    }
    this.springs.push(new ConstrainSpring(this.particles[0], this.particles[1], 1)); //arriba
    this.springs.push(new ConstrainSpring(this.particles[this.particles.length-2], this.particles[this.particles.length-1], 1)); //abajo
    // criss cross
    this.springs.push(
      new ConstrainSpring(this.particles[0], this.particles[this.particles.length -1], this.dureza)
    );
    this.springs.push(
      new ConstrainSpring(this.particles[1], this.particles[this.particles.length-2], this.dureza)
    );

    if (this.vertices > 2) {
      //extra criss cross
      for (let i = 0; i < this.particles.length -2; i += 2) {
        this.springs.push(
          new ConstrainSpring(this.particles[i], this.particles[i+3], this.dureza)
        );
        this.springs.push(
          new ConstrainSpring(this.particles[i+1], this.particles[i+2], this.dureza)
        );
      }
    }
  }

  dibujar(debug) {
    fill(127);

    textureMode(NORMAL);
    textureWrap(CLAMP);
    texture(this.textura);

    beginShape(TRIANGLE_STRIP);

    for (let i = 0; i < this.particles.length; i+=2) {
      let v = i / (this.particles.length - 2);
      vertex(this.particles[i].x, this.particles[i].y, this.z, 0, v);
      vertex(this.particles[i+ 1].x, this.particles[i+1].y, this.z,  1, v);
      // Use the 'value' variable as needed for further calculations or assignments
    }

    endShape();
    if (debug) this.dibujarEstructura();
  }

  seleccionar() {
    if (this.eliminado) return;
   
    let cercaLados = true;
    for (let i = this.particles.length/2 -1; i < this.particles.length/2; i++) {
      cercaLados = cercaLados && this.mouseEnRango(this.particles[i], this.tamX)
    }

    let cercaArriba =
      this.mouseEnRango(this.particles[0], this.tamY) &&
      this.mouseEnRango(this.particles[1], this.tamY) &&
      this.mouseEnRango(this.particles[this.particles.length-2], this.tamY) &&
      this.mouseEnRango(this.particles[this.particles.length-1], this.tamY);

    this.seleccionado = cercaArriba && cercaLados;
  }

  arrastrar() {
    if (this.eliminado) return;
    if (this.seleccionado) {
      const { index, distance } = this.particles.reduce(
        (closest, particle, index) => {
          const distToMouse = dist(particle.x, particle.y, mouseX, mouseY);
          return distToMouse < closest.distance
            ? { index, distance: distToMouse }
            : closest;
        },
        { index: -1, distance: Infinity }
      );

      if (index !== -1) {
        this.particles[index].lock();
        //this.particles[index].x += mouseX - pmouseX;
        //this.particles[index].y += mouseY - pmouseY;
        this.particles[index].x = lerp(this.particles[index].x, mouseX, 0.8);
        this.particles[index].y = lerp(this.particles[index].y, mouseY, 0.8);
        this.particles[index].unlock();
      }
    }
  }

  aplicarFuerza() {
    this.particles[0].addForce(new Vec2D(random(-1,1), -1));
    this.seleccionado = false;
  }

  acomodarObjeto() {
    this.particles[0].addForce(new Vec2D(0, 10));
    this.seleccionado = false;
  }

  colisionObjeto(objeto) {
    /* principalmente para bandejas */
  }

  dibujarEstructura() {
    this.particles.forEach((particle) => {
      particle.show();
    });

    this.springs.forEach((spring) => {
      spring.show();
    });
  }

  cargarImagen(img) {
    if (img instanceof p5.Image) {
      this.textura = img;
      //console.log("la imagen es correcta");
    } else {
      console.error("Invalid image object:", img);
    }
  }

  encontrarImagenPorNombre(arreglo, nombre) {
    for (let i = 0; i < arreglo.length; i++) {
      if (arreglo[i][0] === nombre) {
        return arreglo[i][1];
      }
    }
    return null;
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

  algunaParticulaSobreLimite() {
    let tocando = false;
      this.particles.forEach((p) => {
        tocando = tocando || p.y < height*0.2;
      });
    return tocando;
  }

  eliminar() {
    this.particles.forEach(particle => {
      particle.lock();
      this.eliminado = true;
      this.seleccionado = false;
    });
  }
  // getters y setters
  setPeso(peso) {
    this.peso = peso;
  }
  setTop(x, y) {
    this.topX = x;
    this.topY = y;
  }
  setZ(z) {
    this.z = z;
  }
  getZ() {
    return this.z;
  }
  setVertices(num) {
    this.vertices = num; 
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
