class Obra{
    constructor(n = "nombre Obra", a = "nombre Autor", c = ["experiencia", "información", "percepción"], link){
        this.nombre = n;
        this.autor = a;
        this.categorias = c;
        this.link = link;
        this.x = random(1340) + 50;
        this.y = random(410) + 75;
        this.r = 5;
        this.v = 0.05;
        this.dirX = random([-1,1]);
        this.dirY = random([-1,1]);
        this.seleccionado = false;
        this.click = false;
        //imagen
        this.portada = loadImage('data/portadas/'+this.nombre+'.png')
        this.imgX = 0;
        this.imgY = 0;
    }
    posicionar(obras){
        //todos los puntos empiezan con 100 de distancia entre ellos
        for(let i = 0; i < obras.length - 1; i++){
            while( dist(this.x,this.y,obras[i].x,obras[i].y) < 100){
                this.x = random(1340) + 50;
                this.y = random(360) + 130;
            }
        }
    }
    mover(){
        if(this.x <= this.r || this.x >= width-this.r*2){
            this.dirX = this.dirX * -1;       
            print("borde")
        }
        if(this.y <= 130 || this.y >= height-this.r*3){
            this.dirY = this.dirY * -1;       
        }
        if(!this.click){
            this.x = this.x + this.v*this.dirX
            this.y = this.y + (this.v/2)*this.dirY
        } else {
            this.abrirPopup();
        }
    }

    hoverObra(){
        if(dist(mouseX,mouseY,this.x,this.y)<this.r){
            noStroke();
            if(this.seleccionado){
                fill(255)
            } else {
                fill(100)
            }
            textAlign(LEFT)
            textSize(18);
            if(!this.click){
                text(this.nombre, this.x + 5, this.y);
            }
        }
    }

    dibujar(){
        // dibujar el punto
        if(this.click){
            stroke(255)
            fill(255)
        } else if(this.seleccionado){
            stroke(255)
            fill(3,3,3);
        } else {
            stroke(100)
            fill(3,3,3);
        }
        ellipse(this.x,this.y,this.r*2,this.r*2);
    }

    resaltar(categorias, cantC){
        for(let i = 0; i < cantC; i++){
            if( this.categorias.includes(categorias[i].nombre) && categorias[i].seleccionado ) {
                return true
            }
        }
        return false
    }
    
    toqueObra(){
        if(dist(mouseX,mouseY,this.x,this.y)<this.r){
            print(this.click, this.nombre)
            this.click = true
        }
    }

    destoqueObra(){
        if( this.click ){
           if(mouseX > this.imgX && mouseX < this.imgX + 230 && mouseY > this.imgY && mouseY < this.imgY+164){
                /* aca el link de redireccion a la página que corresponda */
                window.open(this.link,"_self"); 
                this.click = false;
            } else {
                this.click = false;
            }
        }
    }

    abrirPopup(){
        noStroke();
        fill(255)
        this.imgX = this.x + 10
        this.imgY = this.y + 5
        let tam = 120;
        if(this.x > (width/3)*2 ){
            this.imgX = this.x - 10 - tam*2
        }
        if(this.y > height/2){
            this.imgY = this.y - tam
        }
        this.portada.resize(230,164);
        imageMode(CORNER);
        image(this.portada,this.imgX,this.imgY)
    }
}
