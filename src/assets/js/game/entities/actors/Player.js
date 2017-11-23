/**
 * Created by Larken on 6/22/2017.
 */
import ROT from 'rot-js'
import {Game} from '#/Game.js'
import Actor from '#/entities/actors/Actor.js'
// Items
import Item from '#/entities/items/Item.js'
// - Weapons
import Weapon from '#/entities/items/weapons/Weapon.js'
import {Sword} from '#/entities/items/weapons/Sword.js'

import {createBow} from '#/entities/items/weapons/ranged/Bow.js'
import {SteelArrow} from '#/entities/items/weapons/ranged/ammo/Arrow.js'

// - Potions
import HealthPotion from '#/entities/items/potions/HealthPotion.js'
import StrengthPotion from '#/entities/items/potions/StrengthPotion.js'
import ManaPotion from '#/entities/items/potions/ManaPotion.js'


// effects
import {BleedEffect} from '#/modifiers/Effect.js'


// Misc
import Ladder from '#/entities/misc/Ladder.js'
import {xp_levels} from '#/entities/Entity.js'

function dijkstra_callback(x, y) {
    if (x <= 0 || x >= Game.map.width || y <= 0 || y >= Game.map.height) return false;
    return !Game.map.data[y][x].blocked();
}

export default class Player extends Actor {
    constructor(x, y, id) {
        super(x, y, {
            id: id,
            name: "you",
            description: "It's you!",
            fg: "yellow",
            bg: "black",
            visible: true,
            targeting : false,
            blocked: true,
            leveled_up: true,
            enemiesInView: [],
            combat: {
                /* options.combat, dedicated to all things related to combat */
                description: [" attacked ", " stabbed ", " jabbed ", " smashed "],
                /* stat caps */
                maxhp: 100,
                maxmana: 15,
                /* current stats */
                xp: 0,
                level: 1,
                hp: 100,
                mana: 15,
                str: 3,
                def: 3,
                /* Per-turn effects */
                hpRecovery: 5,
                manaRecovery: 2.5,
                invulnerable: false
            }
        });
        this.path = new ROT.Path.Dijkstra(this.x, this.y, dijkstra_callback);
        this.nearbyEnemies = [];
        // Inventory is an array of objects that contain items and an action that can be done with that item.
        // You can think of the objects as individual 'slots' to store the item with actions like 'use' or 'equip'.
        // Give the player a few starting items:
        // - a health potion
        // - a random sword (equip the sword)
        this.addToInventory(new Sword(this.x, this.y, 2, 3, "Training Sword", 35));
        // this.equipWeapon(this.inventory[0].item);
        this.addToInventory(createBow(this.x,this.y, 664))
        this.addToInventory(new SteelArrow(this.x,this.y, 784, 5));
        this.addToInventory(new HealthPotion(this.x,this.y, 488));
        this.addToInventory(new StrengthPotion(this.x,this.y, 969));
        // this.addToInventory(new ManaPotion(this.x,this.y, 495));


    }

    act() {
        super.act();
        Game.engine.lock();
        window.addEventListener("keydown", this);
        // window.addEventListener("click", this);
    }

    interact(actor) { // returns true if we can continue to move to the tile
        if ("cb" in actor && actor.cb.hostile) {
            this.attack(actor);
            if (!actor.isDead()) actor.react(this);
            else return true; // we can move
        } else {
            // non-combat interaction which leties from each actor to another,
            // so we will design non-combat based actors to simply perform actions
            // in a reactionary manner so that it offloads player code blocks.
            actor.react(this);
            return false;
        }
    }

    gain_xp(xp) {
        this.cb.xp += xp;
        if (xp_levels[this.cb.level+1] <= this.cb.xp)
            this.level_up();
    }

    remainingXP() {
        return xp_levels[this.cb.level+1] - this.cb.xp;
    }

