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

export function getVisibleTiles(actor) {
	let fov = new ROT.FOV.PreciseShadowcasting(function(x, y) {
		return Game.inbounds(x, y) && Game.map.data[y][x].visible()
	})

	let visibleTiles = []
	fov.compute(actor.x, actor.y, actor.cb.range, (x, y, r, visibility) => {
		if (Game.inbounds(x, y)) visibleTiles.push(Game.map.data[y][x])
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
