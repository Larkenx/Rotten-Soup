import ROT from 'rot-js'

import { Game } from '#/Game.js'
import HealthPotion from '#/entities/items/potions/HealthPotion.js'
import StrengthPotion from '#/entities/items/potions/StrengthPotion.js'
import ManaPotion from '#/entities/items/potions/ManaPotion.js'
import { createSword } from '#/entities/items/weapons/Sword.js'
import { SteelArrow } from '#/entities/items/weapons/ranged/ammo/Arrow.js'

export function pathfinding(x, y) {
	return Game.inbounds(x, y) && !Game.getTile(x, y).blocked()
}

export function configurablePathfinding(options = {}) {
	let andConditions = []
	let orConditions = []
	andConditions.push((x, y) => {
		return Game.inbounds(x, y) && !Game.getTile(x, y).blockedByAnything()
	})
	// if we exlude the starting location, a tile is considered not blocked
	// if we're standing on it
	if (options.excludeOrigin && options.origin) {
		orConditions.push((x, y) => options.origin.x === x && options.origin.y === y)
	}

	if (options.excludeTarget && options.target) {
		orConditions.push((x, y) => options.target.x === x && options.target.y === y)
	}
	return (x, y) => andConditions.every(c => c(x, y)) || orConditions.some(c => c(x, y))
}

export function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getNormalRandomInt(min, max) {
	let gaussianRand = () => {
		let rand = 0
		for (let i = 0; i < 6; i++) rand += Math.random()

		return rand / 6
	}
	return Math.floor(min + gaussianRand() * (max - min + 1))
}

export function randomProperty(object) {
	let keys = Object.keys(object)
	return keys[Math.floor(keys.length * Math.random())]
}

export function between(a, n, b) {
	return a <= n && n <= b
}

export function within(a, n, b) {
	return a <= b + n || a >= b - n
}

export function addPrefix(word) {
	const vowels = ['a', 'e', 'i', 'o', 'u']
	if (word !== 'you') {
		const someWords = [
			'trees',
			'flowers',
			'grass',
			'wild grass',
			'water',
			'steel arrows',
			'carpet',
			'logs',
			'cobwebs',
			'dirt',
			'bones',
			'gold',
			'plate legs',
			'boots'
		]
		if (someWords.includes(word.toLowerCase())) {
			return 'some ' + word
		}
		if (vowels.includes(word[0].toLowerCase())) return 'an ' + word
		else return 'a ' + word
	} else {
		return word
	}
}

export function getDiceRoll(rolls, sides) {
	let n = 0
	for (let i = 0; i < rolls; i++) {
		n += getRandomInt(1, sides)
	}
	return n
}

export function getVisibleTiles(actor, map = Game.map) {
	let { x, y } = actor
	let { range } = actor.cb
	let fov = new ROT.FOV.RecursiveShadowcasting((x, y) => {
		return map.inbounds(x, y) && map.getTile(x, y).visible()
	})

	let visibleTiles = []
	fov.compute(x, y, range, (x, y, r, visibility) => {
		if (map.inbounds(x, y)) visibleTiles.push(map.getTile(x, y))
	})
	return visibleTiles
}

export function getWeightedValue(table) {
	let rotFormat = {}
	for (let key in table) {
		rotFormat[key] = table[key].chance
	}
	return ROT.RNG.getWeightedValue(rotFormat)
}

export function computeBitmaskFloors(x, y, freeCells) {
	let sum = 0
	let above = `${x},${y - 1}`
	let below = `${x},${y + 1}`
	let left = `${x - 1},${y}`
	let right = `${x + 1},${y}`

	let ur = `${x + 1},${y - 1}`
	let ll = `${x - 1},${y + 1}`

	let ul = `${x - 1},${y - 1}`
	let lr = `${x + 1},${y + 1}`

	let free = coord => {
		return coord in freeCells
	}

	if (free(above)) sum += 1
	if (free(right)) sum += 2
	if (free(below)) sum += 4
	if (free(left)) sum += 8
	if (sum == 0) {
		if (free(ul)) {
			return 16
		} else if (free(ur)) {
			return 17
		} else if (free(ll)) {
			return 18
		} else if (free(lr)) {
			return 19
		}
	}
	return sum
}

export function computeBitmaskWalls(x, y, freeCells) {
	let sum = 0
	let above = `${x},${y - 1}`
	let below = `${x},${y + 1}`
	let left = `${x - 1},${y}`
	let right = `${x + 1},${y}`

	let ur = `${x + 1},${y - 1}`
	let ll = `${x - 1},${y + 1}`

	let ul = `${x - 1},${y - 1}`
	let lr = `${x + 1},${y + 1}`

	let free = coord => {
		return coord in freeCells
	}

	if (free(above)) sum += 1
	if (free(right)) sum += 2
	if (free(below)) sum += 4
	if (free(left)) sum += 8
	if (free(above) && !free(below) && !free(right) && !free(left) && (free(ll) || free(lr))) {
		return 20
	}
	if (sum == 0) {
		if (free(ul)) return 16
		else if (free(ur)) return 17
		else if (free(ll)) return 18
		else if (free(lr)) return 19
	}
	return sum
}

// frontier = Queue()
// frontier.put(start)
// distance = {}
// distance[start] = 0
// while not frontier.empty():
// current = frontier.get()
// for next in graph.neighbors(current):
// 	if next not in distance:
// frontier.put(next)
// distance[next] = 1 + distance[current]

