/**
 * Created by Larken on 7/8/2017.
 */
import { Game, tileset } from '#/Game.js'
import Door from '#/entities/misc/Door.js'
import Key from '#/entities/items/misc/Key.js'

export default class LockedDoor extends Door {
	constructor(x, y, id) {
		super(x, y, id)
		this.locked = true
		this.name = 'locked door'
	}

	react(actor) {
		if (this.closed && actor === Game.player) {
			// if it's closed, then we need to make sure this
			// actor who is trying to open the door has a key

			let keys = actor.inventory.filter(i => {
				return i instanceof Key
			})
			if (keys.length === 0) {
				Game.log('You need a key to open this door.', 'alert')
			} else {
				Game.log('You use a key to unlock the door.', 'player_move')
				actor.removeFromInventory(keys[0])
				this.openDoor()
				this.locked = false
			}
		}
	}
}
