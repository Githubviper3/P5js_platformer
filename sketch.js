import file from "./levelmap.json" with { type: "json" };
import { generatelevel } from "./Tilemap.js";
import Player from "./Player.js";
import Rect from "./Rect.js";

let gamedata= generatelevel(file);
console.log(gamedata)

let player, ground = [];
let canvaswidth = 400;

new p5(function(p5){
p5.setup = function() {
  p5.createCanvas(canvaswidth, canvaswidth);
  p5.background(220);
  
  for (let i = 0; i < canvaswidth / 50; i++) {
    ground.push(new Rect([i * 50, 350], [50,50], "green"));
  }
  
  player = new Player([0, 300],[50,50],"Red");
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
