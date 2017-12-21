import {Actor} from "#/entities/actors/Actor.js";
import {Game} from "#/Game.js";
import ROT from "rot-js";

/* Simple enemy class to encapsulate all enemies with very simple AI.
 Essentially, these enemies have a range that they can see the player from, and if the player
 enters within the distance between the enemy and player */
export default class SimpleEnemy extends Actor {

    constructor(x, y, options, routine = null) {
        super(x, y, options);
    }

    act() {
        Game.engine.lock();
        // To make these computations more efficient, we can determine whether or not the SimpleEnemy
        // is rendered on the current game screen. If not, we shouldn't really worry about what the enemy can see
        // or its path to the player. So, we can essentially skip their turn.
        let dx = Math.abs(this.x - Game.player.x);
        let dy = Math.abs(this.y - Game.player.y);
        if (dx > (Game.width / 2) || dy > (Game.height / 2)) {
            Game.engine.unlock();
            super.act();
            return;
        }

        Game.player.recalculatePath();

        let fov = new ROT.FOV.PreciseShadowcasting(function (x, y) {
            return (Game.inbounds(x, y) && Game.map.data[y][x].visible());
        });

        let visibleTiles = [];
        fov.compute(this.x, this.y, this.cb.range, function (x, y, r, visibility) {
            // console.log(x + ',' + y);
            if (Game.inbounds(x, y))
                visibleTiles.push(Game.map.data[y][x]);
        });

        let allVisibleActors = visibleTiles.reduce((actors, tile) => {
            return actors.concat(tile.actors);
        }, []);

        if (allVisibleActors.some(a => {
                return a === Game.player
            })) {
            if (!this.chasing) Game.log(`A ${this.name} sees you.`, 'alert');
            this.chasing = true;
            let pathToPlayer = [];
            Game.player.path.compute(this.x, this.y, function (x, y) {
                pathToPlayer.push([x, y]);
            });
            if (pathToPlayer.length >= 1) {
                let newPos = pathToPlayer[1]; // 1 past the current position
                this.tryMove(newPos[0], newPos[1]);
            }
        }
        Game.engine.unlock();
        super.act();

    }

    interact(actor) {
        if (actor === Game.player)
            this.attack(actor);
        else
            actor.react(this);
    }

}
