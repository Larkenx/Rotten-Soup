/**
 * Created by Larken on 6/22/2017.
 */
import {Game} from '#/Game.js'
import Actor from '#/entities/actors/Actor.js'

export default class Rat extends Actor {

    constructor(x, y, id) {
        super(x, y, {
            id: id,
            name: "rat",
            description: "A fat rat!",
            symbol: "r",
            fg: "grey",
            bg: "seagreen",
            visible: true,
            blocked: true,
            chasing: false,
            combat: {
                /* options.combat, dedicated to all things related to combat */
                description: [" attacked "],
                /* max stats */
                maxhp: 3,
                maxmana: 0,
                /* current stats */
                hp: 2,
                mana: 0,
                str: 6,
                def: 0,
                /* misc */
                hostile: true,
                range: 6,
                invulnerable: false,
            }
        });
    }

    act() {
        super.act();
        Game.engine.lock();
        if (this.distanceTo(Game.player) < 4) {
            if (!this.options.chasing) Game.log('A rat sees you.', 'alert');
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
        if (actor === Game.player) {
            this.attack(actor);
        }
    }

}
