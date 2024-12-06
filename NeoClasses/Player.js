import Rect from "./Rect.js";

export default class Player {
  constructor(p5,tilemap,position,color,size) {
    this.size = size || [8, 16];
    this.color = color || "Red";
    this.position = position
    this.tilemap = tilemap
    this.velocity = this.prev_movement = p5.createVector(0,0)
    
  }  
  rect(p5){
    return new Rect(p5,this.position,this.color,this.size,2)
  }
  update(p5, scroll_offset = [0, 0]) {  
    
    let vertical = p5.keyIsDown(p5.DOWN_ARROW) - p5.keyIsDown(p5.UP_ARROW)
    let horizontal = p5.keyIsDown(p5.RIGHT_ARROW) - p5.keyIsDown(p5.LEFT_ARROW)

    this.velocity.x = p5.lerp(Math.max(-3, Math.min(3, this.velocity.x + horizontal)),this.velocity.x,0.001)
    this.velocity.y = p5.lerp(Math.max(-2, Math.min(2, this.velocity.y + vertical)),this.velocity.y,0.001)

    this.position.add(this.velocity)
    let entity_rect = this.rect(p5)

    entity_rect.update()
    this.position = entity_rect.position
    this.collision(p5)
    entity_rect.draw(p5, scroll_offset); // Draw the player's rectangle
  }

  collision(p5){

    let entity_rect = this.rect(p5)
    p5.text(entity_rect.position,50,50)
    let rects = this.tilemap.give_colision(entity_rect.position.array(),p5)
    rects.forEach(rect => {

      if (entity_rect.colliderect(rect)){
        p5.text("collision detection",50,50)
        entity_rect = this.rect(p5)
        if (this.prev_movement.x > 0){
          entity_rect.velocity.x = 0
          entity_rect.update("right",rect)
        } 
        if (this.prev_movement.x < 0){
          entity_rect.velocity.x = 0
          entity_rect.update("left",rect) 
        }
        this.position = entity_rect.position.array()
        
        entity_rect = this.rect(p5)
        if (this.prev_movement.y > 0){
          entity_rect.velocity.y = 0
          entity_rect.update("down",rect)
        } 
        if (this.prev_movement.y < 0){
          entity_rect.velocity.y = 0
          entity_rect.update("up",rect)
        } 
        this.position = entity_rect.position.array()


      }
    });
  }
}
