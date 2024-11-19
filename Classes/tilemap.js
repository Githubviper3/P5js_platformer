import Player from "../Classes/Player.js";
import Rect from "../Classes/Rect.js";

export class renderer{
    constructor(){
        this.tilesize = 0
        this.scroll = [0,0]
        this.tilemap = {}
        this.player = null
        this.ground_tiles = []
        this.initial_position = null
        
    }
    
    Setup(file) {
        // Copy tilemap to avoid mutating the original file
        this.tilemap = JSON.parse(JSON.stringify(file)); 
        
        // Setup player and ground tiles
        var player_setup = this.tilemap["player"];
        var ground_setup = this.tilemap["ground"];
    
    
        this.tilesize = this.tilemap["tilesize"];
    

        let position = player_setup["position"].map(element => element * this.tilesize);
        this.initial_position = position
        let size = player_setup["size"] ?? null;
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
        if (this.player.direction.right){
            this.scroll[0] -= 5
        } 
        if (this.player.direction.left){
            this.scroll[0] += 5
        }
        if (this.player.direction.down){
            this.scroll[1] -= 5
        } 
        if (this.player.direction.up){
            this.scroll[1] += 5
        }

        
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
