export default class Rect {
  constructor(pos, size = [16,16], color, border = false, borderRadius = [0, 0, 0, 0]) {
    [this.x, this.y] = pos;  
    this.top = this.y;        
    this.left = this.x;
    [this.width, this.height] = size;
    this.centerx = this.x + this.width/2;
    this.centery = this.y + this.height/2;
    this.center = [this.centerx,this.centery];
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;   
    this.strokeWeight = Number(border);
    this.borderRadii = borderRadius;
    [this.borderRadii_tl, this.borderRadii_tr, this.borderRadii_br, this.borderRadii_bl] = borderRadius;
    this.color = color;
  }

  colliderect(rect) {
    if (
      this.right > rect.left &&     
      this.left < rect.right &&     
      this.bottom > rect.top &&     
      this.top < rect.bottom        
    ) {
      return true;  
    }
    
    return false;  
  }

  update() {
    this.top = this.y;        
    this.left = this.x;    
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;
    this.centerx = this.x + this.width/2;
    this.centery = this.y + this.height/2;
    this.center = [this.centerx,this.centery];

  }

  draw(P5,scroll_offset=[0,0]) {
    this.update();
    P5.fill(this.color);
    P5.strokeWeight(this.strokeWeight);
    P5.rect(this.x + scroll_offset[0], this.y+ scroll_offset[1], this.width, this.height, ...this.borderRadii); // Use rect for squares
  }
}


