/**
 * Created by Larken on 6/22/2017.
 */
import ROT from 'rot-js'
import SimpleEnemy from '#/entities/actors/enemies/SimpleEnemy.js'
import { getRandomInt, getItemsFromDropTable } from '#/utils/HelperFunctions.js'
import { Game } from '#/Game.js'

export default class Ghost extends SimpleEnemy {
	constructor(x, y, id) {
		super(
			x,
			y,
			{
				id: id,
				name: 'ghost',
				description: 'A dead soul trapped in this coporeal realm.',
				visible: true,
				blocked: true,
				chasing: false,
				corpseType: null,
				combat: {
					/* options.combat, dedicated to all things related to combat */
					description: [' attacked '],
					/* max stats */
					maxhp: 35,
					maxmana: 5,
					/* current stats */
					hp: 35,
					mana: 5,
					str: 3,
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
