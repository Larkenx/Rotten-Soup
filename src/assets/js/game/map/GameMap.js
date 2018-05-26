import { Game, tileset } from '#/Game.js'
import Tile, { getTileInfo } from '#/map/Tile.js'
import { createActor, createItem } from '#/utils/EntityFactory.js'

export function createMapFromJSON(json) {
	let { layers, width, height } = json
	let gameMap = new GameMap(width, height)
	gameMap.createFromJSON(json)
	gameMap.revealed = true
	return gameMap
}
/**
 * Created by Larken on 6/28/2017.
 */
export class GameMap {
	constructor(width, height) {
		this.loadedIDS = []
		this.playerLocation = null // this field is used exclusively for saving the player's last location before they change levels
		this.width = width
		this.height = height
		this.actors = [] // store all of the actors in array
		this.data = new Array(this.height) // stores all tiles in the game
		this.visible_tiles = {}
		this.seen_tiles = {}
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
		let actor = createActor(entity_type, nx, ny, gid - 1)
		/* Post actor creation clean up... */
		if (entity_type === 'NPC') {
			// add NPC routines if any exist...
			// NPCs may have items too!
		} else if (entity_type === 'LADDER' || entity_type === 'LEVEL_TRANSITION') {
			// ladders & level transitions have portal ID's
			actor.portal = properties.portalID
		} else if (entity_type === 'CHEST') {
			// chests have items as a comma delimited string
			let items = properties.items.split(',').map(i => createItem(i, nx, ny))
			items.forEach(item => actor.addToInventory(item))
		}
		this.actors.push(actor)
		this.getTile(nx, ny).actors.push(actor)
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

	processItemLayer(layer) {
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				let id = layer.data[i * this.width + j] - 1 // grab the id in the json data
				if (id > 1) {
					// id of zero indicates no actor in this spot
					Game.loadedIDS.push(id)
					let properties = getTileInfo(id)
					if (properties.entity !== true) throw 'Bad entity creation for tile ' + id
					let newActor = createEntity(j, i, properties.entity_id, id)
					this.actors.push(newActor) // add to the list of all actors
					this.findActor(j, i).addToInventory(newActor)
				}
			}
		}
	}

	processPortalLayer(layer) {
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				let id = layer.data[i * this.width + j] - 1 // grab the id in the json data
				if (id > 1) {
					// id of zero indicates no actor in this spot
					Game.loadedIDS.push(id)
					let properties = getTileInfo(id)
					// now we've got a portal cell that tells us where a ladder should lead
					// find the ladder at this location
					let ladders = this.data[i][j].actors.filter(a => {
						return a instanceof Ladder || a instanceof LevelTransition // throwing in condition that it can also be level transition
					})
					if (ladders.length === 0) {
						throw 'tried to create a portal link for a ladder or level transition but neither was found'
					} else {
						ladders[0].portal = properties.level
					}
				}
			}
		}
	}

	print() {
		let buf = ''
		for (let i = 0; i < this.height; i++) {
			let row = ''
			for (let j = 0; j < this.width; j++) row += this.data[i][j].symbol //+ " ";
			buf += row + '\n'
		}

		for (let i = 0; i < this.actors.length; i++) {
			let actor = this.actors[i]
			/* to calculate where the actor should go, we have to consider
             the new line character in each line of the buffer, which is equal
             to the actor's y coord. */
			let index = actor.y * this.width + actor.x + actor.y
			buf = buf.substr(0, index) + actor.symbol + buf.substr(index + 1)
		}
		console.log(buf)
	}

	findActor(x, y) {
		let chests = this.data[y][x].actors.filter(a => {
			return a instanceof Chest
		})
		// if there are no chests, then that means we need to find an actor who should have all of the items added to
		if (chests.length === 0) {
			let possibleActors = this.data[y][x].actors
			if (possibleActors.length === 0) throw `There's no actor in which an item can be placed at (${x},${y})`
			return possibleActors[0]
		} else {
			return chests[0]
		}
	}

	/* Returns the tiles adjacent to the given tile */
	adjTiles(tile) {
		let adjacentTiles = []
		for (let dist of ROT.DIRS[8]) {
			let nx = tile.x + dist[0]
			let ny = tile.y + dist[1]
			if (!(nx < 0 || nx === this.width || ny < 0 || ny === this.height)) adjacentTiles.push(this.data[ny][nx])
		}
		return adjacentTiles
	}
}
