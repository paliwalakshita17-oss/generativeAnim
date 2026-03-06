

var particles = []//array to store the particles
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES)//set the angle mode to degrees

}

function draw() {
  background(20);
  for(var i = 0; i<20; i++) {//to add 100 particles every time we refresh the page
    p = new Particle()//create a new particle object  
    particles.push(p)//add the new particle object to the particles array

  }
  for(var i = 0; i<particles.length; i++) {
    if(particles[i].alpha > 0) {//if the alpha value of the particle is less than or equal to 0, remove it from the array
      particles[i].update()
      particles[i].show()//call the update and show methods of the particle object
    }else{
      particles.splice(i,1)//remove the particle from the array
    }
    
  //
  }
}
