var data;
var state;
var reading = 70;
var conf = 'none';
var counter=0;
var w=70;
var easing = 0.05;
var g2;

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

//console.log(micLevel);

let s1 = map(micLevel, 0, 1, .5, 1.5);

let t1 = map(reading, 70, 99, 22, 221);

c1 = color(255,128, 170);
c2 = color(0, g2, ( 55));

background(255, 255, 255);
  fill(255,0,0);
  noStroke();

    setGradient(0, 0, width, height, c1, c2, s1);

  text(reading, 20, 20);

    text(conf, 20, 100);

    if (conf == true) {
      g2 = 102;
    } else {

      g2 = 0;

    }

}


function parseData(data) {


  reading = data.result;
  print("reading:" + reading);
  //call API every 1000 milliseconds
  setTimeout(callAPI(),1000);

}


function parseState(state) {

  conf = state.result;
  print("conf:" + conf);

  setTimeout(callMotion(),1000);

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

    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, s1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
}