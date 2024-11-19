Add collisions detection and player
finalise using rect class instead of square
https://stackoverflow.com/questions/28739745/how-to-make-an-iterator-out-of-an-es6-class
Making it an iterable or somth
make the level data simplified 
Several features are from
https://www.youtube.com/watch?v=StoBCNiQakM&list=PLBDInqUM5B26FjwMMZqGDxqQr1kX5V9Ul
scrolling
https://editor.p5js.org/L0808866/sketches/lvURvk4QN
https://editor.p5js.org/tamserad/sketches/lGhZvNgH
https://github.com/Dajuuu/2D-Platformer-p5/blob/master/sketch.js

Allowing things to be in modules
https://www.youtube.com/watch?v=P0bkwncSJag

https://p5play.org/learn/camera.html

 Logic to make the game character and camera move.

if (isLeft) {
    if (gameChar_x > width * 0.4) {
      //controling camera movement speed
      gameChar_x -= 4;
    } else {
      scrollPos += 4;
    }
  }
  if (isRight) {
    if (gameChar_x < width * 0.4) {
      //controling camera movement speed
      gameChar_x += 4;
    } else {
      scrollPos -= 4; // negative for moving against the background
    }
  }