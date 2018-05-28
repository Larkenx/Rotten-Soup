/**
 * Created by Larken on 6/22/2017.
 */
import { Game } from '#/Game.js'
import { Entity } from '#/entities/Entity.js'

export default class Ladder extends Entity {
	constructor(x, y, id, dir, portal, leadsToDungeon = false) {
		super(x, y, {
			id: id,
			name: 'ladder',
			direction: dir,
			description: 'A ladder leading ' + dir,
			fg: 'brown',
			bg: 'orange',
			blocked: false,
			visible: true
		})
		this.portal = portal
		this.leadsToDungeon = leadsToDungeon
	}

	act() {}

	react(actor) {
		if (this.direction === null) {
			console.error('Ladder does not have a direction!')
			return
		}

		if (this.direction === 'down') Game.log('You climb down the ladder...', 'player_move')
		if (this.direction === 'up') Game.log('You climb up the ladder...', 'player_move')
		Game.changeLevels(this.portal, this.leadsToDungeon)
	}
}
