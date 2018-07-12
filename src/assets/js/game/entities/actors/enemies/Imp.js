/**
 * Created by Larken on 6/22/2017.
 */
import ROT from 'rot-js'
import SimpleEnemy from '#/entities/actors/enemies/SimpleEnemy.js'
import { getRandomInt } from '#/utils/HelperFunctions.js'
import { Game } from '#/Game.js'

export default class Imp extends SimpleEnemy {
	constructor(x, y, id) {
		super(
			x,
			y,
			{
				id: id,
				name: 'imp',
				description: 'A small, mischevious demon.',
				visible: true,
				blocked: true,
				chasing: false,
				combat: {
					/* options.combat, dedicated to all things related to combat */
					description: [' attacked '],
					/* max stats */
					maxhp: 15,
					maxmana: 5,
					/* current stats */
					hp: 15,
					mana: 5,
					str: 5,
					def: 1,
					/* misc */
					hostile: true,
					range: 9,
					invulnerable: false
				}
			},
			true
		)
	}
}
