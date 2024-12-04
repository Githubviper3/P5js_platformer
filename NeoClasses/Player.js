import Rect from "./Rect.js";

export default class Player {
  constructor(p5,tilemap,position,color,size) {
    this.size = size || [8, 16];
    this.color = color || "Red";
    this.rect= new Rect(p5,position,this.color,this.size);
    this.tilemap = tilemap
    this.speed =2
    this.prev_movement = p5.createVector(0,0)
  }  

  update(p5, scroll_offset = [0, 0]) {

    let vertical = p5.keyIsDown(p5.DOWN_ARROW) - p5.keyIsDown(p5.UP_ARROW)
    let horizontal = p5.keyIsDown(p5.RIGHT_ARROW) - p5.keyIsDown(p5.LEFT_ARROW)
    this.prev_movement = this.rect.velocity
    let targetvel  = p5.createVector(this.speed*horizontal,this.speed*vertical)
    this.rect.velocity =(targetvel)

    this.rect.update()
    this.collision(p5)
    this.rect.draw(p5, scroll_offset); // Draw the player's rectangle
  }

  collision(p5){

    let rects = this.tilemap.give_colision(this.rect.position.array(),p5)
    rects.forEach(rect => {

      if (this.rect.colliderect(rect)){
        p5.text("collision detection",50,50)
        if (this.prev_movement.y > 0){
          this.rect.velocity = 0
          this.rect.update("down",rect)
        } else if (this.prev_movement.y < 0){
          this.rect.velocity = 0
          this.rect.update("up",rect)
        }
      }
    });
  }
}
