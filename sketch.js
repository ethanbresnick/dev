var data;
var state;
var reading = 70;
var conf = 'none';
var counter = 0;
var w = 70;
var easing = 0.05;
var g2;
var v = 0;
var goingUp = true;
var delta = 0.15

let value = 35;

var mic;

var f;

let c1, c2;


function setup() {

  createCanvas(windowWidth, windowHeight);

  callAPI();

  callMotion();


  mic = new p5.AudioIn()
  mic.start();

}




function draw() {

  micLevel = mic.getLevel();

  console.log(micLevel);

  if(goingUp) {
    v += delta;
    if(v >= PI/2)
      goingUp = false;
  } else {
    v -= delta;
    if(v <= -PI/2)
      goingUp = true;
  }


  let s1 = map(micLevel, 0, .4, 1.5, .5);

  let t1 = map(reading, 70, 99, 128, 255);

  c1 = color(value, t1, 170);
  c2 = color(43, 48, 68);

  background(255, 255, 255);
  fill(255, 0, 0);
  noStroke();

  setGradient(0, 0, width, height, c1, c2, (s1 + sin(v)*0.1*g2));

  //text(reading, 20, 20);

  //text(conf, 20, 100);

  if (conf == true) {
    g2 = 2;
  } else {
    g2 = 1;
  }

}


function parseData(data) {


  reading = data.result;
  print("reading:" + reading);
  //call API every 1000 milliseconds
  setTimeout(callAPI(), 1000);

}


function parseState(state) {

  conf = state.result;
  print("conf:" + conf);

  setTimeout(callMotion(), 1000);

}

function callAPI() {
  var url = 'https://api.particle.io/v1/devices/1f0039000347363339343638/temp?access_token=9dd3428620eeafe845da5a1cf0bea2a5b15ba5c1';
  data = loadJSON(url, parseData);
  counter++;
  //  console.log(counter);

}

function callMotion() {

  var link = 'https://api.particle.io/v1/devices/1f0039000347363339343638/stuff?access_token=9dd3428620eeafe845da5a1cf0bea2a5b15ba5c1';
  state = loadJSON(link, parseState);
  //  console.log(counter);


}


function setGradient(x, y, w, h, c1, c2, s1) {
  noFill();
  for (let i = y - h; i <= y + h; i++) {
    let inter = map(i, y - h, y + h, 0, s1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i + h);
  }
}

function keyPressed() {

  if (value === 35)

  { value = 255; }

  else { value = 35; } }
