let actorShop = {
    '$': (x, y) => {
        return new Store(x, y);
    },
    '@': (x, y) => {
        return new Player(x, y);
    },
    'g': (x, y) => {
        return new Goblin(x, y);
    },
    '<': (x, y) => {
        return new Ladder(x, y, '<', "up");
    },
    '>': (x, y) => {
        return new Ladder(x, y, '>', "down");
    }
};

let environment = {
    " ": {fg: "black", bg: "black", name: "grass", description: "An empty piece of terrain.", visible: true},
    '#': { fg: "slategray", bg: "slategray", name: "wall", description: "An impassable wall.", blocked: true, visible: false},
    '~': { fg: "dodgerblue", bg: "dodgerblue", name: "shallow water", description: "Some shallow water.", blocked: true, visible: true},
    '=': {fg: "blue", bg: "blue", name: "deep water", description: "Some deep water.", blocked: true, visible: true},
    '.': {fg: "brown", bg: "black", name: "path", description: "A pathway!", visible: true},
    'T': {fg: "lightgreen", bg: "lightgreen", name: "tree", descritpion: "A tree!", blocked: true, visible: false}
};

const flatten = arr => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);

function actorCreator(symbol, x, y) {
    if (actorShop[symbol]) {
        return actorShop[symbol](x, y);
    } else {
        // is a null symbol?
        // throw "Unknown symbol";
        return null;
    }
}

/* This is a random dungeon map generator. It essentially generates identical
 * JSON data to that of a TILED map, with the unnecessary properties left out */
function randomMap(width, height) {
    // Generate a width by height sized generated map
    let rogueMap = new ROT.Map.Rogue(width, height).create();
    let map = {};
    map.width = width;
    map.height = height;
    map.layers = [{"data": []}, {"data": []}];
    freeCells = [];
    // Initialize obstacles and actors
    for (let j = 0; j < height; j++) {
        map.layers[0].data.push([]);
        map.layers[1].data.push([]);
        for (let i = 0; i < width; i++) {
            if (rogueMap.map[j][i]) {
                map.layers[0].data[j].push(36);
            } else {
                map.layers[0].data[j].push(47);
                freeCells.push({x: i, y: j});
            }
            map.layers[1].data[j].push(0);
        }
    }

    // Randomly select starting position for player
    let start = freeCells[Math.floor(Math.random() * freeCells.length)];
    map.layers[1].data[start.y][start.x] = 65; // set random spot to be the player

    // Flatten the layers to mimic Tiled map data
    map.layers[0].data = flatten(map.layers[0].data);
    map.layers[1].data = flatten(map.layers[1].data);
    return map;
}

class Map {
    constructor(json) {
        if (!json) throw "Bad map creation";
        let obstacles = json.layers[0];
        let actorLayer = json.layers[1];
        this.playerStart = null;
        this.width = json.width;
        this.height = json.height;
        this.actors = []; // store all of the actors in array
        this.data = new Array(this.height); // stores all tiles in the game

        console.log("Loading game map...");
        for (let i = 0; i < this.height; i++) {
            this.data[i] = new Array(this.width);
            for (let j = 0; j < this.width; j++) {
                // Grabs the symbol from the layer
                let id = obstacles.data[i * this.width + j];
                this.data[i][j] = new Tile(j, i, id);
            }
        }

        console.log("Loading actors...");
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                let id = actorLayer.data[i * this.width + j]; // grab the id in the json data
                if (id !== 0) { // id of zero indicates no actor in this spot
                    let symbol = String.fromCharCode(id - 1);
                    let newActor = actorCreator(symbol, j, i); // create the new actor
                    if (symbol === "@") {
                        this.playerStart = [j,i];
                    } else {
                        this.actors.push(newActor); // add to the list of all actors
                        this.data[i][j].actors.push(newActor); // also push to the tiles' actors
                    }
                }
            }
        }
        if (this.playerStart === null) throw "Error - no player starting position!";
    }

    print() {
        let buf = "";
        for (let i = 0; i < this.height; i++) {
            let row = "";
            for (let j = 0; j < this.width; j++)
                row += this.data[i][j].symbol; //+ " ";
            buf += row + '\n';
        }

        for (let i = 0; i < this.actors.length; i++) {
            let actor = this.actors[i];
            /* to calculate where the actor should go, we have to consider
             the new line character in each line of the buffer, which is equal
             to the actor's y coord. */
            let index = actor.y * this.width + actor.x + actor.y;
            buf = buf.substr(0, index)
                + actor.options.symbol
                + buf.substr(index + 1);
        }
        console.log(buf);
    }


    /* Returns the tiles adjacent to the given tile */
    adjTiles(tile) {
        let adjacentTiles = [];
        for (let dist of ROT.DIRS[8]) {
            let nx = tile.x + dist[0];
            let ny = tile.y + dist[1];
            if (!(nx < 0 || nx === this.width || ny < 0 || ny === this.height))
                adjacentTiles.push(this.data[ny][nx]);
        }
        return adjacentTiles;
    }

}

class Tile {
    constructor(x, y, id) {
        this.symbol = id === 0 ? String.fromCharCode(32) : String.fromCharCode(id - 1);
        this.options = environment[this.symbol];
        this.actors = [];
        this.x = x;
        this.y = y;
    }

    /* Indicates whether or not a tile is blocked; however, this excludes the player
     * for AI purposes. */
    blocked() {
        if (this.options.blocked) return true;
        for (let actor of this.actors) {
            if (actor.options.blocked && actor !== Game.player)
                return true;
        }
        return false;
    }
}

