var data;



function setup() {

  createCanvas(windowWidth, windowHeight);


    var url = 'https://api.weather.gov/stations/KSMO/observations/current';
    loadJSON(url, parseData);

}




function draw() {


  background(255, 255, 255);
  fill(255, 0, 0);
  noStroke();


}


function parseData(data) {



  let reading = Number(data.current.windSpeed);
  print("reading:" + reading);
  //call API every 1000 milliseconds
  //setTimeout(callAPI(), 1000);

}
