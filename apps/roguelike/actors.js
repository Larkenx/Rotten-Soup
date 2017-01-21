let vowels = ['a', 'e', 'i', 'o', 'u'];
let xp_levels = [50];

for (var i = 1; i < 100; i++) {
    xp_levels.push(1.3*xp_levels[i-1]);
}

/* Ranged attack? */
// for (var dir of ROT.DIRS) {
//     for (var i = 0; i < range_of_mob; i++) {
//     let tile = Game.map[mob.x + dir.x*i][mob.y + dir.y*i];
//         if  (tile.contains(player))
//             mob.attack(player);
//         else if (tile.blocked)
//             continue;
//     }
// }

// ranged_attack: function() {
//     let p = Game.player;
//     var combine = function(arr, di) {
//       return [arr[0]*di + p.x, arr[1]*di + p.y];
//     }
//
//     for (var i = 0; i < 10; i++) {
//       for (var dir of ROT.DIRS[8]) {
//         var delta = combine(dir, i); // [x,y]
//         if (delta[0] < 0 || delta[0] == Game.map.width || delta[1] < 0 || delta[1] == Game.map.height)
//           continue;
//         else
//           this.drawFirstActor(Game.map.data[delta[1]][delta[0]]);
//       }
//     }
// },

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function addPrefix(name) {
    if (name != "you") {
        if (name[0] in vowels)
            return "an " + name;
        else
            return "a " + name;
    } else {
        return name;
    }
}

function dijkstra_callback(x, y) {
    if (x <= 0 || x == Game.map.width || y <= 0 || y == Game.map.height) return false;
    return ! Game.map.data[y][x].options.blocked;
}

class Actor {
    constructor(x, y, options) {
        this.x = x;
        this.y = y;
        this.options = options;
        this.cb = this.options.combat;
    }

    /* Called by the ROT.js game scheduler to indicate a turn */
    act() {
        if (Game.HUD) Game.HUD.update();
    }

    examine() { return this.options.description; }

    name() { return this.options.name; }

    distanceTo(actor) { // linear distance, no obstacles factored in
        return Math.sqrt(Math.pow(this.x - actor.x, 2) + Math.pow(this.y -  actor.y, 2));
    }

    /* Used to perform an action against another actor */
    interact(actor) { return null; }

    /* Used to react to the interaction of another actor */
    react(actor) { return null; }

    tryMove(nx, ny) { // returns true if the turn should end here
        if (nx < 0 || nx == Game.map.width || ny < 0 || ny == Game.map.height) return false;
        let ntile = Game.map.data[ny][nx]; // new tile to move to
        if (ntile.actors.length == 0 && ! ntile.options.blocked) {
            this.move(nx, ny);
            return true;
        } else if (ntile.actors.length > 0) {
            for (var i = 0; i < ntile.actors.length; i++) {
                let actor = ntile.actors[i];
                if (actor.options.blocked && actor.options.visible) {
                    if (! actor.isDead())
                        this.interact(actor);
                    return true;
                }
            }
        }

        if (! ntile.options.blocked) {
            this.move(nx, ny);
            return true;
        }

        return false;
    }

    move(nx, ny) {
        let ntile = Game.map.data[ny][nx]; // new tile to move to
        let ctile = Game.map.data[this.y][this.x]; // current tile
        ctile.actors.pop(this); // remove this actor from this tile
        // Game.drawTile(ctile); // redraw the tile, with this actor removed
        ntile.actors.push(this); // add this actor to the new tile

        this.x = nx; // update x,y coords to new coords
        this.y = ny;
        // Game.drawActor(this); // draw the actor at the new spot
        Game.drawViewPort();
    }

    /* attacks another actor */
    attack(actor) {
        // console.log(capitalize(addPrefix(this.name())) + this.cb.description[0] + addPrefix(actor.name()));
        /* Components for printing console events */
        // var evtmissed = `${capitalize(addPrefix(this.name))} failed to attack ${addPrefix(actor.name)}.`;

        /* Components for calculating hit chance, dodge chance, and total damage dealt */
        var dice = Math.random(); // floating point between [0, 1)
        var roll = function() { dice = Math.random(); }

        /* Perform the attack */
        var dmg = this.cb.str - actor.cb.def;
        var evtdamage = `${capitalize(addPrefix(this.name()))}${this.cb.description[0]}${addPrefix(actor.name())} and dealt ${dmg} damage.`;
        if (Game.player === this)
            Game.console.log(evtdamage, 'player_move');
        else
            Game.console.log(evtdamage, 'attack');
        actor.damage(dmg);

    }

