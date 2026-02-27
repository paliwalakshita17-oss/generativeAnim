/*function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES)
  background(220);
}

function draw() {
  x=frameCount
  let y = 60 * sin(frameCount) + 200;
   point(x, y);
  
}*/



function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES)
  background(220);
}

function draw() {
  fill(0); // Black
  ellipse(160, 180, 30, 20);
  //
  // Move the pupil
  let eyex = map(mouseX, 0, width, -5, 5, true); 
  let eyey = map(mouseY, 0, height, -5, 5, true);
  fill(255); // Black pupil
  ellipse(160 + eyex, 180 + eyey, 8, 8);

  

}