export default class Rect {
  constructor(p5,position,color,size = [16, 16],border = 0,borderRadius = [0, 0, 0, 0]){
    this.position= p5.createVector(...position)
    this.velocity= p5.createVector(0,0)
    this.top = this.position.y
    this.left = this.position.x;
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;
    [this.width, this.height] = size
    this.center = this.position.copy()
    this.center.div(2)
    [this.centerx, this.centery] = this.center;
    this.strokeWeight = border
    this.borderRadii = borderRadius;
    [this.borderRadii_tl,this.borderRadii_tr, this.borderRadii_br,this.borderRadii_bl] = borderRadius;
    this.color = color || "blue";
  }

  colliderect(rect) {
    if (this.right > rect.left && this.left < rect.right && this.bottom > rect.top && this.top < rect.bottom) 
      {
      return true;
    }
    return false;
  }

  update() {
    this.position.add(this.velocity)
    this.top = this.position.y
    this.left = this.position.x;
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;
    this.center = this.position.copy()
    this.center.div(2)
    [this.centerx, this.centery] = this.center;
  }

  draw(p5, scroll_offset = [0, 0]) {
    this.update()
    p5.fill(this.color);
    p5.strokeWeight(this.strokeWeight);
    p5.rect(this.position.x + scroll_offset[0],this.position.y + scroll_offset[1],this.width,this.height,...this.borderRadii); 
  }
}
