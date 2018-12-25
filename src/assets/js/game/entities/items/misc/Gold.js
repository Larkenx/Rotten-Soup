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
		if (this.quantity === 1) {
			this.id = 1388
		} else if (this.quantity <= 3) {
			this.id = 1385
		} else if (this.quantity <= 5) {
			this.id = 1387
		} else if (this.quantity <= 10) {
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
	}
}
