import { Entity } from '#/entities/Entity.js'
import { itemTypes, equipmentSlots, ammoTypes } from '#/utils/Constants';
import { mix } from '#/utils/Mixins'
import { Stackable, Equippable, AmmunitionTyped, Fireable } from './ItemMixins';

export default class Item extends Entity {
	constructor(options) {
		const { x, y } = options
		options.visible = true
		options.inInventory = true
		super(x, y, options)
		this.category = options.category || itemTypes.MISCELLANEOUS
		this.description = options.description || []
	}
}

export class Arrow extends mix(Item).with(Stackable, Equippable, AmmunitionTyped) {
	constructor(configuration) {
		super({
			equipmentSlot: equipmentSlots.AMMO,
			ammoType: ammoTypes.ARROW,
			...configuration
		})
	}
}

export class Bow extends mix(Item).with(Equippable, AmmunitionTyped, Fireable) {
	constructor(configuration) {
		super({
			equipmentSlot: equipmentSlots.WEAPON,
			ammoType: ammoTypes.ARROW,
			...configuration
		})
	}
}