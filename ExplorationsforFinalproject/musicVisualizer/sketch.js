let song;
let fft;
let w;
let button;

function preload() {
  song = loadSound("victoryLap.mp3"); // Remove the 'loaded' callback if it's not defined
}

function setup() {
  createCanvas(256, 256);
  colorMode(HSB);
  angleMode(DEGREES);
  
  button = createButton("toggle");
  button.mousePressed(toggleSong);
  
  // Set smoothing to 0.9, 64 bins
  fft = new p5.FFT(0.9, 64);
  w = width / 64;
}

function toggleSong() {
  // Add a check to make sure song exists
  if (song && song.isLoaded()) {
    if (song.isPlaying()) {
      song.pause();
    } else {
      song.play();
    }
  } else {
    console.log("Song not loaded yet!");
  }
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  
  for (let i = 0; i < spectrum.length; i++) {
    let ampl = spectrum[i];
    fill(i, 255, 255);
    let y = map(ampl, 0, 256, height, 0);
    rect(i * w, y, w, height - y);
  }
}