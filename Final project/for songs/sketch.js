/*let song;
let fft;
let w;
let button;

function preload(){ 
  song = loadSound('assets/beat.mp3');
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  fft = new p5.FFT(0.9,64);
  w = width / 64;
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function draw() {
  background(220);

}*/

var song;
var button;

function preload() {
  // Ensure the file path is correct and the file is in your project folder
 
}

function setup() {
  createCanvas(400, 400);
   song = loadSound("Fred again.. x Skepta x PlaqueBoyMax - Victory Lap.mp3",loaded);
  button = createButton('toggle');
  button.mousePressed(togglePlaying);
  background(220);
  
}
 
function loaded() {
  console.log("Song loaded successfully!");
  // You can start playing the song here if you want
  // song.play();
}

function togglePlaying() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }}

function draw() {
  
 // text("Click to play song", 150, 200);
}

// This function handles the required user interaction
/*function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}*/
