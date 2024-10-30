let canvaswidth = 400;

class Rect {
  constructor(pos, size, color = [23, 23, 65], square=false,border=false, borderRadius = [0, 0, 0, 0]) {
    [this.top,this.left] = [this.x, this.y] = pos;
    if (square){
      [this.width,this.height] = [size,size];
    } else{
      [this.width,this.height] = size;
    }
    this.bottom = this.top + this.height
    this.right = this.left + this.width
    this.strokeWeight = Number(border)

    this.borderRadii = borderRadius;
    this.borderRadius= new Set(borderRadius)
    [this.borderRadii_tl,this.borderRadii_tr,this.borderRadii_br,this.borderRadii_bl] = borderRadius
    this.color = color;

     
  }

  draw() {
    fill(this.color);
    strokeWeight(this.strokeWeight);
    rect(this.x, this.y, this.width, this.height, ...this.borderRadii); // Use rect for squares
  }
}



class Player {
  constructor(pos, width = 50) {
    [this.x, this.y] = pos;
    this.width = width;
    this.rect = new Rect(pos,width,"Red",true,2)
  }

  update() {
    //this.y += 1
    if (this.y > 350){
      this.y == 30
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= 3;
    }  
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 3;
    }  
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 3;
    } 
    if (keyIsDown(DOWN_ARROW)) {
      this.y += 3;
    } 
    square(this.x, this.y, this.width);
  }
}

function generate_ground(sqr_width, canvas_width, start_pos) {
  let [start_x, start_y] = start_pos;
  for (let i = 0; i <= canvas_width / sqr_width; i++) {
    fill("green");
    noStroke();
    square(start_x, start_y, sqr_width);
    start_x += sqr_width;
  }
}


function setup() {
  createCanvas(canvaswidth, canvaswidth);
  background(220);
  generate_ground(50, canvaswidth, [0, 350]);
  player = new Player([0, 300]);
  neosqr = new Rect([50,50],20,"Blue",true) 
}

function draw() {
  background(220);
  generate_ground(50, canvaswidth, [0, 350]);
  player.update();
  neosqr.draw();
}
