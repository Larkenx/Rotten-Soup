import { getRandomInt } from '#/utils/HelperFunctions'

export const DoNothingGoal = () => {
	return actor => {}
}

/* Event Filters */

// A loot filter takes in a LootPickedUpEvent
// and sees if any of the items match our item types
export const LootFilter = (evt, itemTypes, fn) => {
	if (evt.items.some(i => itemTypes.some(T => i instanceof T))) fn(evt)
}

/* Movement */
export const TryMoveGoal = location => {
	return actor => {
		let { x, y } = location
		actor.tryMove(x, y)
	}
}

export const RandomMovementGoal = () => {
	return actor => {
		let dx = actor.x + getRandomInt(-1, 1)
		let dy = actor.y + getRandomInt(-1, 1)
		actor.tryMove(x, y)
	}
}

/* Miscellaneous */
export const FindGoldGoal = lootInfo => {
	return actor => {
		// ...
	}
}
