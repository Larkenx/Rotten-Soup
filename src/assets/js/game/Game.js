import ROT from 'rot-js'
import * as PIXI from 'pixi.js'

import { GameMap, getTilesetCoords } from '#/map/GameMap.js'
import GameDisplay from '#/GameDisplay.js'
import { Actor } from '#/entities/actors/Actor.js'
import { Entity } from '#/entities/Entity.js'
import { getItemsFromDropTable } from '#/utils/HelperFunctions.js'

import Item from '#/entities/items/Item.js'
import Player from '#/entities/actors/Player.js'
import { randomDungeon, randomCave } from '#/map/RandomMap.js'
import Door from '#/entities/misc/Door.js'
import Ladder from '#/entities/misc/Ladder.js'
import Chest from '#/entities/misc/Chest.js'

export const tileset = require('@/assets/maps/tileset/compiled_dawnlike.json')
export const overworldMap = require('@/assets/maps/map_file/overworld.json')
export const orcCastle = require('@/assets/maps/map_file/orcCastle.json')
export const graveyard = require('@/assets/maps/map_file/graveyard.json')
export const lichLair = require('@/assets/maps/map_file/lichLair.json')

if (!ROT.isSupported()) {
    alert("The rot.js library isn't supported by your browser.")
}

const targetingBorders = {
    id: 7418,
    visible: true
}
const untargetableBorders = {
    id: 7419,
    visible: true
}

