import {Game} from '#/Game.js'
import {tileset} from '#/Game.js'
import {getTileInfo} from '#/map/Tile.js'
import Tile from '#/map/Tile.js'

// Entities
import Actor from '#/entities/actors/Actor.js'
import Player from '#/entities/actors/Player.js'
import NPC from '#/entities/actors/NPC.js'
import Goblin from '#/entities/actors/enemies/Goblin.js'
import Orc from '#/entities/actors/enemies/Orc.js'
import Rat from '#/entities/actors/enemies/Rat.js'
// import {EntityTypes} from '#/entities/Entity.js'

// Items
import {createSword} from '#/entities/items/weapons/Sword.js'
import HealthPotion from '#/entities/items/potions/HealthPotion.js'
import StrengthPotion from '#/entities/items/potions/StrengthPotion.js'
import ManaPotion from '#/entities/items/potions/ManaPotion.js'

// Misc
import Chest from '#/entities/misc/Chest.js'
import Door from '#/entities/misc/Door.js'
import Ladder from '#/entities/misc/Ladder.js'
import Store from '#/entities/misc/Store.js'


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
    6: (x, y, id) => {
        return new NPC(x, y, id);
    },
    7: (x, y, id) => { // normal Orc
        return new Orc(x, y, id);
    },
    8: (x, y, id) => { // empowered Orc
        return new Orc(x, y, id, true);
    },
    9: (x, y, id) => {
        return new Door(x, y, id);
    },
    10: (x, y, id) => {
        return new Chest(x, y, id);
    },
    11: (x, y, id) => {
        return new HealthPotion(x,y,id);
    },
    12 : (x,y,id) => {
        return new StrengthPotion(x,y,id);
    },
    13 : (x,y,id) => {
        return new ManaPotion(x,y,id);
    }
};

export function getTilesetCoords(id) {
    let tileWidth = tileset.tilewidth;
    let tileHeight = tileset.tileheight;
    let cols = tileset.columns;
    let rowNumber = Math.floor(id / cols) * tileHeight;
    let colNumber = (id % cols) * tileHeight;
    return [colNumber, rowNumber];
}

export function createEntity(x, y, entity_id, frame_id) {
    if (entity_id in entityShop) {
        return entityShop[entity_id](x, y, frame_id);
    } else {
        throw `No entity assigned to ID ${entity_id} for frame ${frame_id} at ${x + "," + y}`;
    }
}


/**
 * Created by Larken on 6/28/2017.
 */
export class GameMap {
    constructor(json) {
        console.log("Generating new map...");
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
