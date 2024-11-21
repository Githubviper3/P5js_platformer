import Rect from "./Rect.js";

export default class Player {
  constructor(position, size, color,tilemap) {
    this.position = [this.x, this.y] = position;
    this.size = size || [8, 16];
    this.color = color || "Red";
    this.direction = { up: false, down: false, right: false, left: false };
    this.prev_direction = { up: false, down: false, right: false, left: false };
    this.tilemap = tilemap
    
  }

  rect() {
    return new Rect([this.x, this.y], this.size, this.color, 2);
  }

  shift_around(rect1,rect2, direction) {
    switch(direction){
      case "left":
        rect1.right = rect2.left
        rect1.left  = rect1.right - rect1.width
        rect1.x = rect1.left

        return rect1
      default:
        rect1.left = rect2.right
        rect1.right  = rect1.left + rect1.width
        rect1.x = rect1.left
        return rect1
      }
    }

  update(P5, scroll_offset = [0, 0]) {
    // Move player using arrow keys

    if (P5.keyIsDown(P5.UP_ARROW)) {
      this.y -= 1;
      this.direction["up"] = true;
    } else {
      this.direction["up"] = false;
    }
    if (P5.keyIsDown(P5.RIGHT_ARROW)) {
      this.x += 1;
      this.direction["right"] = true;
    } else {
      this.direction["right"] = false;
    }
    if (P5.keyIsDown(P5.LEFT_ARROW)) {
      this.x -= 1;
      this.direction["left"] = true;
    } else {
      this.direction["left"] = false;
    }
    if (P5.keyIsDown(P5.DOWN_ARROW)) {
      this.y += 1;
      this.direction["down"] = true;
    } else {
      this.direction["down"] = false;
    }
    this.prev_direction.up = !this.direction.up;
    this.prev_direction.down = !this.direction.down;
    this.prev_direction.right = !this.direction.right;
    this.prev_direction.left = !this.direction.left;
    let entity_rect = this.rect();
    //move rects around
    
    

    // Update rect position to match player's position
    entity_rect.x = this.x;
    entity_rect.y = this.y;
    this.position = [this.x, this.y];

    let colidables = this.tilemap.give_colision(this.position);
    
    colidables.forEach((groundrect) => {
      
      if (entity_rect.colliderect(groundrect)) {
        P5.text("Collision detected!",50,50);
        if (this.prev_direction.right){
          console.log(entity_rect)
          entity_rect = this.shift_around(entity_rect,groundrect,"left")
          console.log(entity_rect)
        } 
        
      }

    });
    

    entity_rect.draw(P5, scroll_offset); // Draw the player's rectangle
  }
}
