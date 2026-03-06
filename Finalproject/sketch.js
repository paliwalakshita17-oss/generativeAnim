//these vars control the kaleidoscope geometry and rendering parameters

let kWidth = 800;             // width of graphics
let kHeight = 800;            // height of graphics

let nbrSides = 7;      //More mirrors = more slices = more complex pattern.7 mirror slices arranged around the centre
let kMinSides = 3;
let kMaxSides = 13;
let kMinDots = 10;
let kMaxDots = 2048;

let scopeRadius = Math.floor(.48*kWidth)//The radius of the circular kaleidoscope — 48% of the canvas width
let scopeMargin = 8;

let mirrorRadians = 0;
let adjustedMirrorRadians = 0;
let objectCellHeight = kWidth; 
let objectCellWidth = kHeight;

//Two invisible off-screen canvases. objectCell is where the moving 
// dots are drawn. compositeCell is where the mirror reflections are
//  assembled. Think of objectCell as the thing the kaleidoscope is 
// "looking at", and compositeCell as the final reflected image.

let objectCell, 
    compositeCell;

let usesMirrors = true;

// these vars control the particle animation in the object cell
let kNbrDots = 512;  // how many dots are drawn
let kDotRadius = 12; // radius of each dot, in pixels, before the mirror reflections are applied
let kBlurAmt = 3; 
let kDarkenAmount = 164;
let kSpeed = 0.00005;  // how fast the animation moves

let kTubeRotate = false; //When true, the entire kaleidoscope slowly rotates like a tube being spun. 
let kStartTubeRotate;
let rStart;

// ── Hand gesture additions 
let video;
let handPose;
let hands = [];
let song;
let playButton;

//  smoothing buffers for the hand gestures. These help prevent jitter by averaging out the raw values over time.
let smoothDotRadius   = 12;
let smoothBlurAmt     = 3;
let smoothHandsApart  = 300;
let smoothRightWristY = 240;
const SMOOTH = 0.1;

//It loads the ml5 hand tracking AI model and the music file into 
// memory. p5.js guarantees these are fully loaded before setup() runs.

function preload() {
  handPose = ml5.handPose();
  song = loadSound('victoryLap.mp3');
}

//ml5 calls this automatically every time it detects hands in 
// the camera. It gives back an array called results

function gotHands(results) {
  hands = results;
}
// Calculates the angle of one wedge of the kaleidoscope in radians.
//This gets recalculated every time nbrSides changes.

function SetupMirror() {
  mirrorRadians = 2 * PI / (nbrSides * 2);
  let pixelAngle = 1 / scopeRadius; // helps reduce visible seams by overlapping aliased edges
  adjustedMirrorRadians = mirrorRadians + pixelAngle*2;
}

// Draws a pie-slice . This is used as a clipping mask so only one wedge of objectCell
//  shows through at a time before being mirrored around. 
function myMask() {
  let ox = 0, oy = 0;  // objectCell.height/2;
  let adjustedAngle = adjustedMirrorRadians; // helps reduce seams by adding a pixel to the outer angle
  compositeCell.beginShape();
  compositeCell.vertex(ox,oy);
  let beginAngle = -adjustedAngle / 2;
  let nbrDivs = 10;
  for (let i = 0; i <= nbrDivs; ++i) {
    let amt = i / nbrDivs;
    compositeCell.vertex(ox+cos(beginAngle+adjustedAngle*amt)*scopeRadius, oy+sin(beginAngle+adjustedAngle*amt)*scopeRadius);
  }
  compositeCell.endShape(CLOSE);
}

function SetupCell() {
  // unused
}


// it draws the moving coloured dots onto objectCell every frame.

function DrawCell(oc) {
  oc.smooth();
  // Draws a semi-transparent black rectangle over everything. Because it's not fully opaque, the old dots don't fully disappear ,they fade out gradually
  oc.background(0, 0, 0, kDarkenAmount);
  oc.noStroke();

// millis() is the time in milliseconds since the sketch started. 
// Multiplying by kSpeed makes n grow slowly over time. 

  let n = millis() * kSpeed + rStart;
  let rad = objectCellWidth / 2 - kDotRadius;
  oc.push();
  oc.translate(objectCellWidth/2, objectCellHeight/2);
  for (let i = 0; i <= kNbrDots; ++i) {//For each dot, theta is its angle position evenly spaced around a circle (0 to 2π)
    let theta = i * PI * 2 / kNbrDots; // angle going around the circle goes from 0 -> 2π
    let myHue = n + theta / 2;

    //Calculates RGB colour using sine waves that shift over time
    let ph = sin(millis() * 0.0001);
    let rr = Math.floor(sin(myHue) * 127 + 128);
    let gg = Math.floor(sin(myHue + (2 * ph) * PI / 3) * 127 + 128);
    let bb = Math.floor(sin(myHue + (4 * ph) * PI / 3) * 127 + 128);
    oc.fill(rr, gg, bb);

    //This is the rose curve equation a mathematical formula that makes
    //  dots trace out petal-shaped path
    let r = rad * cos(n * theta); 
    let px = cos(theta) * r * 2;
    let py = sin(theta) * r * 2;
    oc.ellipse(px, py, kDotRadius, kDotRadius);
  }
  oc.pop();
  // blur disabled
  // glow
  oc.blend(0, 0, objectCellWidth, objectCellHeight, -2, 2, objectCellWidth + 3, objectCellHeight - 5, ADD);
}

