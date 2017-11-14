/**
 * Created by Larken on 6/22/2017.
 */

import Actor from '@/assets/js/game/entities/actors/Actor.js'
import {getRandomInt} from '@/assets/js/game/entities/Entity.js'
import {createSword} from '@/assets/js/game/entities/items/weapons/Sword.js'
import {Game} from '@/assets/js/game/Game.js'


export default class Goblin extends Actor {
    constructor(x, y, id) {
        super(x, y, {
            id: id,
            name: "goblin",
            description: "A mean, green goblin!",
            visible: true,
            blocked: true,
            chasing: false,
            combat: {
                /* options.combat, dedicated to all things related to combat */
                description: [" attacked "],
                /* max stats */
                maxhp: 10,
                maxmana: 5,
                /* current stats */
                hp: 10,
                mana: 5,
                str: 7,
                def: 1,
                /* misc */
                hostile: true,
                range: 6,
                invulnerable: false,
            }
        });
        let roll = getRandomInt(1, 10);
        if (roll <= 2)
            this.addToInventory(createSword(this.x, this.y, 35));
    }

    act() {
        super.act();
        Game.engine.lock();
        if (this.distanceTo(Game.player) < 9) {
            if (!this.options.chasing) Game.log('A goblin sees you.', 'alert');
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
