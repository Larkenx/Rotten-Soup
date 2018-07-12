/**
 * Created by Larken on 6/22/2017.
 */
import ROT from 'rot-js'
import SimpleEnemy from '#/entities/actors/enemies/SimpleEnemy.js'
import { getRandomInt } from '#/utils/HelperFunctions.js'
import { Game } from '#/Game.js'

export default class Cyclops extends SimpleEnemy {
	constructor(x, y, id) {
		super(x, y, {
			id: id,
			name: 'cyclops',
			description: 'A massive beast with one eye!',
			visible: true,
			blocked: true,
			chasing: false,
			combat: {
				/* options.combat, dedicated to all things related to combat */
				description: [' attacked '],
				/* max stats */
				maxhp: 55,
				maxmana: 5,
				/* current stats */
				hp: 55,
				mana: 5,
				str: 14,
				def: 1,
				/* misc */
				hostile: true,
				range: 9,
				invulnerable: false
			}
		})
	}
}
