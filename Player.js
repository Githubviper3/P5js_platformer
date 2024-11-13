// import Rect from "./Rect.js";
export default class Player {
    constructor(pos, size = [50,50], color = "Red",P5) {
      [this.x, this.y] = pos;
      this.size = size;
      this.rect = new Rect([this.x, this.y], this.size, color, 2); // Use the Rect class to represent the player
    }
  
    update(P5) {
      // Move player using arrow keys
      if (P5.keyIsDown(UP_ARROW)) {
        this.y -= 1;
      }
      if (P5.keyIsDown(RIGHT_ARROW)) {
        this.x += 1;
      }
      if (P5.keyIsDown(LEFT_ARROW)) {
        this.x -= 1;
      }
      if (P5.keyIsDown(DOWN_ARROW)) {
        this.y += 1;
      }
  
      // Update rect position to match player's position
      this.rect.x = this.x;
      this.rect.y = this.y;
      
  
      this.rect.draw(); // Draw the player's rectangle
    }
  }
  