let video;
let handPose;
let hands = [];

function preload() {
  handPose = ml5.handPose();
}

function gotHands(results) {
  hands = results;
  console.log(results);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video, 0, 0);
  
  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip; 
    let thumb = hand.thumb_tip;
    
    if (index && thumb) {
      let d = dist(index.x, index.y, thumb.x, thumb.y);
      
      // Always draw circles, just change color
      if (d < 50) {
        fill(0, 255, 0); // Green when close
      } else {
        fill(255, 0, 0); // Red when far
      }
      
      noStroke();
      circle(index.x, index.y, 16);
      circle(thumb.x, thumb.y, 16);
    }
  }
}