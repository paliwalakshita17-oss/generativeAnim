let video;
let handPose;
let hands = [];
let song;
let fft;
let w;
let button;
let hueValue = 180;

function preload() {
  handPose = ml5.handPose();
  song = loadSound("victoryLap.mp3");
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  colorMode(HSB);
  
  // Video for hand tracking only (hidden)
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  
  handPose.detectStart(video, gotHands);
  
  // Audio setup
  button = createButton("Play Music");
  button.mousePressed(toggleSong);
  song.setVolume(1.0);
  
  fft = new p5.FFT(0.9, 64);
  w = width / 64;
}

function toggleSong() {
  userStartAudio();
  
  if (song.isPlaying()) {
    song.pause();
    button.html("Play Music");
  } else {
    song.play();
    button.html("Pause Music");
  }
}

function draw() {
  background(0); // Black background instead of video
  
  // Hand tracking (no video shown)
  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip; 
    let thumb = hand.thumb_tip;
    
    if (index && thumb) {
      let d = dist(index.x, index.y, thumb.x, thumb.y);
      
      // map distance to color
      hueValue = map(d, 0, 200, 0, 360);//map()` converts one range to another RED > YELLOW > GREEN > BLUE > PURPLE > RED
      
    //Draws  circles at  fingertip positions
      fill(hueValue, 255, 255);
      noStroke();
      circle(index.x, index.y, 30);
      circle(thumb.x, thumb.y, 30);
      
      // draw line
      stroke(hueValue, 255, 255);
      strokeWeight(5);
      line(index.x, index.y, thumb.x, thumb.y);
      
      // shows distance
     // fill(255);
     // noStroke();
     // textSize(20);
    //  text("Distance: " + nf(d, 0, 0), 20, 40);
    }
  }
  
  // Audio visualizer bars , gets the frequency data from the song
//Returns an array of 64 number
  let spectrum = fft.analyze();
  
  for (let i = 0; i < spectrum.length; i++) {
    let ampl = spectrum[i]; // How loud this frequency is
    fill(hueValue, 255, 255); // Use the SAME color from fingers!
    let y = map(ampl, 0, 256, height, 0);// Convert loudness to bar height
    rect(i * w, y, w, height - y);// Draw the bar
  }
}