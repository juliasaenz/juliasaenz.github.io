class Dia {
    constructor(x, y, tam, offset, diaSemana, posY) {
        this.diaSemana = diaSemana;
        this.tam = tam;
        this.offset = offset;
        this.offsetSombra = 5;
        
        this.x = x;
        this.y = y;
        this.posY = posY // este es el offset del mes

        this.padding = ((height) - (6 * this.tam + 5 * this.offset))* 0 + width * 0.05
    }

    dibujar(x, y, tam) {
        this.x = x;
        this.y = y;
        this.tam = tam;
        push();
        translate(0, this.padding);
        rectMode(CENTER);
        noStroke();
        fill("#B6306D");
        rect(this.x - this.offsetSombra, this.y + this.offsetSombra, this.tam, this.tam);
        fill("#F39CC2")
        rect(this.x, this.y, this.tam, this.tam);
        pop();
    }
}