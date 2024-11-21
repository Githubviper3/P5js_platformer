import file from "./levelmap.json" with { type: "json" };
import Tilemap from "./Classes/tilemap.js";


let game = new Tilemap()
game.Setup(file)

new p5(function(p5){
p5.setup = function() {
  p5.createCanvas(640, 480);
}

 p5.draw = function() {
  p5.background("gray");
  game.Render(p5)
}})
