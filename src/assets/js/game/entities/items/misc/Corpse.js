import { Entity } from '#/entities/Entity.js'
import { Game } from '#/Game.js'
// import Skeleton from "#/entities/actors/enemies/Skeleton.js";
// import Zombie from "#/entities/actors/enemies/Zombie.js";

export const corpseTypes = {
	SKELETON: 5489,
	HUMANOID: 2647
}

export class Corpse extends Entity {
	constructor(x, y, name, id) {
		super(x, y, {
			id,
			name: name.toLowerCase() === 'skeleton' ? 'pile of bones' : `${name.capitalize()} Corpse`,
			blocked: false,
			visible: true
		})
		this.rotten = false
		this.turns = 0
	}

	act() {
		Game.engine.lock()
		this.turns++
		// corpse has rotted after 40 turns
		if (this.turns >= 40) {
			let idx = Game.engine._scheduler.remove(this)
			let ctile = Game.map.data[this.y][this.x]
			// remove this actor from the global actors list and the occupied tile
			ctile.removeActor(this)
			idx = Game.map.actors.indexOf(this)
			Game.map.actors.splice(idx, 1)
		}
		Game.engine.unlock()
	}

	hoverInfo() {
		return ''
	}
}
