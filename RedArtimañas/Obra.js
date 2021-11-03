class Obra{
    constructor(n = "nombre Obra", a = "nombre Autor", c = ["experiencia", "información", "percepción"], link){
        this.nombre = n;
        this.autor = a;
        this.categorias = c;
        this.link = link;
        this.x = random(width-width/20);
        this.y = height/2;
        this.r = height/90;
        if (height > width ){
            this.r = height/85;
        }
        this.v = 1.09;
        this.dirX = random([-1,1]);
        this.dirY = random([-1,1]);
        this.seleccionado = false;
        this.click = false;
    }
    posicionar(obras){
        //todos los puntos empiezan con 100 de distancia entre ellos
        for(let i = 0; i < obras.length - 1; i++){
            while( dist(this.x,this.y,obras[i].x,obras[i].y) < width/10){
                this.x = random(width-width/20);
                this.y = random(height/3) + height/3;
            }
        }
    }
    mover(){
        if(this.x <= this.r || this.x >= width-this.r*3){
            this.dirX = this.dirX * -1;       
        }
        if(height < width){
            if(this.y <= height/6 || this.y >= height-this.r*3){
                this.dirY = this.dirY * -1;       
            }
        } else {
            if(this.y <= height/3 || this.y >= height-this.r*3){
                print("bonk???");
                this.dirY = this.dirY * -1;       
            }
        }
        if(!this.click){
            this.x = this.x + this.v*this.dirX
            this.y = this.y + this.v*this.dirY
        }
    }

    bonkObras(obras){
        for(let i= 0; i < obras.length; i++){
            if(this.nombre != obras[i].nombre){
                if(dist(this.x,this.y,obras[i].x,obras[i].y) >= this.r*4){
                    this.dirX = this.dirX * -1; 
                    this.dirY = this.dirY * -1;    
                }
            }
        }
    }

    hoverObra(){
        if(dist(mouseX,mouseY,this.x,this.y)<this.r){
            if(!this.click){
                this.texto();
            }
        }
    }

    texto(){
        noStroke();
            if(this.seleccionado || this.click){
                fill(255)
            } else {
                fill(100)
            }
            textAlign(LEFT);
            textSize(height/35);
            if(this.x < width/3*2){
                text(this.nombre, this.x + width/80, this.y);
            } else {
                text(this.nombre, this.x - textWidth(this.nombre) - width/80, this.y);
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
        if(dist(mouseX,mouseY,this.x,this.y)<this.r*2){
            print(this.click, this.nombre)
            this.click = true
        }
    }

    destoqueObra(){
        if( this.click ){
           if(dist(mouseX,mouseY,this.x,this.y)<this.r*2){
                /* aca el link de redireccion a la página que corresponda */
                window.open(this.link,"_self"); 
                this.click = false;
            } else {
                this.click = false;
            }
        }
    }
}
