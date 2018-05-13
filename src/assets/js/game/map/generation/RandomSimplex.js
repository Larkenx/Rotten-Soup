/**
 * Created by larken on 7/4/17.
 */
import ROT from 'rot-js'
import SimplexNoise from 'simplex-noise'
import RNG from 'prng-parkmiller-js'
import { Game } from '#/Game.js'
import { GameMap } from '#/map/GameMap.js'
import Player from '#/entities/actors/Player.js'
import NPC from '#/entities/actors/NPC.js'
// Enemies
import Goblin from '#/entities/actors/enemies/Goblin.js'
import Kobold from '#/entities/actors/enemies/Kobold.js'
import Orc from '#/entities/actors/enemies/Orc.js'
import Rat from '#/entities/actors/enemies/Rat.js'
import Bat from '#/entities/actors/enemies/Bat.js'
import WildGoat from '#/entities/actors/enemies/WildGoat.js'
import Skeleton from '#/entities/actors/enemies/Skeleton.js'
import Zombie from '#/entities/actors/enemies/Zombie.js'
// Items
// Weapons
import { createSword, Sword } from '#/entities/items/weapons/Sword.js'
import { Bow, createBow } from '#/entities/items/weapons/ranged/Bow.js'
import { SteelArrow } from '#/entities/items/weapons/ranged/ammo/Arrow.js'
// Potions
import HealthPotion from '#/entities/items/potions/HealthPotion.js'
import StrengthPotion from '#/entities/items/potions/StrengthPotion.js'
import ManaPotion from '#/entities/items/potions/ManaPotion.js'
// Misc
import Chest from '#/entities/misc/Chest.js'
import Door from '#/entities/misc/Door.js'
import LockedDoor from '#/entities/misc/LockedDoor.js'
import Key from '#/entities/items/misc/Key.js'
import Ladder from '#/entities/misc/Ladder.js'
import { getRandomInt, getNormalRandomInt, randomProperty } from '#/utils/HelperFunctions.js'

const textures = {
	OLD_BEACH: {
		type: 'OLD_BEACH',
		textures: {
			upperLeft: 8816,
			top: 8817,
			upperRight: 8818,

			left: 8936,
			center: 8937,
			right: 8938,

			lowerLeft: 9056,
			bottom: 9057,
			lowerRight: 9058,

			endLeft: 8940,
			middleCorridorHorizontal: 8941,
			endRight: 8942,

			endTop: 8819,
			middleCorridorVertical: 8939,
			endBottom: 9059,

			single: 8937
		}
	},
	BEACH: {
		type: 'BEACH',
		textures: {
			upperLeft: 8816 + 14,
			top: 8817 + 14,
			upperRight: 8818 + 14,

			left: 8936 + 14,
			center: 8937 + 14,
			right: 8938 + 14,

			lowerLeft: 9056 + 14,
			bottom: 9057 + 14,
			lowerRight: 9058 + 14,

			endLeft: 8940 + 14,
			middleCorridorHorizontal: 8941 + 14,
			endRight: 8942 + 14,

			endTop: 8819 + 14,
			middleCorridorVertical: 8939 + 14,
			endBottom: 9059 + 14,

			single: 8937 + 14
		}
	},
	OCEAN_WATER: {
		type: 'OCEAN_WATER',
		textures: {
			upperLeft: 9017,
			top: 9017,
			upperRight: 9017,

			left: 9017,
			center: 9017,
			right: 9017,

			lowerLeft: 9017,
			bottom: 9017,
			lowerRight: 9017,

			endLeft: 9017,
			middleCorridorHorizontal: 9017,
			endRight: 9017,

			endTop: 9017,
			middleCorridorVertical: 9017,
			endBottom: 9017,

			single: 9017
		}
	},
	COASTAL_WATER: {
		type: 'COASTAL_WATER',
		textures: {
			upperLeft: 8176,
			top: 8177,
			upperRight: 8178,

			left: 8296,
			center: 8297,
			right: 8298,

			lowerLeft: 8296,
			bottom: 8297,
			lowerRight: 8298,

			endLeft: 8296,
			middleCorridorHorizontal: 8177,
			endRight: 8178,

			altUpperRight: 8181,
			endTop: 8177,
			middleCorridorVertical: 8298,
			endBottom: 8296,

			single: 8178
		}
	},
	FOREST: {
		type: 'FOREST',
		textures: {
			hasCorridors: true,
			upperLeft: 7743,
			top: 7744,
			upperRight: 7745,

			left: 7863,
			center: 7864,
			right: 7865,

			lowerLeft: 7983,
			bottom: 7984,
			lowerRight: 7985,

			endLeft: 7867,
			middleCorridorHorizontal: 7868,
			endRight: 7869,

			endTop: 7746,
			middleCorridorVertical: 7866,
			endBottom: 7986,

			single: 7748
		}
	},
	MOUNTAIN: {
		type: 'MOUNTAIN',
		textures: {
			upperLeft: 9197,
			top: 9198,
			upperRight: 9199,

			left: 9317,
			// center: 9318,
			right: 9317,

			lowerLeft: 9437,
			bottom: 9198,
			lowerRight: 9439,

			endLeft: 9198,
			middleCorridorHorizontal: 9198,
			endRight: 9198,

			endTop: 9198,
			middleCorridorVertical: 9200,
			endBottom: 9198,

			middleT: 9201,
			middleIntersection: 9321
			// single: 7748
		}
	},
	SNOW: {
		type: 'SNOW',
		textures: {}
	}
}

