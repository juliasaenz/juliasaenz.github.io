class Burbuja {
  constructor() {
    this.suenios = {
      todos: 0,
      tema1: 0,
      tema2: 0,
      tema3: 0,
      tema4: 0,
      tema5: 0,
      tema6: 0,
    };
    this.colores = {
      todos: "#C9C9C9",
      tema1: "#FDB3C2",
      tema2: "#FF9664",
      tema3: "#2F7A68",
      tema4: "#FEBE01",
      tema5: "#6E80FF",
      tema6: "#BF6C6C",
    };
    this.filtroActual = "todos";
  }

  show(centro) {
    noStroke();
    fill(this.colores[this.filtroActual]);
    ellipse(centro[0], centro[1], 20, 20);
  }

  actualizarFiltro(filtro){
   this.filtroActual = filtro;
  }
}
