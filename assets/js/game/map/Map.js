const entityShop = {
    0: (x, y, id) => {
        return new Player(x, y, id);
    },
    1: (x, y, id) => {
        return new Goblin(x, y, id);
    },
    2: (x, y, id) => {
        return new Rat(x, y, id);
    },
    3: (x, y, id) => {
        return new Ladder(x, y, id, "down");
    },
    4: (x, y, id) => {
        return new Ladder(x, y, id, "up");
    },
    5: (x, y, id) => {
        return createSword(x, y, id);
    },
};

function createEntity(x, y, entity_id, frame_id) {
    if (entity_id in entityShop) {
        return entityShop[entity_id](x, y, frame_id);
    } else {
        throw `No entity assigned to ID ${entity_id} for frame ${frame_id} at ${x + "," + y}`;
    }
}

const flatten = arr => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);

/**
 * Created by Larken on 6/28/2017.
 */
class Map {
    constructor(json) {
        if (!json) throw "Bad map creation";
        this.loadedIDS = [];
        let tileLayer = json.layers[0];
        let obstacleLayer = json.layers[1];
        let firstActorLayer = json.layers[2];
        // let secondActorLayer = null;
        this.playerLocation = null; // this field is used exclusively for saving the player's last location before they change levels
        this.width = json.width;
        this.height = json.height;
        this.actors = []; // store all of the actors in array
        this.data = new Array(this.height); // stores all tiles in the game
        this.visible_tiles = {};
        this.seen_tiles = {};
        console.log("Loading game map and actors...");
        // Intialize all of the tiles...
        for (let i = 0; i < this.height; i++) {
            this.data[i] = new Array(this.width);
            for (let j = 0; j < this.width; j++) {
                this.data[i][j] = new Tile(j, i);
            }
        }
        // Process all of the json layers
        for (let layer of json.layers) {
            // Obstacle Layer
            if (layer.properties.obstacles === true)
                this.processObstacleLayer(layer);
            else
                this.processActorLayer(layer);
        }

        if (this.playerLocation === null) throw "Error - no player starting position!";
    }

    processObstacleLayer(layer) {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                // Grabs the ID from the layer
                let id = layer.data[i * this.width + j] - 1;
                if (id > 1) {
                    if (!this.loadedIDS.includes(id)) Game.loadedIDS.push(id);
                    this.data[i][j].updateTileInfo(id)
                }
            }
        }
    }

    processActorLayer(layer) {
        // console.log("Loading actors...");
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                let id = layer.data[i * this.width + j] - 1; // grab the id in the json data
                if (id > 1) { // id of zero indicates no actor in this spot
                    if (!this.loadedIDS.includes(id)) Game.loadedIDS.push(id);
                    let properties = getTileInfo(id);
                    console.log(id);
                    if (properties.entity !== true) throw "Bad entity creation for tile " + id;
                    if (properties.entity_id === 0) {
                        this.playerLocation = [j, i];
                        this.playerID = id;
                    } else {
                        let newActor = createEntity(j, i, properties.entity_id, id);
                        this.actors.push(newActor); // add to the list of all actors
                        this.data[i][j].actors.push(newActor); // also push to the tiles' actors
                    }
                }
            }
        }
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

function randomProperty (object) {
    let keys = Object.keys(object);
    return keys[Math.floor(keys.length * Math.random())];
}

/* This is a random dungeon map generator. It essentially generates identical
 * JSON data to that of a TILED map, with the unnecessary properties left out */
function randomMap(width, height) {
    let map = {};
    map.revealed = true;
    map.width = width;
    map.height = height;
    map.layers = [
        {"data": [], "properties": {"obstacles": true}},
        {"data": [], "properties": {"obstacles": false}},
        {"data": [], "properties": {"obstacles": false}}];
    let freeCells = {};
    ROT.RNG.setSeed(1234);
    diggerCallback = function(x,y,blocked) {
        if (! blocked) freeCells[x+","+y] = true;
    };
    let rogueMap = new ROT.Map.Uniform(width, height, {roomWidth: [4,5], corrdiorLength : [6,20]}).create(diggerCallback);
    console.log(freeCells);

    // Initialize obstacles and actors
    for (let j = 0; j < height; j++) {
        map.layers[0].data.push([]);
        map.layers[1].data.push([]);
        map.layers[2].data.push([]);
        for (let i = 0; i < width; i++) {
            if (i+","+j in freeCells)
                map.layers[0].data[j].push(7858);
            else
                map.layers[0].data[j].push(7046);

            map.layers[1].data[j].push(0);
            map.layers[2].data[j].push(0);
        }
    }

    // Generate a width by height sized generated map
    // Now, we can access the dug rooms and corridors.
    let floor = {
        upperLeft: 7736,
        top: 7737,
        upperRight: 7738,
        left: 7856,
        center: 7857,
        right: 7858,
        lowerLeft: 7976,
        bottom: 7977,
        lowerRight:7978,
    };

    let walls = {
        upperLeft: 8117,
        top: 8118,
        upperRight: 8119,
        left: 8237,
        center: null,
        right: 8237,
        lowerLeft: 8357,
        bottom: 8361,
        lowerRight: 8359,
    };

    for (let room of rogueMap.getRooms()) {
        let left = room.getLeft() - 1;
        let right = room.getRight() + 1;
        let top = room.getTop() - 1;
        let bottom = room.getBottom() + 1;
        let wleft = room.getLeft();
        let wright =room.getRight();
        let wtop = room.getTop();
        let wbottom = room.getBottom();
        /* Generate the corner tiles */
        // Set the walls up
        map.layers[0].data[top][left] = walls.upperLeft + 1;
        map.layers[0].data[bottom][left] = walls.lowerLeft + 1;
        map.layers[0].data[top][right] = walls.upperRight + 1;
        map.layers[0].data[bottom][right] = walls.lowerRight + 1;
        // Set the floors up
        map.layers[0].data[wtop][wleft] = floor.upperLeft + 1;
        map.layers[0].data[wbottom][wleft] = floor.lowerLeft + 1;
        map.layers[0].data[wtop][wright] = floor.upperRight + 1;
        map.layers[0].data[wbottom][wright] = floor.lowerRight + 1;
        /* Generate the side tiles */
        let x = left+1;
        while (x <= right-1) {
            map.layers[0].data[top][x] = walls.top + 1;
            map.layers[0].data[bottom][x] = walls.bottom + 1;
            x++;
        }
        let y = top+1;
        while (y <= bottom - 1) {
            map.layers[0].data[y][left] = walls.left + 1;
            map.layers[0].data[y][right] = walls.right + 1;
            y++;
        }

        let x = left+1;
        while (x <= right-1) {
            map.layers[0].data[top][x] = walls.top + 1;
            map.layers[0].data[bottom][x] = walls.bottom + 1;
            x++;
        }
        let y = top+1;
        while (y <= bottom - 1) {
            map.layers[0].data[y][left] = walls.left + 1;
            map.layers[0].data[y][right] = walls.right + 1;
            y++;
        }
    }

    // Randomly select starting position for player
    // let start = randomProperty(freeCells).split(',');
    let start = [34,37];
    map.layers[1].data[start[1]][start[0]] = Game.playerID; // set random spot to be the player
    map.layers[2].data[start[1]][start[0]] = 477; // place a ladder going back up a level underneath the player.

    // Flatten the layers to mimic Tiled map data
    map.layers[0].data = flatten(map.layers[0].data);
    map.layers[1].data = flatten(map.layers[1].data);
    map.layers[2].data = flatten(map.layers[2].data);
    return map;
}
