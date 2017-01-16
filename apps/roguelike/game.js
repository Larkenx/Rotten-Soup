/* A game created to mimic some elements Dungeon Crawl Stone Soup in Rot.JS */

/* Create game object to hold the display and initialize game */
var Game = {
    overview: null,
    display: null,
    HUD: null,
    player: null,
    scheduler: null,
    engine: null,
    map: null,

    /* Set up the entire game display for the HTML document */
    init: function () {

        // 1. First, Set up the ROT.JS game display
        var options = {
            width: 30,
            height: 20,
            fontSize: 20,
            fontFamily:"menlo, consolas",
            spacing:1.2,
            forceSquareRatio:false
        };
        this.display = new ROT.Display(options);

        // 2. The game map is loaded immediately via the loadMap function
        this.player = this.map.player; // so just link the player to the game here

        // 3. Set up the HUD now that the player is linked and we can grab its info
        this.HUD = new HUD();

        // 4. Finally, set up a game overview which will automatically arrange all
        // of the above components in their proper location.
        this.overview = new GameOverview();

        // Set the ROT engine and scheduler
        this.scheduler = new ROT.Scheduler.Simple();
        this.scheduler.add(this.player, true); // Add the player to the scheduler
        for (var i = 0; i < this.map.actors.length; i++) {
            if (this.map.actors[i] !== this.player) {
                this.scheduler.add(this.map.actors[i], true);
            }
        }

        this.engine = new ROT.Engine(this.scheduler); // Create new engine with the newly created scheduler
        this.engine.start(); // Start the engine
        this.drawMap();
    },

    loadMap: function (handle) {
        try {
            $.getJSON(handle, function(data) {
                return data;
            })
                .done(function(data) {
                    Game.map = new Map(data);
                    if (Game.map === null) throw "Failed to load map!";
                    Game.init();
                });

            return Game.map !== null;
        }
        catch (error) {
            console.log("Map creation failed: " + error);
            return false;
        }
    },

    generateMap: function () {
        var digger = new ROT.Map.Cellular();
        var freeCells = [];

        /* cells with 1/2 probability */
        digger.randomize(0.5);

        /* generate and show four generations */
        digger.create(function(x,y, val) {
            if (val) return;

            var key = x+","+y;
            freeCells.push(key);
            Game.map[key] = ".";
        });
        this.createPlayer(freeCells);
    },

    /* Draw Functions */
    drawMap: function () {
        for (var y = 0; y < this.map.height; y++)
            for (var x = 0; x < this.map.width; x++)
                Game.drawTile(this.map.data[y][x]);

        Game.drawActors();
    },

    drawViewPort: function() {
        // check corners of the map

        // iterate in a 30x20 grid around the player
        let p = Game.player;
        for (var y = 0; y < 15; y++) {
            for (var x = 0; x < 10; x++) {
                var ctile = Game.map.data[p.y + y][p.x + x];
                if (ctile) {
                    
                }
            }
        }
    },

    drawTile: function (tile) {
        Game.display.draw(tile.x, tile.y, tile.symbol, tile.options.fg, "black");
    },

    drawTile2: function(x, y, tile) {
        Game.display.draw(x, y, tile.symbol, tile.options.fg, "black");
    }

    drawFirstActor: function(tile) {
        for (var i = 0; i < tile.actors.length; i++) {
            if (tile.actors[i].options.visible) {
                Game.drawActor(tile.actors[i]);
                return;
            }
        }
        // if we reach this point, no actors were drawable
        Game.drawTile(tile);
    },

    drawActors: function () {
        for (var i = 0; i < this.map.actors.length; i++) {
            Game.drawActor(this.map.actors[i]);
        }
    },

    drawActor: function (actor) {
        Game.display.draw(actor.x, actor.y, actor.options.symbol, actor.options.fg, actor.options.bg);
    }

};

Game.loadMap("/apps/roguelike/maps/expanded_start.json");
