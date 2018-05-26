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
			actor.wanders = properties.wanders
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
}
