// module aliases
var Body = Matter.Body, 
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Constraint = Matter.Constraint;

class Cuerpo {
  constructor( scale = 1) {
    this.x = width/2;
    this.y = height/2;
    this.scale = scale;
    this.options = { density: 0.03, frictionAir: 0.06, friction: 0.8, force: { x: 0, y: 0 }, isStatic:true };

    this.partes = [];
    this.constraints = [];
    this.body;

    this.armarCuerpo();
    this.agregarConstraints();
  }

  agregarPartes() {
    var cabeza = new Cabeza(this.x, this.y, this.scale, this.options);
    var torso = new Torso(this.x, this.y, this.scale, this.options);
    var brazoSDer = new BrazoSDer(this.x, this.y, this.scale, this.options);
    var brazoIzq = new BrazoIzq(this.x, this.y, this.scale, this.options);

    this.partes.push(cabeza);
    this.partes.push(brazoSDer);
    this.partes.push(brazoIzq);
    this.partes.push(torso);
  }

  buscarParte(nombre) {
    //console.log("Esta es la parte ", nombre, ": ", this.partes.filter((parte) => parte.body.label === nombre)[0]);
    return this.partes.filter((parte) => parte.body.label === nombre)[0];
  }

  agregarConstraints() {
    /////// Cabeza-Torso
    var headContraint = Constraint.create({
      label: "cabeza-torso",
      bodyA: this.buscarParte("cabeza").body,
      pointA: {
        x: 0,
        y: 25 * this.scale,
      },
      pointB: {
        x: 0,
        y: -40 * this.scale,
      },
      bodyB: this.buscarParte("torso").body,
      stiffness: 0.9,
      length: 45 * this.scale,
    });
    this.constraints.push(headContraint);
    
    //////// BrazoSDer-Torso
    var chestToRightUpperArm = Constraint.create({
      label: "torso-brazoDer",
      bodyA: this.buscarParte("torso").body,
      pointA: {
        x: 43 * this.scale,
        y: -75 * this.scale,
      },
      pointB: {
        x: -15 * this.scale,
        y: -50 * this.scale,
      },
      bodyB: this.buscarParte("brazo-der-sup").body,
      stiffness: 0.8,
      length: 0,
      damping: 0.02,
    });
    this.constraints.push(chestToRightUpperArm);

    //////// BrazoIzq-Torso
    var chestToLeftArm = Constraint.create({
      label: "torso-brazoIzq",
      bodyA: this.buscarParte("torso").body,
      pointA: {
        x: -35 * this.scale,
        y: -65 * this.scale,
      },
      pointB: {
        x: 45 * this.scale,
        y: -70 * this.scale,
      },
      bodyB: this.buscarParte("brazo-izq").body,
      stiffness: 0.1,
      length: 0.0,
      damping: 0.05,
    });
    this.constraints.push(chestToLeftArm);
  }

  mostrar(estado) {
    var debug = false;
    /* Mostar las partes */
    if (estado != "intro" && estado != "reset") {
      this.partes.forEach((parte) => parte.show(debug));
    }
  }

  losCuerpos(){
    var arr = [];
    this.partes.forEach(parte => arr.push(parte.body));
    return arr;
  }

  resetearPosicion(){
    this.partes.forEach(parte => parte.resetearPosicion());
  }

  armarCuerpo() {
    this.agregarPartes();
    this.body = Composite.create({
      label: "cuerpo",
      bodies: this.losCuerpos(),
      constraints: this.constraints,
    });
  }

  estoyTocando(nombre) {
    var este = this.partes.filter((parte) => parte.body.label === nombre);
    if (este.length > 0) {
      este[0].siguienteImagen();
      //console.log("estas tocando mi ", este[0]);
    }
  }

  //fin clase
}
