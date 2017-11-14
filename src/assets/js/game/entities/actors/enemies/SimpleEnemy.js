import Actor from '@/assets/js/game/entities/actors/Actor.js'
import {Game} from '@/assets/js/game/Game.js'

/* Simple enemy class to encapsulate all enemies with very simple AI.
Essentially, these enemies have a range that they can see the player from, and if the player
enters within the distance between the enemy and player */
export default class SimpleEnemy extends Actor {

    constructor(x, y, options, routine = null) {
        super(x, y, options);
    }

    act() {
        super.act();
        Game.engine.lock();
        if (this.distanceTo(Game.player) < this.cb.range) {
            if (!this.options.chasing) Game.log(`A ${this.name()} sees you.`, 'alert');
            this.options.chasing = true;
            this.options.inView = true;
            let pathToPlayer = [];
            Game.player.path.compute(this.x, this.y, function (x, y) {
                pathToPlayer.push([x, y]);
            });
            if (pathToPlayer.length >= 2) {
                let newPos = pathToPlayer[1]; // 1 past the current position
                this.tryMove(newPos[0], newPos[1]);
            }

        } else {
            this.options.inView = false;
        }
        Game.engine.unlock();
    }

    interact(actor) {
        if (actor === Game.player) this.attack(actor);
    }

}
