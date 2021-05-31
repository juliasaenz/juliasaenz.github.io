import {
  crearInstancia
} from '../Etapa_1/funciones.js';

export class Figura {
  constructor(id, forma, color, x = 0, z = 0, nombre = "julia", sonido = '../Sonidos/thwknd.mp3') {
    this.nombre = nombre;
    this.id = this._crearID(id);
    this.forma = forma;
    this.color = color;
    this.x = x;
    this.y = 0.1;
    this.z = z;
    ///// estos porahora no importan
    this.sonido = sonido;
    this.activo = false;
    this.radio = 9;
    this.conexiones = [];
  }
  _crearID(id){
    //crea una ID unica de usuario usando el nombre + numeros random
    if (id != -1){
      return id;
    }
    const n = parseInt(Math.random() * 999);
    return this.nombre.concat("-",n.toString());
  }
  _distancia(x, y, z) {
    //calculo de distancia entre una figura y el usuario
    var a = this.x - x;
    var b = this.y - y;
    var c = this.z - z;

    var distance = a * a + b * b + c * c;
    if (distance < Math.pow(this.radio,2)) {
      return true;
    }
    return false;
  }
  calcularConexiones(figuras) {
    //Calcular la distancia de todas las figuras y guardar las que esten dentro de la distancia determinada
    for (var i = 0; i < figuras.length; i++) {
      if (this._distancia(figuras[i].x, figuras[i].y, figuras[i].z)) {
        var found = this.conexiones.findIndex(f => f.id === figuras[i].id);
        if (found === -1) {
          this.conexiones.push(figuras[i]);
        }
      } else {
        var found = this.conexiones.findIndex(f => f.id === figuras[i].id);
        if (found != -1) {
          this.conexiones.splice(found, 1);
        }
      }

    }
    //console.log("conexiones usuario: ",this.conexiones.length);
  }
  calcularConexionesVisual(figuras, mundo, objetosFiguras){
    //Visualizar cuales son las figuras conectadas al usuario
    for (var i = 0; i < figuras.length; i++) {
      if (this._distancia(figuras[i].x, figuras[i].y, figuras[i].z)) {
        var found = this.conexiones.findIndex(f => f.id === figuras[i].id);
        if (found === -1) {
          this.conexiones.push(figuras[i]);
          mundo.escena.add(objetosFiguras[i][0]);
          mundo.escena.add(objetosFiguras[i][1]);
        }
      } else {
        var found = this.conexiones.findIndex(f => f.id === figuras[i].id);
        if (found != -1) {
          this.conexiones.splice(found, 1);
          mundo.escena.remove(objetosFiguras[i][0]);
          mundo.escena.remove(objetosFiguras[i][1]);
        }
      }
    }
    //console.log(this.conexiones.length);
  }
}
