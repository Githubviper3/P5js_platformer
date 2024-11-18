import file from "./levelmap.json" with { type: "json" };
import { renderer } from "./Classes/tilemap.js";

// let [player,ground]= Setup(file);
let game = new renderer()
game.Setup(file)

new p5(function(p5){
p5.setup = function() {
  p5.createCanvas(640, 480);
  p5.background(220);
}

 p5.draw = function() {
  p5.background(220);
  game.Render(p5)
}})
