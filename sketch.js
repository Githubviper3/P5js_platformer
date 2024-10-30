let canvaswidth = 400;

function generate_ground(sqr_width,canvas_width,start_pos){
  let [start_x,start_y] = start_pos;
  for (let i = 0;i<=canvas_width/sqr_width;i++){
    fill("green")
    noStroke();
    square(start_x,start_y,sqr_width)
    start_x += sqr_width
  }
}

function player(){
  fill("red");
  square(0,350,50,50);
  if (keyIsPressed){
    
  }
}

function setup() {
  createCanvas(canvaswidth, canvaswidth);
  background(220);
  generate_ground(50,canvaswidth,[0,350]);
}


function draw() {

}
