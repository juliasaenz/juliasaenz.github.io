class Soga extends Objeto{
    constructor() {
        let x = random(255);
        let y = random(255);
        let vertices = 3;
        let radio = 40;
        let dureza = 40;
        let nombre = "soga";
        super(x, y, vertices, radio, nombre)
    }
}