    /* Reduce hp. If less than 0, causes death */
    damage(hp) {
        this.options.combat.hp -= hp;
        if (this.isDead()) this.death();

    }

    /* Restore HP up to maxhp */
    heal(hp) {
        if (this.cb.hp + hp > this.cb.maxhp)
            this.cb.hp = this.cb.maxhp;
        else
            this.cb.hp += hp;
    }

    /* Restores stamina up to max */
    recover(stamina) {
        if (this.cb.stamina + stamina > this.cb.maxstamina)
            this.cb.stamina = this.cb.maxstamina;
        else
            this.cb.stamina += stamina;
    }

    /* Restores mana up to max */
    restore(mana) {
        if (this.cb.mana + mana > this.cb.maxmana)
            this.cb.mana = this.cb.maxmana;
        else
            this.cb.mana += mana;
    }



    death() {
        Game.engine._scheduler.remove(this);
        let ctile = Game.map.data[this.y][this.x];
        // remove this actor from the global actors list and the occupied tile
        ctile.actors.pop(this);
        Game.map.actors.pop(this);
        // dump the contents of the actor's inventory (items) onto the ground.
        if (this.inventory) ctile.actors.concat(this.inventory);
        // redraw the tile, either with an appropriate actor or the tile symbol
        Game.drawViewPort();

        if (this === Game.player) {
            Game.console.log(`You died!.`, "death");
        } else {
            Game.console.log(`You killed the ${this.name()}.`, "death");
        }
    }

    isDead() { return this.cb.hp <= 0; }
}

class Player extends Actor {