const actorTextures = {
	ORC: [5292, 5293, 5294, 5295, 5296, 5297, 5299],
	EMPOWERED_ORC: [5298],
	GOBLIN: [7440, 7441, 7442, 7443, 7444, 7445, 7446],
	RAT: [2362, 2363, 2365, 2366],
	BAT: [3704, 3706],
	KOBOLD: [5532, 5533, 5534, 5535, 5536, 5537, 5538, 5539],
	WILD_GOAT: [2600, 2601, 2602, 2603, 2604, 2605]
}

// textures for grass/flowers/trees
const wildGrass1 = 1242,
	wildGrass2 = 1243,
	wildGrass3 = 1362,
	wildGrass4 = 1363,
	shrub1 = 1722,
	shrub2 = 1723,
	shrub3 = 1726,
	mushroom1 = 1724,
	mushroom2 = 1725,
	tree = 7355,
	flower1 = 1482,
	flower2 = 1483,
	flower3 = 1484,
	flower4 = 1485

const flatten = arr => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), [])

// function that will yield a random free space in the room
const randomTile = validTiles => {
	let index = getRandomInt(0, validTiles.length) // index of a tile
	let tile = validTiles.splice(index, 1)
	if (tile.length === 1) {
		return tile[0].split(',').map(e => Number(e))
	} else {
		return null
	}
}

