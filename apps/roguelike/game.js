/* A game created to mimic some elements Dungeon Crawl Stone Soup in Rot.JS */

/* Create game object to hold the display and initialize game */
var Game = {
    overview: null,
    display: null,
    HUD: null,
    console: null,
    player: null,
    scheduler: null,
    engine: null,
    map: null,

    /* Set up the entire game display for the HTML document */
    init: function () {

        // 1. First, Set up the ROT.JS game display
        var options = {
            width: 25,
            height: 25,
            fontSize: 18,
            fontFamily:"menlo, consolas, monospace",
            spacing:1.2,
            forceSquareRatio:true
        };
        this.width = options.width;
        this.height = options.height;
        this.display = new ROT.Display(options);

        // 2. The game map is loaded immediately via the loadMap function
        this.player = this.map.player; // so just link the player to the game here

        // 3. Set up the HUD now that the player is linked and we can grab its info
        this.HUD = new HUD();

        // 4. Set up a console for game output
        this.console = new Console();

        // 5. Set up a game overview which will automatically arrange all
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
        // this.drawMap();
        this.drawViewPort();
    },

    inbounds: function(x, y) {
      return ! (x < 0 || x >= this.map.width || y < 0 || y >= this.map.height);
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

    drawViewPort: function() {
      var camera = { // camera x,y resides in the upper left corner
        x:this.player.x - Math.floor(Game.width / 2),
        y:this.player.y - Math.floor(Game.height / 2),
        width:Game.width,
        height:Game.height,
      };
      var startingPos = [camera.x, camera.y];
      if (camera.x <= 0) // far left
        startingPos[0] = 0;
      if (camera.x + camera.width >= Game.map.width) // far right
        startingPos[0] = Game.map.width - camera.width;

      if (camera.y <= 0) // at the top of the map
        startingPos[1] = 0;
      if (camera.y + camera.height >= Game.map.height) { // at the bottom of the map
        startingPos[1] = Game.map.height - camera.height;
      }
      var endingPos = [startingPos[0] + camera.width, startingPos[1] + camera.height];
      var dx = 0;
      var dy = 0;
      // console.log(`Drawing from ${startingPos} to ${endingPos}`);
      for (var x = startingPos[0]; x < endingPos[0]; x++) {
        for (var y = startingPos[1]; y < endingPos[1]; y++) {
          this.drawFirstActor(dx, dy++, this.map.data[y][x]);
        }
        dx++; dy = 0;
      }
    },

    drawTile: function(x, y, tile) {
        Game.display.draw(x, y, tile.symbol, tile.options.fg, "black");
    },

    drawFirstActor: function(x, y, tile) {
      for (var i = 0; i < tile.actors.length; i++) {
          if (tile.actors[i].options.visible) {
              Game.drawTile(x, y, tile);
              Game.drawActor(x, y, tile.actors[i]);
              return;
          }
      }
      // if we reach this point, no actors were drawable
      Game.drawTile(x, y, tile);
    },

    drawActor: function(x, y, actor) {
      Game.display.draw(x, y, actor.options.symbol, actor.options.fg, "black");
    },

};

Game.loadMap("/apps/roguelike/maps/expanded_start.json");

/* Old Draw Functions (static maps/no scrolling) */
/*

drawMap: function () {
    for (var y = 0; y < this.map.height; y++)
        for (var x = 0; x < this.map.width; x++)
            Game.drawTile(this.map.data[y][x]);

    Game.drawActors();
},



drawTile: function (tile) {
    Game.display.draw(tile.x, tile.y, tile.symbol, tile.options.fg, "black");
},


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
},
*/
