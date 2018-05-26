/**
 * Created by larken on 7/12/17.
 */

import { Actor } from '#/entities/actors/Actor.js'
import { getRandomInt } from '#/utils/HelperFunctions'

import ROT from 'rot-js'

export default class NPC extends Actor {
	constructor(x, y, id) {
		super(x, y, {
			id: id,
			name: 'non-player character',
			visible: true,
			blocked: true,
			combat: {
				hostile: false
			}
		})
		this.wanders = false
	}

	act() {
		Game.engine.lock()
		if (this.wanders && getRandomInt(1, 2) === 1) {
			let dx = this.x + getRandomInt(-1, 1)
			let dy = this.y + getRandomInt(-1, 1)
			this.tryMove(dx, dy)
		}
		Game.engine.unlock()
	}
}
