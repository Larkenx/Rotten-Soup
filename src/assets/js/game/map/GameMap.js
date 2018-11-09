import { Game, tileset } from '#/Game.js'
import Tile, { getTileInfo } from '#/map/Tile.js'
import { createActor, createItem } from '#/utils/EntityFactory.js'
import { getRandomInt } from '#/utils/HelperFunctions.js'

import DIALOGUES from '#/utils/Dialogues.js'

export function createMapFromJSON(json, name) {
	let { layers, width, height } = json
	let gameMap = new GameMap(width, height, name)
	gameMap.createFromJSON(json)
	gameMap.revealed = true
	gameMap.type = 'static'
	return gameMap
}

/**
 * Created by Larken on 6/28/2017.
 */
export class GameMap {
	constructor(width, height, name) {
		this.name = name
		this.loadedIDS = []
		this.playerLocation = null // this field is used exclusively for saving the player's last location before they change levels
		this.width = width
		this.height = height
		this.data = new Array(this.height) // stores all tiles in the game
		this.visible_tiles = {}
		this.seen_tiles = {}
		this.visited = false
		this.dungeon = null
		// Intialize all of the tiles...
		for (let i = 0; i < this.height; i++) {
			this.data[i] = new Array(this.width)
			for (let j = 0; j < this.width; j++) {
				this.data[i][j] = new Tile(j, i)
			}
		}
		// Process all of the json layers
		// process the group layers last. this is specifically for placing static itemsets into treasure chests in the overworld.
		// process it last so that all of the chest entities have been created already
	}

	getActors() {
		let actors = []
		for (let row of this.data) {
			for (let tile of row) {
				actors = actors.concat(tile.actors)
			}
		}
		return actors
	}

	getTile(x, y) {
		return this.data[y][x]
	}

	createFromJSON({ layers }) {
		let itemLayers = []
		let portalLayers = []
		for (let layer of layers) {
			if (layer.type === 'tilelayer') this.processTileLayer(layer)
			else if (layer.type === 'objectgroup') this.processObjectGroupLayer(layer)
			else throw 'A layer has been added to the map and is invalid'
		}
	}

	processTileLayer(layer) {
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				// Grabs the ID from the layer
				let id = layer.data[i * this.width + j] - 1
				if (id > 1) {
					Game.loadedIDS.push(id)
					this.data[i][j].updateTileInfo(id)
				}
			}
		}
	}

	createActorFromObject(object) {
		const { gid, x, y, properties } = object
		if (properties.entity_type === undefined) {
			console.error(`No entity type given in properties for object ${object}`)
			return
		}
		const { entity_type } = properties
		let nx = x / 32
		let ny = y / 32 - 1 // for some reason, TILED objects y position are 1-indexed..?
		let entity = properties.item ? createItem(entity_type, nx, ny, gid - 1) : createActor(entity_type, nx, ny, gid - 1)
		if (properties.item) entity.inInventory = false
		if (properties.items !== undefined) {
			let items = properties.items.split(',').map(i => createItem(i.trim(), nx, ny))
			items.forEach(item => entity.addToInventory(item))
		}
		/* Post entity creation clean up... */
		if (entity_type === 'NPC') {
			// add NPC routines if any exist...
			// NPCs may have items too!
			entity.wanders = properties.wanders
			if (properties.dialog !== undefined) {
				const dialogID = properties.dialog
				if (dialogID in DIALOGUES) {
					entity.dialogData = DIALOGUES[dialogID]
					entity.dialogBubbleEnabled = 'dialogBubbleEnabled' in properties ? properties.dialogBubbleEnabled : true
					if ('bubbleData' in properties) {
						let [id, animated_id] = properties.bubbleData.split(',')
						entity.bubbleData = { id, animated_id }
					} else {
						entity.bubbleData = null
					}
				}
			}
		} else if (entity_type === 'LADDER' || entity_type === 'LEVEL_TRANSITION') {
			// ladders & level transitions have portal ID's
			entity.portal = properties.portalID
			entity.createDungeon = properties.createDungeon
			if (entity_type === 'LADDER') entity.direction = properties.direction
		}
		this.getTile(nx, ny).actors.push(entity)
	}

	processObjectGroupLayer(layer) {
		// for each object, there is one entity to add to the map
		for (let object of layer.objects) {
			if (object.properties.entity_type === 'PLAYER') {
				this.playerLocation = [object.x / 32, object.y / 32 - 1] // for some reason, TILED objects y position are 1-indexed..?
			} else {
				this.createActorFromObject(object)
			}
		}
	}

	toASCII() {
		return this.data.map(r => {
			return r.map(tile => {
				if (tile.actors.length > 0) {
					let firstActor = tile.actors.slice(-1)[0]
					if (firstActor.name.includes('ladder')) return '>'
					if (firstActor.name.includes('door')) return '/'
					if (firstActor.name.includes('chest')) return '$'

					return firstActor.name.charAt(0).toLowerCase()
				} else {
					for (let o of tile.obstacles.reverse()) {
						if (o.description !== undefined) {
							if (o.description.includes('wall')) return '#'
							if (o.description.includes('floor') || o.description.includes('dirt')) return ' '
							if (o.description.includes('carpet')) return '.'
							if (o.description.includes('grass')) return [',', '.', ';', '`'][getRandomInt(0, 3)]
							if (o.description.includes('tree')) return '♠'
							return o.description.charAt(0).toLowerCase()
						}
					}
					return ' '
				}
			})
		})
	}

	toString() {
		return this.toASCII().reduce((p, c) => {
			return `${p}\n${c.join('')}`
		}, '')
	}

	mapTiles(fn) {
		return this.data.map(row => {
			return row.map(tile => fn(tile))
		})
	}
}
