import Rect from "./Rect.js";
export default class Player {
    constructor(pos, size = [50,50], color = "Red") {
      [this.x, this.y] = pos;
      this.size = size;
      this.rect = new Rect([this.x, this.y], this.size, color, 2); // Use the Rect class to represent the player
    }
  
    update(P5) {
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
  
      // Update rect position to match player's position
      this.rect.x = this.x;
      this.rect.y = this.y;
      
  
      this.rect.draw(P5); // Draw the player's rectangle
    }
  }
