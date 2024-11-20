import Player from "../Classes/Player.js";
import Rect from "../Classes/Rect.js";

export class renderer {
  constructor() {
    this.tilesize = 0;
    this.scroll = [0, 0];
    this.tilemap = {};
    this.player = null;
    this.ground_tiles = [];
    this.initial_position = null;
    this.ground= 0
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

    this.player = new Player(position, size, color);

    for (let data of ground_setup) {
      let groundSize = data["size"];

      if (groundSize) {
        groundSize.map((element) => element * this.tilesize);
      }

      let groundPosition = data["position"].map(
        (element) => element * this.tilesize
      );

      let groundColor = data["color"] ?? null;

      this.ground_tiles.push(new Rect(groundPosition, groundSize, groundColor));
    }

    return [this.player, this.ground_tiles];
  }

  Render(P5) {
    const fifthWidth = P5.width / 5;
    const fourfifthWidth = 4 * fifthWidth;
    const seventhHeight = P5.height / 7;
    const sixSeventhHeight = 6 * seventhHeight;

    // Horizontal scroll
    if (this.player.direction.right && this.player.x + this.scroll[0] > fourfifthWidth) {
        this.scroll[0] -= 1;
    }
    if (this.player.direction.left && this.player.x + this.scroll[0] < fifthWidth) {
        this.scroll[0] += 1;
    }

    // Vertical scroll
    if (this.player.direction.down && this.player.y + this.scroll[1] > sixSeventhHeight) {
        this.scroll[1] -= 1;
    }
    if (this.player.direction.up && this.player.y + this.scroll[1] < seventhHeight) {
        this.scroll[1] += 1;
    }

    // Draw ground tiles and player
    this.ground_tiles.forEach((groundrect) => {
        groundrect.draw(P5, this.scroll);
        // if (this.player.rect().colliderect(groundrect)) {
        //     console.log("boo");
        // }
    });

    this.player.update(P5, this.scroll);
    }
    tiles_around(pos){
        
    }
}
