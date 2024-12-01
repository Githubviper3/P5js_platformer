// import file from "./levelmap.json" with { type: "json" };
// import Tilemap from "./NeoClasses/tilemap.js";
import Rect from "./NeoClasses/Rect.js";
let rect1;

// let game = new Tilemap();
new p5(function(p5){
p5.setup = function() {
  p5.createCanvas(640, 480);
  rect1= new Rect([0,0],p5)

  // game.Setup(file,p5);

}

 p5.draw = function() {
  p5.background("gray");
  rect1.draw(p5)
  // game.Render(p5)
}})