export function randomSimplexMap(width, height) {
	// we want to zoom in a lot so that the land is larger, so the width & height will be half
	let w = ~~(width / 2)
	let h = ~~(height / 2)
	let gameMap = new GameMap(w, h)
	console.log(w, h)
	// base textures
	/* GOOD SEEDS
        - 908234
    */
	let seed1 = 908234
	let seed2 = 908234
	let rng1 = RNG.create(seed1)
	let rng2 = RNG.create(seed2)
	let gen1 = new SimplexNoise(rng1.nextDouble.bind(rng1))
	let gen2 = new SimplexNoise(rng2.nextDouble.bind(rng2))
	let frequency = 1.5

	const mobDistribution = {
		// ORC: 1,
		// EMPOWERED_ORC: 1,
		// KOBOLD: 1,
		GOBLIN: 1,
		// BAT: 1,
		RAT: 3,
		WILD_GOAT: 3
	}

	const createActor = (actorString, x, y, id) => {
		switch (actorString) {
			case 'ORC':
				return new Orc(x, y, id)
			case 'EMPOWERED_ORC':
				return new Orc(x, y, id, true)
			case 'KOBOLD':
				return new Kobold(x, y, id)
			case 'GOBLIN':
				return new Goblin(x, y, id)
			case 'BAT':
				return new Bat(x, y, id)
			case 'RAT':
				return new Rat(x, y, id)
			case 'WILD_GOAT':
				return new WildGoat(x, y, id)
			default:
				throw 'Unidentified actor given to create actor'
		}
	}

	const noise1 = (nx, ny) => {
		return gen1.noise2D(nx, ny) / 2 + 0.5
	}

	const noise2 = (nx, ny) => {
		return gen2.noise2D(nx, ny) / 2 + 0.5
	}

	const getElevation = (x, y) => {
		let nx = x / width - 0.5,
			ny = y / height - 0.5
		let e =
			1.0 * noise1(frequency * 1 * nx, frequency * 1 * ny) +
			0.5 * noise1(frequency * 2 * nx, frequency * 2 * ny) +
			0.25 * noise1(frequency * 4 * nx, frequency * 4 * ny) +
			0.13 * noise1(frequency * 8 * nx, frequency * 8 * ny) +
			0.06 * noise1(frequency * 16 * nx, frequency * 16 * ny) +
			0.03 * noise1(frequency * 32 * nx, frequency * 32 * ny)
		e /= 1.0 + 0.5 + 0.25 + 0.13 + 0.06 + 0.03
		e = Math.pow(e, 5.0)
		return e
	}

	const getMoisture = (x, y) => {
		let nx = x / width - 0.5,
			ny = y / height - 0.5
		let m =
			1.0 * noise2(1 * nx, 1 * ny) +
			0.75 * noise2(2 * nx, 2 * ny) +
			0.33 * noise2(4 * nx, 4 * ny) +
			0.33 * noise2(8 * nx, 8 * ny) +
			0.33 * noise2(16 * nx, 16 * ny) +
			0.5 * noise2(32 * nx, 32 * ny)
		m /= 1.0 + 0.75 + 0.33 + 0.33 + 0.33 + 0.5
		return m
	}

	const biome = e => {
		if (e < 0.02) {
			return textures.COASTAL_WATER
		} else {
			return textures.FOREST
		}
	}

	let getTexture = (textures, sum) => {
		const { hasCorridors } = textures
		let sumToTexture = {
			0: textures.single,
			1: textures.endBottom,
			2: hasCorridors ? textures.endLeft : textures.upperLeft,
			3: textures.lowerLeft,
			4: hasCorridors ? textures.endTop : textures.upperLeft,
			5: textures.middleCorridorVertical,
			6: textures.upperLeft,
			7: textures.left,
			8: hasCorridors ? textures.endRight : textures.upperRight,
			9: textures.lowerRight,
			10: textures.middleCorridorHorizontal,
			11: textures.bottom,
			12: textures.upperRight,
			13: textures.right,
			14: textures.top,
			15: textures.center,
			16: textures.lowerRight,
			17: textures.lowerLeft,
			18: textures.altUpperRight,
			19: textures.upperLeft,
			20: textures.middleT,
			21: textures.middleIntersection
		}

		if (sum in sumToTexture) {
			return sumToTexture[sum]
		} else {
			console.warn(`Couldn't find a texture for sum: ${sum} with tile options: ${tileOptions}`)
			return 0
		}
	}

	let computeBitmask = (x, y) => {
		let elevation = getElevation(x, y)
		let texture = biome(elevation)
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
			let [x, y] = coord.split(',')
			let e = getElevation(x, y)
			let textureType = biome(e).type
			return textureType === texture.type || (textureType === 'OCEAN_WATER' && texture.type === 'COASTAL_WATER')
		}

		if (free(above)) sum += 1
		if (free(right)) sum += 2
		if (free(below)) sum += 4
		if (free(left)) sum += 8

		if (sum === 15 && !free(ul) && texture.type === 'COASTAL_WATER') {
			sum = 18
		}

		return { texture: getTexture(texture.textures, sum), type: texture.type, elevation }
	}

	let possible_player_location = null

	const floraFaunaProbability = {
		[wildGrass1]: 25,
		[wildGrass2]: 25,
		[wildGrass3]: 25,
		[wildGrass4]: 25,
		[shrub1]: 1,
		[shrub3]: 1,
		[flower1]: 1,
		[flower2]: 1,
		[flower3]: 1,
		[flower4]: 1,
		[mushroom1]: 1,
		[tree]: 25
	}

	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			let t = computeBitmask(x, y)
			let tile = gameMap.getTile(x, y)
			if (t.type === textures.OCEAN_WATER.type || t.type === textures.COASTAL_WATER.type) {
				// since it's an animated tile, it needs a static texture underneath it
				tile.updateTileInfo(7146)
				tile.updateTileInfo(t.texture)
			} else if (t.type === textures.FOREST.type) {
				tile.updateTileInfo(t.texture)
				if (getRandomInt(0, 4) > 0) {
					let obstacle = ROT.RNG.getWeightedValue(floraFaunaProbability)
					tile.updateTileInfo(obstacle)
				}
				// chance of placing an enemy in the open tiles...
				if (!tile.blocked()) {
					if (getRandomInt(0, 500) === 1) {
						// 1% chance
						let chosenActor = ROT.RNG.getWeightedValue(mobDistribution)
						let possibleActorTextures = actorTextures[chosenActor]
						let randomTexture = possibleActorTextures[getRandomInt(0, possibleActorTextures.length - 1)]
						let actor = createActor(chosenActor, x, y, randomTexture)
						tile.actors.push(actor)
						gameMap.actors.push(actor)
					}
				}
			}
		}
	}

	gameMap.playerLocation = [~~(w / 2), ~~(h / 2)]

	return gameMap
}
