/**
 * Created by Larken on 7/8/2017.
 */

import { Game } from '#/Game.js'
import { Entity } from '#/entities/Entity.js'
import { addPrefix } from '#/utils/HelperFunctions.js'

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
		if (this.closed) {
			this.open()
		}
		this.loot(actor)
	}

	loot(actor) {
		let isPlayer = actor === Game.player
		if (this.items.length === 0) {
			if (isPlayer) Game.log("There's nothing left in this chest!", 'information')
			return
		}
		if (isPlayer) {
			let itemTypes = this.items.map(i => i.type.toLowerCase())
			let prettyItemTypes =
				this.items.length === 1
					? addPrefix(itemTypes[0])
					: itemTypes.slice(1, itemTypes.length - 1).reduce((buf, str) => {
							return buf + ', ' + addPrefix(str)
					  }, addPrefix(itemTypes.slice(0, 1)[0])) + ` and ${addPrefix(itemTypes.slice(-1)[0])}`
			let buffer = `You take ${prettyItemTypes} from the chest.`
			Game.log(buffer, 'information')
			Game.player.cb.chestsOpened++
		}
		console.log(this.items)
		for (let item of this.items) actor.addToInventory(item)
		this.items = []
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
