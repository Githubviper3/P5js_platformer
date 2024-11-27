import Player from "../Classes/Player.js";
import Rect from "../Classes/Rect.js";

const all_offsets = [
  [-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [0, 0], [-1, 1], [0, 1], [1, 1]
];

export default class Tilemap {
  constructor() {
    this.tilesize = 0;
    this.scroll = [0, 0];
    this.tilemap = {};
    this.player = null;
    this.ground_tiles = [];
    this.groundpositions = []; // Fixed typo here
    this.initial_position = null;
    this.ground = 0;
  }

  Setup(file) {
    // Copy tilemap to avoid mutating the original file
    this.tilemap = JSON.parse(JSON.stringify(file));

    // Setup player and ground tiles
    var player_setup = this.tilemap["player"];
    var ground_setup = this.tilemap["ground"];

    this.tilesize = this.tilemap["tilesize"];

    let position = player_setup["position"].map(
      (element) => element * this.tilesize
    );
    this.initial_position = position;
    let size = player_setup["size"] ?? null;
    var color = player_setup["color"] ?? null;

    this.player = new Player(position, size, color,this);

    for (let data of ground_setup) {
      let groundSize = data["size"];

      if (groundSize) {
        groundSize = groundSize.map((element) => element * this.tilesize);
      }

      let groundPosition = data["position"].map(
        (element) => element * this.tilesize
      );
      this.groundpositions.push(data["position"]);

      let groundColor = data["color"] ?? null;

      this.ground_tiles.push(new Rect(groundPosition, groundSize, groundColor));
    }


    return [this.player, this.ground_tiles];
  }

  tiles_around(pos) {
    let tile_pos = pos.map((element) => Math.floor(element / this.tilesize));  // Convert to tile position
    let tiles = [];
    
    for (let offset of all_offsets) {
      let checkpos = [...tile_pos];
      checkpos[0] += offset[0];
      checkpos[1] += offset[1];


      // Compare checkpos with elements of groundpositions
      if (this.groundpositions.some(ground => JSON.stringify(ground) === JSON.stringify(checkpos))) {
        tiles.push([checkpos, "ground"]);  // Push both the position and label
      }
    }


    return tiles;
}



  give_colision(pos) {
    let tiledata = this.tiles_around(pos);

    let tiles = [];


    tiledata.forEach(data => {
      if (data[1] === "ground") {
        
        tiles.push(new Rect(data[0].map(element =>element*this.tilesize), [16, 16])); // Assuming ground tiles are 16x16 in size
      }
    });


    return tiles;
  }

  Render(P5) {
    const fifthWidth = P5.width / 5;
    const fourfifthWidth = 4 * fifthWidth;
    const seventhHeight = P5.height / 7;
    const sixSeventhHeight = 6 * seventhHeight;

    // Horizontal scroll
    if (this.player.rect.x + this.scroll[0] > fourfifthWidth) {
      this.scroll[0] -= 1;
    }
    if ( this.player.rect.x + this.scroll[0] < fifthWidth) {
      this.scroll[0] += 1;
    }

    // Vertical scroll
    if (this.player.rect.y + this.scroll[1] > sixSeventhHeight) {
      this.scroll[1] -= 1;
    }
    if ( this.player.rect.y + this.scroll[1] < seventhHeight) {
      this.scroll[1] += 1;
    }

    // Draw ground tiles and player
    this.ground_tiles.forEach((groundrect) => {
      groundrect.draw(P5, this.scroll);
    });
    


    this.player.update(P5,this.scroll);


    
  }
}
