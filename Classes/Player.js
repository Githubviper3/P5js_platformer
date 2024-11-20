import Rect from "./Rect.js";
export default class Player {
    constructor(position, size, color) {
      this.position = [this.x, this.y] = position;
      this.size = size || [8,16]
      this.color = color || "Red"
      this.direction = {'up': false, 'down': false, 'right': false, 'left': false}

    }

    rect(){
      return new Rect([this.x, this.y], this.size, this.color, 2);
    }

    update(P5,scroll_offset=[0,0]) {
      // Move player using arrow keys
      
      if (P5.keyIsDown(P5.UP_ARROW)) {
        this.y -= 1;
        this.direction["up"] = true
      } else{
        this.direction["up"] = false
      } 
      if (P5.keyIsDown(P5.RIGHT_ARROW)) {
        this.x += 1;
        this.direction["right"] = true
      } else{
        this.direction["right"] = false
      } 
      if (P5.keyIsDown(P5.LEFT_ARROW)) {
        this.x -= 1;
        this.direction["left"] = true
      }  else{
        this.direction["left"] = false
      } 
      if (P5.keyIsDown(P5.DOWN_ARROW)) {
        this.y += 1;
        this.direction["down"] = true
      }  else{
        this.direction["down"] = false
      } 
      let entity_rect = this.rect();
      // Update rect position to match player's position
      entity_rect.x = this.x;
      entity_rect.y = this.y;
      this.position = [this.x,this.y]
      
  
      entity_rect.draw(P5,scroll_offset); // Draw the player's rectangle
    }
  }
