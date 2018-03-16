import { Game } from '#/Game.js'

export let xp_levels = [50]
for (let i = 1; i < 100; i++) xp_levels.push(1.5 * xp_levels[i - 1])

/* Entities are in-game objects that exist in the map. They have symbols,
 * foregrounds, backgrounds, descriptions, names, visibility, and blocked properties. */
export class Entity {
	constructor(x, y, options) {
		this.x = x
		this.y = y
		Object.assign(this, options)
		if (options.id === undefined) throw 'Error - entity created without valid id'
	}

	setSprite(sprite) {
		this.sprite = sprite
	}

	move(nx, ny) {
		let ntile = Game.map.data[ny][nx] // new tile to move to
		let ctile = Game.map.data[this.y][this.x] // current tile
		ctile.removeActor(this) // remove this actor from this tile
		ntile.actors.push(this) // add this actor to the new tile
		this.x = nx // update x,y coords to new coords
		this.y = ny
		// this.sprite.position.set(this.x * 32, this.y * 32)
		ctile.createTexturesFromObstacles()
		ntile.createTexturesFromObstacles()
		// Game.drawActor(this); // draw the actor at the new spot
		// Game.drawViewPort();
		// Game.drawMiniMap();
	}

	placeAt(nx, ny) {
		let ntile = Game.map.data[ny][nx] // new tile to move to
		ntile.actors.push(this) // add this actor to the new tile
		this.x = nx // update x,y coords to new coords
		this.y = ny
	}
}
