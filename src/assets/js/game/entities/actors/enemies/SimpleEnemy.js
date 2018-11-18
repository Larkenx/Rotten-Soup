import { StatelessAI } from '#/entities/actors/enemies/StatelessAI.js'
import { Game } from '#/Game.js'
import ROT from 'rot-js'

/* Simple enemy class to encapsulate all enemies with very simple AI.
 Essentially, these enemies have a range that they can see the player from, and if the player
 enters within the distance between the enemy and player */
export class SimpleEnemy extends StatelessAI {
	constructor(x, y, options, wanders = true) {
		super(x, y, options, {
			/* AI parameters */
			morale: 0,
			minPlayerDist: 0,
			maxPlayerDist: 0,
			ranged: false,
			melee: true,
			magic: false,
			wanders
		})
	}
}
