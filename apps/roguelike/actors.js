let vowels = ['a', 'e', 'i', 'o', 'u'];

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

function addPrefix(name) {
    if (name != "You") {
        if (name[0] in vowels)
            return "An " + name;
        else
            return "A " + name;
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
        if (nx < 0 || nx == Game.map.width || ny < 0 || ny == Game.map.height) return;
        let ntile = Game.map.data[ny][nx]; // new tile to move to
        if (ntile.actors.length == 0 && ! ntile.options.blocked) {
            this.move(nx, ny);
        } else if (ntile.actors.length > 0) {
            for (var i = 0; i < ntile.actors.length; i++) {
                let actor = ntile.actors[i];
                if (actor.options.visible) {
                    if (! actor.isDead())
                        this.interact(actor);
                    if (actor.isDead())
                        this.move(nx, ny);
                    return;
                }
            }
        }

        if (! ntile.options.blocked) {
            this.move(nx, ny);
        }
    }

    move(nx, ny) {
        let ntile = Game.map.data[ny][nx]; // new tile to move to
        let ctile = Game.map.data[this.y][this.x]; // current tile
        ctile.actors.pop(this); // remove this actor from this tile
        Game.drawTile(ctile); // redraw the tile, with this actor removed
        ntile.actors.push(this); // add this actor to the new tile

        this.x = nx; // update x,y coords to new coords
        this.y = ny;
        Game.drawActor(this); // draw the actor at the new spot
    }

    /* attacks another actor */
    attack(actor) {
        console.log(
            addPrefix(this.options.name)
            + this.cb.description
            + actor.options.name.toLowerCase() + "!"
        );

        actor.damage(this.cb.strength);
        this.options.combat.stamina -= 2.5;
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
        // Game.drawFirstActor(ctile);
        console.log("A " + this.options.name + " has died!");
    }

    isDead() { return this.cb.hp <= 0; }
}

class Player extends Actor {

    constructor(x, y) {
        super(x, y, {
            name:"You",
            description:"It's you!",
            symbol:"@",
            fg :"yellow",
            bg:"black",
            visible:true,
            blocked:true,
            combat : { /* options.combat, dedicated to all things related to combat */
                description:["attack", "stab", "jab", "smash", "strike", "assail"],
                /* stat caps */
                maxhp:100,
                maxstamina:25,
                maxmana:25,
                /* current stats */
                hp:100,
                stamina:25,
                mana:25,
                strength:7,
                /* Per-turn effects */
                staminaRecovery:5,
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
        // dodge?
    }

    handleEvent(evt) {
        var code = evt.keyCode;
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

        if (! (code in keyMap)) return; // invalid key press, do nothing

        if ("rest" == keyMap[code]) { // Rest
            this.recover(this.cb.staminaRecovery);
            this.heal(this.cb.hpRecovery);
            this.restore(this.cb.manaRecovery);
            endturn();
            return;
        } else {
            var diff = ROT.DIRS[8][keyMap[code]];
            var nx = this.x + diff[0];
            var ny = this.y + diff[1];
            this.tryMove(nx, ny)
            this.path = new ROT.Path.Dijkstra(this.x, this.y, dijkstra_callback);
            endturn();
        }
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
            fg :"green",
            bg:"black",
            visible:true,
            blocked:true,
            combat : { /* options.combat, dedicated to all things related to combat */
                description:" attacks ",
                hostile:true,
                range:6,
                maxhp:10,
                maxstamina:15,
                maxmana:5,
                hp:10,
                stamina:15,
                mana:5,
                strength:10,
                invulnerable:false,
            }
        });
    }

    act() {
        super.act();
        Game.engine.lock();
        if (this.distanceTo(Game.player) < 9) {
            var pathToPlayer = [];
            Game.player.path.compute(this.x, this.y, function(x, y) {
                pathToPlayer.push([x, y]);
            });
            if (pathToPlayer.length >= 2) {
                let newPos = pathToPlayer[1]; // 1 past the current position
                this.tryMove(newPos[0], newPos[1]);
            }
        }

        Game.engine.unlock();
    }

    interact(actor) {
        this.attack(actor);
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
