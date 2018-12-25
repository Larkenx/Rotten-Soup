import ROT from 'rot-js'
import * as PIXI from 'pixi.js'
import loadResources from '#/ResourceLoader.js'
import { createMapFromJSON } from '#/map/GameMap.js'
import GameDisplay from '#/GameDisplay.js'
import { Actor } from '#/entities/actors/Actor.js'
import { Entity } from '#/entities/Entity.js'
import { addPrefix } from '#/utils/HelperFunctions.js'
import EventStream from '#/utils/EventStream.js'
import PlayerController from '#/utils/PlayerController.js'
import Item from '#/entities/items/Item.js'
import Player from '#/entities/actors/Player.js'
import MapGen from '#/map/generation/index.js'
import Ladder from '#/entities/misc/Ladder.js'
import LevelTransition from '#/entities/misc/LevelTransition.js'
import { generatePrefabs } from '#/map/Prefab.js'

PIXI.utils.skipHello()

const { randomSimplexMap, randomDungeon, randomCave } = MapGen
const defaultMinimapConfiguration = {
	width: 45,
	height: 35,
	fontSize: 7,
	spacing: 0.5,
	forceSquareRatio: true
}
export let Game = {
	app: null,
	overview: null,
	dialogController: null,
	eventStream: null,
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
	loaded: false,
	levels: {},
	currentLevel: { name: 'Mulberry Town', depth: 0 },
	map: null,
	messageHistory: [],
	tempMessages: [],
	minimap: null,
	selectedTile: null,
	selectedTileMessagePrepend: '',
	pathToTarget: {},
	targetReticle: null,
	enemyCycle: null,
	enemyCycleIndex: 0,
	userSettings: { hpBars: true, animationsEnabled: true },
	overlayData: {
		visible: false,
		component: null,
		dialogue: {}
	},

	init(playerSpriteID, options) {
		this.playerID = playerSpriteID
		this.player = new Player(0, 0, playerSpriteID)
		this.eventStream = new EventStream()
		this.displayOptions = {
			width: 32,
			height: 20,
			forceSquareRatio: true,
			layout: 'tile',
			// bg: "transparent",
			tileWidth: 32,
			tileHeight: 32
		}
		this.minimapOptions = { ...defaultMinimapConfiguration }
		let onceLoaded = resources => {
			this.levels['Mulberry Town'] = createMapFromJSON(resources['mulberryTown'].data, 'Mulberry Town')
			this.levels['Mulberry Forest'] = createMapFromJSON(resources['mulberryForest'].data, 'Mulberry Forest')
			this.levels['Mulberry Graveyard'] = createMapFromJSON(resources['mulberryGraveyard'].data, 'Mulberry Graveyard')
			this.levels['Lich Lair'] = createMapFromJSON(resources['lichLair'].data, 'Lich Lair')
			this.levels['Loot Goblin Lair'] = createMapFromJSON(resources['lootGoblinLair'].data, 'Loot Goblin Lair')
			this.map = this.levels[this.currentLevel.name]
			this.width = this.map.width < this.displayOptions.width ? this.map.width : this.displayOptions.width
			this.height = this.map.height < this.displayOptions.height ? this.map.height : this.displayOptions.height
			this.minimapOptions.width = this.map.width < this.minimapOptions.width ? this.map.width : this.minimapOptions.width
			this.minimapOptions.height = this.map.height < this.minimapOptions.height ? this.map.height : this.minimapOptions.height
			let [px, py] = this.map.playerLocation
			this.player.placeAt(px, py)
			this.scheduleAllActors()
			this.initializeMinimap()
			if (!options.testing) {
				document.getElementById('game_container').appendChild(this.display.getContainer())
				document.getElementById('minimap_container').appendChild(this.minimap.getContainer())
			}
			this.engine.start()
			this.renderMap()
			// this.changeLevels('Mulberry Forest', true)
			// Game.map.revealed = true
			// this.player.placeAt(0, 0)
			// this.display.app.stage.scale.x = this.display.app.stage.scale.y = 0.625
			// this.renderMap()
		}
		let { width, height } = options
		this.display = new GameDisplay(width, height)
		let resourceLoaderCallbacks = [
			generatePrefabs,
			resources => this.display.loadAssets(resources, onceLoaded, options.additionalCallback)
		]
		loadResources(resourceLoaderCallbacks)
	},

	renderMap() {
		this.display.renderMap(this.map)
		this.targetReticle = new PIXI.Sprite(this.display.tilesetMapping[7418])
		this.targetReticle.visible = false
		this.display.background.addChild(this.targetReticle)
	},

	findActor(type, id) {
		return this.map.getActors().filter(a => {
			return a instanceof type && a.id === id
		})
	},

	scheduleAllActors() {
		// Set up the ROT engine and scheduler
		this.scheduler = new ROT.Scheduler.Simple()
		// this.scheduler.add(new PlayerController(), true) // Add the player to the scheduler
		this.scheduler.add(this.player, true) // Add the player to the scheduler
		this.scheduler.add(this.display, true)
		let actors = this.map.getActors()
		for (let actor of actors) {
			if (actor.seenTiles) actor.seenTiles = []
			// Some 'actor' objects do not take turns, such as ladders / items
			if (actor !== this.player && actor instanceof Actor) {
				this.scheduler.add(actor, true)
				// if the actor is goal driven, clear their current goals
				if (actor.subscribeToEventStream) actor.clearGoals()
			}
		}
		// emit a new spawned event when each actor gets loaded in
		actors.forEach(actor => this.eventStream.emit('EntitySpawnedEvent', { entity: actor }))
		this.engine = new ROT.Engine(this.scheduler) // Create new engine with the newly created scheduler
	},

	initializeMinimap() {
		/* Create a ROT.JS display for the minimap! */
		this.minimap = new ROT.Display()
		this.minimap.setOptions(this.minimapOptions)
		this.drawMiniMap()
	},

	clearTempLog() {
		this.tempMessages.splice(0, this.tempMessages.length)
	},

	inbounds(x, y) {
		return this.map.inbounds(x, y)
	},

	inViewport(x, y) {
		let width = ~~(Game.display.width / 2 / 32)
		let height = ~~(Game.display.height / 2 / 32)
		let cx = Game.player.x - width
		let cy = Game.player.y - height
		return cx <= x && x <= cx + Game.display.width / 32 && cy <= y && y <= cy + Game.display.height / 32
	},

	createDungeonFloors(origin, dungeonName, numberOfFloors) {
		this.levels[dungeonName + 1] = randomDungeon(64, 40, {
			dungeonName,
			lastDungeon: false,
			fromPortal: origin,
			toPortal: dungeonName + 2,
			level: 1,
			addPrefabs: true,
			addEntities: true
		})
		for (let depth = 2; depth < numberOfFloors; depth++) {
			let options = {
				dungeonName,
				lastDungeon: false,
				fromPortal: dungeonName + (depth - 1),
				toPortal: dungeonName + (depth + 1),
				level: depth,
				addPrefabs: true,
				addEntities: true
			}
			this.levels[dungeonName + depth] = randomDungeon(64, 40, options)
		}
		this.levels[dungeonName + numberOfFloors] = randomDungeon(64, 40, {
			dungeonName,
			lastDungeon: true,
			fromPortal: dungeonName + (numberOfFloors - 1),
			toPortal: origin,
			level: numberOfFloors,
			addPrefabs: true,
			addEntities: true
		})
	},

	changeLevels(mapID, dungeon = false) {
		this.minimapOptions = { ...defaultMinimapConfiguration }
		let nextMap = this.levels[mapID]
		if (dungeon === true && !(mapID + 1 in this.levels)) {
			this.createDungeonFloors(this.currentLevel.name, mapID, 5)
			nextMap = this.levels[mapID + 1]
		} else if (dungeon === true) {
			nextMap = this.levels[mapID + 1]
		}
		// Maps can be either a series of dungeons, or a single 'unconnected' map
		// save the player's location on this map
		this.map.playerLocation = [Game.player.x, Game.player.y]
		// Save the old map
		if (this.map.type === 'dungeon') {
			this.levels[this.currentLevel.name + this.currentLevel.depth] = this.map // add the old map to 'levels'
		} else {
			this.levels[this.currentLevel.name] = this.map // add the old map to 'levels'
		}
		// Unshift player from ladder position (so that when resurfacing, no player is present)
		this.getTile(this.player.x, this.player.y).removeActor(this.player)
		for (let a of this.map.getActors()) {
			this.display.clearSprite(a)
		}
		this.map = nextMap
		this.currentLevel.name = nextMap.name
		this.currentLevel.depth = nextMap.depth !== undefined ? nextMap.depth : 0
		this.playerLocation = this.map.playerLocation
		if (!nextMap.visited && nextMap.type === 'dungeon') {
			nextMap.visited = true
			this.player.cb.dungeonsExplored++
		}
		// before drawing the viewport, we need to clear the screen of whatever was here last
		this.display.clear()
		this.width = this.map.width < this.displayOptions.width ? this.map.width : this.displayOptions.width
		this.height = this.map.height < this.displayOptions.height ? this.map.height : this.displayOptions.height
		this.minimapOptions.width = this.map.width < this.minimapOptions.width ? this.map.width : this.minimapOptions.width
		this.minimapOptions.height = this.map.height < this.minimapOptions.height ? this.map.height : this.minimapOptions.height
		this.player.placeAt(this.playerLocation[0], this.playerLocation[1])
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
		this.minimap.setOptions(this.minimapOptions)
		this.minimap.clear()
		this.drawMiniMap()
		this.renderMap()
	},

	drawMiniMap() {
		this.minimap.clear()

		let camera = {
			// camera x,y resides in the upper left corner
			x: this.player.x - ~~(this.minimapOptions.width / 2),
			y: this.player.y - ~~(this.minimapOptions.height / 2),
			width: this.minimapOptions.width,
			height: this.minimapOptions.height
		}
		let startingPos = [camera.x, camera.y]
		if (camera.x < 0) {
			startingPos[0] = 0
		}
		if (camera.x + camera.width >= this.map.width) {
			startingPos[0] = this.map.width - camera.width
		}
		if (camera.y <= 0) {
			startingPos[1] = 0
		}
		if (camera.y + camera.height >= this.map.height) {
			startingPos[1] = this.map.height - camera.height
		}
		let endingPos = [startingPos[0] + camera.width, startingPos[1] + camera.height]
		let dx = 0
		let dy = 0
		for (let x = startingPos[0]; x < endingPos[0]; x++) {
			for (let y = startingPos[1]; y < endingPos[1]; y++) {
				if (this.inbounds(x, y)) {
					if (this.map.revealed || this.map.visible_tiles[x + ',' + y] || this.map.seen_tiles[x + ',' + y]) {
						let tile = this.getTile(x, y)
						const bg = tile.x + ',' + tile.y in this.map.visible_tiles ? this.brightenColor(tile.bg()) : tile.bg()
						this.minimap.draw(dx, dy, ' ', tile.bg(), bg)
						for (let a of tile.actors) {
							if (a.bg !== undefined) this.minimap.draw(dx, dy, '●', a.bg, bg)
						}
					}
				}
				dy++
			}
			dy = 0
			dx++
		}
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
		camera = {
			x: startingPos[0],
			y: startingPos[1],
			xend: startingPos[0] + camera.width,
			yend: startingPos[1] + camera.height
		}
		let enemies = this.map.getActors().filter(actor => {
			return (
				actor.cb &&
				actor.cb.hostile &&
				actor.x >= camera.x &&
				actor.x <= camera.xend &&
				actor.y >= camera.y &&
				actor.y <= camera.yend
			)
		})
		// we sort the enemies closest to farthest away
		return enemies.sort((a, b) => {
			let aDistance = a.distanceTo(this.player)
			let bDistance = b.distanceTo(this.player)
			if (aDistance < bDistance) {
				return -1
			} else if (bDistance < aDistance) {
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
		this.selectedTileMessagePrepend = ''
	},

	changeSelectedTile(tile, messagePrepend = '') {
		if (messagePrepend !== '') this.selectedTileMessagePrepend = messagePrepend
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

	selectNearestEnemyTile(messagePrepend = '') {
		if (messagePrepend !== '') this.selectedTileMessagePrepend = messagePrepend
		this.clearSelectedTile()
		let enemy = this.getClosestEnemyToPlayer()
		if (enemy !== undefined) {
			let { x, y } = enemy
			return this.changeSelectedTile(this.getTile(x, y), messagePrepend)
		} else {
			return false
		}
	},

	cycleThroughSelectableEnemies() {
		if (this.enemyCycle === null) {
			this.enemyCycle = this.getNearbyEnemies().filter(e => `${e.x},${e.y}` in this.map.visible_tiles)
			this.enemyCycleIndex = 0
		} else {
			this.enemyCycleIndex += 1
			if (this.enemyCycleIndex === this.enemyCycle.length) {
				this.enemyCycleIndex = 0
			}
		}
		// if there's more than one enemy, we can cycle to the next closest enemy
		let newTarget = this.enemyCycle[this.enemyCycleIndex]
		return this.changeSelectedTile(this.getTile(newTarget.x, newTarget.y))
	},

	describeSelectedTile() {
		/* Returns an array of strings describing what exists on the currently selected tile.
        this can be obstacles, items, traps, or enemies */
		let { actors, obstacles } = this.selectedTile
		let names = actors
			.filter(a => {
				return a instanceof Entity && a !== this.player
			})
			.map(a => {
				return a instanceof Item ? a.type.toLowerCase() : a.name.toLowerCase()
			})

		let obstacleDescriptions = obstacles.map(o => o.description).filter(o => o !== undefined)
		if (obstacleDescriptions.length > 0) names.push(obstacleDescriptions.slice(-1)[0])
		let prettyNames = 'nothing'
		if (names.length === 1) {
			prettyNames = addPrefix(names.slice(0, 1)[0])
		} else if (names.length > 1) {
			prettyNames = names.slice(1, -1).reduce((buf, str) => {
				return buf + ', ' + addPrefix(str)
			}, addPrefix(names.slice(0, 1)[0]))

			prettyNames = prettyNames + ` and ${addPrefix(names.slice(-1)[0])}`
		}

		if ((Game.player.targeting || Game.player.casting) && this.selectedTile !== null) {
			const { x, y } = this.selectedTile
			let visible = x + ',' + y in this.map.visible_tiles && !this.getTile(x, y).obstacles.some(o => o.blocked)
			let inView = !visible ? ' This tile is out of range or blocked.' : ''
			this.log(`[${this.selectedTileMessagePrepend}You see ${prettyNames} here.${inView}]`, 'player_move', true)
		} else {
			this.log(`[${this.selectedTileMessagePrepend}You see ${prettyNames} here.]`, 'player_move', true)
		}
	},

	getTile(x, y) {
		return this.map.getTile(x, y)
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
			magic: '#6757c6',
			attack: 'red',
			death: 'crimson',
			information: 'yellow',
			player_move: '#878787',
			level_up: 'green',
			alert: 'orange'
		}
		let color = type in message_color ? message_color[type] : type
		if (tmp) this.tempMessages.splice(0, 1, [message, color])
		else this.messageHistory.push([message, color])
	},
	/* Testing Functions */
	getNearestLadder(direction = 'down') {
		let ladders = this.map.getActors().filter(a => a instanceof Ladder && a.direction === direction)
		if (ladders.length > 0) return ladders[0]
		else return null
	},

	getNearestLevelTransition() {
		let levelTransitions = this.map.getActors().filter(a => a instanceof LevelTransition)
		if (levelTransitions.length > 0) return levelTransitions[0]
		else return null
	},

	closeGameOverlayScreen() {
		this.overlayData.component = null
		this.overlayData.visible = false
	},

	openSpellbook() {
		this.overlayData.component = 'spellbook'
		this.overlayData.visible = true
		this.player.initializeSelectedSpell()
	},

	openInventory() {
		this.overlayData.component = 'inventory-equipment-view'
		this.overlayData.visible = true
		this.player.initializeSelectedItem()
	},

	openNPCDialog(dialogue) {
		this.overlayData.visible = true
		this.overlayData.component = 'npc-dialogue'
		this.overlayData.dialogue = dialogue
		this.overlayData.dialogue.init(this, this.overlayData.dialogue)
		// this.overlayData.dialogue.initializeOrigin()
	},

	getValidPlaceableTilesForMap(mapIdentifier, x1, y1, x2, y2) {
		let map = this.levels[mapIdentifier]
		let validTiles = []
		for (let x = x1; x <= x2; x++) {
			for (let y = y1; y <= y2; y++) {
				let tile = map.data[y][x]
				if (!tile.blocked() && tile.actors.length === 0) {
					validTiles.push(tile)
				}
			}
		}
		return validTiles
	}
}
