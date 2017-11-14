/**
 * Created by Larken on 6/22/2017.
 */

import SimpleEnemy from '#/entities/actors/enemies/SimpleEnemy.js'
import {getRandomInt} from '#/entities/Entity.js'
import {Sword} from '#/entities/items/weapons/Sword.js'
import {createSword} from '#/entities/items/weapons/Sword.js'
import {Game} from '#/Game.js'

export default class Goblin extends SimpleEnemy {
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
                range: 9,
                invulnerable: false,
            }
        });
        let roll = getRandomInt(1, 10);
        if (roll <= 2) {
            this.addToInventory(createSword(this.x, this.y, 35));
            // let swords = this.inventory.filter(function (el) {
            //     return el.item instanceof Sword;
            // });
            // this.equipWeapon(swords[0]);
        }
    }

}
