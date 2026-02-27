function setup() {
  createCanvas(400, 400);
  background(220);

}
function draw() {
  }

function drawBoat(x,y,z,r,g,b) {
  fill(139,69,19);
  rect(x,y,120,50,0,0,35,35);
  fill(255,0,0);
  triangle(x+20,y-10,x+70,y-10,x+70,y-50);
  
  }

  function mousePressed(){
    drawBoat(mouseX,mouseY);
  }


  function mouseDraw(){
    drawBoat(mouseX,mouseY);
  }