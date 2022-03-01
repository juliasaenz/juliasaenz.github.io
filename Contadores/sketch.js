let dataPHP;
let categorias = [];

function preload(){
    
}

function setup() { 
  createCanvas(windowWidth, (windowHeight/8)*7);
  recibirPHP();
}

function draw() {   

}

function mouseClicked() {

}

function recibirPHP() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "./php/nuevo.php", true);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    };
    xhr.send();
    /*xhr.onload = function () {
      console.log(this.status)
      if (this.status == 200) {
        let lista = JSON.parse(this.responseText);
        console.log(lista);
      } 
    }*/
}
