// /**
//  * Created by larken on 7/4/17.
//  */
// import ROT from 'rot-js'
// import { Game } from '#/Game.js'
// import { GameMap } from '#/map/GameMap.js'
// import Player from '#/entities/actors/Player.js'
// import NPC from '#/entities/actors/NPC.js'
// // Enemies
// import Goblin from '#/entities/actors/enemies/Goblin.js'
// import Kobold from '#/entities/actors/enemies/Kobold.js'
// import Orc from '#/entities/actors/enemies/Orc.js'
// import Rat from '#/entities/actors/enemies/Rat.js'
// import Bat from '#/entities/actors/enemies/Bat.js'
// import Skeleton from '#/entities/actors/enemies/Skeleton.js'
// import Zombie from '#/entities/actors/enemies/Zombie.js'
// import { Corpse, corpseTypes } from '#/entities/items/misc/Corpse.js'

// import Lich from '#/entities/actors/enemies/boss/Lich.js'
// // Items
// // Weapons
// import { createSword, Sword } from '#/entities/items/weapons/Sword.js'
// import { Bow, createBow } from '#/entities/items/weapons/ranged/Bow.js'
// import { SteelArrow } from '#/entities/items/weapons/ranged/ammo/Arrow.js'
// // Potions
// import HealthPotion from '#/entities/items/potions/HealthPotion.js'
// import StrengthPotion from '#/entities/items/potions/StrengthPotion.js'
// import ManaPotion from '#/entities/items/potions/ManaPotion.js'
// // Misc
// import Chest from '#/entities/misc/Chest.js'
// import Door from '#/entities/misc/Door.js'
// import LockedDoor from '#/entities/misc/LockedDoor.js'
// import Key from '#/entities/items/misc/Key.js'
// import { NecromancySpellBook } from '#/entities/items/misc/Spellbook.js'
// import Ladder from '#/entities/misc/Ladder.js'
// import LevelTransition from '#/entities/misc/LevelTransition.js'
// import { getRandomInt, getNormalRandomInt, randomProperty } from '#/utils/HelperFunctions.js'

// const actorTextures = {
// 	ORC: [5292, 5293, 5294, 5295, 5296, 5297, 5299],
// 	EMPOWERED_ORC: [5298],
// 	GOBLIN: [7440, 7441, 7442, 7443, 7444, 7445, 7446],
// 	RAT: [2365],
// 	BAT: [3704, 3706],
// 	KOBOLD: [5532, 5533, 5534, 5535, 5536, 5537, 5538, 5539]
// }

// const flatten = arr => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), [])

// // function that will yield a random free space in the room
// const randomTile = validTiles => {
// 	let index = getRandomInt(0, validTiles.length) // index of a tile
// 	let tile = validTiles.splice(index, 1)
// 	if (tile.length === 1) {
// 		return tile[0].split(',').map(e => Number(e))
// 	} else {
// 		return null
// 	}
// }

// export function randomCave(width, height, dir, level = 1) {
// 	let map = {}
// 	let createdLadders = 0
// 	map.revealed = true
// 	map.width = width
// 	map.height = height
// 	map.layers = [
// 		{
// 			data: [],
// 			properties: {
// 				obstacles: true
// 			}
// 		},
// 		{
// 			data: [],
// 			properties: {
// 				obstacles: true
// 			}
// 		},
// 		{
// 			data: [],
// 			properties: {
// 				actors: true
// 			}
// 		},
// 		{
// 			data: [],
// 			properties: {
// 				actors: true
// 			}
// 		}
// 	]
// 	let freeCells = {}
// 	let mapCallback = function(x, y, blocked) {
// 		if (!blocked) freeCells[x + ',' + y] = true
// 	}
// 	let cellularMap = new ROT.Map.Cellular(width, height)
// 	cellularMap.randomize(0.5)
// 	for (let i = 0; i < 10; i++) cellularMap.create()

// 	cellularMap.connect(mapCallback)

// 	// Initialize obstacles and actors
// 	for (let j = 0; j < height; j++) {
// 		for (let l = 0; l < map.layers.length; l++) map.layers[l].data.push([])

// 		for (let i = 0; i < width; i++) {
// 			if (i + ',' + j in freeCells) map.layers[0].data[j].push(9297 + 1)
// 			else map.layers[0].data[j].push(9200 + 1)

// 			map.layers[1].data[j].push(0)
// 			map.layers[2].data[j].push(0)
// 			map.layers[3].data[j].push(0)
// 		}
// 	}

// 	let walls = {
// 		upperLeft: 9197,
// 		top: 9198,
// 		upperRight: 9199,
// 		left: 9317,
// 		center: 9318,
// 		right: 9317,
// 		lowerLeft: 9437,
// 		bottom: 9198,
// 		lowerRight: 9439,
// 		endBottom: 9318,
// 		endTop: 9319,

// 		middleT: 9201,
// 		middleIntersection: 9321
// 	}

