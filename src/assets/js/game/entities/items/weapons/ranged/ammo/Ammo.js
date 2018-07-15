/**
 * Created by Larken on 6/22/2017.
 */
import Equippable from '#/entities/items/Equippable.js'
import { Game } from '#/Game.js'

export const AMMO_TYPES = {
	ARROW: 'Arrow'
}

export class Ammo extends Equippable {
	constructor(x, y, options) {
		options.visible = true
		options.blocked = false
		options.combat.equippable = true
		options.combat.equipped = false
		options.combat.equipmentSlot = 'ammo'
		options.action = 'Equip'
		super(x, y, options)
		Object.assign(this, options)
		this.cb = this.combat
	}

	getAction() {
		if (this.cb.equipped) return 'Unequip'
		return this.action
	}

	hoverInfo() {
		return `Quantity: ${this.quantity}`
	}
}
