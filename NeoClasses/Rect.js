export default class Rect {
  constructor(pos,p5,size = [16, 16],color,border = 0,borderRadius = [0, 0, 0, 0]){
    this.position= p5.createVector(...pos)
    this.y = this.top = this.position.y
    this.x = this.left = this.position.x;
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;
    [this.width, this.height] = size
    this.width += border
    this.height += border
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
    p5.rect(this.x + scroll_offset[0],this.y + scroll_offset[1],this.width,this.height,...this.borderRadii); 
  }
}
