/**
 * Created by Larken on 6/22/2017.
 */

import SimpleEnemy from '#/entities/actors/enemies/SimpleEnemy.js'
import {getRandomInt} from '#/entities/Entity.js'
import {Sword} from '#/entities/items/weapons/Sword.js'
import HealthPotion from '#/entities/items/potions/HealthPotion.js'
import StrengthPotion from '#/entities/items/potions/StrengthPotion.js'
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
            this.equipWeapon(this.inventory[0].item);
        } else if (roll >= 8) {
            this.addToInventory(new HealthPotion(this.x, this.y, 488));
        } else if (roll == 7) {
            this.addToInventory(new StrengthPotion(this.x,this.y, 969))
        }

    }

}
