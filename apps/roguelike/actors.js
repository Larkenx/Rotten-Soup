let vowels = ['a', 'e', 'i', 'o', 'u'];

function addPrefix(name) {
    if (name != "You") {
        if (name[0] in vowels)
            return "An" + name;
        else
            return "A" + name;
    } else {
        return name;
    }
}

class Actor {
    constructor(x, y, options) {
        this.x = x;
        this.y = y;
        this.options = options;
    }

    /* Called by the ROT.js game scheduler to indicate a turn */
    act() { return null; }

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
        if (ntile.actors.length == 0 && ! ntile.blocked()) {
            this.move(nx, ny);
        } else if (ntile.actors.length > 0) {
            for (var i = 0; i < ntile.actors.length; i++) {
                let actor = ntile.actors[i];
                if (actor.options.visible) {
                    this.interact(actor);
                    if (actor.isDead()) this.move(nx, ny);
                    return;
                }
            }
        }

        if (! ntile.blocked()) {
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

    attack(actor) {
        let cb = this.options.combat;

        console.log(
            addPrefix(this.options.name)
            + cb.description
            + actor.options.name.toLowerCase() + "!"
        );

        actor.damage(cb.strength);
    }

    damage(hp) {
        this.options.combat.hp -= hp;
        if (this.isDead()) this.death();
    }

    death() {
        let ctile = Game.map.data[this.y][this.x];
        // remove this actor from the global actors list and the occupied tile
        ctile.actors.pop(this);
        Game.map.actors.pop(this);
        // dump the contents of the actor's inventory (items) onto the ground.
        if (this.inventory) ctile.actors.concat(this.inventory);
        // redraw the tile, either with an appropriate actor or the tile symbol
        Game.drawFirstActor(ctile);
        console.log("A " + this.options.name + " has died!");

    }

    isDead() { return this.options.combat.hp <= 0; }
}

/* Hostile actors */

class Goblin extends Actor  {

    constructor(x, y) {
        super(x, y, {
            name:"goblin",
            description:"A mean, green goblin!",
            symbol:"g",
            fg :"green",
            bg:"transparent",
            visible:true,
            blocked:true,
            combat : { /* options.combat, dedicated to all things related to combat */
                description:" attacks ",
                hostile:true,
                hp:10,
                strength:2,
                invulnerable:false,
            }
        });
    }

    act() { }

    interact(actor) { }

    react(actor) {
        console.log("The goblin reacts and does nothing!");
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

    act() { }

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

    act() { }

    interact() { }

    react() { }
}

class Player extends Actor {

    constructor(x, y) {
        super(x, y, {
            name:"You",
            description:"It's you!",
            symbol:"@",
            fg :"yellow",
            bg:"transparent",
            visible:true,
            blocked:true,
            combat : { /* options.combat, dedicated to all things related to combat */
                description:" attack the ",
                hp:10,
                strength:5,
                invulnerable:false,
            }
        });
        this.inventory = [];
    }

    act() {
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
            if (actor.options.combat.hp > 0) actor.react(this);
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

        var keyMap = {
            87 : 0, // D
            68 : 1, // W
            83 : 2, // S
            65 : 3 // A
        };

        if (! (code in keyMap)) return; // invalid key press

        var diff = ROT.DIRS[4][keyMap[code]];
        var nx = this.x + diff[0];
        var ny = this.y + diff[1];
        this.tryMove(nx, ny)
        Game.HUD.update();
        window.removeEventListener("keydown", this);
        Game.engine.unlock();
    }

    death() {
        alert("YOU DIED");
    }

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
