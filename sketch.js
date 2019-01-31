var data;
var state;
var reading = 0;
var conf = 'none';
var counter=0;
var w=0;
var easing = 0.05;

let c1, c2;


function setup() {

  createCanvas(500, 500);

 callAPI();

  callMotion();




}



function draw() {

  c1 = color(w, w, 0);
c2 = color(0, 102, 153);

background(255, 255, 255);
  fill(255,0,0);
  noStroke();

  text(reading, 20, 20);

    text(conf, 20, 100);

  //draw circle with easing.
   var targetW = reading;
   var dw = targetW - w;
   w += dw * easing;
  ellipse(width / 2, height / 2, w, w);
  //console.log('w:+'+w);


  setGradient(0, 0, width, height, c1, c2);

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


function setGradient(x, y, w, h, c1, c2) {
  noFill();

    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
}
