import Player from "../Classes/Player.js";
import Rect from "../Classes/Rect.js";

export class renderer{
    constructor(){
        this.tilesize = 0
        this.scroll = [0,0]
        this.tilemap = {}
        this.player = null
        this.ground_tiles = []
        
    }
    
    Setup(file) {
        // Copy tilemap to avoid mutating the original file
        this.tilemap = JSON.parse(JSON.stringify(file)); 
        
        // Setup player and ground tiles
        var player_setup = this.tilemap["player"];
        var ground_setup = this.tilemap["ground"];
    
    
        this.tilesize = this.tilemap["tilesize"];
    
    
        var position = player_setup["position"].map(element => element * this.tilesize);
        var size = player_setup["size"] ?? null;
        var color = player_setup["color"] ?? null;
        

        this.player = new Player(position, size, color);
    
    
        for (let data of ground_setup) {
    
            let groundSize = data["size"];
            
            if (groundSize){
                groundSize.map(element => element * this.tilesize)   
            }
            
            let groundPosition = data["position"].map(element => element * this.tilesize);
            
            let groundColor = data["color"] ?? null;
            
            this.ground_tiles.push(new Rect(groundPosition, groundSize, groundColor));
        }
    
        return [this.player, this.ground_tiles];
    }

    Render(P5){
        // this.scroll[0] += (this.player.rect().centerx - P5.width / 2 - this.scroll[0]) / 30
        // this.scroll[1] += (this.player.rect().centery - P5.height / 2 - this.scroll[1]) / 30
                    


        this.ground_tiles.forEach(groundrect => {
            groundrect.draw(P5,this.scroll);
          });
          this.player.update(P5,this.scroll);
        
          this.ground_tiles.forEach(groundrect => {
            if (this.player.rect().colliderect(groundrect)){
              console.log("boo")
           }
          });
    }
}