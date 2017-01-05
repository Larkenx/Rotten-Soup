class Actor {
    constructor(x, y, options) {
        this.x = x;
        this.y = y;
        this.options = options;
    }

    act() { return null; }

    examine() { return this.options.description; }

    name() { return this.options.name; }

    distanceTo(actor) { // linear distance, no obstacles factored in
        return Math.sqrt(Math.pow(this.x - actor.x, 2) + Math.pow(this.y -  actor.y, 2));
    }

    move(nx, ny) {
        let ntile = Game.map.data[ny][nx]; // new tile to move to
        if (ntile.blocked()) {
            console.log("Cannot move to (" + nx + "," + ny + ")");
            return false;
        }

        let ctile = Game.map.data[this.y][this.x]; // current tile
        ctile.actors.pop(this); // remove this actor from this tile
        Game.drawTile(this.x, this.y, ctile); // redraw the tile, with this actor removed
        ntile.actors.push(this); // add this actor to the new tile

        this.x = nx; // update x,y coords to new coords
        this.y = ny;
        Game.drawActor(this); // draw the actor at the new spot
        return true;
    }
}

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
            hp:10,
            att:10,
        });
    }

    act() { }
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
}

class Store extends Actor {

    constructor(x, y) {
        super(x, y, {
            name:"Store",
            description:"A store filled with gold and goodies",
            symbol: "$",
            fg :"lightgreen",
            bg:"transparent",
            visible:true,
            blocked:true
        });
        this.items = [];
        this.exchangeRate = 0.5;
        this.gold = 1000;
    }

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

class Player extends Actor {

    constructor(x, y) {
        super(x, y, {
            name:"Player",
            description:"It's you!",
            symbol:"@",
            fg :"yellow",
            bg:"transparent",
            visible:true,
            hp:10,
            att:10,
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
        if (! this.move(nx, ny)) return; // failed to move to this tile

        window.removeEventListener("keydown", this);
        Game.engine.unlock();
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
