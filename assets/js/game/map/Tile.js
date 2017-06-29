/**
 * Created by Larken on 6/28/2017.
 */
class Tile {
    constructor(x, y, id) {
        let symbol = id === 0 ? String.fromCharCode(32) : String.fromCharCode(id - 1);
        this.options = environment[symbol];
        this.symbol = this.options.symbol;
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

    removeActor(a) {
        for (let i = 0; i < this.actors.length; i++) {
            if (this.actors[i] === a) {
                this.actors.splice(i, 1);
            }
        }
    }
}