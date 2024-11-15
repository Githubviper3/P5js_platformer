import file from "./levelmap.json" with { type: "json" };
import Setup from "./Level_Scripts/Setup.js";


let [player,ground]= Setup(file);


new p5(function(p5){
p5.setup = function() {
  p5.createCanvas(640, 480);
  p5.background(220);
}

 p5.draw = function() {
  p5.background(220);
 
  ground.forEach(groundrect => {
    groundrect.draw(p5);
  });
  player.update(p5);

  ground.forEach(groundrect => {
    if (player.rect.colliderect(groundrect)){
      console.log("boo")
   }
  });
}})
