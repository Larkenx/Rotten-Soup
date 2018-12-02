import ROT from 'rot-js'
import { getRandomInt, within, configurablePathfinding } from '#/utils/HelperFunctions.js'

export const DoNothingGoal = () => {
	return actor => { }
}

/* Event Filters */
// A loot filter - filters loot events that only contain given itemTypes
export const LootFilter = (evt, itemTypes, fn, limit = 1) => {
	if (evt.items.some(i => itemTypes.some(T => i instanceof T))) return fn(evt)
	return null
}

// Similar a loot filter - filters based on entity types for an event that has an entity
export const EntityFilter = (evt, entityTypes, fn) => {
	if (entityTypes.some(T => evt.entity instanceof T)) return fn(evt)
	return null
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
		actor.tryMove(dx, dy)
	}
}

// export const AStarPathingGoal = (data, history = null) => {
// 	return actor => {
// 		let target = data.entity
// 		const move = steps => {
// 			// when we reach the target, we're going to just let the actor
// 			// call its tryMove() method to the target, which will interact with either the the
// 			// entity that is there, or it will simply move to the target location
// 			if (steps.length >= 1) {
// 				let { x, y } = steps[0]
// 				actor.tryMove(x, y)
// 			}
// 			// until we reach "striking distance" of target, add this goal again
// 			if (steps.length > 1) {
// 				steps.splice(0, 1)
// 				actor.addGoal(AStarPathingGoal(data, { x: target.x, y: target.y, steps }))
// 			}
// 		}

// 		if (
// 			history !== null &&
// 			history.x === target.x &&
// 			history.y === target.y &&
// 			within(actor.x, 1, history.steps[0].x) &&
// 			within(actor.y, 1, history.steps[0].y)
// 		) {
// 			move(history.steps)
// 		} else {
// 			let configuredPathfinding = configurablePathfinding({
// 				excludeOrigin: true,
// 				origin: { x: actor.x, y: actor.y },
// 				excludeTarget: true,
// 				target
// 			})
// 			let path = new ROT.Path.AStar(target.x, target.y, configuredPathfinding)
// 			let steps = []
// 			path.compute(actor.x, actor.y, (x, y) => {
// 				// if (actor.x !== x || actor.y !== y)
// 				steps.push({ x, y })
// 			})
// 			move(steps)
// 		}
// 	}
// }

export const AStarPathingGoal = data => {
	return actor => {
		let target = data.entity
		let configuredPathfinding = configurablePathfinding({
			excludeOrigin: true,
			origin: { x: actor.x, y: actor.y },
			excludeTarget: true,
			target
		})
		let path = new ROT.Path.AStar(target.x, target.y, configuredPathfinding)
		let steps = []
		path.compute(actor.x, actor.y, (x, y) => {
			if (actor.x !== x || actor.y !== y) steps.push({ x, y })
		})
		if (steps.length >= 1) {
			let { x, y } = steps[0]
			actor.tryMove(x, y)
		}
		if (steps.length > 1) {
			actor.addGoal(AStarPathingGoal(data))
		}
	}
}



export const AutoexploreGoal = data => {
	return actor => { }
}

/* Miscellaneous */
export const FindLooterGoal = lootInfo => {
	return actor => {
		let { looter } = lootInfo
		actor.addGoal(AStarPathingGoal({ entity: looter }))
	}
}
