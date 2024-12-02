import file from "./levelmap.json" with { type: "json" };
import Tilemap from "./NeoClasses/tilemap.js";

let game;



new p5(function(p5){
p5.setup = function() {
  p5.createCanvas(640, 480);
  game = new Tilemap(p5)
  game.Setup(file,p5);

}

 p5.draw = function() {
  p5.background("gray");
  game.Render(p5)
}})
