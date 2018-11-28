import ROT from 'rot-js'
import { getRandomInt, pathfinding } from '#/utils/HelperFunctions'

export const DoNothingGoal = () => {
	return actor => {}
}

/* Event Filters */
// A loot filter - filters loot events that only contain given itemTypes
export const LootFilter = (evt, itemTypes, fn, limit = 1) => {
	if (evt.items.some(i => itemTypes.some(T => i instanceof T))) fn(evt)
}

// Similar a loot filter - filters based on entity types for an event that has an entity
export const EntityFilter = (evt, entityTypes, fn) => {
	if (entityTypes.some(T => evt.entity instanceof T)) fn(evt)
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

export const AStarPathingGoal = (target, history = null) => {
	return actor => {
		const move = steps => {
			// when we reach the target, we're going to just let the actor
			// call its tryMove() method to the target, which will interact with either the the
			// entity that is there, or it will simply move to the target location
			if (steps.length >= 2) {
				let { x, y } = steps[1]
				actor.tryMove(x, y)
			}
			// until we reach "striking distance" of target, add this goal again
			if (steps.length > 2) {
				steps.splice(1, 1)
				actor.addGoal(AStarPathingGoal(target, { x: target.x, y: target.y, steps }))
			}
		}

		if (history !== null && history.x === target.x && history.y === target.y) {
			move(history.steps)
		} else {
			let path = new ROT.Path.AStar(target.x, target.y, pathfinding)
			let steps = []
			path.compute(actor.x, actor.y, (x, y) => {
				steps.push({ x, y })
			})
			move(steps)
		}
	}
}

/* Miscellaneous */
export const FindGoldLooterGoal = lootInfo => {
	return actor => {
		let { looter } = lootInfo
		actor.addGoal(AStarPathingGoal(looter))
	}
}
