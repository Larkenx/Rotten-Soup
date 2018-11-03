import Item from '#/entities/items/Item.js'
import {
	Game
} from '#/Game.js'

export default class Beer extends Item {
	constructor(x, y, id) {
		super(x, y, {
			id: id,
			type: 'Beer'
		})
	}

	hoverInfo() {
		return [{
				attribute: 'Description',
				value: 'A pint of beer!'
			},
			{
				attribute: 'Effect',
				value: 'Drunkness'
			}
		]
	}
}