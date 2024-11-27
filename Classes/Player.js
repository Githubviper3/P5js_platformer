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

  shift_around(rect1, rect2, direction) {
    switch(direction) {
      case "left":
        rect1.right = rect2.left;
        rect1.left = rect1.right - rect1.width;
        rect1.x = rect1.left;
        return rect1;
      case "right":
        rect1.left = rect2.right;
        rect1.right = rect1.left + rect1.width;
        rect1.x = rect1.left;
        return rect1;
      case "up":
        rect1.top = rect2.bottom;
        rect1.bottom = rect1.top + rect1.height;
        rect1.y = rect1.top;
        return rect1;
      case "down":
        rect1.bottom = rect2.top;
        rect1.top = rect1.bottom - rect1.height;
        rect1.y = rect1.top;
        return rect1;
      default:
        return rect1;
    }
  }
  
  
  collision(direction){
    this.shift_around(direction)
  }

  update(P5, scroll_offset = [0, 0]) {
    // Move player using arrow keys
    this.direction.down=false
    this.direction.up=false
    this.direction.right=false
    this.direction.left=false

    if (P5.keyIsDown(P5.UP_ARROW)) {
      this.rect.y -= 1;
      this.direction["up"] = true;
      this.direction["down"] = false;
    } else 
    if (P5.keyIsDown(P5.RIGHT_ARROW)) {
      this.rect.x += 1;
      this.direction["right"] = true;
      this.direction["left"] = false;
    } 
    if (P5.keyIsDown(P5.LEFT_ARROW)) {
      this.rect.x -= 1;
      this.direction["left"] = true;
      this.direction["right"] = false;
    } else
    if (P5.keyIsDown(P5.DOWN_ARROW)) {
      this.rect.y += 1;
      this.direction["down"] = true;
      this.direction["up"] = false
    } 
      

   
    
    
    let colidables = this.tilemap.give_colision(this.rect.position);
    
   

        
    colidables.forEach((groundrect) => {
      
      if (this.rect.colliderect(groundrect)) {
        
        if (this.direction.right){
        this.shift_around(this.rect,groundrect,"left")
        }
        if (this.direction.left){
        this.shift_around(this.rect,groundrect,"right")
        }
        if (this.direction.up){
          this.shift_around(this.rect,groundrect,"up")
        } 
        if (this.direction.down){
          this.shift_around(this.rect,groundrect,"down")
        }
      }

    });

    this.rect.draw(P5, scroll_offset); // Draw the player's rectangle
  }
}
