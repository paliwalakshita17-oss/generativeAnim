function setup() {
  createCanvas(500, 500);
}

function draw() {
  
  
  
  let colorMix = mouseY / 500; 

  
  //Background Colors
  let bgAnger = color(20, 0, 0);      // dark red
  let bgDisgust = color(30, 30, 10);  //dark green
  let currentBg = lerpColor(bgAnger, bgDisgust, colorMix);
  
  background(currentBg); 

  // Line Colors
  let anger = color(255, 0, 0);       // Bright red
  let disgust = color(140, 150, 40);     // Bright green
  let currentStroke = lerpColor(anger, disgust, colorMix);

  noFill();
  stroke(currentStroke);
  
  
  strokeWeight(2);
  triangle(50, 450, 450, 50, 300, mouseY); 
  triangle(10, 100, 490, 150, 20, mouseY); 

  strokeWeight(10);
  
  triangle(250, 10, 10, mouseY, 490, mouseY);

  strokeWeight(5);
  triangle(200, 0, 300, 0, 250, 500);
  
  fill(currentStroke);
  noStroke();
}

function mouseDragged() {
  
}