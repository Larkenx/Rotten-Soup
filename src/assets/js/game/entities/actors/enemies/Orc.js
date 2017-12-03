/**
 * Created by Larken on 7/5/2017.
 */
import SimpleEnemy from "#/entities/actors/enemies/SimpleEnemy.js";
import HealthPotion from "#/entities/items/potions/HealthPotion.js";
import StrengthPotion from "#/entities/items/potions/StrengthPotion.js";
import ManaPotion from "#/entities/items/potions/ManaPotion.js";
import {getRandomInt} from "#/entities/Entity.js";
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
        let dropTable = {
            "STRENGTH_POTION": 1,
            "HEALTH_POTION": 1,
            "STEEL_ARROW": 1,
            "MANA_POTION": 1
        }
        let roll = getRandomInt(1, 3);
        let chosenItem = ROT.RNG.getWeightedValue(dropTable);
        switch (chosenItem) {
            case "STRENGTH_POTION":
                this.addToInventory(new StrengthPotion(this.x, this.y, 969));
                break;
            case "HEALTH_POTION":
                this.addToInventory(new HealthPotion(this.x, this.y, 488));
                break;
            case "MANA_POTION":
                this.addToInventory(new ManaPotion(this.x, this.y, 608));
                break;
            case "SWORD":
                this.addToInventory(new Sword(this.x, this.y, 3, 7, "Thrasher", 33));
                break;
            case "STEEL_ARROW":
                this.addToInventory(new SteelArrow(this.x, this.y, 784, 10));
                break;
            default:
                console.log("tried to add some item that doesn't exist to an inventroy from drop table");
                console.log(chosenItem);

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
