import Rect from "./Rect.js";
export default class Player {
    constructor(position, size, color) {
      [this.x, this.y] = position;
      this.size = size || [8,16]
      this.color = color || "Red"
      this.rect = new Rect([this.x, this.y], this.size, this.color, 2); // Use the Rect class to represent the player
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
