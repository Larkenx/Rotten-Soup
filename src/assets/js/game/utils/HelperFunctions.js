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
	return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is exclusive and the minimum is inclusive
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
		const someWords = ['trees', 'flowers', 'grass', 'wild grass', 'water', 'steel arrows', 'carpet', 'logs', 'cobwebs']
		if (someWords.includes(word)) {
			return 'some ' + word
		}
		if (vowels.includes(word[0].toLowerCase())) return 'an ' + word
		else return 'a ' + word
	} else {
		return word
	}
}

export let itemTypes = {
	STRENGTH_POTION: 'STRENGTH_POTION',
	MANA_POTION: 'MANA_POTION',
	HEALTH_POTION: 'HEALTH_POTION',
	SWORD: 'SWORD',
	STEEL_ARROW: 'STEEL_ARROW'
}

export function getDiceRoll(rolls, sides) {
	let n = 0
	for (let i = 0; i < rolls; i++) {
		n += getRandomInt(1, sides)
	}
	return n
}

export function getItemsFromDropTable(options) {
	if (
		options.dropTable == undefined ||
		options.minItems == undefined ||
		options.maxItems == undefined ||
		options.x == undefined ||
		options.y == undefined
	)
		throw 'Not enough arguments given. Expected drop table object, min and max number of items to produce, and x,y location'

	let { dropTable, minItems, maxItems, x, y } = options
	let items = []
	let roll = getRandomInt(minItems, maxItems)
	for (let i = 0; i < roll; i++) {
		let chosenItem = ROT.RNG.getWeightedValue(dropTable)
		switch (chosenItem) {
			case itemTypes.STRENGTH_POTION:
				items.push(new StrengthPotion(x, y, 969))
				break
			case itemTypes.HEALTH_POTION:
				items.push(new HealthPotion(x, y, 488))
				break
			case itemTypes.MANA_POTION:
				items.push(new ManaPotion(x, y, 608))
				break
			case itemTypes.SWORD:
				items.push(createSword(x, y, 35))
				break
			case itemTypes.STEEL_ARROW:
				items.push(new SteelArrow(x, y, 784, 5))
				break
			default:
				console.log("tried to add some item that doesn't exist to an inventroy from drop table")
				console.log(chosenItem)
		}
	}
	// console.log("Generated drop table", items)
	return items
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