    constructor(x, y) {
        super(x, y, {
            name:"you",
            description:"It's you!",
            symbol:"@",
            fg :"yellow",
            bg:"black",
            visible:true,
            blocked:true,
            leveled_up:true,
            combat : { /* options.combat, dedicated to all things related to combat */
                description:[" attacked ", " stabbed ", " jabbed ", " smashed "],
                /* stat caps */
                maxhp:75,
                maxmana:25,
                /* current stats */
                xp:0,
                level:1,
                hp:75,
                mana:25,
                str:10,
                def:5,
                /* Per-turn effects */
                hpRecovery:10,
                manaRecovery:5,
                invulnerable:false
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
        if (actor.options.combat.hostile) {
            this.attack(actor);
            if (! actor.isDead()) actor.react(this);
            else return true; // we can move
        } else {
            // non-combat interaction which varies from each actor to another,
            // so we will design non-combat based actors to simply perform actions
            // in a reactionary manner so that it offloads player code blocks.
            actor.react(this);
            return actor.options.blocked;
        }
    }

    react(actor) {
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
        Game.console.log(`You leveled up! You are now Level ${this.cb.level}.`, 'level_up');
        Game.console.log(`Choose what skill you want to level up:`, 'level_up');
        Game.console.log(`a) Str b) Def c) Hitpoints d) Mana`, 'level_up');
        var prompt = function(evt) {
            var cb = Game.player.cb;
            var code = evt.keyCode;
            if (code == ROT.VK_1) {
                cb.str++;
            } else if (code == ROT.VK_2) {
                cb.def++;
            } else if (code == ROT.VK_3) {
                cb.maxhp++;
            } else if (code == ROT.VK_4) {
                cb.mana++;
            } else {
                return;
            }
        }

        window.addEventListener("keydown", prompt);
    }



    handleEvent(evt) {
        /* If a user presses shift or ctrl */
        var modifiers = [ROT.VK_SHIFT, ROT.VK_CONTROL, ROT.VK_ALT];
        var code = evt.keyCode;

        if (code in modifiers) {
            console.log(code);
            window.removeEventListener("keydown", this);
            return;
        }
        var endturn = function() {
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
        var keyMap = {
            /* Arrow Key movement */
            39 : 2,
            37: 6,
            38 : 0,
            40 : 4,
            /* Num Pad Movement */
            104 : 0,
            105 : 1,
            102 : 2,
            99 : 3,
            98 : 4,
            97 : 5,
            100 : 6,
            103 : 7,
            /* vi movement */
            75 : 0,
            85 : 1,
            76 : 2,
            78 : 3,
            74 : 4,
            66 : 5,
            72 : 6,
            89 : 7,
            /* Rest */
            190: "rest"
        };

        if (! (code in keyMap)) { // invalid key press, retry turn
            Game.console.log("Unknown command", 'information');
            window.removeEventListener("keydown", this);
            window.addEventListener("keydown", this);
            return;
        }

        if ("rest" == keyMap[code]) { // Rest
            this.recover(this.cb.staminaRecovery);
            this.heal(this.cb.hpRecovery);
            this.restore(this.cb.manaRecovery);
            Game.console.log("You rest for a turn", 'player_move');
            endturn();
            return;
        } else {
            var diff = ROT.DIRS[8][keyMap[code]];
            var nx = this.x + diff[0];
            var ny = this.y + diff[1];
            if (! this.tryMove(nx, ny)) {
                window.removeEventListener("keydown", this);
                window.addEventListener("keydown", this);
                return;
            }
            this.path = new ROT.Path.Dijkstra(this.x, this.y, dijkstra_callback);
            endturn();
        }
    }

    tryMove(nx, ny) { // returns true if the turn should end here
        if (nx < 0 || nx == Game.map.width || ny < 0 || ny == Game.map.height) return;
        let ntile = Game.map.data[ny][nx]; // new tile to move to
        if (ntile.actors.length == 0 && ! ntile.options.blocked) {
            this.move(nx, ny);
            return true;
        } else if (ntile.actors.length > 0) {
            for (var i = 0; i < ntile.actors.length; i++) {
                let actor = ntile.actors[i];
                if (actor.options.blocked && actor.options.visible) {
                    if (! actor.isDead())
                        this.interact(actor);
                    if (actor.isDead())
                        this.gain_xp(actor.cb.maxhp);
                    return true;
                }
            }
        }

        if (! ntile.options.blocked) {
            this.move(nx, ny);
            return true;
        }

        return false;
    }

    death() {
        super.death();
        window.removeEventListener("keydown", this);
        this.cb.hp = 0;
        Game.HUD.update();
        Game.overview.deathScreen();
        Game.scheduler.remove(Game.player);
        Game.scheduler.clear();

    }

}

/* Hostile actors */

class Goblin extends Actor  {

    constructor(x, y) {
        super(x, y, {
            name:"goblin",
            description:"A mean, green goblin!",
            symbol:"g",
            fg :"darkgreen",
            bg:"seagreen",
            visible:true,
            blocked:true,
            chasing:false,
            combat : { /* options.combat, dedicated to all things related to combat */
                description:[" attacked "],
                /* max stats */
                maxhp:10,
                maxmana:5,
                /* current stats */
                hp:10,
                mana:5,
                str:10,
                def: 1,
                /* misc */
                hostile:true,
                range:6,
                invulnerable:false,
            }
        });
    }

    act() {
        super.act();
        Game.engine.lock();
        if (this.distanceTo(Game.player) < 9) {
            if (! this.chasing) Game.console.log('A goblin sees you.', 'alert');
            this.chasing = true;
            var pathToPlayer = [];
            Game.player.path.compute(this.x, this.y, function(x, y) {
                pathToPlayer.push([x, y]);
            });
            if (pathToPlayer.length >= 2) {
                let newPos = pathToPlayer[1]; // 1 past the current position
                this.tryMove(newPos[0], newPos[1]);
            }
        } else {

        }

        Game.engine.unlock();
    }

    interact(actor) {
        if (actor === Game.player) {
          this.attack(actor);
        }
    }

    react(actor) {
        // dodge?
    }

}

/* Non-hostile Actors */

class Store extends Actor {

    constructor(x, y) {
        super(x, y, {
            name:"Store",
            description:"A store filled with gold and goodies",
            symbol: "$",
            fg :"darkgreen",
            bg:"transparent",
            visible:true,
            blocked:true
        });
        this.items = [];
        this.exchangeRate = 0.5;
        this.gold = 1000;
    }

    act() { super.act(); }

    interact(actor) { }

    react(actor) { }

    /* Returns the number of items available for a given item */
    stock(item) {
        return 0;
    }

    /* Sells an item(s) to the player */
    sell(item, quantity) {
        if (stock(item) >= quantity) {
            items[item].amount -= quantity;
            return true;
        }
        return false;
    }
}

class Item  { // extends Actor
    constructor(x, y, name, attributes, quantity) {
        this.name = name;
        this.attributes = attributes;
        this.quantity = quantity;
    }

    hasAttribute(attribute) {
        return (attributes[attribute] != null);
    }

    act() { super.act(); }

    interact() { }

    react() { }
}

class Ladder extends Actor {
    constructor(x, y, symbol, dir) {
        super(x, y, {
            name:"ladder",
            direction: dir,
            description:"A ladder leading " + dir,
            symbol: symbol,
            fg :"thistle",
            bg:"transparent",
            blocked:true,
            visible:true
        });
    }

    act() {}
}
