/**
 * Created by Larken on 6/22/2017.
 */

let xp_levels = [50];
for (let i = 1; i < 100; i++) xp_levels.push(1.5 * xp_levels[i - 1]);

function dijkstra_callback(x, y) {
    if (x <= 0 || x === Game.map.width || y <= 0 || y === Game.map.height) return false;
    return !Game.map.data[y][x].blocked();
}

class Player extends Actor {
    constructor(x, y, id) {
        super(x, y, {
            id: id,
            name: "you",
            description: "It's you!",
            fg: "yellow",
            bg: "black",
            visible: true,
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
        // Inventory is an array of objects that contain items and an action that can be done with that item.
        // You can think of the objects as individual 'slots' to store the item with actions like 'use' or 'equip'.

        this.addToInventory(createSword(this.x,this.y, 35));
        this.equipWeapon(this.inventory[0].item);
    }

    act() {
        // super.act();
        Game.engine.lock();
        window.addEventListener("keydown", this);
        window.addEventListener("click", this);
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
        if (xp_levels[this.cb.level - 1] <= this.cb.xp)
            this.level_up();
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
            console.log(t);
            return;
        }
        let code = evt.keyCode;
        let shift_pressed = evt.getModifierState("Shift");
        let endturn = function () {
            window.removeEventListener("keydown", this);
            Game.engine.unlock();
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
            /* Rest, Pick Up Items, Climb Ladders */
            188: "pickup",
            71 : "pickup",
            190: "rest",
        };

        if (!(code in keyMap)) { // invalid key press, retry turn
            // Game.log("Unknown command", 'information');
            window.removeEventListener("keydown", this);
            window.addEventListener("keydown", this);
            return;
        }

        if ("rest" === keyMap[code] && !shift_pressed) { // Rest
            this.heal(this.cb.hpRecovery);
            this.restore(this.cb.manaRecovery);
            Game.log("You rest for a turn.", 'player_move');
        } else if ("pickup" === keyMap[code] && !shift_pressed) {
            this.pickup();
        } else if ("rest" === keyMap[code] && shift_pressed) { // climb down
            this.climbDown();
        } else if ("pickup" === keyMap[code] && shift_pressed) {
            this.climbUp();
        } else {
            let diff = ROT.DIRS[8][keyMap[code]];
            let nx = this.x + diff[0];
            let ny = this.y + diff[1];
            if (!this.tryMove(nx, ny)) {
                window.removeEventListener("keydown", this);
                window.addEventListener("keydown", this);
                return;
            }
            this.path = new ROT.Path.Dijkstra(this.x, this.y, dijkstra_callback);
            this.nearbyEnemies = Game.getNearbyEnemies();
        }
        endturn();
    }

    pickup() {
        let ctile = Game.map.data[this.y][this.x];
        let tileItems = ctile.actors.filter(function (el) {
            return el instanceof Item;
        });
        if (tileItems.length === 1) {
            Game.log("You picked up a " + tileItems[0].options.type, "information");
            this.addToInventory(tileItems[0]);
            ctile.removeActor(tileItems[0]);
        } else if (tileItems.length > 1) {
            // open up an inventory modal of things they can pick up?
            Game.log("Too many items here! Feature not implemented yet :)", "information");
        } else {
            Game.log("There's nothing on the ground here.", "information");
        }
    }

    equipWeapon(item) {
        if (!item.cb.equippable || !item instanceof Weapon)
            throw "Error - equipped invalid item - " + this.item.options.type;

        if (item.cb.equipped) {
            Game.log("You've already equipped that item!", "information");
        } else {
            // already wielding a weapon
            if (this.cb.equipment.weapon !== null) {
                this.cb.equipment.weapon.cb.equipped = false;
                // no weapon equipped
            }
            this.cb.equipment.weapon = item;
            item.cb.equipped = true;
        }
    }

    unequipWeapon() {
        if (this.cb.equipment.weapon !== null) {
            this.cb.equipment.weapon.cb.equipped = false;
            this.cb.equipment.weapon = null;
        } else {
            throw "Tried to uneqip weapon but no item was equipped."
        }
    }

    climbDown() {
        let ctile = Game.map.data[this.y][this.x];
        if (ctile.actors.some((e) => {
                return e instanceof Ladder && e.options.direction === "down";
            })) {
            Game.log("You climb down the ladder...", "player_move");
            Game.changeLevels('dungeon1');
        } else {
            Game.log("You cannot climb down here.", "information");
        }
    }

    climbUp() {
        let ctile = Game.map.data[this.y][this.x];
        if (ctile.actors.some((e) => {
                return e instanceof Ladder && e.options.direction === "up";
            })) {
            Game.log("You climb up the ladder...", "player_move");
            Game.changeLevels('overworld');
        } else {
            Game.log("You cannot climb up here.", "information");
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
                if (actor.options.blocked) {
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
        this.gain_xp(dmg);
    }

    death() {
        super.death();
        window.removeEventListener("keydown", this);
        this.cb.hp = 0;
        // Game.scheduler.remove(Game.player);
        Game.scheduler.clear();

    }

}
