gridSize=20

    function setup() {
      frameRate(60);
angleMode(60);
  background(0)
  createCanvas(innerWidth,innerHeight);
  background(250);
}

function draw() {
  
  for(let i=0;i<width;i+=gridSize){
    
   
    for(let j=0;j<height;j+=gridSize){
      stroke(0);
      noFill();
      
      rect(i, j, gridSize, gridSize);

    }
  }

}