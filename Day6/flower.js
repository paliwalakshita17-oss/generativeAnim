class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.petalCount = floor(random(5, 9));
    this.petalSize  = 0;
    this.maxPetalSize = random(20, 45);
    this.stemHeight = 0;
    this.maxStemHeight = random(60, 120);
    this.growSpeed  = random(0.3, 0.8);
    this.petalCol = color(random(200,255), random(50,150),             random(100,200));
    this.centreCol = color(random(220,255), random(180,230), 0);
    this.stemCol   = color(50, random(120,180), 50);
  }



  grow() {
    if (this.petalSize < this.maxPetalSize) {
      this.petalSize += this.growSpeed;
    }
    if (this.stemHeight < this.maxStemHeight) {
      this.stemHeight += this.growSpeed * 1.5;
    }
  }

draw() {
  push();
  translate(this.x, this.y);
  stroke(this.stemCol);
  strokeWeight(3);
  line(0, 0, 0, -this.stemHeight);
  translate(0, -this.stemHeight);
  noStroke();
  fill(this.petalCol);
  for (let i = 0; i < this.petalCount; i++) {
    let angle = (TWO_PI / this.petalCount) * i;
    let px = cos(angle) * this.petalSize;
    let py = sin(angle) * this.petalSize;
    ellipse(px, py, this.petalSize * 0.9, this.petalSize * 0.9);
  }
  fill(this.centreCol);
  ellipse(0, 0, this.petalSize * 0.7, this.petalSize * 0.7);
  pop();
}}