// 	let floors = {
// 		upperLeft: 9176,
// 		top: 9177,
// 		upperRight: 9178,
// 		left: 9296,
// 		center: 9297,
// 		right: 9298,
// 		lowerLeft: 9416,
// 		bottom: 9417,
// 		lowerRight: 9418,

// 		endLeft: 9300,
// 		middleCorridorHorizontal: 9301,
// 		endRight: 9302,

// 		endTop: 9179,
// 		middleCorridorVertical: 9299,
// 		endBottom: 9419,

// 		single: 9181
// 	}

// 	let computeBitmask = (x, y) => {
// 		let sum = 0
// 		let above = `${x},${y - 1}`
// 		let below = `${x},${y + 1}`
// 		let left = `${x - 1},${y}`
// 		let right = `${x + 1},${y}`

// 		let ur = `${x + 1},${y - 1}`
// 		let ll = `${x - 1},${y + 1}`

// 		let ul = `${x - 1},${y - 1}`
// 		let lr = `${x + 1},${y + 1}`

// 		let free = coords => {
// 			return coords in freeCells
// 		}

// 		if (free(above)) sum += 1
// 		if (free(right)) sum += 2
// 		if (free(below)) sum += 4
// 		if (free(left)) sum += 8

// 		if (sum == 0) {
// 			if ((free(ll) && free(ur)) || (free(ul) && free(lr))) return 21
// 			else if (free(ul) && free(above) && free(lr)) return 20
// 			else if (free(lr) && free(below) && free(ul)) return 20
// 			else if (free(ul)) return 16
// 			else if (free(ur)) return 17
// 			else if (free(ll)) return 18
// 			else if (free(lr)) return 19
// 		}

// 		return sum
// 	}

// 	let wallSums = {
// 		/*
//             ? 0 ?
//             0 0 0
//             ? 0 ?
//         */
// 		0: 7046, // empty space (black spot)
// 		/*
//             ? 1 ?
//             0 0 0
//             ? 0 ?
//         */
// 		1: walls.bottom,
// 		/*
//             ? 0 ?
//             0 0 1
//             ? 0 ?
//         */
// 		2: walls.left,
// 		/*
//             ? 1 ?
//             0 0 1
//             ? 0 ?
//         */
// 		3: walls.upperRight,
// 		/*
//             ? 0 ?
//             0 0 0
//             ? 1 ?
//         */
// 		4: walls.top,
// 		/*
//             ? 1 ?
//             0 0 0
//             ? 1 ?
//         */
// 		5: walls.top,
// 		/*
//             ? 0 ?
//             0 0 1
//             ? 1 ?
//         */
// 		6: walls.lowerRight,
// 		/*
//             ? 1 ?
//             0 0 1
//             ? 1 ?
//         */
// 		7: walls.bottom, // this case is a hard one. Need a new tile that properly ends a wall in one tile
// 		/*
//             ? 0 ?
//             1 0 0
//             ? 0 ?
//         */
// 		8: walls.right,
// 		/*
//             ? 1 ?
//             1 0 0
//             ? 0 ?
//         */
// 		9: walls.upperLeft,
// 		/*
//             ? 0 ?
//             1 0 1
//             ? 0 ?
//         */
// 		10: walls.left, // vertical
// 		/*
//             ? 1 ?
//             1 0 1
//             ? 0 ?
//         */
// 		11: walls.endTop,
// 		/*
//             ? 0 ?
//             1 0 0
//             ? 1 ?
//         */
// 		12: walls.lowerLeft,
// 		/*
//             ? 1 ?
//             1 0 0
//             ? 1 ?
//         */
// 		13: walls.bottom,
// 		/*
//             ? 0 ?
//             1 0 1
//             ? 1 ?
//         */
// 		14: walls.endBottom,
// 		/*
//             ? 1 ?
//             1 0 1
//             ? 1 ?
//         */
// 		15: walls.center,
// 		/*
//             1 0 ?
//             0 0 0
//             ? 0 ?
//         */
// 		16: walls.lowerRight,
// 		/*
//             ? 0 1
//             0 0 0
//             ? 0 ?
//         */
// 		17: walls.lowerLeft,
// 		/*
//             ? 0 ?
//             0 0 0
//             1 0 ?
//         */
// 		18: walls.upperRight,
// 		/*
//             ? 0 ?
//             0 0 0
//             ? 0 1
//         */
// 		19: walls.upperLeft,
// 		/*
//             1 1 0    1 0 0
//             0 0 0 || 0 0 0
//             0 0 1    0 1 1
//         */
// 		20: walls.middleT,
// 		/*
//             0 0 1    1 0 0
//             0 0 0 || 0 0 0
//             1 0 0    0 0 1
//         */
// 		21: walls.middleIntersection
// 	}

