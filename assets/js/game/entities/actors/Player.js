/**
 * Created by Larken on 6/22/2017.
 */

class Player extends Actor {

    constructor(x, y) {
        super(x, y, {
            name: "you",
            description: "It's you!",
            symbol: "@",
            fg: "yellow",
            bg: "black",
            visible: true,
            blocked: true,
            leveled_up: true,
            combat: {
                /* options.combat, dedicated to all things related to combat */
                description: [" attacked ", " stabbed ", " jabbed ", " smashed "],
                /* stat caps */
                maxhp: 75,
                maxmana: 25,
                /* current stats */
                xp: 0,
                level: 1,
                hp: 75,
                mana: 25,
                str: 9,
                def: 5,
                /* Per-turn effects */
                hpRecovery: 10,
                manaRecovery: 5,
                invulnerable: false
            }
        });
        this.path = new ROT.Path.Dijkstra(this.x, this.y, dijkstra_callback);
        this.inventory = [];
    }

    act() {
        super.act();
        /* For our player's action, we lock the engine (turn based) */
        Game.engine.lock();
        /* We are creating an event handler here, but we are doing this
         * with a unique parameter by passing the player struct directly
         * to the event listener. This anticipates the player object
         * to have a handleEvent method! */
        window.addEventListener("keydown", this);
    }

    interact(actor) { // returns true if we can continue to move to the tile
        if (actor.cb.hostile) {
            this.attack(actor);
            if (!actor.isDead()) actor.react(this);
            else return true; // we can move
        } else {
            // non-combat interaction which leties from each actor to another,
            // so we will design non-combat based actors to simply perform actions
            // in a reactionary manner so that it offloads player code blocks.
            actor.react(this);
            return actor.options.blocked;
        }
    }

    react(actor) {
        console.log("react?");

        //
    }

    gain_xp(xp) {
        this.cb.xp += xp;
        if (xp_levels[this.cb.level - 1] <= this.cb.xp)
            this.level_up();
    }

    level_up() {
        /* This function will prompt the player to select what skills they want
         to level up after reaching a new level */
        this.cb.level++;
        this.cb.hp = this.cb.maxhp;
        this.cb.mana = this.cb.maxmana;
        Game.log(`You leveled up! You are now Level ${this.cb.level}.`, 'level_up');
        Game.log(`Choose what skill you want to level up:`, 'level_up');
        Game.log(`1) Strength 2) Defence 3) Hitpoints 4) Mana`, 'level_up');
        let prompt = function (evt) {
            let cb = Game.player.cb;
            let code = evt.keyCode;
            if (code === ROT.VK_1) {
                cb.str++;
                Game.log("You increased a strength level!", 'level_up');
            } else if (code === ROT.VK_2) {
                cb.def++;
                Game.log("You increased a defence level!", 'level_up');
            } else if (code === ROT.VK_3) {
                cb.maxhp += 5;
                Game.log("You increased your number of hitpoints!", 'level_up');
            } else if (code === ROT.VK_4) {
                cb.maxmana += 5;
                Game.log("You increased your amount of mana!", 'level_up');
            } else {
                return;
            }

            window.removeEventListener("keydown", prompt);
        };

        window.addEventListener("keydown", prompt);
    }

    handleEvent(evt) {
        let code = evt.keyCode;
        let shift_pressed = evt.getModifierState("Shift");
        let endturn = function () {
            window.removeEventListener("keydown", this);
            Game.engine.unlock();
        };

        /*
         y k u    7 8 9
         \|/      \|/
         h-+-l    4-5-6
         /|\      /|\
         b j n    1 2 3
         vi-keys   numpad
         */
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
            188: "pickup", 190: "rest",
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
        }
        endturn();
    }

    pickup() {
        Game.log("Feature not yet implemented :)", "warning")
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
            Game.changeLevels('expanded_start');
        } else {
            Game.log("You cannot climb up here.", "information");
        }
    }

    tryMove(nx, ny) { // returns true if the turn should end here
        if (nx < 0 || nx === Game.map.width || ny < 0 || ny === Game.map.height) return;
        let ntile = Game.map.data[ny][nx]; // new tile to move to
        if (ntile.actors.length === 0 && !ntile.options.blocked) {
            this.move(nx, ny);
            return true;
        } else if (ntile.actors.length > 0) {
            for (let i = 0; i < ntile.actors.length; i++) {
                let actor = ntile.actors[i];
                if (actor instanceof Actor && actor.options.blocked && actor.options.visible) {
                    if (!actor.isDead()) {
                        this.interact(actor);
                        return true;
                    }
                }
            }
        }

        if (!ntile.options.blocked) {
            this.move(nx, ny);
            return true;
        }

        return false;
    }

    death() {
        super.death();
        window.removeEventListener("keydown", this);
        this.cb.hp = 0;
        Game.scheduler.remove(Game.player);
        Game.scheduler.clear();

    }

}

