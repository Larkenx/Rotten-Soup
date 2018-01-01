/**
 * Created by Larken on 6/22/2017.
 */
import SimpleEnemy from '#/entities/actors/enemies/SimpleEnemy.js'
import { getRandomInt, getItemsFromDropTable } from '#/utils/HelperFunctions.js'
import { createSword, Sword } from '#/entities/items/weapons/Sword.js'
import HealthPotion from '#/entities/items/potions/HealthPotion.js'
import StrengthPotion from '#/entities/items/potions/StrengthPotion.js'
import { Game } from '#/Game.js'
import { SteelArrow } from '#/entities/items/weapons/ranged/ammo/Arrow.js'

export default class Kobold extends SimpleEnemy {
	constructor(x, y, id, ranged = false) {
		let randomHP = getRandomInt(20, 25)
		let randomStr = getRandomInt(5, 7)
		super(x, y, {
			id: id,
			name: 'Kobold',
			description: 'A cold-blooded kobold!',
			visible: true,
			blocked: true,
			chasing: false,
			combat: {
				/* options.combat, dedicated to all things related to combat */
				description: [' attacked '],
				/* max stats */
				maxhp: randomHP,
				maxmana: 5,
				/* current stats */
				hp: randomHP,
				mana: 5,
				str: randomStr,
				def: 1,
				/* misc */
				hostile: true,
				range: 9,
				invulnerable: false
			}
		})

		let items = getItemsFromDropTable({
			minItems: 0,
			maxItems: 2,
			dropTable: {
				STRENGTH_POTION: 1,
				HEALTH_POTION: 1,
				STEEL_ARROW: 2,
				SWORD: 1
			},
			x: this.x,
			y: this.y
		})
		items.forEach(item => this.addToInventory(item))
	}
}