function setup() {
  let min_window_dimension = Math.min(windowWidth, windowHeight);
  myCanvas = createCanvas(kWidth, kWidth);
  compositeCell = createGraphics(kWidth, kWidth);
  background(0);

  objectCellWidth = width;
  objectCellHeight = height;
  objectCell = createGraphics(objectCellWidth, objectCellHeight);
  frameRate(60); // desired frame rate

  ellipseMode(RADIUS);
  SetupMirror();
  SetupCell();
  kStartTubeRotate = millis();
  rStart = 2; // fixed small value to keep rose positions sensible

  // ── Camera + ml5 ──
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);

  // ── DOM overlay for camera preview (outside canvas) ──
  setupCameraOverlay();

  // ── Music play button ──
  song.setVolume(1.0);
  playButton = createButton('▶  PLAY MUSIC');
  playButton.style('position',        'fixed');
  playButton.style('bottom',          '20px');
  playButton.style('left',            '50%');
  playButton.style('transform',       'translateX(-50%)');
  playButton.style('z-index',         '100');
  playButton.style('background',      'rgba(0,0,0,0.6)');
  playButton.style('color',           'rgba(255,255,255,0.85)');
  playButton.style('border',          '1px solid rgba(255,255,255,0.25)');
  playButton.style('border-radius',   '30px');
  playButton.style('padding',         '8px 26px');
  playButton.style('font-size',       '12px');
  playButton.style('letter-spacing',  '0.1em');
  playButton.style('cursor',          'pointer');
  playButton.style('font-family',     'monospace');
  playButton.mousePressed(() => {
    userStartAudio();
    if (song.isPlaying()) {
      song.pause();
      playButton.html('▶  PLAY MUSIC');
    } else {
      song.play();
      playButton.html('⏸  PAUSE');
    }
  });
}

// we use a queue to manage incoming slider values, because slider_hook is not in p5.js context when called.
let slider_queue = [];
function slider_hook(slider_index, value) {
  slider_queue.push([slider_index, value]);
}

// this is called from our draw() function, and is in p5.js context
function empty_slider_queue() {
  // first in, first out
  while (slider_queue.length > 0) {
    let [slider_index, value] = slider_queue.shift();
    slider_hook_process(slider_index, value);
  }
}

// process incoming slider changes
function slider_hook_process(slider_index, value) {
  switch (slider_index) {
    case 0:
      nbrSides = constrain(int(value),kMinSides,kMaxSides);
      console.log("nbr sides = ", nbrSides)
      SetupMirror();
      break;
    case 1:
      kNbrDots = constrain(int(value),kMinDots,kMaxDots);
      break;
    case 2:
      kDotRadius = map(value, 0, 1, 1, 20);
      break;
    case 3:
      kBlurAmt = map(value, 0, 1, 0, 20);
      break;
    case 4:
      kDarkenAmount = map(value, 1, 0, 128, 255);
      break;
    case 5:
      kSpeed = map(value, 0, 1, 0.00001, 0.0001);
      break;
    case 6:
      kRecursionLevels = int(value);
      break;
    case 7:
      rStart = map(value,0,1,30,60);
      break;
    case 8:
      kRecursionScale = map(value, 0, 1, 0.1, 0.9);
      break;
  }
}

// we use a queue to manage incoming button values, because button_hook is not in p5.js context when called.
let button_queue = [];
function button_hook(index, value) {
  button_queue.push([index, value]);
}

// this is called from our draw routine, and is in p5.js context
function empty_button_queue() {
  // first in, first out
  while (button_queue.length > 0) {
    let [index, value] = button_queue.shift();
    button_hook_process(index, value);
  }
}

