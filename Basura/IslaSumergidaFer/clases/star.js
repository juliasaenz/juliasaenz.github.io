class Star{
  constructor(x, y, r, n){
    this.x = x;
    this.y = y;
    this.verts = n;
    this.radius = r;
    this.dureza = 0.05;
    this.onSelect = false;
    
    this.particles = [];
    this.springs = [];
    
    this.structureParts = [];
    this.structureSprings = [];
    
    this.construirEstrella();
    // this.construirEstructura(); NO FUNCA BIEN TODAVÍA
  }
  
  construirEstrella() {
    let angle = 0;
    for(let i = 0; i<this.verts; i++){
      angle = TWO_PI * (i/this.verts);
      let x = this.x + cos(angle) * this.radius/(1+i%2);
      let y = this.y + sin(angle) * this.radius/(1+i%2);
      this.particles.push(new Particle(x, y));
    }
    
    for(let i = 0; i<this.verts; i++){
      let prev = (i - 1)%this.verts;
      let next = (i + 1)%this.verts;
      let nnext = (i + 2)%this.verts;
      let nnnext = (i + (this.verts*0.5 - 1))%this.verts;

      this.springs.push(
        new Spring(this.particles[i], this.particles[next], this.dureza))
      /*
      if(i%2 < 1)
      this.springs.push(
        new Spring(this.particles[i], this.particles[nnext], this.dureza*0.5))*/

      this.springs.push(
        new Spring(this.particles[i], this.particles[nnnext], this.dureza))
    }
  }
  
  construirEstructura() {
    for(let i = 0; i<this.verts; i++){
      this.structureParts.push( 
        new Particle(this.particles[i].x, this.particles[i].y)
      );
      this.structureSprings.push(
        new Spring(this.structureParts[i], this.particles[i], this.dureza)
      );
      this.structureParts[i].lock();
    }
  }
  
  dibujar() {
    beginShape();
    for (let particle of this.particles) {
      //if(!this.onSelect)
      //  particle.lock();
      //else
      //  particle.unlock();
        
      vertex(particle.x, particle.y);
    }
    endShape(CLOSE);
      
  }
  
  debug() {
    push();
    fill(0);
    for(let i = 0; i<this.springs.length; i++){
      this.springs[i].show();

      if(this.particles[i])
        this.particles[i].show();
      
      if(this.structureParts[i])
        this.structureParts[i].show();
      
      if(this.structureSprings[i])
        this.structureSprings[i].show();
    }
    pop();
  }
  
  seleccionar(){
    let sumX = 0;
    let sumY = 0;
    for (let i = 0; i<this.verts; i++){
      sumX += this.particles[i].x;
      sumY += this.particles[i].y;
    }
    sumX /= this.verts;
    sumY /= this.verts;
    this.onSelect = dist(mouseX, mouseY, sumX, sumY) < this.radius;
  }
  
  drag(){
    if(this.onSelect){
      this.particles[0].lock();
      this.particles[0].x += mouseX - pmouseX;
      this.particles[0].y += mouseY - pmouseY;
      this.particles[0].unlock();
      
      /*for (let i = 0; i<this.verts/2; i++){
        // part.x = lerp(mouseX, part.x, s);
        // part.y = lerp(mouseY, part.y, s);
        this.particles[i*2].lock();
        this.particles[i*2].x += mouseX - pmouseX;
        this.particles[i*2].y += mouseY - pmouseY;
        this.particles[i*2].unlock();
      }*/
    }
  }
  
  dragStructure() {
    let sumX = 0;
    let sumY = 0;
    for (let i = 0; i<this.verts; i++){
      sumX += this.structureParts[i].x;
      sumY += this.structureParts[i].y;
    }
    sumX /= this.verts;
    sumY /= this.verts;
    
    if(dist(mouseX, mouseY, sumX, sumY) < this.radius){
      
      this.structureParts.forEach((part)=>{
        // part.x = lerp(mouseX, part.x, s);
        // part.y = lerp(mouseY, part.y, s);
        part.x += mouseX - pmouseX;
        part.y += mouseY - pmouseY;
      })
    }
    
  }
  
}