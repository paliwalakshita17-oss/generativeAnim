

// Variables for the eyes
let eyeX = 0;      //zero movement in the beginning
let eyeSpeed = 1;  // for speed
  
function setup(){createCanvas(400, 500);}

function draw() {
  // Bg color
  background(220, 80, 40);

  // hair (Back)
  fill(0); // Black color fill
  //Back hair
  rect(100, 80, 200, 300);

  // face
  fill(255); // White skin
  strokeWeight(2);

  noStroke();
  //rectangle for top half
  rect(125, 120, 150, 100);
  // triangle for chin
  noStroke();
  triangle(125, 220, 275, 220, 200, 320);

  // Bangs
  fill(0); //black
  // Three rectangles for fringe
  rect(125, 100, 45, 60);
  rect(175, 100, 50, 50);
  rect(230, 100, 45, 60);

  //eyes
  fill(0); // Black
  ellipse(160, 180, 30, 20); // Left eye
  ellipse(240, 180, 30, 20); // Right eye

  // moving pupils
  if (mouseIsPressed) {
    
    eyeX = eyeX + eyeSpeed;

    
   if (eyeX > 7) {
      eyeSpeed = -1; //  move left
    }
    if (eyeX < -7) {
      eyeSpeed = 1;  //  move right
    }

  
    fill(255); // White eye part
    ellipse(160 + eyeX, 180, 12, 12);
    ellipse(240 + eyeX, 180, 12, 12);
  }

  //lower lashes
  // Left eye Lashes
  fill(0)
  triangle(150, 195, 160, 195, 155, 205);
  triangle(165, 195, 175, 195, 170, 205);

  // right eye lashes
  triangle(225, 195, 235, 195, 230, 205);
  triangle(240, 195, 250, 195, 245, 205);

  //nose
  noFill();
  stroke(0);
  triangle(200, 200, 190, 230, 210, 230);

  //lips
  fill(100, 0, 0); // Dark Red
  ellipse(200, 260, 20, 10);

  //hair strands
  strokeWeight(4);
  line(110, 100, 90, 350); // Left line
  line(290, 100, 310, 350); // Right line
}
