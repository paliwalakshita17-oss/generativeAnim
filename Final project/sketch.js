
let video;
let handPose;
let hands=[]; // there are no poses in the beginning 

function preload(){
  handPose = ml5.handPose("MediaPipeHands",{flipped:true});
  }
function gotHands(results){
  hands = results ; 
  console.log(results);
}
function setup() {
  createCanvas(400, 400);
  video = createCapture( VIDEO , {flipped:true});
  video.hide();
handPose.detectStart(video,gotHands);// for continuous pose detection

}

function draw() {
   
  image(video,0,0);
  //background(220);
  if(hands.length > 0){//to check if atleast one pose is detected 

    /*let hand = hands[0]; // to get the first pose
    let index = hand.indexFinger; // to get the index finger keypoints
    let thumb = hand.thumb_tip; // to get the thumb tip keypoints
   
    /*circle(index.x,index.y,16); // to draw a circle at the index finger tip
    fill(255,0,255);
    circle(thumb.x,thumb.y,16); // to draw a circle at the thumb tip*/
    if(index && thumb){ // to check if the index finger and thumb keypoints are detected
      let d = dist(index.x,index.y,thumb.x,thumb.y); // to calculate the distance between the index finger and thumb
      if(d < 20){ // if the distance is less than 50 pixels
        noStroke();
        fill(255,0,0);
      }
      else{
        fill(255,0,255);
      }
      noStroke();
      circle(index.x , index.y ,16); // to draw a circle at the midpoint between the index finger and thumb
      circle(thumb.x , thumb.y ,16);
      
    }
  }
  for(let hand of hands) // to get atleast 1 pose
    if(hand.confidence > 0.1) {

  for(let i = 0 ; i<hand.keypoints.length;i++){
    let keypoint = hand.keypoints[i];
    if(hand.handedness === "Left"){
      fill(255,0,0);
    noStroke();
    
      circle(keypoint.x,keypoint.y,16);
    }
    else{ 
    fill(255,0,255);
    noStroke();
    
      circle(keypoint.x,keypoint.y,16);
  }

  }
  }}

