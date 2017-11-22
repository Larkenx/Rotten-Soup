/**
 * Created by Larken on 6/22/2017.
 */
import ROT from 'rot-js'
import SimpleEnemy from '#/entities/actors/enemies/SimpleEnemy.js'
import {getRandomInt} from '#/entities/Entity.js'
import {Sword} from '#/entities/items/weapons/Sword.js'
import HealthPotion from '#/entities/items/potions/HealthPotion.js'
import StrengthPotion from '#/entities/items/potions/StrengthPotion.js'
import {createSword} from '#/entities/items/weapons/Sword.js'
import {Game} from '#/Game.js'
import {SteelArrow} from '#/entities/items/weapons/ranged/ammo/Arrow.js'

export default class Goblin extends SimpleEnemy {
    constructor(x, y, id) {
        let randomHP = getRandomInt(10,15);
        let randomStr = getRandomInt(5,9);
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
                maxhp: randomHP,
                maxmana: 5,
                /* current stats */
                hp: randomHP,
                mana: 5,
                str: randomStr,
                def: 1,
                /* misc */
                hostile: true,
                range: 9,
                invulnerable: false,
            }
        });
        let dropTable = {
            "STRENGTH_POTION" : 2,
            "HEALTH_POTION" : 2,
            "STEEL_ARROW" : 1,
            "SWORD" : 1
        }
        let roll = getRandomInt(0, 1);
        for (let i=0; i < roll; i++) {
            let chosenItem = ROT.RNG.getWeightedValue(dropTable);
            switch(chosenItem) {
                case "STRENGTH_POTION":
                    this.addToInventory(new StrengthPotion(this.x,this.y, 969));
                    break;
                case "HEALTH_POTION":
                    this.addToInventory(new HealthPotion(this.x, this.y, 488));
                    break;
                case "SWORD":
                    this.addToInventory(createSword(this.x, this.y, 35));
                    break;
                case "STEEL_ARROW":
                    this.addToInventory(new SteelArrow(this.x, this.y, 784, 5));
                default:
                    console.log("tried to add some item that doesn't exist to an inventroy from drop table");
            }
        }
    }

}
