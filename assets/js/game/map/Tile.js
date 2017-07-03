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
    // console.log(tileset.tileproperties[id]);
    return tileset.tileproperties[id];
}

class Tile {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        let obstacle = getTileInfo(id);
        obstacle.id = id;
        this.obstacles = [obstacle];
        this.actors = [];
    }

    updateTileInfo(id) {
        let obst = {};
        if (id in tileset.tileproperties) { // just means there are no tile properties for this guy
            obst = getTileInfo(id);
        }
        obst.id = id;
        this.obstacles.push(obst); // add to the end of the obstacles to be drawn on top
    }

    /* Indicates whether or not a tile is blocked; however, this excludes the player
     * for AI purposes. */
    blocked() {
        if (this.obstacles[this.obstacles.length - 1].blocked)
            return true;

        for (let actor of this.actors) {
            if (actor.options.blocked && ! actor instanceof Player)
                return true;
        }
        return false;
    }

    visible() {
        return ! this.obstacles.some( (el) => { return el.blocks_vision });
    }

    removeActor(a) {
        for (let i = 0; i < this.actors.length; i++) {
            if (this.actors[i] === a) {
                this.actors.splice(i, 1);
            }
        }
    }

    bg() {
        if (! this.obstacles.some((e) => {return "bg" in e})) {
            return "black";
        } else {
            for (let i = this.obstacles.length - 1; i >= 0; i--) {
                let obs = this.obstacles[i];
                if ("bg" in obs) return obs.bg;
            }
        }
    }

    getSpriteIDS(animate, fov) {
        let symbols = [];
        /* Obstacles */
        for (let obs of this.obstacles) {
            // If there's a dark variant of this texture
            if (fov && obs.FOV) {
                if (obs.FOV_id === undefined)
                    throw `Error - invalid FOV tile specified for tileset ID : ${obs.id} `;
                //  If there happens to be a dark, animated variant...
                if (animate && obs.animated) {
                    if (obs.animated_fov_id === undefined) throw `Error - invalid animated tile specified for tileset ID : ${obs.id} `;
                    symbols.push(obs.animated_fov_id);
                } else {
                    symbols.push(obs.FOV_id);
                }
            } else {
                if (animate && obs.animated) {
                    if (obs.animated_id === undefined) throw `Error - invalid animated and darkened tile specified for tileset ID : ${obs.id} `;
                    symbols.push(obs.animated_id);
                } else {
                    symbols.push(obs.id)
                }
            }
        }
        /* Actors / Entities */
        for (let actor of this.actors) {
            let obs = getTileInfo(actor.id);
            if (animate && obs.animated === true) {
                if (obs.animated_id === null)
                    throw `Error - invalid animate tile specified for tileset ID : ${obs.id} with animated tile id ${obs.animated_id} `;
                symbols.push(obs.animated_id);
            } else {
                symbols.push(actor.id);
            }
        }
        return symbols.map((e) => {return e.toString()});
    }
}
