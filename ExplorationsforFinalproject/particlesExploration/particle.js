class Particle{
  constructor () {
    this.pos = createVector(width / 2,height / 2) //position  of the particle will change whenever we refresh the page
    this.vel= createVector(0,0)//velocity
    this.acc = p5.Vector.random2D().normalize()//acceleration will be a random 2D vector  

    this.r=map(this.pos.x,0,width,255,0)//map the x position of the particle to a color value  
    this.g=map(this.pos.y,0,height,0,255)//map the y position of the particle to a color value  
    this.b=map(dist(width/2 , height/2,this.pos.x,this.pos.y),0,width/2,0,255)//map the distance of the particle from the center to a color value
    
    this.alpha = 255//alpha value for the particle  
  }
  update() {
    var m = map(sin(frameCount * 6), -1, 1, 0.4, 0.6) //calculate the magnitude of the acceleration using a sine function to create a pulsating effect
    this.acc.mult(m)

    this.vel.add(this.acc.mult(this.m)) //add the acceleration to the velocity 
    this.pos.add(this.vel)//add the velocity to the


    //colors should be updated every frame

    this.r=map(this.pos.x,0,width,255,0)//map the x position of the particle to a color value  
    this.g=map(this.pos.y,0,height,0,255)//map the y position of the particle to a color value  
    this.b=map(dist(width/2 , height/2,this.pos.x,this.pos.y),0,width/2,0,255)//map the distance of the particle from the center to a color value
    
    if(dist(width/2 , height/2,this.pos.x,this.pos.y) > 80) {//set particle to be full opacity for a while before reducing
      this.alpha -= 5//decrease the alpha value to create a fading effect   
  }}
  show(){
   noStroke()//remove the stroke 
    fill(this.r, this.g, this.b, this.alpha) //set the fill color with the alpha value
    ellipse(this.pos.x, this.pos.y, 2);
    
}
}