import Player from "../NeoClasses/Player.js";
import Rect from "../NeoClasses/Rect.js";

const all_offsets = [
  [-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [0, 0], [-1, 1], [0, 1], [1, 1]
];

export default class Tilemap {
  constructor(p5) {
    this.tilesize = 0;
    this.scroll = p5.createVector(0, 0);
    this.tilemap = {};
    this.player;
    this.ground_tiles = [];
    this.groundpositions = [];
  }

  Setup(file,p5) {
    // Copy tilemap to avoid mutating the original file
    this.tilemap = JSON.parse(JSON.stringify(file));

    // Setup player and ground tiles
    var player_setup = this.tilemap["player"];
    var ground_setup = this.tilemap["ground"];

    this.tilesize = this.tilemap["tilesize"]

    let position = p5.createVector(...player_setup["position"]).mult(this.tilesize).array()
  

    this.player = new Player(p5,this,position);

    for (let data of ground_setup) {
      let groundPosition =  p5.createVector(...data["position"]).mult(this.tilesize)
      this.groundpositions.push(data["position"]);
      let groundColor = data["color"];
      this.ground_tiles.push(new Rect(p5,groundPosition.array(),groundColor));
    }
    return [this.player, this.ground_tiles];
  }

  tiles_around(pos) {
    let tile_pos = pos.map((element) => Math.floor(element / this.tilesize));  // Convert to tile position

    let tiles = [];
    for (let offset of all_offsets) {
      let checkpos = tile_pos.slice(0,-1);
      checkpos[0] += offset[0];
      checkpos[1] += offset[1];


      if (this.groundpositions.some(ground => JSON.stringify(ground) === JSON.stringify(checkpos))) {
        checkpos = checkpos.map(element => element * this.tilesize);        
        tiles.push(checkpos); 
      }
    }


    return tiles;
}



  give_colision(pos,p5) {
    let tiledata = this.tiles_around(pos);

    let tiles = [];


    tiledata.forEach(data => {
        tiles.push(new Rect(p5,data)) 
    });


    return tiles;
  }

  Render(p5) {
    const fifthWidth = p5.width / 5;
    const fourfifthWidth = 4 * fifthWidth;
    const seventhHeight = p5.height / 7;
    const sixSeventhHeight = 6 * seventhHeight;
    let horizontal = (this.player.rect.position.x + this.scroll.x < fifthWidth) - (this.player.rect.position.x + this.scroll.x > fourfifthWidth)
    let vertical = (this.player.rect.position.y + this.scroll.y < seventhHeight) - (this.player.rect.position.y + this.scroll.y > sixSeventhHeight) 
    this.scroll.add(p5.createVector(horizontal,vertical))    

    this.ground_tiles.forEach((groundrect) => {
      groundrect.draw(p5, this.scroll.array());
    });
    
    this.player.update(p5,this.scroll.array());    
  }
}
