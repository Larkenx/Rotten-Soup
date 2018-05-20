/**
 * Created by larken on 7/4/17.
 */
import ROT from 'rot-js'
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
import Skeleton from '#/entities/actors/enemies/Skeleton.js'
import Zombie from '#/entities/actors/enemies/Zombie.js'
import { Corpse, corpseTypes } from '#/entities/items/misc/Corpse.js'

import Lich from '#/entities/actors/enemies/boss/Lich.js'
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
import { NecromancySpellBook } from '#/entities/items/misc/Spellbook.js'
import Ladder from '#/entities/misc/Ladder.js'
import LevelTransition from '#/entities/misc/LevelTransition.js'
import { getRandomInt, getNormalRandomInt, randomProperty } from '#/utils/HelperFunctions.js'

const actorTextures = {
	ORC: [5292, 5293, 5294, 5295, 5296, 5297, 5299],
	EMPOWERED_ORC: [5298],
	GOBLIN: [7440, 7441, 7442, 7443, 7444, 7445, 7446],
	RAT: [2365],
	BAT: [3704, 3706],
	KOBOLD: [5532, 5533, 5534, 5535, 5536, 5537, 5538, 5539]
}

const dungeonTypes = {
	RUINS: 'RUINS',
	CATACOMBS: 'CATACOMBS',
	MINE: 'MINE',
	ICE: 'ICE',
	HELL: 'HELL'
}

const dungeonThemes = {
	CATACOMBS
}

const floor = {
	upperLeft: 7735,
	top: 7736,
	upperRight: 7737,

	left: 7855,
	center: 7856,
	right: 7857,

	lowerLeft: 7975,
	bottom: 7976,
	lowerRight: 7977,

	endLeft: 7859,
	middleCorridorHorizontal: 7860,
	endRight: 7861,

	endTop: 7738,
	middleCorridorVertical: 7858,
	endBottom: 7978,

	single: 7740
}

const corridorFloor = {
	horizontal: {
		left: 7860,
		middle: 7861,
		right: 7862
	},
	vertical: {
		top: 7739,
		middle: 7859,
		bottom: 7979
	}
}

const walls = {
	upperLeft: 8116,
	top: 8117,
	upperRight: 8118,
	left: 8236,
	center: 8237,
	right: 8236,
	lowerLeft: 8356,
	bottom: 8117,
	lowerRight: 8358,
	endBottom: 8237,
	endTop: 8238,
	island: 8119,

	leftT: 8241,
	middleT: 8240,
	rightT: 8239,
	topT: 8120,
	bottomT: 8360
}

const doors = {
	vertical: 569,
	horizontal: 568
}

const ladders = {
	up: 477,
	down: 479
}

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

