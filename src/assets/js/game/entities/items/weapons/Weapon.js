/**
 * Created by Larken on 6/22/2017.
 */
import { Game } from '#/Game.js'
import Equippable from '#/entities/items/Equippable.js'
import { getRandomInt } from '#/utils/HelperFunctions.js'

export default class Weapon extends Equippable {
	constructor(x, y, options) {
		options.combat.equipmentSlot = 'weapon'
		super(x, y, options)
	}

	roll() {
		let dmg = 0
		for (let i = 0; i < this.cb.rolls; i++) {
			dmg += getRandomInt(1, this.cb.sides)
		}
		return dmg
	}

	getAction() {
		if (this.cb.equipped) return 'Unequip'
		return this.action
	}

	/* Effects are equivalent to enchantments, in a way...
     * Might need to do some work on editing how these are displayed in the UI
     */
	addNewEnchantment(enchantment) {
		this.cb.enchantments.push(enchantment)
	}

	hoverInfo() {
		return `Damage: ${this.cb.rolls}-${this.cb.sides * this.cb.rolls}`
	}
}
