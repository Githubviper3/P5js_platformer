import file from "./levelmap.json" with { type: "json" };
import { generatelevel } from "./tilemap.js";
let canvaswidth = 400;
let gamedata= generatelevel(file);

class Rect {
  constructor(pos, size, color = [23, 23, 65], border = false, borderRadius = [0, 0, 0, 0]) {
    this.pos = [this.x, this.y] = pos;  
    this.top = this.y;        
    this.left = this.x;
    [this.width, this.height] = size;
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;   
    this.strokeWeight = Number(border);
    this.borderRadii = borderRadius;
    [this.borderRadii_tl, this.borderRadii_tr, this.borderRadii_br, this.borderRadii_bl] = borderRadius;
    this.color = color;
  }

  colliderect(rect) {
    if (
      this.right > rect.left &&     
      this.left < rect.right &&     
      this.bottom > rect.top &&     
      this.top < rect.bottom        
    ) {
      return true;  
    }
    
    return false;  
  }

  update() {
    this.top = this.y;        
    this.left = this.x;    
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;  
  }

  draw() {
    this.update();
    fill(this.color);
    strokeWeight(this.strokeWeight);
    rect(this.x, this.y, this.width, this.height, ...this.borderRadii); // Use rect for squares
  }
}

class Player {
  constructor(pos, size = [50,50], color = "Red") {
    [this.x, this.y] = pos;
    this.size = size;
    this.rect = new Rect([this.x, this.y], this.size, color, 2); // Use the Rect class to represent the player
  }

  update() {
    // Move player using arrow keys
    if (keyIsDown(UP_ARROW)) {
      this.y -= 1;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 1;
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 1;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += 1;
    }

    // Update rect position to match player's position
    this.rect.x = this.x;
    this.rect.y = this.y;
    

    this.rect.draw(); // Draw the player's rectangle
  }
}

let player, ground = [];

function setup() {
  createCanvas(canvaswidth, canvaswidth);
  background(220);
  
  // Create a green square as the background obstacle
  for (let i = 0; i < canvaswidth / 50; i++) {
    ground.push(new Rect([i * 50, 350], [50,50], "green"));
  }
  
  player = new Player([0, 300]);
}


function draw() {
  background(220);
 
  // Update and draw the player
  

  // Draw the green square ground
  ground.forEach(groundrect => {
    groundrect.draw();
  });
  player.update();
  ground.forEach(groundrect => {
    if (player.rect.colliderect(groundrect)){
      console.log("boo")
    }
  });

}
