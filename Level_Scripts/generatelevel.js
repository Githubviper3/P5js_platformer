import Player from "../Classes/Player.js";
import Rect from "../Classes/Rect.js";



export function generatelevel(file){
    //initialise variables
    var tilemap,size,player,tilesize,ground_tiles = [];
    
    //copy tilemap
    tilemap =  JSON.parse(JSON.stringify(file)); 
    
    //setup player and ground tiles
    var player_setup = tilemap["player"];
    var ground_setup= tilemap["ground"];

    //tilesize
    tilesize = tilemap["tilesize"]

    //updating position to be tile based
    var position = player_setup["position"].forEach(element=> {element* tilesize })
    size = player_setup["size"]??null
    var color = player_setup["color"]?? null
    
    player = new Player(position,size,color)

    for (var data of ground_setup){
        size = data["size"].forEach(element => {element * tilesize});
        position = data["position"].forEach(element=> {element* tilesize })
        ground_tiles.push(new Rect(position,size,data["color"]))
    }
    return [player,ground_tiles]
}
