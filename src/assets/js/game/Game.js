import ROT from 'rot-js'
import {GameMap} from '#/map/GameMap.js'
import {getTilesetCoords} from '#/map/GameMap.js'
import GameDisplay from '#/GameDisplay.js'
import Actor from '#/entities/actors/Actor.js'
import SimpleEnemy from '#/entities/actors/enemies/SimpleEnemy.js'

import Player from '#/entities/actors/Player.js'
import {randomMap} from '#/map/RandomMap.js'

import Item from '#/entities/items/Item.js'
import Door from '#/entities/misc/Door.js'
import Ladder from '#/entities/misc/Ladder.js'


export const tileset = require('@/assets/maps/tileset/compiled_dawnlike.json')
export const overworldMap = require('@/assets/maps/map_file/overworld.json')
export const orcCastle = require('@/assets/maps/map_file/orcCastle.json')


if (!ROT.isSupported()) {
    alert("The rot.js library isn't supported by your browser.");
}

export let Game = {
    overview: null,
    dev: false,
    display: null,
    HUD: null,
    console: null,
    player: null,
    playerLocation: null,
    playerID: 4696,
    loadedIDS: [],
    scheduler: null,
    turn: 0,
    engine: null,
    levels: {},
    currentLevel: "overworld",
    map: null,
    message_history: [],
    minimap: null,
    selectedTile: null,
    pathToTarget : {},

    init: function (dev = false) {
        this.dev = dev;
        this.map = new GameMap(overworldMap);
        this.levels["overworld"] = this.map;
        this.levels["Orc Castle"] = new GameMap(orcCastle);
        this.map.revealed = true;
        this.playerLocation = this.map.playerLocation;
        /* !Important! - PlayerID must be allocated before other maps are drawn... */
        this.playerID = this.map.playerID;
        // Set up the ROT.JS game display
        let tileSet = document.createElement("img");
        tileSet.src = "static/images/DawnLike/Compiled/compiled_tileset_32x32.png";
        let tileSize = 32;
        let tileMap = {};
        /*for (let id of this.loadedIDS) {*/
        for (let id in tileset.tileproperties + this.loadedIDS) {
            tileMap[id.toString()] = getTilesetCoords(id);
            if (id in tileset.tileproperties) {
                let properties = tileset.tileproperties[id];
                if (properties.FOV)
                    tileMap[properties.FOV_id] = getTilesetCoords(properties.FOV_id);
                if (properties.animated)
                    tileMap[properties.animated_id] = getTilesetCoords(properties.animated_id);
                if (properties.animated && properties.FOV)
                    tileMap[properties.animated_fov_id] = getTilesetCoords(properties.animated_fov_id);
                if (properties.activated_id)
                    tileMap[properties.activated_id] = getTilesetCoords(properties.activated_id);
            }
        }
        this.displayOptions = {
            width: 30,
            height: 18,
            forceSquareRatio: true,
            layout: "tile",
            // bg: "transparent",
            tileWidth: tileSize,
            tileHeight: tileSize,
            tileSet: tileSet,
            tileMap: tileMap,
            tileColorize: true
        };
        this.width = this.displayOptions.width;
        this.height = this.displayOptions.height;
        this.display = new ROT.Display(this.displayOptions);
        this.player = new Player(this.playerLocation[0], this.playerLocation[1], this.playerID);
        this.map.actors.push(this.player); // add to the list of all actors
        this.map.data[this.playerLocation[1]][this.playerLocation[0]].actors.push(this.player); // also push to the tiles' actors
        this.scheduleAllActors();
        this.drawViewPort();
        this.initializeMinimap();
        this.engine.start(); // Start the engine
        tileSet.onload = function () {
            Game.drawViewPort();
            Game.drawMiniMap();
        };
    },

    refreshDisplay() {
        Game.display.setOptions(this.displayOptions);
    },

    scheduleAllActors: function () {
        // Set up the ROT engine and scheduler
        this.scheduler = new ROT.Scheduler.Simple();
        this.scheduler.add(new GameDisplay(), true);
        this.scheduler.add(this.player, true); // Add the player to the scheduler
        for (let i = 0; i < this.map.actors.length; i++) {
            // Some 'actor' objects do not take turns, such as ladders / items
            if (this.map.actors[i] !== this.player && this.map.actors[i] instanceof Actor) {
                this.scheduler.add(this.map.actors[i], true);
            }
        }
        this.engine = new ROT.Engine(this.scheduler); // Create new engine with the newly created scheduler
    },

    initializeMinimap: function () {
        /* Create a ROT.JS display for the minimap! */
        this.minimap = new ROT.Display({
            width: this.map.width,
            height: this.map.height,
            fontSize: 2,
            spacing: 2,
            forceSquareRatio: true
        });
        this.drawMiniMap();
    },

    log: function (message, type) {
        let message_color = {
            'defend': 'lightblue',
            'attack': 'red',
            'death': 'crimson',
            'information': 'yellow',
            'player_move': 'grey',
            'level_up': 'green',
            'alert': 'orange',
        };
        this.message_history.push([message, message_color[type]]);
        $('#fix_scroll').stop().animate({
            scrollTop: $('#fix_scroll')[0].scrollHeight
        }, 800);
    },

    inbounds: function (x, y) {
        return !(x < 0 || x >= this.map.width || y < 0 || y >= this.map.height);
    },

    changeLevels: function (newLevel, dir, level) {
        if (this.levels[newLevel] === undefined) {
            this.levels[newLevel] = new GameMap(randomMap(40, 40, dir,level));
            console.log(newLevel + " does not exist, so a new random instance is being created.");
        }

        this.map.playerLocation = [Game.player.x, Game.player.y];
        // Save the old map
        this.levels[this.currentLevel] = this.map; // add the old map to 'levels'
        // Unshift player from ladder position (so that when resurfacing, no player is present)
        this.map.data[this.player.y][this.player.x].removeActor(this.player);
        // Add the new GameMap to the game
        this.map = this.levels[newLevel];
        this.currentLevel = newLevel;
        this.playerLocation = this.map.playerLocation;
        this.player.placeAt(this.playerLocation[0], this.playerLocation[1]);
        this.scheduleAllActors();
        this.drawViewPort();
        this.initializeMinimap();
        $('#minimap_container').html(this.minimap.getContainer()); // resetting the canvas / minimap display fixes ghosting

    },

    drawViewPort: function () {
        // Camera positions
        let camera = { // camera x,y resides in the upper left corner
            x: this.player.x - ~~ (Game.width / 2),
            y: this.player.y - ~~ (Game.height / 2),
            width: Math.ceil(Game.width),
            height: Game.height,
        };
        let startingPos = [camera.x, camera.y];
        if (camera.x < 0) // far left
            startingPos[0] = 0;
        if (camera.x + camera.width > Game.map.width) // far right
            startingPos[0] = Game.map.width - camera.width;
        if (camera.y <= 0) // at the top of the map
            startingPos[1] = 0;
        if (camera.y + camera.height > Game.map.height) { // at the bottom of the map
            startingPos[1] = Game.map.height - camera.height;
        }
        this.camera = {x: startingPos[0], y: startingPos[1]};
        let endingPos = [startingPos[0] + camera.width, startingPos[1] + camera.height];
        let dx = 0;
        let dy = 0;
        // Clear the last visible tiles that were available to be seen
        Object.assign(this.map.seen_tiles, this.map.visible_tiles);
        this.map.visible_tiles = {};

        // FOV calculations
        let fov = new ROT.FOV.PreciseShadowcasting(function (x, y) {
            return (Game.inbounds(x, y) && Game.map.data[y][x].visible());
        });

        fov.compute(this.player.x, this.player.y, 7, function (x, y, r, visibility) {
            Game.map.visible_tiles[x + ',' + y] = true;
        });

        // Draw the viewport
        /*
         for (let x = startingPos[0]; x < endingPos[0]; x++) {
         for (let y = startingPos[1]; y < endingPos[1]; y++) {
         let tile = this.map.data[y][x];
         if (tile.x + "," + tile.y in this.map.visible_tiles) {
         this.drawTile(dx, dy++, tile, false);
         } else {
         this.drawTile(dx, dy++, tile, ! this.map.revealed);
         }
         }
         dx++;
         dy = 0;
         }
         */
        for (let x = startingPos[0]; x < endingPos[0]; x++) {
            for (let y = startingPos[1]; y < endingPos[1]; y++) {
                let tile = this.map.data[y][x];
                if (this.map.revealed) {
                    this.drawTile(dx, dy++, tile, false);
                } else {
                    if (tile.x + "," + tile.y in this.map.visible_tiles) {
                        this.drawTile(dx, dy++, tile, false);
                    } else if (tile.x + "," + tile.y in this.map.seen_tiles) {
                        this.drawTile(dx, dy++, tile, true);
                    } else {
                        Game.display.draw(dx, dy++, "", "black", "black");
                    }
                }
            }
            dx++;
            dy = 0;
        }
    },

    clearSelectedTile() {
        const targetingBorders = {id : 7418};
        const untargetableBorders = {id : 7419};
        let actors = Game.map.data[this.selectedTile.y][this.selectedTile.x].actors.filter((obs) => {
            return obs.id !== targetingBorders.id && obs.id !== untargetableBorders.id;
        });
        Game.map.data[this.selectedTile.y][this.selectedTile.x].actors = actors;
        this.selectedTile = null;
        this.pathToTarget = {};
    },

    changeSelectedTile(diff) {
        const targetingBorders = {id : 7418, visible : true};
        const untargetableBorders = {id : 7419, visible : true};
        let tile;
        if (this.selectedTile === null) {
            tile =  {x : this.player.x, y : this.player.y}; // haven't selected a tile before or it was cleared
            let x = tile.x+diff[0];
            let y = tile.y+diff[1];
            if (!this.inbounds(x,y) || this.map.visible_tiles[x+','+y] === undefined) /* || ! x+','+y in this.map.visible_tiles )*/
                return;
        } else {
        // we have had a previously selected tile and need to pop the targeting reticle before pushing it onto the new tile
            tile = this.selectedTile;
            let x = tile.x+diff[0];
            let y = tile.y+diff[1];
            if (!this.inbounds(x,y) || this.map.visible_tiles[x+','+y] === undefined) /* || ! x+','+y in this.map.visible_tiles) */
                return;
            let actors = Game.map.data[tile.y][tile.x].actors.filter((obs) => {
                return obs.id !== targetingBorders.id && obs.id !== untargetableBorders.id;
            });
            Game.map.data[tile.y][tile.x].actors = actors;
        }
        // changed the selected tile to the new tile position selected by movement keys
        this.selectedTile = {
            x : tile.x+diff[0],
            y : tile.y+diff[1]
        }
        let mapTile = Game.map.data[this.selectedTile.y][this.selectedTile.x];
        let properBorder = mapTile.blocked() ? untargetableBorders : targetingBorders;
        this.map.data[this.selectedTile.y][this.selectedTile.x].actors.push(properBorder);
        this.pathToTarget = {};
        if (properBorder === untargetableBorders) {
            this.pathToTarget = {};
        } else {
            this.player.path.compute(this.selectedTile.x, this.selectedTile.y, (x, y) => {
                this.pathToTarget[x+','+y] = true;
            });
            this.pathToTarget[this.player.x+','+this.player.y] = false;
        }
    },

    drawTile: function (x, y, tile, fov) {
        let symbols = tile.getSpriteIDS(this.turn % 2 === 0, fov);
        // if (symbols.some((e) => {return e === "0"})) throw "A tile is empty!"
        // console.log(this.pathToTarget[x+','+y]);
        if (this.pathToTarget[tile.x+','+tile.y]) {
            Game.display.draw(x, y, symbols, "rgba(250,250,0,0.25)", "rgba(250,250,0,0.25)");
        } else {
            Game.display.draw(x, y, symbols, "transparent", "transparent");
        }
    },

    drawMiniMap: function () {
        let otherActors = this.map.actors.filter( (a) => {
            return (a instanceof Ladder || a instanceof Door);
        });
        if (this.map.revealed) {
            for (let y = 0; y < this.map.height; y++) {
                for (let x = 0; x < this.map.width; x++) {
                    let tile = this.map.data[y][x];
                    if (tile.x + ',' + tile.y in this.map.visible_tiles)
                        this.minimap.draw(x, y, " ", tile.bg(), this.brightenColor(tile.bg()));
                    else
                        this.minimap.draw(x, y, " ", tile.bg(), tile.bg());
                }
            }

            for (let a of otherActors) {
                    this.minimap.draw(a.x, a.y, " ", a.fg, a.bg);
            }

        } else {
            for (let y = 0; y < this.map.height; y++) {
                for (let x = 0; x < this.map.width; x++) {
                    let tile = this.map.data[y][x];
                    if (tile.x + ',' + tile.y in this.map.visible_tiles) {
                        this.minimap.draw(x, y, " ", tile.bg(), this.brightenColor(tile.bg()));
                    } else if (tile.x + ',' + tile.y in this.map.seen_tiles) {
                        this.minimap.draw(x, y, " ", tile.bg(), tile.bg());
                    }
                }

            }
            for (let a of otherActors) {
                if (a.x + "," + a.y in this.map.seen_tiles)
                    this.minimap.draw(a.x, a.y, " ", a.fg, a.bg);
            }
        }
        // Draw the actor in the mini-map
        this.minimap.draw(this.player.x, this.player.y, " ", "yellow", "yellow");
    },

    brightenColor: function (color) {
        // console.log(color);
        let hsl_color = ROT.Color.rgb2hsl(ROT.Color.fromString(color));
        hsl_color[2] *= 1.25;
        return ROT.Color.toRGB(ROT.Color.hsl2rgb(hsl_color));
    },

    updateDisplay: function () {
        this.drawViewPort();
        this.drawMiniMap();
    },

    getNearbyEnemies: function () {
        let camera = { // camera x,y resides in the upper left corner
            x: this.player.x - ~~ (Game.width / 2),
            y: this.player.y - ~~ (Game.height / 2),
            width: Math.ceil(Game.width),
            height: Game.height,
        };
        let startingPos = [camera.x, camera.y];
        if (camera.x < 0) // far left
            startingPos[0] = 0;
        if (camera.x + camera.width > Game.map.width) // far right
            startingPos[0] = Game.map.width - camera.width;
        if (camera.y <= 0) // at the top of the map
            startingPos[1] = 0;
        if (camera.y + camera.height > Game.map.height) { // at the bottom of the map
            startingPos[1] = Game.map.height - camera.height;
        }
        this.camera = {x: startingPos[0], y: startingPos[1]};
        let endingPos = [startingPos[0] + camera.width, startingPos[1] + camera.height];
        let dx = 0;
        let dy = 0;
        let actors = [];
        for (let x = startingPos[0]; x < endingPos[0]; x++) {
            for (let y = startingPos[1]; y < endingPos[1]; y++) {
                let tile = this.map.data[y][x];
                if (this.map.revealed) {
                    actors = actors.concat(tile.actors);
                } else {
                    if (tile.x + "," + tile.y in this.map.visible_tiles)
                        actors = actors.concat(tile.actors);
                }
            }
            dx++;
            dy = 0;
        }
        return actors.filter((actor) => {return actor.cb !== undefined && actor.cb.hostile});
    },

    printPlayerTile: function () {
        console.log(Game.map.data[this.player.y][this.player.x]);
    },

    eventToTile(evt) {
        let t = Game.display.eventToPosition(evt);
        let x = t[0] + this.camera.x;
        let y = t[1] + this.camera.y;
        return this.map.data[y][x];
    },

    hoverTile(evt) {
        let t = Game.display.eventToPosition(evt);
        let x = t[0] + this.camera.x;
        let y = t[1] + this.camera.y;
        this.hoveredTile = t[0] + ',' + t[1];
    }
};
