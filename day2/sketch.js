/*let x ,y;
function setup() {
  background(0)
  createCanvas(400, 400);
  x=0 , y=400;
}

function draw() {
  background(300)
  fill(x,y,300,400);
  ellipse(x,200,100,)
  x++;
  ellipse(y,100,200)
  y--;
  
ellipse(mouseX,mouseY,200,100)


}*/



function setup() {
  createCanvas(400, 400);
  background(220);

}

function draw() {
  drawBoat();
  
  
  
}

function drawBoat(x,y,z,r,g,b) {
  
  rect(x,y,120,50,0,0,35,35);
  triangle(x+20,y-10,x+70,y-10,x+70,y-50);
  
  }

  function mousePressed(){
    drawBoat(mouseX,mouseY);
  }


  function mouseDraw(){
    drawBoat(mouseX,mouseY);
  }