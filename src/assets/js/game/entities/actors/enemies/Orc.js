/**
 * Created by Larken on 7/5/2017.
 */
import SimpleEnemy from '#/entities/actors/enemies/SimpleEnemy.js'
import HealthPotion from '#/entities/items/potions/HealthPotion.js'
import StrengthPotion from '#/entities/items/potions/StrengthPotion.js'
import {getRandomInt} from '#/entities/Entity.js'
import {Sword} from '#/entities/items/weapons/Sword.js'
import {Game} from '#/Game.js'

export default class Orc extends SimpleEnemy {
    constructor(x, y, id, empowered = false) {
        let randomHP = getRandomInt(25,35);
        let randomStr = getRandomInt(17,23);
        super(x, y, {
            id: id,
            name: empowered ? "Empowered Orc" : "orc",
            description: "All bronze and no brains!",
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
                range: 5,
                invulnerable: false,
                empowered: empowered,
            }
        });
        let roll = getRandomInt(1, 10);
        if (roll <= 2) {
            this.addToInventory(new Sword(this.x, this.y, 3, 7, "Thrasher", 33));
        } else if (roll >= 8) {
            this.addToInventory(new HealthPotion(this.x, this.y, 488));
        } else if (roll == 7) {
            this.addToInventory(new StrengthPotion(this.x,this.y, 969))
        }
    }

    interact(actor) {
        if (actor === Game.player) {
            let dmg = this.attack(actor);
            if (this.cb.empowered) {
                let amtHealed = Math.floor(dmg / 2);
                Game.log(`The empowered orc steals your health and regenerates ${amtHealed} health!`, "alert");
                this.heal(amtHealed);
            }
        } else {
            actor.react(this);
        }
    }

}
