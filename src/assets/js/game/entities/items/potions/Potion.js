import Item from '#/entities/items/Item.js'
import { Game } from '#/Game.js'
export default class Potion extends Item {
	constructor(x, y, options) {
		options.action = 'Drink'
		super(x, y, options)
	}

	use() {
		Game.player.cb.potionsConsumed++
	}
}
