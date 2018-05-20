/**
 * Created by Larken on 7/8/2017.
 */

import { Game } from '#/Game.js'
import { Entity } from '#/entities/Entity.js'

export default class Chest extends Entity {
	constructor(x, y, id) {
		super(x, y, {
			name: 'chest',
			id: id,
			visible: true,
			blocked: true
		})
		this.closed = true
		this.items = []
	}

	react(actor) {
		let isPlayer = actor === Game.player
		if (this.closed) {
			this.open()
		} else {
			// open up an inventory screen of items in the chest?
			if (this.items.length === 0 && isPlayer) {
				Game.log("There's nothing left in this chest!", 'information')
			} else {
				if (isPlayer) Game.log('You collect everything from the chest.', 'information')
				for (let item of this.items) actor.addToInventory(item)

				if (isPlayer) Game.player.cb.chestsOpened++
				this.items = []
			}
		}
	}

	addToInventory(item) {
		this.items.push(item)
	}

	open() {
		this.closed = false
		this.id = Game.display.tileset.tileproperties[this.id].activated_id
		this.sprite.texture = Game.display.tilesetMapping[this.id]
	}
}