// process incoming button presses
function button_hook_process(index, value) {
  switch (index) {
    case 0:
      usesMirrors = !(value == 0);
      break;
    case 1:
      // unused
      break;
    case 2:
      kWedgeFeedback = !(value == 0);
      break;
    case 3:
      kShowFrameRate = !(value == 0);
      break;
    case 4:
      kTubeRotate = !(value == 0);
      if (kTubeRotate) {
        kStartTubeRotate = millis();
      }
      break;
    case 5:
      kBisect = !(value == 0);
      break;
  }
}

// copies wedges from the objectCell to the compositeCell in a 2-mirror kaleidoscope pattern
// that rotates about the center
//
// alternate wedges are reflected by inverting the Y scaling
function applyMirrors()
{
  for (let i = 0; i < nbrSides; ++i) {
    // for each reflection, there are two wedges copied (a normal one, and a reflected one)
    compositeCell.push();
    compositeCell.rotate(mirrorRadians * i * 2);
    compositeCell.push();
    compositeCell.clip(myMask);
    compositeCell.image(objectCell, -objectCell.width/2, -objectCell.height/2);
    compositeCell.pop();

    // every other wedge is inverted (reflected)
    compositeCell.rotate(mirrorRadians);
    compositeCell.scale(1, -1);
    compositeCell.push();
    compositeCell.clip(myMask);
    compositeCell.image(objectCell, -objectCell.width/2, -objectCell.height/2);
    compositeCell.pop();
    compositeCell.pop();
  }
}

// ── Read hand gestures and update kaleidoscope params ─────────────────────────
function processGestures() {
  if (hands.length === 0) return;

  // ml5 with flipped:true: 'Left' label = user's right hand, 'Right' label = user's left hand
  let handR = null, handL = null;
  for (let h of hands) {
    let label = (h.handedness || '').toLowerCase();
    if (label === 'left')  handR = h;
    if (label === 'right') handL = h;
  }

  // Right-hand pinch → dot size (2–20)
  if (handR) {
    let rIdx = handR.index_finger_tip, rThumb = handR.thumb_tip;
    if (rIdx && rThumb) {
      let d = dist(rIdx.x, rIdx.y, rThumb.x, rThumb.y);
      smoothDotRadius += (d - smoothDotRadius) * SMOOTH;
      kDotRadius = constrain(map(smoothDotRadius, 5, 150, 2, 20), 2, 20);
    }
  }

  // Left-hand pinch → speed (pinch closed = slow, open = fast)
  if (handL) {
    let lIdx = handL.index_finger_tip, lThumb = handL.thumb_tip;
    if (lIdx && lThumb) {
      let d = dist(lIdx.x, lIdx.y, lThumb.x, lThumb.y);
      smoothBlurAmt += (d - smoothBlurAmt) * SMOOTH;
      kSpeed = map(smoothBlurAmt, 5, 150, 0.000002, 0.0003);
    }
  }

  // Both index tips apart → number of sides (3–13)
  if (handR && handL) {
    let aIdx = handR.index_finger_tip;
    let bIdx = handL.index_finger_tip;
    if (aIdx && bIdx) {
      let apart = dist(aIdx.x, aIdx.y, bIdx.x, bIdx.y);
      smoothHandsApart += (apart - smoothHandsApart) * SMOOTH;
      let newSides = constrain(round(map(smoothHandsApart, 40, 560, kMinSides, kMaxSides)), kMinSides, kMaxSides);
      if (newSides !== nbrSides) {
        nbrSides = newSides;
        SetupMirror();
      }
    }
  }
}

