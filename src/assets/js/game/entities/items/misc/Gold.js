import Item from '#/entities/items/Item.js'
import { Game } from '#/Game.js'

export default class Gold extends Item {
	constructor(x, y, id, quantity) {
		super(x, y, {
			id: id,
			type: 'Gold',
			quantity
		})

		this.updateQuantity()
	}

	updateQuantity() {
		if (this.quantity <= 0) {
			Game.player.removeFromInventory(this)
		} else if (this.quantity === 1) {
			this.id = 1388
		} else if (this.quantity <= 10) {
			this.id = 1387
		} else {
			this.id = 1386
		}
	}

	hoverInfo() {
		return [
			{
				attribute: 'Quantity',
				value: `${this.quantity}`
			}
		]
		return `Quantity: ${this.quantity}`
	}
}
