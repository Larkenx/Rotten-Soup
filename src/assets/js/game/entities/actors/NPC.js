/**
 * Created by larken on 7/12/17.
 */

import {Actor} from '#/entities/actors/Actor.js'

export default class NPC extends Actor {
	constructor(x, y, id) {
		super(x, y, {
			id: id,
			name : 'non-player character',
			visible: true,
			blocked: true,
			combat: {
				hostile: false
			}
		})
	}
}