    level_up() {
        this.cb.level += 1;
        this.cb.maxhp += 5;
        this.cb.str += 1;
        this.cb.hp = this.cb.maxhp;
        this.cb.mana = this.cb.maxmana;
        Game.log(`You leveled up! You are now Level ${this.cb.level}.`, 'level_up');
        Game.log(`Your strength and health have improved.`, 'level_up');
    }

    handleEvent(evt) {
        /* Mouse controls to hover over tiles for info (describe) */
        if (evt.type === "click") {
            let t = Game.eventToTile(evt);
            // this.move(t.x,t.y);
            // console.log(t);
            return;
        }
        let code = evt.keyCode;
        let shift_pressed = evt.getModifierState("Shift");

        let endTurn = function () {
            window.removeEventListener("keydown", this);
            Game.engine.unlock();
        };

        let restartTurn = function() {
            window.removeEventListener("keydown", this);
            window.addEventListener("keydown", this);
        };

        let keyMap = {
            /* Arrow Key movement */
            39: 2,
            37: 6,
            38: 0,
            40: 4,
            /* Num Pad Movement */
            104: 0,
            105: 1,
            102: 2,
            99: 3,
            98: 4,
            97: 5,
            100: 6,
            103: 7,
            /* Rest using '5' in numpad */
            101: "rest",
            /* vi movement */
            75: 0,
            85: 1,
            76: 2,
            78: 3,
            74: 4,
            66: 5,
            72: 6,
            89: 7,
            /* Fire a weapon */
            70 : "fire",
            /* Rest, Pick Up Items, Climb Ladders */
            188: "pickup",
            71: "pickup",
            190: "rest",
        };

        if (this.targeting) {
            let validKeys = [0,1,2,3,4,5,6,7];
            if (!(code in keyMap) || ! validKeys.includes(keyMap[code])) { // invalid key press, retry turn
                if (code === 70 || code == 27) //escape key
                    Game.log(`You put away your ${this.cb.equipment.weapon.type.toLowerCase()}.`, 'information');
                else
                    Game.log("Invalid command given.", 'information');
                this.targeting = false;
                restartTurn();
                return;
            } else {
                // valid target direction
                let ammo = this.cb.equipment.ammo;
                ammo.quantity--;
                if (ammo.quantity === 0) {
                    Game.log(`You fire your last ${ammo.type.toLowerCase()}!`, "alert");
                }
                this.fireRangedWeapon(ammo, keyMap[code]);
                this.targeting = false;
                if (ammo.quantity === 0) { // used up all the ammo, need to remove it from the inventory
                    this.unequipAmmo();
                    this.removeFromInventory(ammo);
                }
                endTurn();
                return;
            }
        }

        if (!(code in keyMap)) { // invalid key press, retry turn
            // Game.log("Unknown command", 'information');
            restartTurn();
            return;
        }


        if ("rest" === keyMap[code] && !shift_pressed) { // Rest
            // this.heal(this.cb.hpRecovery);
            // this.restore(this.cb.manaRecovery);
            Game.log("You rest for a turn.", 'player_move');
        } else if ("pickup" === keyMap[code] && !shift_pressed) {
            this.pickup();
        } else if ("rest" === keyMap[code] && shift_pressed) { // climb down
            this.climb("down");
        } else if ("pickup" === keyMap[code] && shift_pressed) {
            this.climb("up");
        } else if ("fire" === keyMap[code] && !shift_pressed) {

            let weapon = this.cb.equipment.weapon;
            let ammo = this.cb.equipment.ammo;
            if (weapon !== null && ammo !== null &&
                weapon.cb.ranged &&
                ammo.cb.ammoType === weapon.cb.ammoType &&
                ammo.quantity > 0) {
                Game.log(`You take aim with your ${weapon.type.toLowerCase()}.`, 'information');
                this.targeting = true;
                restartTurn();
                return;
            } else {
                if (weapon === null || ! weapon.cb.ranged)
                    Game.log("You don't have a ranged weapon equipped!", "information");
                else if (ammo === null)
                    Game.log("You don't have any ammunition equipped.", "information");
                else if (ammo.cb.ammoType !== weapon.cb.ammoType)
                    Game.log("You don't have the right ammunition equipped for this weapon.", "information");

                restartTurn();
                return;
            }
        } else {
            let diff = ROT.DIRS[8][keyMap[code]];
            let nx = this.x + diff[0];
            let ny = this.y + diff[1];
            if (!this.tryMove(nx, ny)) {
                restartTurn();
                return;
            }
            this.path = new ROT.Path.Dijkstra(this.x, this.y, dijkstra_callback);
            this.nearbyEnemies = Game.getNearbyEnemies();
        }
        endTurn();
    }

