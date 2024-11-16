import Rect from "./Rect.js";
export default class Player {
    constructor(position, size, color) {
      [this.x, this.y] = position;
      this.size = size || [8,16]
      this.color = color || "Red"

    }

    rect(){
      return new Rect([this.x, this.y], this.size, this.color, 2);
    }
  
    update(P5,scroll_offset=[0,0]) {
      // Move player using arrow keys
      if (P5.keyIsDown(P5.UP_ARROW)) {
        this.y -= 1;
      }
      if (P5.keyIsDown(P5.RIGHT_ARROW)) {
        this.x += 1;
      }
      if (P5.keyIsDown(P5.LEFT_ARROW)) {
        this.x -= 1;
      }
      if (P5.keyIsDown(P5.DOWN_ARROW)) {
        this.y += 1;
      }
      let entity_rect = this.rect();
      // Update rect position to match player's position
      entity_rect.x = this.x;
      entity_rect.y = this.y;
      
  
      entity_rect.draw(P5,scroll_offset); // Draw the player's rectangle
    }
  }
