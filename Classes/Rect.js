export default class Rect {
  constructor(pos,size = [16, 16],color,border = 0,borderRadius = [0, 0, 0, 0]){
    this.position = [this.x, this.y] = pos;

    //direction to name
    this.top = this.y;
    this.left = this.x;
    [this.width, this.height] = size
    this.strokeWeight = border
    this.width += border
    this.height += border
    this.centerx = this.x + this.width / 2;
    this.centery = this.y + this.height / 2;
    this.center = [this.centerx, this.centery];
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;

    this.borderRadii = borderRadius;
    [this.borderRadii_tl,this.borderRadii_tr, this.borderRadii_br,this.borderRadii_bl] = borderRadius;
    this.color = color || "blue";
    
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

  shift_around_rect(rect, direction) {
    
    if (direction === "left") {
      this.right = rect.left;
      this.left = this.right - this.width;
      this.x = this.left;
  } else if (direction === "right") {
      this.left = rect.right;
      this.right = this.left + this.width;
      this.x = this.left;
  } else if (direction === "up") {
      this.bottom = rect.bottom;
      this.top = this.bottom - this.height;
      this.y = this.top;
  } else if (direction === "down") {
      this.top = rect.top;
      this.bottom = this.top + this.height;
      this.y = this.top;
  }

  }

    
    


  update() {
    this.top = this.y;
    this.left = this.x;
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;
    this.centerx = this.x + this.width/2;
    this.centery = this.y + this.height/2;
    this.center = [this.centerx,this.centery];
    this.position = [this.x,this.y]
    
  }

  draw(P5, scroll_offset = [0, 0]) {
    this.update()
    P5.fill(this.color);
    P5.strokeWeight(this.strokeWeight);
    P5.rect(this.x + scroll_offset[0],this.y + scroll_offset[1],this.width,this.height,...this.borderRadii); 
  }
}
