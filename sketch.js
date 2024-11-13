import file from "./levelmap.json" with { type: "json" };
import { generatelevel } from "./Tilemap.js";
// import Player from "./Player.js";
// import Rect from "./Rect.js";

let gamedata= generatelevel(file);
console.log(gamedata)

let player, ground = [];
let canvaswidth = 400;
class Rect {
  constructor(pos, size, color = [23, 23, 65], P5, borderRadius = [0, 0, 0, 0]) {
    this.parent = P5
    [this.x, this.y] = pos;  
    this.top = this.y;        
    this.left = this.x;
    [this.width, this.height] = size;
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;   
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

  draw(P5) {
    this.update();
    this.parent.fill(this.color);
    console.log(this.x)
    P5.rect(this.x, this.y, this.width, this.height, ...this.borderRadii); // Use rect for squares
  
  }
}

class Player {
  constructor(pos, size = [50,50], color = "Red",P5) {
    [this.x, this.y] = pos;
    this.parent = P5
    this.size = size;
    this.rect = new Rect([this.x, this.y], this.size, color,P5); // Use the Rect class to represent the player
  }

  update(P5) {
    // Move player using arrow keys
    if (this.parent.keyIsDown(UP_ARROW)) {
      this.y -= 1;
    }
    if (this.parent.keyIsDown(P5.RIGHT_ARROW)) {
      this.x += 1;
    }
    if (this.parent.keyIsDown(LEFT_ARROW)) {
      this.x -= 1;
    }
    if (this.parent.keyIsDown(DOWN_ARROW)) {
      this.y += 1;
    }

    // Update rect position to match player's position
    this.rect.x = this.x;
    this.rect.y = this.y;
    

    this.rect.draw(); // Draw the player's rectangle
  }
}

new p5(function(p5){
p5.setup = function() {
  p5.createCanvas(canvaswidth, canvaswidth);
  p5.background(220);
  
  for (let i = 0; i < canvaswidth / 50; i++) {
    ground.push(new Rect([i * 50, 350], [50,50], "green",p5));
  }
  
  player = new Player([0, 300],[50,50],"Red",p5);
}

 p5.draw = function() {
  p5.background(220);
 
  ground.forEach(groundrect => {
    groundrect.draw(p5);
  });
  player.update();
  ground.forEach(groundrect => {
    if (player.rect.colliderect(groundrect)){
      console.log("boo")
    }
  });

}})
