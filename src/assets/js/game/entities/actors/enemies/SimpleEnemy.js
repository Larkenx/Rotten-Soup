import Actor from '#/entities/actors/Actor.js'
import Player from '#/entities/actors/Player.js'
import {Game} from '#/Game.js'
import ROT from 'rot-js'

/* Simple enemy class to encapsulate all enemies with very simple AI.
Essentially, these enemies have a range that they can see the player from, and if the player
enters within the distance between the enemy and player */
export default class SimpleEnemy extends Actor {

    constructor(x, y, options, routine = null) {
        super(x, y, options);
    }

    act() {
        Game.engine.lock();

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

        if (allVisibleActors.some(function(a) {return a === Game.player})) {
            if (!this.chasing) Game.log(`A ${this.name} sees you.`, 'alert');
            this.chasing = true;
            this.inView = true;
            let pathToPlayer = [];
            Game.player.path.compute(this.x, this.y, function (x, y) {
                pathToPlayer.push([x, y]);
            });
            if (pathToPlayer.length >= 2) {
                let newPos = pathToPlayer[1]; // 1 past the current position
                this.tryMove(newPos[0], newPos[1]);
            }
        } else {
            this.inView = false;
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
