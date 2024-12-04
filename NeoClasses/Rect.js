export default class Rect {
  constructor(p5,position,color,size = [16, 16],border = 0){
    this.position= p5.createVector(...position)
    this.velocity= p5.createVector(0,0)
    this.top = this.position.y
    this.left = this.position.x;
    [this.width, this.height] = size
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;
    this.strokeWeight = border
    this.color = color || "blue";
  }

  colliderect(rect) {
    if (this.right > rect.left && this.left < rect.right && this.bottom > rect.top && this.top < rect.bottom) 
      {
      return true;
    }
    return false;
  }

  update(direction,rect= null) {
    this.position.add(this.velocity)
    if (direction === "down") {
      this.bottom = rect.top;
      this.top = this.bottom - this.height;
      this.position.y = this.top;
  } else if (direction === "up") {
      this.top = rect.bottom;
      this.bottom = this.top + this.height;
      this.position.y = this.top;
  } else {
      this.top = this.position.y;
      this.left = this.position.x;
      this.bottom = this.top + this.height;
      this.right = this.left + this.width;
  }
  
  }


  draw(p5, scroll_offset = [0, 0]) {
    p5.fill(this.color);
    p5.strokeWeight(this.strokeWeight);
    p5.rect(this.position.x + scroll_offset[0],this.position.y + scroll_offset[1],this.width,this.height); 
  }
}
