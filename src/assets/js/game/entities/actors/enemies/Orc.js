/**
 * Created by Larken on 7/5/2017.
 */
import SimpleEnemy from "#/entities/actors/enemies/SimpleEnemy.js";
import HealthPotion from "#/entities/items/potions/HealthPotion.js";
import StrengthPotion from "#/entities/items/potions/StrengthPotion.js";
import ManaPotion from "#/entities/items/potions/ManaPotion.js";
import {getRandomInt, getItemsFromDropTable} from "#/utils/HelperFunctions.js";
import {Sword} from "#/entities/items/weapons/Sword.js";
import {Game} from "#/Game.js";
import ROT from "rot-js";
import {SteelArrow} from "#/entities/items/weapons/ranged/ammo/Arrow.js";


export default class Orc extends SimpleEnemy {
    constructor(x, y, id, empowered = false) {
        let randomHP = getRandomInt(25, 35);
        let randomStr = getRandomInt(17, 23);
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
        let items = getItemsFromDropTable({
            minItems : 0,
            maxItems : 2,
            dropTable : {
                "STRENGTH_POTION": 1,
                "HEALTH_POTION": 1,
                "STEEL_ARROW": 1,
                "MANA_POTION": 1,
                "SWORD" : 1
            },
            x : this.x,
            y : this.y
        });
        items.forEach(item => this.addToInventory(item));
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