export let Game = {
    app: null,
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
    loading: true,
    levels: {},
    currentLevel: { name: 'overworld' },
    map: null,
    messageHistory: [],
    tempMessages: [],
    minimap: null,
    selectedTile: null,
    pathToTarget: {},
    targetReticle: null,
    enemyCycle: null,
    enemyCycleIndex: 0,

    init(playerSpriteID) {
        /* !Important! - PlayerID must be allocated before other maps are drawn... */
        this.playerID = playerSpriteID
        this.currentLevel.name = 'overworld'
        this.levels['graveyard'] = new GameMap(graveyard)
        this.levels['graveyard'].revealed = true
        this.levels['Lich Lair'] = new GameMap(lichLair)
        this.levels['Lich Lair'].revealed = true
        this.levels['overworld'] = new GameMap(overworldMap)
        this.levels['overworld'].revealed = true
        this.levels['Orc Castle'] = new GameMap(orcCastle)
        this.levels['Orc Castle'].revealed = true
        this.map = this.levels[this.currentLevel.name]
        this.map.revealed = true
        this.playerLocation = this.map.playerLocation

        // Set up the ROT.JS game display
        // let tileSet = document.createElement('img')
        // tileSet.src = 'static/images/DawnLike/Compiled/compiled_tileset_32x32.png'
        let tileSize = 32
        // let tileMap = {}
        // /* for (let id of this.loadedIDS) { */
        // for (let id in tileset.tileproperties + this.loadedIDS) {
        // 	tileMap[id.toString()] = getTilesetCoords(id)
        // 	if (id in tileset.tileproperties) {
        // 		let properties = tileset.tileproperties[id]
        // 		if (properties.FOV) {
        // 			tileMap[properties.FOV_id] = getTilesetCoords(properties.FOV_id)
        // 		}
        // 		if (properties.animated) {
        // 			tileMap[properties.animated_id] = getTilesetCoords(properties.animated_id)
        // 		}
        // 		if (properties.animated && properties.FOV) {
        // 			tileMap[properties.animated_fov_id] = getTilesetCoords(properties.animated_fov_id)
        // 		}
        // 		if (properties.activated_id) {
        // 			tileMap[properties.activated_id] = getTilesetCoords(properties.activated_id)
        // 		}
        // 	}
        // }
        //
        this.displayOptions = {
            width: 32,
            height: 20,
            forceSquareRatio: true,
            layout: 'tile',
            // bg: "transparent",
            tileWidth: tileSize,
            tileHeight: tileSize
        }

        this.width = this.map.width < this.displayOptions.width ? this.map.width : this.displayOptions.width
        this.height = this.map.height < this.displayOptions.height ? this.map.height : this.displayOptions.height
        // this.display = new ROT.Display(this.displayOptions)
        this.display = new GameDisplay()
        this.display.loadAssets()

        this.player = new Player(this.playerLocation[0], this.playerLocation[1], this.playerID)
        this.map.actors.push(this.player) // add to the list of all actors
        this.getTile(this.player.x, this.player.y).actors.push(this.player) // also push to the tiles' actors
        this.scheduleAllActors()
        this.initializeMinimap()
        // this.drawViewPort()
        this.engine.start() // Start the engine
    },

    renderMap() {
        this.display.renderMap(this.map)
        this.targetReticle = new PIXI.Sprite(this.display.tilesetMapping[7418])
        this.targetReticle.visible = false
        this.display.background.addChild(this.targetReticle)
    },

    scheduleAllActors() {
        // Set up the ROT engine and scheduler
        this.scheduler = new ROT.Scheduler.Simple()
        this.scheduler.add(this.player, true) // Add the player to the scheduler
        this.scheduler.add(this.display, true)
        for (let i = 0; i < this.map.actors.length; i++) {
            // Some 'actor' objects do not take turns, such as ladders / items
            if (this.map.actors[i] !== this.player && this.map.actors[i] instanceof Actor) {
                this.scheduler.add(this.map.actors[i], true)
            }
        }
        this.engine = new ROT.Engine(this.scheduler) // Create new engine with the newly created scheduler
    },

    initializeMinimap() {
        /* Create a ROT.JS display for the minimap! */
        this.minimap = new ROT.Display()
        this.minimap.setOptions({
            width: this.map.width,
            height: this.map.height,
            fontSize: 2,
            spacing: 2,
            forceSquareRatio: true
        })
        this.drawMiniMap()
    },

    clearTempLog() {
        this.tempMessages.splice(0, this.tempMessages.length)
    },

    inbounds(x, y) {
        return !(x < 0 || x >= this.map.width || y < 0 || y >= this.map.height)
    },

    inViewport(x, y) {
        let cx = Game.player.x - ~~(Game.width / 2)
        let cy = Game.player.y - ~~(Game.height / 2)
        return cx <= x && x <= cx + Game.width && cy <= y && y <= cy + Game.height
    },

    changeLevels(newLevel, dir, level) {
        if (this.levels[newLevel] === undefined) {
            // generating a new random room
            if (newLevel.toLowerCase().includes('cave')) {
                this.levels[newLevel] = new GameMap(randomCave(80, 40, dir, level))
            } else {
                this.levels[newLevel] = new GameMap(randomDungeon(40, 40, dir, level))
            }
            this.levels[newLevel].revealed = false
            for (let actor of this.levels[newLevel].actors) {
                if (actor instanceof Chest) {
                    // console.log("filling chest with goodies!");
                    // we want to populate the chests with loot
                    let items = getItemsFromDropTable({
                        minItems: 1,
                        maxItems: 4,
                        dropTable: {
                            STRENGTH_POTION: 1,
                            HEALTH_POTION: 1,
                            STEEL_ARROW: 1,
                            MANA_POTION: 1,
                            SWORD: 3
                        },
                        x: actor.x,
                        y: actor.y
                    })
                    items.forEach(item => actor.addToInventory(item))
                }
            }
            // console.log(newLevel + " does not exist, so a new random instance is being created.");
        }

        this.map.playerLocation = [Game.player.x, Game.player.y]
        // Save the old map
        this.levels[this.currentLevel.name] = this.map // add the old map to 'levels'
        // Unshift player from ladder position (so that when resurfacing, no player is present)
        this.getTile(this.player.x, this.player.y).removeActor(this.player)
        // Add the new GameMap to the game
        // TODO: remove the actor from the map
        this.map.actors = this.map.actors.filter(a => a !== this.player)
        this.map = this.levels[newLevel]
        this.currentLevel.name = newLevel
        this.playerLocation = this.map.playerLocation
        this.player.placeAt(this.map.playerLocation[0], this.map.playerLocation[1])
        this.map.actors.push(this.player)
        // before drawing the viewport, we need to clear the screen of whatever was here last
        this.display.clear()
        this.width = this.map.width < this.displayOptions.width ? this.map.width : this.displayOptions.width
        this.height = this.map.height < this.displayOptions.height ? this.map.height : this.displayOptions.height
        this.scheduleAllActors()
        // Clear the last visible tiles that were available to be seen
        Object.assign(this.map.seen_tiles, this.map.visible_tiles)
        this.map.visible_tiles = {}

        // FOV calculations
        let fov = new ROT.FOV.PreciseShadowcasting((x, y) => {
            return this.inbounds(x, y) && this.getTile(x, y).visible()
        })

        fov.compute(this.player.x, this.player.y, this.player.cb.range, (x, y, r, visibility) => {
            this.map.visible_tiles[x + ',' + y] = true
        })
        this.minimap.setOptions({
            width: this.map.width,
            height: this.map.height,
            fontSize: 2,
            spacing: 2,
            forceSquareRatio: true
        })
        this.minimap.clear()
        this.drawMiniMap()
        this.renderMap()
    },

    drawMiniMap() {
        let otherActors = this.map.actors.filter(a => {
            return a instanceof Ladder || a instanceof Door
        })
        if (this.map.revealed) {
            for (let y = 0; y < this.map.height; y++) {
                for (let x = 0; x < this.map.width; x++) {
                    let tile = this.getTile(x, y)
                    if (tile.x + ',' + tile.y in this.map.visible_tiles) {
                        this.minimap.draw(x, y, ' ', tile.bg(), this.brightenColor(tile.bg()))
                    } else {
                        this.minimap.draw(x, y, ' ', tile.bg(), tile.bg())
                    }
                }
            }

            for (let a of otherActors) {
                this.minimap.draw(a.x, a.y, ' ', a.fg, a.bg)
            }
        } else {
            for (let y = 0; y < this.map.height; y++) {
                for (let x = 0; x < this.map.width; x++) {
                    let tile = this.getTile(x, y)
                    if (tile.x + ',' + tile.y in this.map.visible_tiles) {
                        this.minimap.draw(x, y, ' ', tile.bg(), this.brightenColor(tile.bg()))
                    } else if (tile.x + ',' + tile.y in this.map.seen_tiles) {
                        this.minimap.draw(x, y, ' ', tile.bg(), tile.bg())
                    }
                }
            }
            for (let a of otherActors) {
                if (a.x + ',' + a.y in this.map.seen_tiles) {
                    this.minimap.draw(a.x, a.y, ' ', a.fg, a.bg)
                }
            }
        }
        // Draw the actor in the mini-map
        this.minimap.draw(this.player.x, this.player.y, ' ', 'yellow', 'yellow')
    },

    brightenColor(color) {
        // console.log(color);
        let hsl_color = ROT.Color.rgb2hsl(ROT.Color.fromString(color))
        hsl_color[2] *= 1.25
        return ROT.Color.toRGB(ROT.Color.hsl2rgb(hsl_color))
    },

    getNearbyEnemies() {
        let camera = {
            // camera x,y resides in the upper left corner
            x: this.player.x - ~~(Game.width / 2),
            y: this.player.y - ~~(Game.height / 2),
            width: Math.ceil(Game.width),
            height: Game.height
        }
        let startingPos = [camera.x, camera.y]
        if (camera.x < 0) {
            // far left
            startingPos[0] = 0
        }
        if (camera.x + camera.width > Game.map.width) {
            // far right
            startingPos[0] = Game.map.width - camera.width
        }
        if (camera.y <= 0) {
            // at the top of the map
            startingPos[1] = 0
        }
        if (camera.y + camera.height > Game.map.height) {
            // at the bottom of the map
            startingPos[1] = Game.map.height - camera.height
        }
        this.camera = {
            x: startingPos[0],
            y: startingPos[1]
        }
        let endingPos = [startingPos[0] + camera.width, startingPos[1] + camera.height]
        let dx = 0
        let dy = 0
        let actors = []
        for (let x = startingPos[0]; x < endingPos[0]; x++) {
            for (let y = startingPos[1]; y < endingPos[1]; y++) {
                let tile = this.getTile(x, y)
                // if (tile.x + ',' + tile.y in this.map.visible_tiles) {
                actors = actors.concat(tile.actors)
                // }

                // if (this.map.revealed) {
                //     actors = actors.concat(tile.actors);
                // } else {
                //     if (tile.x + "," + tile.y in this.map.visible_tiles)
                //         actors = actors.concat(tile.actors);
                // }
            }
            dx++
            dy = 0
        }
        let enemies = actors.filter(actor => {
            return actor.cb !== undefined && actor.cb.hostile
        })

        // we sort the enemies closest to farthest away
        return enemies.sort((a1, a2) => {
            if (a1.distanceTo(this.player) < a2.distanceTo(this.player)) {
                return -1
            } else if (a2.distanceTo(this.player) < a1.distanceTo(this.player)) {
                return 1
            } else {
                return 0
            }
        })
    },

    getClosestEnemyToPlayer() {
        return this.getNearbyEnemies()[0]
    },

    clearSelectedTile() {
        this.selectedTile = null
        this.pathToTarget = {}
        this.clearTempLog() // clear the temporary log which describes the tile we're on
        this.targetReticle.visible = false
    },

    changeSelectedTile(tile) {
        this.selectedTile = tile
        let { x, y } = tile
        let blockedTile = this.selectedTile.blocked() || this.map.visible_tiles[x + ',' + y] === undefined
        // highlighting the path from the player to the target reticle using bresenham line algorithm
        /* https://rosettacode.org/wiki/Bitmap/Bresenham%27s_line_algorithm#JavaScript */
        this.pathToTarget = {}
        if (!blockedTile) {
            let x0 = this.player.x,
                x1 = this.selectedTile.x,
                y0 = this.player.y,
                y1 = this.selectedTile.y,
                dx = Math.abs(x1 - x0),
                sx = x0 < x1 ? 1 : -1,
                dy = Math.abs(y1 - y0),
                sy = y0 < y1 ? 1 : -1,
                err = (dx > dy ? dx : -dy) / 2
            while (!(x0 === x1 && y0 === y1)) {
                this.pathToTarget[x0 + ',' + y0] = true
                let e2 = err
                if (e2 > -dx) {
                    err -= dy
                    x0 += sx
                }
                if (e2 < dy) {
                    err += dx
                    y0 += sy
                }
            }
            this.pathToTarget[x0 + ',' + y0] = true
            this.pathToTarget[this.player.x + ',' + this.player.y] = false
        }
        this.targetReticle.visible = true
        this.targetReticle.position.set(tile.x * this.display.tileSize, tile.y * this.display.tileSize)
        this.describeSelectedTile()

        return !blockedTile
    },

    selectNearestEnemyTile() {
        this.clearSelectedTile()
        let enemy = this.getClosestEnemyToPlayer()
        if (enemy !== undefined) {
            let { x, y } = enemy
            return this.changeSelectedTile(this.getTile(x, y))
        } else {
            return false
        }
    },

    cycleThroughSelectableEnemies() {
        if (this.enemyCycle === null) {
            this.enemyCycle = this.getNearbyEnemies()
            this.enemyCycleIndex = 0
        }
        // if there's more than one enemy, we can cycle to the next closest enemy
        if (this.enemyCycle.length > 1) {
            this.clearSelectedTile()
            this.enemyCycleIndex += 1
            if (this.enemyCycleIndex === this.enemyCycle.length) {
                this.enemyCycleIndex = 0
            }

            let newTarget = this.enemyCycle[this.enemyCycleIndex]
            return this.changeSelectedTile(this.getTile(newTarget.x, newTarget.y))
        }
    },

    describeSelectedTile() {
        /* Returns an array of strings describing what exists on the currently selected tile.
        this can be obstacles, items, traps, or enemies */
        let { actors } = this.selectedTile
        let names = actors
            .filter(a => {
                return a instanceof Entity && a !== this.player
            })
            .map(a => {
                return a instanceof Item ? a.type.toLowerCase() : a.name.toLowerCase()
            })
        let prettyNames = []
        prettyNames = names.slice(1, -1).reduce((buf, str) => {
            return buf + ', a ' + str
        }, 'a  ' + names.slice(0, 1))

        if (names.length > 1) {
            prettyNames = prettyNames + [` and a ${names.slice(-1)}`]
        } else if (names.length == 0) {
            prettyNames = 'nothing'
        }

        if ((Game.player.targeting || Game.player.casting) && this.selectedTile !== null) {
            let inView = Game.map.data[this.selectedTile.y][this.selectedTile.x].actors.some(obs => {
                return obs.id === untargetableBorders.id
            })
                ? ' This tile is out of range or blocked.'
                : ''
            this.log(`[You see ${prettyNames} here.${inView}]`, 'player_move', true)
        } else {
            this.log(`[You see ${prettyNames} here.]`, 'player_move', true)
        }
    },

    getTile(x, y) {
        return this.map.data[y][x]
    },

    printPlayerTile() {
        console.log(Game.map.data[this.player.y][this.player.x])
    },

    eventToTile() {
        let { x, y } = this.display.app.renderer.plugins.interaction.mouse.global
        let camera = {
            // camera x,y resides in the upper left corner
            x: Game.player.x - ~~(Game.width / 2),
            y: Game.player.y - ~~(Game.height / 2) - 1
        }
        let dx = camera.x + ~~(x / this.display.tileSize)
        let dy = camera.y + ~~(y / this.display.tileSize)
        if (this.inbounds(dx, dy)) return this.getTile(dx, dy)
        else return null
    },

    log(message, type, tmp = false) {
        let message_color = {
            defend: 'lightblue',
            magic: '#3C1CFD',
            attack: 'red',
            death: 'crimson',
            information: 'yellow',
            player_move: 'grey',
            level_up: 'green',
            alert: 'orange'
        }
        let color = type in message_color ? message_color[type] : type
        if (tmp) this.tempMessages.splice(0, 1, [message, color])
        else this.messageHistory.push([message, color])
    }
}
