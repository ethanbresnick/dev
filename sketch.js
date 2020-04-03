var img;
var c;

//function preload()
//{
//img = loadImage("http://dev.ethanbresnick.com/data/colors.jpg");
//}

function setup() {
    createCanvas(1280, 720);
    c = color(255,0,0);
}

function draw() {
//  image(img, 0, 0);

    noStroke();
    fill(c);
    rect(25, 25, 25, 25);


}

function keyTyped() {
  if (key === 'a') {
    c = color(255,0,0);;
  }
  if (key === 'b') {
    c = color(0,255,0);;
  }

  background (c);


c = get(mouseX, mouseY);

      var rgbValue = c[0] + "," + c[1] + "," + c[2];
      print(rgbValue);

      var particle = new Particle();
      particle.callFunction({
         deviceId: '1f0039000347363339343638',
         name: 'led',
         argument: rgbValue,
         auth: 'f39e032ceebe32a5c445a7b29eabab9dcf585ede'
      });
}
