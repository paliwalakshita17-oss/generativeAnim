//Spritesheet variables 
let sX=8;
let sY=4;
let spriteSheet;

let celW,celH;
let cels=[];

function preload(){
  spriteSheet=loadImage("./sprites/explosionFull.png")
}
function setup() {
 // background(0)
  createCanvas(400, 400);

celW = spriteSheet.width/sX;
celH = spriteSheet.height/sY;
for(let i = 0 ; i < sY ; i++)
  {
 for (let j = 0 ; j < sX ; j++){
  cels[i*sX + j] = spriteSheet.get(j*celW,i*celH,celW,celH)
 }
}
}


function draw() {
  background(0)
  
image(cels[frameCount % (sX*sY)], 0, 0);


}