// ── Draw the camera preview + hand dots in top-right corner ───────────────────
function drawCameraPreview() {
  // Handled via DOM overlay — see setupCameraOverlay()
  // Update hand dots on the overlay canvas each frame
  let oc = document.getElementById('hand-overlay');
  if (!oc) return;
  let ctx = oc.getContext('2d');
  ctx.clearRect(0, 0, oc.width, oc.height);

  if (hands.length === 0) return;

  let sx = oc.width  / 640;
  let sy = oc.height / 480;

  for (let h = 0; h < hands.length; h++) {
    let hand = hands[h];
    let idx   = hand.index_finger_tip;
    let thumb = hand.thumb_tip;
    if (!idx || !thumb) continue;

    let ix = oc.width - idx.x   * sx;  // mirrored
    let iy = idx.y   * sy;
    let tx = oc.width - thumb.x * sx;
    let ty = thumb.y * sy;
    let d  = dist(idx.x, idx.y, thumb.x, thumb.y);

    ctx.strokeStyle = d < 50 ? 'rgba(0,255,100,0.9)' : 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(tx, ty); ctx.stroke();

    ctx.fillStyle = 'rgb(255,200,50)';
    ctx.beginPath(); ctx.arc(ix, iy, 4, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgb(80,180,255)';
    ctx.beginPath(); ctx.arc(tx, ty, 4, 0, Math.PI*2); ctx.fill();
  }
}

function setupCameraOverlay() {
  // Wrapper div fixed to top-right of page
  let wrapper = document.createElement('div');
  wrapper.id = 'cam-wrapper';
  wrapper.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    pointer-events: none;
  `;

  // Reuse the p5 video element directly
  let vid = video.elt;
  vid.style.cssText = `
    width: 200px;
    height: 150px;
    object-fit: cover;
    transform: scaleX(-1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 4px;
    display: block;
  `;

  // Canvas overlay for hand dots (same size as vid)
  let overlay = document.createElement('canvas');
  overlay.id = 'hand-overlay';
  overlay.width  = 200;
  overlay.height = 150;
  overlay.style.cssText = `
    position: absolute;
    top: 0; right: 0;
    width: 200px;
    height: 150px;
    pointer-events: none;
  `;

  // Video + overlay container
  let vidBox = document.createElement('div');
  vidBox.style.cssText = 'position: relative; width: 200px; height: 150px;';
  vidBox.appendChild(vid);
  vidBox.appendChild(overlay);

  // Status label
  let status = document.createElement('div');
  status.id = 'cam-status';
  status.style.cssText = `
    font-family: monospace;
    font-size: 10px;
    color: #ff5050;
    text-align: right;
    width: 200px;
  `;
  status.textContent = 'no hands';

  // Gesture guide
  let guide = document.createElement('div');
  guide.style.cssText = `
    background: rgba(0,0,0,0.6);
    border-radius: 6px;
    padding: 6px 10px;
    font-family: monospace;
    font-size: 11px;
    color: rgba(255,255,255,0.8);
    width: 200px;
    box-sizing: border-box;
    white-space: nowrap;
  `;
  guide.innerHTML = `
    <div style="display:flex;justify-content:space-between;gap:8px"><span>🤏 R pinch</span><span style="color:#ffd050">→ dot size</span></div>
    <div style="display:flex;justify-content:space-between;gap:8px"><span>🤌 L pinch</span><span style="color:#ffd050">→ speed</span></div>
    <div style="display:flex;justify-content:space-between;gap:8px"><span>✌️ Hands apart</span><span style="color:#ffd050" id="sides-label">→ sides: 7</span></div>
  `;

  wrapper.appendChild(vidBox);
  wrapper.appendChild(status);
  wrapper.appendChild(guide);
  document.body.appendChild(wrapper);

  // Update status + sides label every frame
  setInterval(() => {
    let s = document.getElementById('cam-status');
    if (s) {
      s.textContent = hands.length > 0
        ? hands.length + ' hand' + (hands.length > 1 ? 's' : '') + ' detected'
        : 'no hands';
      s.style.color = hands.length > 0 ? '#50ff82' : '#ff5050';
    }
    let sl = document.getElementById('sides-label');
    if (sl) sl.textContent = '→ sides: ' + nbrSides;
  }, 100);
}
// ─────────────────────────────────────────────────────────────────────────────

function draw() {
  processGestures();
  empty_slider_queue();     // process incoming slider events
  empty_button_queue();     // process incoming button events

  DrawCell(objectCell); // draw object cell contents

  // begin rendering to composteCell
  compositeCell.background(0);
  compositeCell.push();
  compositeCell.translate(width/2, height/2);

  if (usesMirrors) {
    applyMirrors(); // copy the wedges from the object cell to the composite Cell
  } else {
    compositeCell.background(0);
    compositeCell.image(objectCell, -objectCell.width/2, -objectCell.height/2);
  }

  compositeCell.pop(); // finish drawing

  // render compositeCell to screen, with rotation about the center
  push();
  background(0);
  translate(width/2, height/2);
  if (kTubeRotate) {
    rotate((millis() - kStartTubeRotate) * 0.00005);    // rotating of scope as a whole
  }
  image(compositeCell, -kWidth/2, -kHeight/2);
  pop();

  // ── Camera preview in top-right (drawn after kaleidoscope, on top) ──
  drawCameraPreview();
}


let small_size = 512;
let large_size = 900;

function toggle_sketch_size() {
  kWidth = kWidth === small_size ? large_size : small_size;
  kHeight = kWidth;
  resizeCanvas(kWidth, kHeight);
}

function keyPressed() {
  // Return early if the preset editor is active
  const presetEditor = document.getElementById('preset-editor');
  if (presetEditor && presetEditor.style.display !== 'none' && presetEditor.style.display !== '') {
    return;
  }
  if (key === 'x' || key === 'X') { 
    toggle_slider_visibility();
  } else if (key === 's' || key === 'S') {
    toggle_sketch_size();
  }
}