/**
 * Created by Larken on 6/22/2017.
 */
import Item from '#/entities/items/Item.js'
import { Game } from '#/Game.js'

export const AMMO_TYPES = {
	ARROW: 'Arrow'
}

export class Ammo extends Item {
	constructor(x, y, options) {
		options.visible = true
		options.blocked = false
		options.combat.equippable = true
		options.combat.equipped = false
		options.action = 'Equip'
		super(x, y, options)
		Object.assign(this, options)
		this.cb = this.combat
	}

	use() {
		if (Game.player.cb.equipment.ammo === this) {
			Game.player.unequipAmmo()
		} else {
			Game.player.equipAmmo(this)
		}
	}

	hoverInfo() {
		return `Quantity: ${this.quantity}`
	}
}
