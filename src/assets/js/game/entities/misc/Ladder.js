/**
 * Created by Larken on 6/22/2017.
 */
import {Game} from '#/Game.js'
import {Entity} from '#/entities/Entity.js'

export default class Ladder extends Entity {
	constructor(x, y, id, dir) {
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
		this.portal = null
	}

	act() {

	}

	react(actor) {
		let levelName = Game.currentLevel.replace(/[0-9]/g, '')
		let levelNumber = parseInt(Game.currentLevel.replace(/[^0-9]/g, ''))
		if (this.direction === 'down') {
			Game.log('You climb down the ladder...', 'player_move')
			if (this.portal !== null) {
				Game.changeLevels(this.portal, this.direction == 'down' ? 'up' : 'down')
				return
			} else {
				Game.changeLevels(levelName + (levelNumber + 1), this.direction == 'down' ? 'up' : 'down', levelNumber)
				return
			}
		} else {
			Game.log('You climb up the ladder...', 'player_move')
			if (this.portal !== null) {
				Game.changeLevels(this.portal, this.direction == 'down' ? 'up' : 'down')
				return
			}
			if (levelNumber === 1) {
				Game.changeLevels('overworld')
				return
			}
			Game.changeLevels(levelName + (levelNumber - 1), this.direction == 'down' ? 'up' : 'down', levelNumber)

		}
	}
}
