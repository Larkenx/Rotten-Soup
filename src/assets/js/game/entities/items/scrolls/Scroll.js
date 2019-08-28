import Item from '#/entities/items/Item.js'
import { Game } from '#/Game.js'
export default class Scroll extends Item {
	constructor(x, y, options) {
		super(x, y, {
			...options,
			action: 'Read',
			identified: false
		})
	}

	use() {
		Game.player.cb.scrollsRead++
	}
}
