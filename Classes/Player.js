import Rect from "./Rect.js";

export default class Player {
  constructor(position, size, color,tilemap) {
    this.size = size || [8, 16];
    this.color = color || "Red";
    this.direction = { up: false, down: false, right: false, left: false };
    this.prev_direction = { up: false, down: false, right: false, left: false };
    this.tilemap = tilemap
    this.rect= new Rect(position, this.size, this.color, 2); 
    this.rect.width+= 2
    this.rect.height += 2 

  }

  shift_around(rect1,rect2, direction) {
    switch(direction){
      case "left":
        rect1.right = rect2.left
        rect1.left  = rect1.right - rect1.width
        rect1.x = rect1.left

        return rect1
      case "right":
        rect1.left = rect2.right
        rect1.right  = rect1.left + rect1.width
        rect1.x = rect1.left
        return rect1
      }
    }
  
  collision(direction){
    this.shift_around(direction)
  }

  update(P5, scroll_offset = [0, 0]) {
    // Move player using arrow keys

    if (P5.keyIsDown(P5.UP_ARROW)) {
      this.rect.y -= 1;
      this.direction["up"] = true;
    } else {
      this.direction["up"] = false;
    }
    if (P5.keyIsDown(P5.RIGHT_ARROW)) {
      this.rect.x += 1;
      this.direction["right"] = true;
    } else {
      this.direction["right"] = false;
    }
    if (P5.keyIsDown(P5.LEFT_ARROW)) {
      this.rect.x -= 1;
      this.direction["left"] = true;
    } else {
      this.direction["left"] = false;
    }
    if (P5.keyIsDown(P5.DOWN_ARROW)) {
      this.rect.y += 1;
      this.direction["down"] = true;
    } else {
      this.direction["down"] = false;
    }
    this.prev_direction.up = !this.direction.up;
    this.prev_direction.down = !this.direction.down;
    this.prev_direction.right = !this.direction.right;
    this.prev_direction.left = !this.direction.left;
    
    
    let colidables = this.tilemap.give_colision(this.rect.position);
    
    P5.text(`"top": ${this.rect.top},"left":${this.rect.left},"right":${this.rect.right}, "bottom": ${this.rect.bottom}`,50,100)
    
    colidables.forEach((groundrect) => {
      
      if (this.rect.colliderect(groundrect)) {
        P5.text("Collision detected!",50,50);
        if (this.prev_direction.right){
        this.shift_around(this.rect,groundrect,"right")
      }
        if (this.prev_direction.left){
        this.shift_around(this.rect,groundrect,"left")
        }

        this.shift_around(this.rect,groundrect,"down")
        this.shift_around(this.rect,groundrect,"up")

      }

    });

    this.rect.draw(P5, scroll_offset); // Draw the player's rectangle
  }
}