export function neighbors({ x, y }, predicate) {
	let coords = []
	for (let dir of ROT.DIRS[8]) {
		let [dx, dy] = dir
		if (predicate(x + dx, dy + y)) coords.push({ x: x + dx, y: y + dy })
	}
	return coords
}

export function outOfBoundsOrBlocked(x, y) {
	return !Game.inbounds(x, y) || Game.getTile(x, y).blocked()
}

export function outOfBoundsOrBlockedByAnything(x, y) {
	return !Game.inbounds(x, y) || Game.getTile(x, y).blockedByAnything()
}

export const key = (x, y) => {
	return x + ',' + y
}
export const unkey = k => {
	return k.split(',').map(s => parseInt(s))
}

export function unexploredTiles(actor) {
	let allWalkableTiles = Game.map.getTiles().filter(t => !t.blocked())
	return allWalkableTiles.filter(t => !actor.seenTiles.includes(t))
}

export function floodFill(start) {
	let neighbors = [start]
	let visited = {}
	while (neighbors.length > 0) {
		let v = neighbors.pop()
		visited[key(v.x, v.y)] = true
		ROT.DIRS[8].forEach(([dx, dy]) => {
			let x = v.x + dx
			let y = v.y + dy
			if (!outOfBoundsOrBlockedByAnything(x, y) && !visited[key(x, y)]) {
				neighbors.push({ x, y })
			}
		})
	}
	return visited
}

export function createFovDijkstraMap(start, notVisibleTiles, blockedPredicate = outOfBoundsOrBlockedByAnything) {
	const reachable = floodFill(start)
	let dijkstraMap = new ROT.Path.Dijkstra(start.x, start.y, (x, y) => !blockedPredicate(x, y) && reachable[key(x, y)])
	let distanceTransform = {}
	for (let { x, y } of notVisibleTiles) {
		let coord = key(x, y)
		distanceTransform[coord] = 0
		let steps = []
		dijkstraMap.compute(x, y, (sx, sy) => {
			steps.push({ x: sx, y: sy })
		})
		let distance = 0
		for (let step of steps) {
			distance += 1
			let stepKey = key(step.x, step.y)
			if (stepKey in distanceTransform && distance > distanceTransform[stepKey]) {
				distance = distanceTransform[stepKey]
			}
			distanceTransform[stepKey] = distance
		}
	}
	distanceTransform[key(start.x, start.y)] = Number.MAX_VALUE
	return distanceTransform
}

// export function createFovDijkstraMap({ x, y }, visitedTiles, neighborsPredicate = outOfBoundsOrBlocked) {
// 	let frontier = []
// 	let start = { x, y }
// 	frontier.unshift({ x, y })
// 	let distance = {}
// 	distance[key(start)] = 0
// 	while (frontier.length !== 0) {
// 		let current = frontier.shift()
// 		for (let neighbor of neighbors(current, neighborsPredicate)) {
// 			if (!(key(neighbor) in distance)) {
// 				frontier.unshift(neighbor)
// 				let neighborDistance = distance[key(current)] + 1
// 				if (!visitedTiles[key(neighbor)]) neighborDistance = 0
// 				distance[key(neighbor)] = neighborDistance
// 			}
// 		}
// 	}
// 	let mostSteps = Math.max(...Object.values(distance)) + 1
// 	console.log(mostSteps)
// 	for (let k of Object.keys(distance)) {
// 		let v = distance[k]
// 		if (v > 0) distance[k] = mostSteps - v
// 	}
// 	distance[key(start)] = mostSteps + 2
// 	return distance
// }

export function stringifyDijkstraMap(map, start, width, height) {
	let characterMap = []
	for (let y = 0; y < height; y++) {
		characterMap.push([])
		for (let x = 0; x < width; x++) {
			let character = ' '
			if (key({ x, y }) in map) {
				let distance = map[key({ x, y })]
				character = distance <= 36 ? distance.toString(36) : '!'
				if (start.x === x && start.y === y) character = '@'
			} else {
				character = Game.inbounds(x, y) && Game.getTile(x, y).blocked() ? ' ' : '.'
			}
			characterMap[y].push(character)
		}
	}
	return characterMap
}

export function bfs(sx, sy, map) {
	let queue = [[sx, sy]]
	let visited = new Set()
	visited.add(key(sx, sy))
	while (queue.length > 0) {
		let [x, y] = queue.pop()
		// Fetch the neighbors of the tiles. we also want to grab tiles
		// that are blocked, but have an adjacent unblocked tile (so we can grab walls that are)
		// visible to the player
		let findTilesWithAdjacentUnblockedTiles = (nx, ny) => {
			return (
				!visited.has(key(nx, ny)) &&
				map.inbounds(nx, ny) &&
				neighbors({ x: nx, y: ny }, (a, b) => {
					return map.inbounds(a, b)
				}).some(nestedNeighbor => {
					let tile = map.getTile(nestedNeighbor.x, nestedNeighbor.y)
					return tile.obstacles.length < 1 || !tile.obstacles[0].blocked
				})
			)
		}
		for (let neighbor of neighbors({ x, y }, (a, b) => findTilesWithAdjacentUnblockedTiles(a, b))) {
			visited.add(key(neighbor.x, neighbor.y))
			queue.unshift([neighbor.x, neighbor.y])
		}
	}
	return visited
}
