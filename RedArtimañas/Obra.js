class Obra{
    constructor(n = "nombre Obra", a = "nombre Autor", c = ["experiencia", "información", "percepción"]){
        this.nombre = n;
        this.autor = a;
        this.categorias = c;
        this.x = random(1340) + 50;
        this.y = random(410) + 75;
        this.r = 5;
        this.v = 0.05;
        this.dirX = random([-1,1]);
        this.dirY = random([-1,1]);
        this.seleccionado = false;
        this.click = false;
    }
    posicionar(obras){
        //todos los puntos empiezan con 100 de distancia entre ellos
        for(let i = 0; i < obras.length - 1; i++){
            while( dist(this.x,this.y,obras[i].x,obras[i].y) < 100){
                this.x = random(1340) + 50;
                this.y = random(410) + 130;
            }
        }
    }
    mover(){
        if(this.x <= this.r || this.x >= width-this.r){
            this.dirX = this.dirX * -1;       
            print("borde")
        }
        if(this.y <= 130 || this.y >= height-this.r){
            this.dirY = this.dirY * -1;       
        }
        if(!this.click){
            this.x = this.x + this.v*this.dirX
            this.y = this.y + this.v*this.dirY
        } else {
            this.abrirPopup();
        }
    }

    hoverObra(){
        if(dist(mouseX,mouseY,this.x,this.y)<this.r){
            textAlign(LEFT)
            textSize(18);
            text(this.nombre, this.x + 5, this.y);
        }
    }

    dibujar(){
        // dibujar el punto
        noStroke();
        if(this.seleccionado){
            fill(255);
        } else {
            fill(100);
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
            this.click = !this.click
        }
    }

    abrirPopup(){
        noStroke();
        fill(255)
        let posX = this.x + 10
        let posY = this.y + 5
        let tam = 120;
        if(this.x > (width/3)*2 ){
            posX = this.x - 10 - tam*2
        }
        if(this.y > height/2){
            posY = this.y - tam
        }
        rect(posX, posY, tam*2, tam)
    }
}
