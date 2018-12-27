import ROT from 'rot-js'
import { getRandomInt, within, configurablePathfinding, createFovDijkstraMap, key, unexploredTiles } from '#/utils/HelperFunctions.js'

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


export const AStarPathingGoal = data => {
	return actor => {
		let target = data.entity
		let stopCondition = data.stopCondition ? data.stopCondition : (...args) => false
		if (stopCondition(data)) return
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
			if (data.finalAction) data.finalAction()
		}
		if (steps.length > 1) {
			actor.addGoal(AStarPathingGoal(data))
		}
	}
}

export const AutoexploreGoal = (data = {}) => {
	return actor => {
		let toVisit = unexploredTiles(actor)
		let stopCondition = data.stopCondition ? data.stopCondition : (...args) => false
		if (stopCondition(data)) return
		if (toVisit.length > 0) {
			let distances = createFovDijkstraMap(actor, toVisit)
			const possiblePositions = []
			ROT.DIRS[8].forEach(([dx, dy]) => {
				if (key(actor.x + dx, actor.y + dy) in distances) possiblePositions.push([actor.x + dx, actor.y + dy])
			})
			const [dx, dy] = possiblePositions.sort().reduce(
				(a, b) => {
					const [ax, ay] = a
					const [bx, by] = b
					if (distances[key(ax, ay)] < distances[key(bx, by)]) return a
					if (distances[key(ax, ay)] > distances[key(bx, by)]) return b
					return [a, b][getRandomInt(0, 1)]
				}, [actor.x, actor.y])
			if (dx === actor.x && dy === actor.y) {
				if (actor.addIdleGoal)
					actor.addIdleGoal()
			} else {
				actor.tryMove(dx, dy)
				actor.addGoal(AutoexploreGoal(data))
			}
		} else {
			if (data.doneCallback) data.doneCallback()
		}
	}
}

/* Miscellaneous */
export const FindLooterGoal = lootInfo => {
	return actor => {
		let { looter } = lootInfo
		actor.addGoal(AStarPathingGoal({ entity: looter }))
	}
}

export const PickupGoal = () => {
	return actor => {
		actor.pickup()
	}
}
