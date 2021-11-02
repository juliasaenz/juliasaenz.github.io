class Categoria{
   constructor(n, x = 20, c = '#FAFAFA'){
      this.nombre = n;
      this.obras = [];
      this.x = x;
      this.y = 60;
      this.tam = 50;
      this.colorcito = c;
      this.seleccionado = false;
      this.imagen = loadImage('data/categorias/'+this.nombre+'.png')
      this.imagenVacia = loadImage('data/categorias/'+this.nombre+' vacio.png')
   }

   cargarObras(obr){
      let index = 0;
      for(let i = 0; i < obr.length; i++){
         for(let j = 0; j < obr[i].categorias.length; j++){
            if (obr[i].categorias[j] == this.nombre){
               this.obras[index] = obr[i];
               index++
            }
         }
      }
      // ordenar por X
      this.obras.sort(function(a,b){
         return a.x - b.x
      })
      //print("cantidad en categoria ",this.nombre,": ",this.obras)

   }

   dibujar(){
      imageMode(CENTER);
      if(this.seleccionado){
         noStroke();
         fill(this.colorcito);
         image(this.imagen,this.x+this.tam/2,this.y);
      } else {
         stroke(this.colorcito);
         strokeWeight(2);
         noFill();
         image(this.imagenVacia,this.x+this.tam/2,this.y);
      }
      //rect(this.x, this.y+100, this.tam, this.tam);
      
   }

   dibujarLineas(){
      for(let i = 1; i < this.obras.length; i++){
         if(this.seleccionado){
            strokeWeight(1.5);
            stroke(this.colorcito)
         } else {
            strokeWeight(0.5);
            stroke(155);
         }
         line(this.obras[i-1].x, this.obras[i-1].y, this.obras[i].x, this.obras[i].y);
      }
   }

   toqueCategoria(){
      if(mouseX >= this.x && mouseX <= this.x + this.tam){
         if(mouseY >= this.y-this.tam/2 && mouseY <= this.y + this.tam){
            this.seleccionado = !this.seleccionado
            print("click ",this.nombre,"  ",this.seleccionado)
         }
      }
   }

   hoverCategoria(fuente){
      if(mouseX >= this.x && mouseX <= this.x + this.tam){
         if(mouseY >= this.y-this.tam/2 && mouseY <= this.y + this.tam){
            fill(this.colorcito);
            noStroke();
            textFont(fuente)
            textSize(24);
            textAlign(CENTER, CENTER);
            text(this.nombre.toUpperCase(), this.x+this.tam/2, 110);
         }
      }
   }

// fin clase
}