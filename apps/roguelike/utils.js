 function actorCreator(id, x, y) {
     let symbol = String.fromCharCode(id - 1);
     switch (symbol) {
         case '$':
            return new Store(x, y);
         case '@':
            return new Player(x, y);
         case 'g':
            return new Goblin(x, y);
         case '<':
            return new Ladder(x, y, symbol, "up");
         case '>':
            return new Ladder(x, y, symbol, "down");
         default:
            return null;
     }
 }

class Map {
    constructor(json) {
        if (! json) throw "Bad map creation";
        let obstacles = json.layers[0];
        let actorLayer = json.layers[1];
        this.player = null;
        this.width = obstacles.width;
        this.height = obstacles.height;
        this.actors = []; // store all of the actors in array
        this.data = new Array(this.height); // stores all tiles in the game

        console.log("Creating game map...");
        for (var i = 0; i < this.height; i++) {
            this.data[i] = new Array(this.width);
            for (var j = 0; j < this.width; j++) {
                // Grabs the symbol from the layer
                var id = obstacles.data[i*this.width + j];
                this.data[i][j] = new Tile(j, i, id);
            }
        }

        console.log("Creating actors...");
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                let id = actorLayer.data[i*this.width + j]; // grab the id in the json data
                if (id != 0) { // id of zero indicates no actor in this spot
                    let newActor = actorCreator(id, j, i); // create the new actor
                    if (newActor.options.symbol == "@") this.player = newActor;
                    this.actors.push(newActor); // add to the list of all actors
                    this.data[i][j].actors.push(newActor); // also push to the tiles' actors
                }
            }
        }
    }

    print() {
        let buf = "";
        for (var i = 0; i < this.height; i++) {
            let row = "";
            for (var j = 0; j < this.width; j++)
                row += this.data[i][j].symbol; //+ " ";
            buf += row + '\n';
        }

        for (var i = 0; i < this.actors.length; i++) {
            let actor = this.actors[i];
            /* to calculate where the actor should go, we have to consider
            the new line character in each line of the buffer, which is equal
            to the actor's y coord. */
            let index = actor.y*this.width + actor.x + actor.y;
            buf = buf.substr(0, index)
             + actor.options.symbol
             + buf.substr(index+1);
        }
        console.log(buf);
    }

}

class Tile {
    constructor(x, y, id) {
        this.symbol = id == 0 ? String.fromCharCode(32) : String.fromCharCode(id - 1);
        this.options = environment[this.symbol];
        this.actors = [];
        this.x = x;
        this.y = y;
    }

    blocked() {
        return this.options.blocked;
    }
}

class HUD {
    constructor() {
        $('body').append("<div id='hud'>" + this.getStats() + "</div>");
    }

    update() {
        document.getElementById('hud').innerHTML = this.getStats();
    }

    getStats() {
        var p = Game.player;
        return "<h2>"
               + "Health: " + p.options.combat.hp + "<br>"
               + "Strength: " + p.options.combat.strength + "<br>"
               + "Position: " + "(" + p.x + ", " + p.y +")" 
               + "</h2>";
    }
}
