let x = 0;
let y = 0;
let spacing = 100;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(198, 234, 255);
  
}

function draw() {
  stroke(255);
  if(random(1) > 0.9) {
    rect(x,y,spacing,spacing);
    //line(x,y,x+spacing,y+spacing);
    
  }
  else {
    //line(x,y+spacing,x+spacing,y);
    ellipse(x+spacing/2,y+spacing/2,spacing,spacing);
  }

  x += spacing;
  if(x > windowWidth) {
    x = 0;
    y += spacing;
  }
  if(y > windowHeight) {
    y = 0;
  }
   
}
