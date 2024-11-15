import Player from "../Classes/Player.js";
import Rect from "../Classes/Rect.js";

export function generatelevel(file) {
    // Initialize variables
    var tilemap, size, player, tilesize, ground_tiles = [];
    
    // Copy tilemap to avoid mutating the original file
    tilemap = JSON.parse(JSON.stringify(file)); 
    
    // Setup player and ground tiles
    var player_setup = tilemap["player"];
    var ground_setup = tilemap["ground"];


    tilesize = tilemap["tilesize"];


    var position = player_setup["position"].map(element => element * tilesize);
    size = player_setup["size"] ?? null;
    var color = player_setup["color"] ?? null;
    
    // Create the player object
    player = new Player(position, size, color);

    

    // Loop through ground tiles and create Rect objects
    for (let data of ground_setup) {

        let groundSize = data["size"];
        
        if (groundSize){
            groundSize.map(element => element * tilesize)   
        }
        
        let groundPosition = data["position"].map(element => element * tilesize);
        
        let groundColor = data["color"] ?? undefined;
        
        ground_tiles.push(new Rect(groundPosition, groundSize, groundColor));
    }

    return [player, ground_tiles];
}
