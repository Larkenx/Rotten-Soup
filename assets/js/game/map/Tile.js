/**
 * Created by Larken on 6/28/2017.
 */

function getTileInfo(id) {
    /*
    "FOV": boolean,
    "FOV_id": int,
    "animated": boolean,
    "animated_id": int,
    "bg": color,
    "blocked":boolean,
    "blocks_vision": boolean,
    "entity": boolean,
    */
    return tileset.tileproperties[id];
}

function getTilesetCoords(id) {
    let tileWidth = tileset.tilewidth;
    let tileHeight = tileset.tileheight;

    let cols = tileset.columns;
    let x = (id % cols) * tileHeight;
    let y = (id % cols) * tileWidth;
    return [y,x];
}

class Tile {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.options = getTileInfo(id);
        this.obstacles = [id];
        this.actors = [];
    }

    updateTileInfo(id) {
        this.options = getTileInfo(id);
        this.obstacles.push(id); // add to the end of the obstacles to be drawn on top
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

    removeActor(a) {
        for (let i = 0; i < this.actors.length; i++) {
            if (this.actors[i] === a) {
                this.actors.splice(i, 1);
            }
        }
    }
}
