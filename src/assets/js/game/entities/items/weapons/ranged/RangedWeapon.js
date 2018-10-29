/**
 * Created by Larken on 6/22/2017.
 */
import Weapon from '#/entities/items/weapons/Weapon.js'
// import {AMMO_TYPES} from '#/entities/items/weapons/ranged/ammo/Ammo.js'

export default class RangedWeapon extends Weapon {
	constructor(x, y, options) {
		super(x, y, options)
		this.cb.ranged = true
	}

	hoverInfo() {
		return [
			{
				attribute: 'Damage',
				value: `${this.cb.rolls}-${this.cb.sides * this.cb.rolls}`
			},
			{
				attribute: 'Range',
				value: `${this.cb.range} tiles`
			}
		]
		return `Damage: ${this.cb.rolls}-${this.cb.sides * this.cb.rolls} Range: ${this.cb.range}`
	}
}
