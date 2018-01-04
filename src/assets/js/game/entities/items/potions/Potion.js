import Item from '#/entities/items/Item.js'

export default class Potion extends Item {
	constructor(x, y, options) {
		options.action = 'Drink'
		super(x, y, options)
	}
}
