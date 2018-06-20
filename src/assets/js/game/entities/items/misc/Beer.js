import Item from '#/entities/items/Item.js'
import { Game } from '#/Game.js'

export default class Beer extends Item {
	constructor(x, y, id) {
		super(x, y, {
			id: id,
			type: 'Beer'
		})
	}

	hoverInfo() {
		return 'A pint of beer!'
	}
}
