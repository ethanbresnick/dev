<script src="https://unpkg.com/ml5@0.4.3/dist/ml5.min.js"></script>

var img;
var c;

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/6_9Phtwci/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(1280, 720);
  c = color(255, 0, 0);

  video = createCapture(VIDEO);
  video.size(1280, 720);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  //  image(img, 0, 0);

  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);

  noStroke();
  fill(c);
  rect(25, 25, 25, 25);
}


// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}


function keyTyped() {
  if (key === 'a') {
    c = color(255, 0, 0);
    ;
  }
  if (key === 'b') {
    c = color(0, 255, 0);
    ;
  }

  background (c);


  c = get(mouseX, mouseY);

  var rgbValue = c[0] + "," + c[1] + "," + c[2];
  print(rgbValue);

  var particle = new Particle();
  particle.callFunction( {
  deviceId:
    '1f0039000347363339343638',
    name:
    'led',
    argument:
    rgbValue,
    auth:
    'f39e032ceebe32a5c445a7b29eabab9dcf585ede'
  }
  );
}
