let Gridsize =5;
function setup() {
  frameRate(10);
  createCanvas(windowWidth, windowHeight);
  background(0);
  
}

function draw() {
  for(let i =0;i<innerWidth;i+=Gridsize) {
  for(let j =0;j<innerHeight;j+=Gridsize) {
      noStroke(100);
          fill(random(0,255),random(0,255),random(0,255));
          ellipse(i,j,Gridsize,Gridsize);
      
    
    }
  }
  
}