    pickup() {
        let ctile = Game.map.data[this.y][this.x];
        let tileItems = ctile.actors.filter(function (el) {
            return el instanceof Item;
        });
        if (tileItems.length === 1) {
            Game.log(`You picked up a ${tileItems[0].type.toLowerCase()}.`, 'information');
            this.addToInventory(tileItems[0]);
            ctile.removeActor(tileItems[0]);
        } else if (tileItems.length > 1) {
            let itemTypes = [];
            for (let item of tileItems) {
                itemTypes.push(item.type.toLowerCase());
                this.addToInventory(item);
                ctile.removeActor(item);
            }
            let prettyItemTypes = itemTypes.slice(1, itemTypes.length-1)
            prettyItemTypes = prettyItemTypes.reduce((buf, str) => {return buf + ", a " + str} , "a  " + itemTypes.slice(0,1));
            let lastItem = ` and a ${itemTypes.slice(-1)}.`;
            let buffer = `You picked up ${prettyItemTypes+lastItem}`;
            Game.log(buffer, "information");
        } else {
            Game.log("There's nothing to pick up.", "information");
        }
    }

    // Overriding the actor
    equipWeapon(item) {
        super.equipWeapon(item);
        Game.log(`You wield the ${item.type.toLowerCase()}.`, 'information');
    }

    unequipWeapon() {
        if (this.cb.equipment.weapon !== null) {
            this.cb.equipment.weapon.cb.equipped = false;
            this.cb.equipment.weapon = null;
        } else {
            throw "Tried to uneqip weapon but no item was equipped."
        }
    }

    unequipAmmo() {
        if (this.cb.equipment.ammo !== null) {
            this.cb.equipment.ammo.cb.equipped = false;
            this.cb.equipment.ammo = null;
        } else {
            throw "Tried to uneqip ammo but no item was equipped."
        }
    }

    climb(dir) {
        let ctile = Game.map.data[this.y][this.x];
        let ladder = ctile.actors.filter((a) => {return a instanceof Ladder })[0];
        if (ladder === undefined || ladder.direction !== dir ) {
            Game.log(`You cannot climb ${dir} here.`, "information");
        } else {
            ladder.react(this);
        }
    }

    tryMove(nx, ny) { // returns true if the turn should end here
        if (nx < 0 || nx === Game.map.width || ny < 0 || ny === Game.map.height) return;
        let ntile = Game.map.data[ny][nx]; // new tile to move to
        if (ntile.actors.length === 0 && !ntile.blocked()) {
            this.move(nx, ny);
            return true;
        } else if (ntile.actors.length > 0) {
            for (let i = 0; i < ntile.actors.length; i++) {
                let actor = ntile.actors[i];
                if (actor.blocked) {
                    this.interact(actor);
                    return true;
                }
            }
        }

        if (!ntile.blocked()) {
            this.move(nx, ny);
            return true;
        }

        return false;
    }

    attack(actor) {
        let dmg = super.attack(actor);
        this.gain_xp(Math.floor(dmg * .75));
    }

    death() {
        super.death();
        window.removeEventListener("keydown", this);
        this.cb.hp = 0;
        // Game.scheduler.remove(Game.player);
        Game.scheduler.clear();

    }

}
