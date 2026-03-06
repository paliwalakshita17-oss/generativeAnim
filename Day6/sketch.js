let flowers = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(135, 200, 135, 40);
  for (let f of flowers) {
    f.grow();
    f.draw();
  }
}

function mousePressed() {
  flowers.push(new Flower(mouseX, mouseY));
}

function mouseDragged() {
  for (let f of flowers) {
  
  }
}