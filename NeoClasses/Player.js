import Rect from "./Rect.js";

export default class Player {
  constructor(position, size, color,tilemap) {
    this.size = size || [8, 16];
    this.color = color || "Red";
    this.direction = { up: false, down: false, right: false, left: false };
    this.tilemap = tilemap
    this.rect= new Rect(position, this.size, this.color); 
    this.rect.width+= 2
    this.rect.height += 2 

  }


  
  

  update(p5, scroll_offset = [0, 0]) {
    // Move player using arrow keys
    this.direction.down=false
    this.direction.up=false
    this.direction.right=false
    this.direction.left=false

    if (p5.keyIsDown(p5.UP_ARROW)) {
      this.rect.y -= 1;
      this.direction["up"] = true;
      this.direction["down"] = false;
    } else 
    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
      this.rect.x += 1;
      this.direction["right"] = true;
      this.direction["left"] = false;
    } 
    if (p5.keyIsDown(p5.LEFT_ARROW)) {
      this.rect.x -= 1;
      this.direction["left"] = true;
      this.direction["right"] = false;
    } else
    if (p5.keyIsDown(p5.DOWN_ARROW)) {
      this.rect.y += 1;
      this.direction["down"] = true;
      this.direction["up"] = false
    } 
      

   
    
    
  
    this.rect.draw(p5, scroll_offset); // Draw the player's rectangle
  }
}
