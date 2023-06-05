function setMundo() {
    mundo = new VerletPhysics2D(); // mundo
    gravedad = new GravityBehavior(new Vec2D(-0.0009, 0.0001));
    mundo.addBehavior(gravedad);
    mundo.setWorldBounds(new Rect(0, 0, width, height)); // bordes mundo
    mundo.setDrag(0.05);
  }

function mouseMuyRapido() {
    // Calculate time difference
    let limite = 3;
    let currentTime = millis();
    let deltaTime = currentTime - prevTime;
  
    // Calculate mouse velocity
    mouseVelocityX = (mouseX - prevMouseX) / deltaTime;
    mouseVelocityY = (mouseY - prevMouseY) / deltaTime;
  
    mouseVelocityX.toFixed(2);
    mouseVelocityY.toFixed(2);
  
    // Update previous mouse position and time
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    prevTime = currentTime;
  
    if ( Math.abs(mouseVelocityX) > limite || Math.abs(mouseVelocityY) > limite) {
      //console.log("muy rapido!");
    } else {
      //console.log("vamos bien")
    }
  
    //console.log(mouseVelocityX);
  
    return mouseVelocityX > limite || mouseVelocityY > limite;
}

  
function cambiarGravedad() {
    const probabilidad = 0.01;
    const valorRandom = random(0, 1);
    if (valorRandom > probabilidad) return;
  
    mundo.removeBehavior(gravedad);
    gravedad = new GravityBehavior(
      new Vec2D(random(-0.09, 0.09), random(-0.09, 0.09))
    );
    mundo.addBehavior(gravedad);
  }
  