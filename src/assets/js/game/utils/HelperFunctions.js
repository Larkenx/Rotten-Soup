import ROT from 'rot-js'

import { Game } from '#/Game.js'
import HealthPotion from '#/entities/items/potions/HealthPotion.js'
import StrengthPotion from '#/entities/items/potions/StrengthPotion.js'
import ManaPotion from '#/entities/items/potions/ManaPotion.js'
import { createSword } from '#/entities/items/weapons/Sword.js'
import { SteelArrow } from '#/entities/items/weapons/ranged/ammo/Arrow.js'

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
	// console.log(a, n, b)
	// console.log(a <= n && n <= b)
	return a <= n && n <= b
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
			'bones'
		]
		if (someWords.includes(word)) {
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