// 	let floorSums = {
// 		/*
//             ? 0 ?
//             0 1 0
//             ? 0 ?
//         */
// 		0: floors.single, // empty space (black spot)
// 		/*
//             ? 1 ?
//             0 1 0
//             ? 0 ?
//         */
// 		1: floors.endBottom,
// 		/*
//             ? 0 ?
//             0 1 1
//             ? 0 ?
//         */
// 		2: floors.endLeft,
// 		/*
//             ? 1 ?
//             0 1 1
//             ? 0 ?
//         */
// 		3: floors.lowerLeft,
// 		/*
//             ? 0 ?
//             0 1 0
//             ? 1 ?
//         */
// 		4: floors.endTop,
// 		/*
//             ? 1 ?
//             0 1 0
//             ? 1 ?
//         */
// 		5: floors.middleCorridorVertical,
// 		/*
//             ? 0 ?
//             0 1 1
//             ? 1 ?
//         */
// 		6: floors.upperLeft,
// 		/*
//             ? 1 ?
//             0 1 1
//             ? 1 ?
//         */
// 		7: floors.left, // this case is a hard one. Need a new tile that properly ends a wall in one tile
// 		/*
//             ? 0 ?
//             1 1 0
//             ? 0 ?
//         */
// 		8: floors.endRight,
// 		/*
//             ? 1 ?
//             1 1 0
//             ? 0 ?
//         */
// 		9: floors.lowerRight,
// 		/*
//             ? 0 ?
//             1 1 1
//             ? 0 ?
//         */
// 		10: floors.middleCorridorHorizontal, // vertical
// 		/*
//             ? 1 ?
//             1 1 1
//             ? 0 ?
//         */
// 		11: floors.bottom,
// 		/*
//             ? 0 ?
//             1 1 0
//             ? 1 ?
//         */
// 		12: floors.upperRight,
// 		/*
//             ? 1 ?
//             1 1 0
//             ? 1 ?
//         */
// 		13: floors.right,
// 		/*
//             ? 0 ?
//             1 1 1
//             ? 1 ?
//         */
// 		14: floors.top,
// 		/*
//             ? 1 ?
//             1 1 1
//             ? 1 ?
//         */
// 		15: floors.center,
// 		/*
//             1 0 ?
//             0 1 0
//             ? 0 ?
//         */
// 		16: floors.single,
// 		/*
//             ? 0 1
//             0 1 0
//             ? 0 ?
//         */
// 		17: floors.single,
// 		/*
//             ? 0 ?
//             0 1 0
//             1 0 ?
//         */
// 		18: floors.single,
// 		/*
//             ? 0 ?
//             0 1 0
//             ? 0 1
//         */
// 		19: floors.lowerLeft,
// 		/*
//             1 1 0    1 0 0
//             0 1 0 || 0 1 0
//             0 0 1    0 1 1
//         */
// 		20: floors.middleT
// 	}

// 	// we want to start +1 from the top and left, and bottom and right -1
// 	for (let y = 0; y < height; y++) {
// 		for (let x = 0; x < width; x++) {
// 			if (!(`${x},${y}` in freeCells)) {
// 				// only want to place a wall somewhere if it's not a free cell
// 				let sum = computeBitmask(x, y)
// 				let sym = wallSums[sum] + 1
// 				map.layers[0].data[y][x] = sym
// 			} else {
// 				let sum = computeBitmask(x, y)
// 				let sym = floorSums[sum] + 1
// 				map.layers[0].data[y][x] = sym
// 			}
// 		}
// 	}

// 	let validTiles = Object.keys(freeCells)
// 	// Randomly select starting position for player
// 	let start = randomTile(validTiles)
// 	if (start === null) throw 'Could not find an open spot on the map to place the player!'

// 	map.layers[2].data[start[1]][start[0]] = Game.playerID // set random spot to be the player
// 	map.layers[3].data[start[1]][start[0]] = dir === 'down' ? 238 : 237 // place a ladder going back up a level underneath the player.

// 	let ladderGoingDown = randomTile(validTiles)
// 	map.layers[2].data[ladderGoingDown[1]][ladderGoingDown[0]] = dir === 'down' ? 237 : 238
// 	ladderGoingDown = randomTile(validTiles)
// 	map.layers[2].data[ladderGoingDown[1]][ladderGoingDown[0]] = dir === 'down' ? 237 : 238

// 	let roll = getNormalRandomInt(7 + level, 25 + level)
// 	for (let i = 0; i < roll; i++) {
// 		let coords = randomTile(validTiles)
// 		if (coords === null) break
// 		let chosenMob = ROT.RNG.getWeightedValue(mobDistribution)
// 		let mobArray = actorTextures[chosenMob]
// 		let actor = createActor(chosenMob)
// 		let randomMob = mobArray[getRandomInt(0, mobArray.length - 1)] + 1
// 		map.layers[2].data[coords[1]][coords[0]] = randomMob
// 	}

// 	// Flatten the layers to mimic Tiled map data
// 	for (let i = 0; i < map.layers.length; i++) map.layers[i].data = flatten(map.layers[i].data)

// 	return map
// }
