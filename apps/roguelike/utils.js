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


    /* Returns the tiles adjacent to the given tile */
    adjTiles(tile) {
        let adjacentTiles = [];
        for (var dist of ROT.DIRS[8]) {
            let nx = tile.x + dist[0];
            let ny = tile.y + dist[1];
            if (nx < 0 || nx == this.width || ny < 0 || ny == this.height)
                continue; // out of bounds, skip
            else
                adjacentTiles.push(this.data[ny][nx]);
        }
        return adjacentTiles;
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

    /* Indicates whether or not a tile is blocked; however, this excludes the player
     * for AI purposes. */
    blocked() {
        if (this.options.blocked) return true;
        for (var actor of this.actors) {
            if (actor.options.blocked && actor != Game.player)
                return true;
        }
        return false;
    }
}

class HUD {
    constructor() {
        this.template = `<div id='hud' class='w3-col w3-border w3-container w3-black' style="width:430px; height:487px">
                            ${this.getStats()}
                            ${this.getAbilities()}
                         </div>`;
    }

    update() {
        $('#hud').html(this.getStats() + this.getAbilities());
    }

    createBar(barID, color, width) {
        let cb = Game.player.options.combat;
        var num = cb.mana;
        var denom = cb.maxmana;
        if (barID == "hpbar") {
            num = cb.hp;
            denom = cb.maxhp;
        } else if (barID == "staminabar") {
            num = cb.stamina;
            denom = cb.maxstamina;
        }

        let pct = ((num / denom)*100) + "%";
        return `<div class='w3-progress-container w3-black w3-half'>
                  <div id='${barID}' class='w3-progressbar w3-center w3-text-white w3-border w3-round ${color}' style='width:${pct}'>
                    <b>${pct}</b>
                  </div>
                </div>`;
   }

    getStats() {
        var p = Game.player;
        var cb = p.options.combat;
        /* HP Bar */
        var buffer = `<h3 class="w3-fredoka w3-text-white w3-row w3-center"><i>Larken</i> the Devourer</h3>
            <div class="w3-row-padding w3-padding-4" style="width:400px">
                <div class="w3-col" style="width:165px">
                    <i>Health: </i>
                    <b>${cb.hp}/${cb.maxhp}</b>
                </div>
                ${this.createBar("hpbar", "w3-red")}
            </div>`;

        /* Mana Bar */
        buffer += `
            <div class="w3-row-padding w3-padding-4" style="width:400px">
                <div class="w3-col" style="width:165px">
                    <i>Mana: </i>
                    <b>${cb.mana}/${cb.maxmana}</b>
                </div>
                ${this.createBar("manabar", "w3-blue")}
            </div>`;

        return buffer;
    }

    // <div class="w3-row-padding w3-padding-4" style="width:400px"> </div>
    getAbilities() {
        return "<h3 id='exists' class='w3-fredoka w3-text-white w3-row w3-center'>Abilities</h3>";
    }

}

/* A class to hold all of the displays, e.g the console,
 * the abilities menu, the HUD, the game view itself. */
class GameOverview {

    constructor() {
        /* We will organize the overall game 'display', where display
         * is the entire HTML page in which Rotten Soup is played, in the following,
         * design:
         *
         *  -The game itself (ASCII graphics) will be in a left rectangle,
         *  occupying approx. 75% of the left of the HTML doc.
         *  -The HUD, containing info about health, abilities, and stats, will
         *  exist to the right of the game, occupying about 25% of the right half
         *  of the screen.
         *  -Directly below the HUD, we will have a minimap of the game itself
         *  -Finally, below the game we will have a console that logs information
         *  about the game as you play, such as "You attack the goblin!".
          */
        var gdc = Game.display.getContainer();
        var hud = Game.HUD.template;
        var totalWidth = 430;
        this.boilerplate = `<div id='gameOverview' class='w3-padding-16 w3-row'>
                <div id="gameDisplay" class="w3-border w3-col" style='width:${totalWidth}px;'></div>`;

        $('body').prepend(this.boilerplate);
        $('#gameOverview').append(hud);
        $('#gameDisplay').html(gdc);
    }

    resize() {

    }

    deathScreen() {
        var modal = `<div id="deathScreen" class="w3-modal" >
                  <div class="w3-container w3-border w3-black w3-modal-content w3-animate-opacity w3-card-8" style='width:400px;'>
                      <span style='text-align:center; margin:0 auto;'
                      class='w3-text-red w3-wide w3-text-shadow'>
                        <i style='font-size:100px;' class='w3-deathfont'>YOU DIED</i>
                      </span>
                      <div class="w3-padding-16">
                          <button class="w3-btn-block w3-ripple w3-text-shadow w3-green" onclick="Game.overview.newGame()">
                          <b>Try Again?</b>
                          </button>
                      </div>
                  </div>
                </div>`;
        $('#gameOverview').append(modal);
        document.getElementById('deathScreen').style.display = "block";
    }

    newGame() {
        $('body').empty();
        Game.loadMap("/apps/roguelike/maps/expanded_start.json");
    }


}