/* Returns a randomly generated textured dungeon in GameMap form  */
export function randomDungeon(width, height, dir, level = 1) {
	let gameMap = new GameMap(width, height)

	/* Texture IDs */

	const mobDistribution = {
		ORC: 1 * ~~(level / 4) + 1,
		EMPOWERED_ORC: ~~(level / 4),
		KOBOLD: ~~(level / 3),
		GOBLIN: 10 - ~~(level / 2),
		BAT: 8 - ~~(level / 4),
		RAT: 8 - ~~(level / 4)
	}

	const chestTexture = 57

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
			default:
				throw 'Unidentified actor given to create actor'
		}
	}

	let createdLadders = 0
	let freeCells = {}
	// ROT.RNG.setSeed(1513663807130)
	// console.log(ROT.RNG.getSeed());
	let diggerCallback = function(x, y, blocked) {
		if (!blocked) freeCells[x + ',' + y] = true
	}
	let rogueMap = new ROT.Map.Digger(width, height, {
		roomWidth: [6, 20],
		corrdiorLength: [4, 4],
		roomDugPercentage: 0.4
	}).create(diggerCallback)
	// Initialize obstacles and actors
	let sortCorridors = (a, b) => {
		if (a._startX === a._endX && b._startX !== b._endX) {
			return -1
		} else if (b._startX === b._endX && a._startX !== a._endX) {
			return 1
		} else {
			return 0
		}
	}

	let computeBitmaskFloors = (x, y) => {
		let sum = 0
		let above = `${x},${y - 1}`
		let below = `${x},${y + 1}`
		let left = `${x - 1},${y}`
		let right = `${x + 1},${y}`

		let ur = `${x + 1},${y - 1}`
		let ll = `${x - 1},${y + 1}`

		let ul = `${x - 1},${y - 1}`
		let lr = `${x + 1},${y + 1}`

		let debug = () => {
			console.log(ul in freeCells, above in freeCells)
		}

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

	let computeBitmaskWalls = (x, y) => {
		let sum = 0
		let above = `${x},${y - 1}`
		let below = `${x},${y + 1}`
		let left = `${x - 1},${y}`
		let right = `${x + 1},${y}`

		let ur = `${x + 1},${y - 1}`
		let ll = `${x - 1},${y + 1}`

		let ul = `${x - 1},${y - 1}`
		let lr = `${x + 1},${y + 1}`

		let debug = () => {
			console.log(ul in freeCells, above in freeCells)
		}

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

	let floorSums = {
		/*
            ? 0 ?
            0 1 0
            ? 0 ?
        */
		0: floor.single, // empty space (black spot)
		/*
            ? 1 ?
            0 1 0
            ? 0 ?
        */
		1: floor.endBottom,
		/*
            ? 0 ?
            0 1 1
            ? 0 ?
        */
		2: floor.endLeft,
		/*
            ? 1 ?
            0 1 1
            ? 0 ?
        */
		3: floor.lowerLeft,
		/*
            ? 0 ?
            0 1 0
            ? 1 ?
        */
		4: floor.endTop,
		/*
            ? 1 ?
            0 1 0
            ? 1 ?
        */
		5: floor.middleCorridorVertical,
		/*
            ? 0 ?
            0 1 1
            ? 1 ?
        */
		6: floor.upperLeft,
		/*
            ? 1 ?
            0 1 1
            ? 1 ?
        */
		7: floor.left, // this case is a hard one. Need a new tile that properly ends a wall in one tile
		/*
            ? 0 ?
            1 1 0
            ? 0 ?
        */
		8: floor.endRight,
		/*
            ? 1 ?
            1 1 0
            ? 0 ?
        */
		9: floor.lowerRight,
		/*
            ? 0 ?
            1 1 1
            ? 0 ?
        */
		10: floor.middleCorridorHorizontal, // vertical
		/*
            ? 1 ?
            1 1 1
            ? 0 ?
        */
		11: floor.bottom,
		/*
            ? 0 ?
            1 1 0
            ? 1 ?
        */
		12: floor.upperRight,
		/*
            ? 1 ?
            1 1 0
            ? 1 ?
        */
		13: floor.right,
		/*
            ? 0 ?
            1 1 1
            ? 1 ?
        */
		14: floor.top,
		/*
            ? 1 ?
            1 1 1
            ? 1 ?
        */
		15: floor.center,
		/*
            1 0 ?
            0 1 0
            ? 0 ?
        */
		16: floor.single,
		/*
            ? 0 1
            0 1 0
            ? 0 ?
        */
		17: floor.single,
		/*
            ? 0 ?
            0 1 0
            1 0 ?
        */
		18: floor.single,
		/*
            ? 0 ?
            0 1 0
            ? 0 1
        */
		19: floor.lowerLeft
	}
	let wallSums = {
		/*
            ? 0 ?
            0 0 0
            ? 0 ?
        */
		0: 7046, // empty space (black spot)
		/*
            ? 1 ?
            0 0 0
            ? 0 ?
        */
		1: walls.bottom,
		/*
            ? 0 ?
            0 0 1
            ? 0 ?
        */
		2: walls.left,
		/*
            ? 1 ?
            0 0 1
            ? 0 ?
        */
		3: walls.upperRight,
		/*
            ? 0 ?
            0 0 0
            ? 1 ?
        */
		4: walls.top,
		/*
            ? 1 ?
            0 0 0
            ? 1 ?
        */
		5: walls.top,
		/*
            ? 0 ?
            0 0 1
            ? 1 ?
        */
		6: walls.lowerRight,
		/*
            ? 1 ?
            0 0 1
            ? 1 ?
        */
		7: walls.bottom, // this case is a hard one. Need a new tile that properly ends a wall in one tile
		/*
            ? 0 ?
            1 0 0
            ? 0 ?
        */
		8: walls.right,
		/*
            ? 1 ?
            1 0 0
            ? 0 ?
        */
		9: walls.upperLeft,
		/*
            ? 0 ?
            1 0 1
            ? 0 ?
        */
		10: walls.left, // vertical
		/*
            ? 1 ?
            1 0 1
            ? 0 ?
        */
		11: walls.endTop,
		/*
            ? 0 ?
            1 0 0
            ? 1 ?
        */
		12: walls.lowerLeft,
		/*
            ? 1 ?
            1 0 0
            ? 1 ?
        */
		13: walls.bottom,
		/*
            ? 0 ?
            1 0 1
            ? 1 ?
        */
		14: walls.endBottom,
		/*
            ? 1 ?
            1 0 1
            ? 1 ?
        */
		15: walls.center,
		/*
            1 0 ?
            0 0 0
            ? 0 ?
        */
		16: walls.lowerRight,
		/*
            ? 0 1
            0 0 0
            ? 0 ?
        */
		17: walls.lowerLeft,
		/*
            ? 0 ?
            0 0 0
            1 0 ?
        */
		18: walls.upperRight,
		/*
            ? 0 ?
            0 0 0
            ? 0 1
        */
		19: walls.upperLeft,
		/*
            0 1 0    0 1 0
            0 0 0 || 0 0 0
            1 0 0    0 0 1
        */
		20: walls.middleT
	}

	// we want to start +1 from the top and left, and bottom and right -1
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			let tile = gameMap.getTile(x, y)
			if (!(`${x},${y}` in freeCells)) {
				// only want to place a wall somewhere if it's not a free cell
				let sum = computeBitmaskWalls(x, y)
				let sym = wallSums[sum] + 1
				tile.updateTileInfo(sym)
			} else {
				let sum = computeBitmaskFloors(x, y)
				let sym = floorSums[sum] + 1
				tile.updateTileInfo(sym)
			}
		}
	}

	/* For every room in the dungeon, we're going to add
     * textures from the tileset for the walls and the floors */
	for (let room of rogueMap.getRooms()) {
		let left = room.getLeft() - 1
		let right = room.getRight() + 1
		let top = room.getTop() - 1
		let bottom = room.getBottom() + 1
		let wleft = room.getLeft()
		let wright = room.getRight()
		let wtop = room.getTop()
		let wbottom = room.getBottom()
		let center = {
			y: ~~((wtop + wbottom) / 2),
			x: ~~((wright + wleft) / 2)
		}

		/* Set up the doors of the room */
		room.getDoors((dx, dy) => {
			let floor_ids =
				Object.values(corridorFloor.vertical) +
				Object.values(floor) +
				Object.values(corridorFloor.horizontal) +
				Object.values(floor) // doors?

			let above = gameMap.getTile(dx, dy - 1).obstacles[0].id
			let below = gameMap.getTile(dx, dy + 1).obstacles[0].id
			let door
			if (floor_ids.includes(above - 1) && floor_ids.includes(below - 1)) {
				// horizontal door frame
				door = new Door(dx, dy, doors.horizontal)
			} else {
				// vertical door frame
				door = new Door(dx, dy, doors.vertical)
			}
			gameMap.getTile(dx, dy).actors.push(door)
			gameMap.actors.push(door)
			// since we want to put a door here, we need to make sure a wall wasn't put here before
			let sum = computeBitmaskFloors(dx, dy)
			let sym = floorSums[sum] + 1
			gameMap.getTile(dx, dy).obstacles = []
			gameMap.getTile(dx, dy).updateTileInfo(sym)
		})

		// Now, we can mess around with the centers of each room and place items in the dungeons
		// this places a ladder going further into the dungeon (either deeper or higher)
		let roll = getRandomInt(1, rogueMap.getRooms().length)
		if (roll == 1 || createdLadders == 0) {
			let texture = dir === 'down' ? ladders.up : ladders.down
			let ladder = new Ladder(center.x, center.y, texture, 'down')
			gameMap.getTile(center.x, center.y).actors.push(ladder)
			gameMap.actors.push(ladder)
			createdLadders++
		}

		// now I want to populate some random creatures in each room of the dungeon.
		let validTiles = [] // all the non-wall tiles in the room that don't already a ladder
		let possibleWalls = Object.values(walls)
		for (let y = wtop; y < wbottom; y++) {
			for (let x = wleft; x < wright; x++) {
				if (!gameMap.getTile(x, y).blocked()) validTiles.push(x + ',' + y)
			}
		}

		roll = getNormalRandomInt(1, 5)
		for (let i = 0; i < roll; i++) {
			let coords = randomTile(validTiles)
			if (coords === null) break
			let [x, y] = coords
			let chosenActor = ROT.RNG.getWeightedValue(mobDistribution)
			let possibleActorTextures = actorTextures[chosenActor]
			let randomTexture = possibleActorTextures[getRandomInt(0, possibleActorTextures.length - 1)]
			let actor = createActor(chosenActor, x, y, randomTexture)
			gameMap.getTile(x, y).actors.push(actor)
			gameMap.actors.push(actor)
		}
		// if there atleast 4 enemies in the room, drop a chest in the room too!
		if (roll >= 4) {
			let coords = randomTile(validTiles)
			if (coords !== null) {
				let [x, y] = coords
				let chest = new Chest(x, y, chestTexture)
				gameMap.getTile(x, y).actors.push(chest)
				gameMap.actors.push(chest)
			}
		}
	}

	// Randomly select starting position for player
	let start = randomProperty(freeCells).split(',')
	let [x, y] = start.map(s => parseInt(s))
	gameMap.playerLocation = [x, y]
	// gameMap.getTile(x, y).actors.push(new Player(x, y, Game.playerID + 1)) // set random spot to be the player
	let ladder = new Ladder(x, y, ladders.up, 'up')
	gameMap.getTile(x, y).actors.push(ladder)
	gameMap.actors.push(ladder)
	return gameMap
}
