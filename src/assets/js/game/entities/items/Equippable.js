import { Game } from '#/Game.js'
import Item from '#/entities/items/Item.js'
import { getRandomInt, getNormalRandomInt } from '#/utils/HelperFunctions.js'

export default class Equippable extends Item {
	constructor(x, y, options) {
		if (options.cb === null) throw `Error - no combat property defined. Bad armor creation for ${options.name}`
		else if (options.cb.equipmentSlot === null)
			throw `Error - no equipmentSlot property defined. Bad armor creation for ${options.name}`
		options.visible = true
		options.blocked = false
		options.cb.equippable = true
		options.cb.equipped = false
		super(x, y, options)
		this.cb = this.cb
		this.cb.enchantments = []
		this.action = 'Equip'
	}

	use() {
		let { equipmentSlot } = this.cb
		if (Game.player.cb.equipment[equipmentSlot] === this) {
			Game.player.unequip(this)
		} else {
			Game.player.equip(this)
		}
	}

	// rolls for defence value
	roll() {
		let { def } = this.cb
		return getNormalRandomInt(0, def)
	}

	getAction() {
		if (this.cb.equipped) return 'Unequip'
		return this.action
	}

	addNewEnchantment(enchantment) {
		this.cb.enchantments.push(enchantment)
	}
}
