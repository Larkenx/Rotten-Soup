import { Game } from '#/Game.js'
import { verifyProps } from '#/utils/HelperFunctions'

export class Entity {
	constructor(config) {
		verifyProps(config, ['entityType'])
		Object.assign(this, config)
	}

	move(nx, ny) {
		let ntile = Game.tileAt(nx, ny) // new tile to move to
		let ctile = Game.tileAt(this.x, this.y) // current tile
		this.x = nx
		this.y = ny
		ctile.removeActor(this) // remove this actor from this tile
		ntile.actors.push(this) // add this actor to the new tile
	}

	placeAt(nx, ny) {
		let ntile = Game.getTile(nx, ny) // new tile to move to
		ntile.actors.push(this) // add this actor to the new tile
		this.x = nx
		this.y = ny
	}
}
