

let tilemap,game_data={};
function generatelevel(file){
    tilemap =  JSON.parse(JSON.stringify(file));
    game_data= {}
    for (const element of tilemap){
        game_data[`${element.type}`] = element.data
    }
    return game_data
}

export {generatelevel}
