/**
 * Created by larken on 7/4/17.
 */
import ROT from 'rot-js'
import { Game } from '#/Game.js'
import { GameMap } from '#/map/GameMap.js'
import { prefabs } from '#/map/Prefab.js'
import Player from '#/entities/actors/Player.js'

// Misc
import Chest from '#/entities/misc/Chest.js'
import Door from '#/entities/misc/Door.js'
import LockedDoor from '#/entities/misc/LockedDoor.js'
import Key from '#/entities/items/misc/Key.js'
import { NecromancySpellBook } from '#/entities/items/misc/Spellbook.js'
import Ladder from '#/entities/misc/Ladder.js'
import LevelTransition from '#/entities/misc/LevelTransition.js'
import { getRandomInt, getNormalRandomInt, randomProperty } from '#/utils/HelperFunctions.js'
import { createActor, getItemsFromDropTable } from '#/utils/EntityFactory.js'

import * as PIXI from 'pixi.js' // for importing the prefabs from PIXI.loader.resources

const dungeonTypes = {
	RUINS: 'RUINS',
	CATACOMBS: 'CATACOMBS',
	MINE: 'MINE',
	ICE: 'ICE',
	HELL: 'HELL'
}

const dungeonThemes = {
	RUINS: {
		tint: null,
		mobDistribution: {
			ORC: 1,
			GOBLIN: 15,
			BAT: 10,
			RAT: 15,
			SNAKE: 10
		},
		type: dungeonTypes.RUINS,
		dropTable: {
			STRENGTH_POTION: { chance: 25 },
			HEALTH_POTION: { chance: 30 },
			STEEL_ARROW: { chance: 30 },
			MANA_POTION: { chance: 30 },
			GOLD: { chance: 40, options: { quantity: getRandomInt(10, 30) } },
			IRON_SWORD: { chance: 15, options: { materialType: 'IRON' } },
			IRON_BATTLEAXE: { chance: 15, options: { materialType: 'IRON' } },
			IRON_CHEST_ARMOR: { chance: 15, options: { materialType: 'IRON' } },
			IRON_LEG_ARMOR: { chance: 15, options: { materialType: 'IRON' } },
			IRON_HELMET: { chance: 15, options: { materialType: 'IRON' } },
			IRON_BOOTS: { chance: 15, options: { materialType: 'IRON' } }
		},
		textures: {
			floor: {
				upperLeft: 7736,
				top: 7737,
				upperRight: 7738,

				left: 7856,
				center: 7857,
				right: 7858,

				lowerLeft: 7976,
				bottom: 7977,
				lowerRight: 7978,

				endLeft: 7860,
				middleCorridorHorizontal: 7861,
				endRight: 7862,

				endTop: 7739,
				middleCorridorVertical: 7859,
				endBottom: 7979,

				single: 7740
			},
			corridorFloor: {
				horizontal: {
					left: 7861,
					middle: 7862,
					right: 7863
				},
				vertical: {
					top: 7740,
					middle: 7860,
					bottom: 7980
				}
			},
			walls: {
				upperLeft: 8117,
				top: 8118,
				upperRight: 8119,
				left: 8237,
				center: 8238,
				right: 8237,
				lowerLeft: 8357,
				bottom: 8118,
				lowerRight: 8359,
				endBottom: 8238,
				endTop: 8239,
				island: 8120,

				leftT: 8242,
				middleT: 8241,
				rightT: 8240,
				topT: 8121,
				bottomT: 8361
			},
			doors: {
				vertical: 569,
				horizontal: 568
			}
		}
	},
	CATACOMBS: {
		type: dungeonTypes.CATACOMBS,
		tint: null,
		mobDistribution: {
			ZOMBIE: 30,
			SKELETON: 30,
			MUMMY: 30,
			GHOST: 10,
			BANSHEE: 5,
			VAMPIRE: 1
		},
		dropTable: {
			STRENGTH_POTION: { chance: 25 },
			HEALTH_POTION: { chance: 30 },
			STEEL_ARROW: { chance: 30 },
			MANA_POTION: { chance: 30 },
			GOLD: { chance: 40, options: { quantity: getRandomInt(10, 30) } },
			STEEL_SWORD: { chance: 13, options: { materialType: 'STEEL' } },
			STEEL_BATTLEAXE: { chance: 13, options: { materialType: 'STEEL' } },
			STEEL_CHEST_ARMOR: { chance: 13, options: { materialType: 'STEEL' } },
			STEEL_LEG_ARMOR: { chance: 13, options: { materialType: 'STEEL' } },
			STEEL_HELMET: { chance: 13, options: { materialType: 'STEEL' } },
			STEEL_BOOTS: { chance: 13, options: { materialType: 'STEEL' } }
		},
		textures: {
			floor: {
				upperLeft: 8096,
				top: 8097,
				upperRight: 8098,
				left: 8216,
				center: 8217,
				right: 8218,
				lowerLeft: 8336,
				bottom: 8337,
				lowerRight: 8338,
				endLeft: 8220,
				middleCorridorHorizontal: 8221,
				endRight: 8222,
				endTop: 8099,
				middleCorridorVertical: 8219,
				endBottom: 8339,
				single: 8100
			},
			corridorFloor: {
				horizontal: {
					left: 8221,
					middle: 8222,
					right: 8223
				},
				vertical: {
					top: 8100,
					middle: 8220,
					bottom: 8340
				}
			},
			walls: {
				upperLeft: 8477,
				top: 8478,
				upperRight: 8479,
				left: 8597,
				center: 8598,
				right: 8597,
				lowerLeft: 8717,
				bottom: 8478,
				lowerRight: 8719,
				endBottom: 8598,
				endTop: 8599,
				island: 8480,
				leftT: 8602,
				middleT: 8601,
				rightT: 8600,
				topT: 8481,
				bottomT: 8721
			},
			doors: {
				vertical: 569,
				horizontal: 568
			}
		}
	},
	MINE: {
		type: dungeonTypes.MINE,
		tint: null,
		mobDistribution: {
			KOBOLD: 2,
			MINOTAUR: 1,
			GOBLIN: 5,
			ORC: 5,
			EMPOWERED_ORC: 5,
			BONE_MAN: 10,
			GOLEM: 1
		},
		dropTable: {
			STRENGTH_POTION: { chance: 25 },
			HEALTH_POTION: { chance: 30 },
			STEEL_ARROW: { chance: 30 },
			MANA_POTION: { chance: 30 },
			GOLD: { chance: 40, options: { quantity: getRandomInt(10, 30) } },
			MITHRIL_SWORD: { chance: 10, options: { materialType: 'MITHRIL' } },
			MITHRIL_BATTLEAXE: { chance: 10, options: { materialType: 'MITHRIL' } },
			MITHRIL_CHEST_ARMOR: { chance: 10, options: { materialType: 'MITHRIL' } },
			MITHRIL_LEG_ARMOR: { chance: 10, options: { materialType: 'MITHRIL' } },
			MITHRIL_HELMET: { chance: 10, options: { materialType: 'MITHRIL' } },
			MITHRIL_BOOTS: { chance: 10, options: { materialType: 'MITHRIL' } }
		},
		textures: {
			floor: {
				upperLeft: 9176,
				top: 9177,
				upperRight: 9178,
				left: 9296,
				center: 9297,
				right: 9298,
				lowerLeft: 9416,
				bottom: 9417,
				lowerRight: 9418,
				endLeft: 9300,
				middleCorridorHorizontal: 9301,
				endRight: 9302,
				endTop: 9179,
				middleCorridorVertical: 9299,
				endBottom: 9419,
				single: 9180
			},
			corridorFloor: {
				horizontal: {
					left: 9301,
					middle: 9302,
					right: 9303
				},
				vertical: {
					top: 9180,
					middle: 9300,
					bottom: 9420
				}
			},
			walls: {
				upperLeft: 7771,
				top: 7772,
				upperRight: 7773,
				left: 7891,
				center: 7892,
				right: 7891,
				lowerLeft: 8011,
				bottom: 7772,
				lowerRight: 8013,
				endBottom: 7892,
				endTop: 7893,
				island: 7774,
				leftT: 7896,
				middleT: 7895,
				rightT: 7894,
				topT: 7775,
				bottomT: 8015
			},
			doors: {
				vertical: 569,
				horizontal: 568
			}
		}
	},
	ICE: {
		type: dungeonTypes.ICE,
		tint: null,
		mobDistribution: {
			CYCLOPS: 1,
			TROLL: 3,
			MINOTAUR: 1,
			ICE_ELEMENTAL: 3,
			SKELETON: 20,
			IMP: 10,
			SIREN: 1
		},
		dropTable: {
			STRENGTH_POTION: { chance: 25 },
			HEALTH_POTION: { chance: 30 },
			STEEL_ARROW: { chance: 30 },
			MANA_POTION: { chance: 30 },
			GOLD: { chance: 40, options: { quantity: getRandomInt(10, 30) } },
			ADAMANTIUM_SWORD: { chance: 8, options: { materialType: 'ADAMANTIUM' } },
			ADAMANTIUM_BATTLEAXE: { chance: 8, options: { materialType: 'ADAMANTIUM' } },
			ADAMANTIUM_CHEST_ARMOR: { chance: 8, options: { materialType: 'ADAMANTIUM' } },
			ADAMANTIUM_LEG_ARMOR: { chance: 8, options: { materialType: 'ADAMANTIUM' } },
			ADAMANTIUM_HELMET: { chance: 8, options: { materialType: 'ADAMANTIUM' } },
			ADAMANTIUM_BOOTS: { chance: 8, options: { materialType: 'ADAMANTIUM' } }
		},
		textures: {
			floor: {
				upperLeft: 7376,
				top: 7377,
				upperRight: 7378,
				left: 7496,
				center: 7497,
				right: 7498,
				lowerLeft: 7616,
				bottom: 7617,
				lowerRight: 7618,
				endLeft: 7500,
				middleCorridorHorizontal: 7501,
				endRight: 7502,
				endTop: 7379,
				middleCorridorVertical: 7499,
				endBottom: 7619,
				single: 7380
			},
			corridorFloor: {
				horizontal: {
					left: 7501,
					middle: 7502,
					right: 7503
				},
				vertical: {
					top: 7380,
					middle: 7500,
					bottom: 7620
				}
			},
			walls: {
				upperLeft: 7757,
				top: 7758,
				upperRight: 7759,
				left: 7877,
				center: 7878,
				right: 7877,
				lowerLeft: 7997,
				bottom: 7758,
				lowerRight: 7999,
				endBottom: 7878,
				endTop: 7879,
				island: 7760,
				leftT: 7882,
				middleT: 7881,
				rightT: 7880,
				topT: 7761,
				bottomT: 8001
			},
			doors: {
				vertical: 569,
				horizontal: 568
			}
		}
	},
	HELL: {
		type: dungeonTypes.HELL,
		tint: '0xba1b21',
		mobDistribution: {
			ORC: 2,
			EMPOWERED_ORC: 1,
			KOBOLD: 1,
			GOBLIN: 7,
			BAT: 10,
			RAT: 10
		},
		textures: {
			floor: {
				upperLeft: 7736,
				top: 7737,
				upperRight: 7738,
				left: 7856,
				center: 7857,
				right: 7858,
				lowerLeft: 7976,
				bottom: 7977,
				lowerRight: 7978,
				endLeft: 7860,
				middleCorridorHorizontal: 7861,
				endRight: 7862,
				endTop: 7739,
				middleCorridorVertical: 7859,
				endBottom: 7979,
				single: 7740
			},
			corridorFloor: {
				horizontal: {
					left: 7861,
					middle: 7862,
					right: 7863
				},
				vertical: {
					top: 7740,
					middle: 7860,
					bottom: 7980
				}
			},
			walls: {
				upperLeft: 8117,
				top: 8118,
				upperRight: 8119,
				left: 8237,
				center: 8238,
				right: 8237,
				lowerLeft: 8357,
				bottom: 8118,
				lowerRight: 8359,
				endBottom: 8238,
				endTop: 8239,
				island: 8120,
				leftT: 8242,
				middleT: 8241,
				rightT: 8240,
				topT: 8121,
				bottomT: 8361
			},
			doors: {
				vertical: 569,
				horizontal: 568
			}
		}
	}
}

const ladders = {
	up: 477,
	down: 479
}

const chestTexture = 57

const flatten = arr => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), [])
let computeBitmaskFloors = (x, y, freeCells) => {
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
let computeBitmaskWalls = (x, y, freeCells) => {
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
const getFloorTexture = (floor, sum) => {
	const mapping = {
		0: floor.single, // empty space (black spot)
		1: floor.endBottom,
		2: floor.endLeft,
		3: floor.lowerLeft,
		4: floor.endTop,
		5: floor.middleCorridorVertical,
		6: floor.upperLeft,
		7: floor.left, // this case is a hard one. Need a new tile that properly ends a wall in one tile
		8: floor.endRight,
		9: floor.lowerRight,
		10: floor.middleCorridorHorizontal, // vertical
		11: floor.bottom,
		12: floor.upperRight,
		13: floor.right,
		14: floor.top,
		15: floor.center,
		16: floor.single,
		17: floor.single,
		18: floor.single,
		19: floor.lowerLeft
	}
	return mapping[sum]
}
const getWallTexture = (walls, sum) => {
	const wallSums = {
		0: 7026, // empty space (black spot)
		1: walls.bottom,
		2: walls.left,
		3: walls.upperRight,
		4: walls.top,
		5: walls.top,
		6: walls.lowerRight,
		7: walls.bottom, // this case is a hard one. Need a new tile that properly ends a wall in one tile
		8: walls.right,
		9: walls.upperLeft,
		10: walls.left, // vertical
		11: walls.endTop,
		12: walls.lowerLeft,
		13: walls.bottom,
		14: walls.endBottom,
		15: walls.center,
		16: walls.lowerRight,
		17: walls.lowerLeft,
		18: walls.upperRight,
		19: walls.upperLeft,
		20: walls.middleT
	}
	return wallSums[sum]
}

export function dungeonFromTheme(width, height, theme, mapGenerator, options, hasDoors = true) {
	let { dungeonName, lastDungeon, fromPortal, toPortal, level } = options
	let gameMap = new GameMap(width, height, dungeonName)
	const { tint, type, textures, mobDistribution, dropTable } = theme
	const { floor, corridorFloor, walls, doors } = textures
	// Generate ROT map and store empty tiles in hashm ap
	let createdLadders = 0
	let freeCells = {}
	let mapGeneratorCallback = (x, y, blocked) => {
		if (!blocked) freeCells[x + ',' + y] = true
	}
	let rotMap = mapGenerator.create(mapGeneratorCallback)
	gameMap.dungeon = rotMap

	for (let room of rotMap.getRooms()) {
		room.getDoors((dx, dy) => {
			freeCells[dx + ',' + dy] = true
		})
	}

	// Using bitmasking, texture the floors and walls
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			let tile = gameMap.getTile(x, y)
			if (!(`${x},${y}` in freeCells)) {
				let sym = getWallTexture(walls, computeBitmaskWalls(x, y, freeCells))
				tile.updateTileInfo(sym, tint)
			} else {
				let sym = getFloorTexture(floor, computeBitmaskFloors(x, y, freeCells))
				tile.updateTileInfo(sym, tint)
			}
		}
	}

	// for each room, place doors
	for (let room of rotMap.getRooms()) {
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
			let above = gameMap.getTile(dx, dy - 1)
			let below = gameMap.getTile(dx, dy + 1)
			let left = gameMap.getTile(dx - 1, dy)
			let right = gameMap.getTile(dx + 1, dy)
			const containsDoor = tile => {
				return tile.actors.some(a => {
					return a instanceof Door
				})
			}
			const containsActors = tile => {
				return tile.actors.length > 0
			}
			if (above.blocked() && below.blocked() && !containsActors(left) && !containsActors(right)) {
				// horizontal door frame
				gameMap.getTile(dx, dy).actors.push(new Door(dx, dy, doors.vertical))
			} else if (left.blocked() && right.blocked() && !containsActors(above) && !containsActors(below)) {
				// vertical door frame
				gameMap.getTile(dx, dy).actors.push(new Door(dx, dy, doors.horizontal))
			}
		})
	}

	// create a copy of all the prefabs, and add a boolean flag of whether or
	// not a prefab has been used in the dungeon already
	let availablePrefabs = prefabs.map(p => {
		p.used = false
		return p
	})

	// for each room, try to fit a prefab in it
	for (let room of rotMap.getRooms()) {
		let doors = {}
		room.getDoors((x, y) => {
			doors[`${x},${y}`] = true
		})
		const hasSurroundingDoors = (x, y) => {
			return `${x + 1},${y}` in doors || `${x - 1},${y}` in doors || `${x},${y + 1}` in doors || `${x},${y - 1}` in doors
		}
		const hasDoor = (x, y) => {
			return gameMap.getTile(x, y).actors.some(a => a instanceof Door)
		}
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

		// go through each prefab
		for (let prefab of availablePrefabs) {
			let roomWidth = wright - wleft + 1
			let roomHeight = wbottom - wtop + 1
			let offsetLeft = wleft
			let offsetTop = wtop
			if (prefab.walls) {
				roomWidth = right - left + 1
				roomHeight = bottom - top + 1
				offsetLeft = left
				offsetTop = top
			}
			if (prefab.width === roomWidth && prefab.height === roomHeight) {
				for (let y = 0; y < prefab.height; y++) {
					for (let x = 0; x < prefab.width; x++) {
						prefab.data[y][x].forEach(id => {
							let dx = offsetLeft + x
							let dy = offsetTop + y
							if (`${dx},${dy}` in doors) {
								gameMap.getTile(dx, dy).updateTileInfo(prefab.doorFloorReplacementId)
							} else {
								// check above, below, right, and left for doors because we don't want to block entrances
								gameMap.getTile(dx, dy).updateTileInfo(id)
								if (
									hasSurroundingDoors(dx, dy) &&
									!(x === 0 || y === 0 || x === prefab.width - 1 || y === prefab.height - 1)
								) {
									gameMap.getTile(dx, dy).removeBlockedObstacles()
								}
							}
						})
					}
				}
				break
			}
		}
	}

	// for each room, place doors, chests, ladders/portals, and enemies
	for (let room of rotMap.getRooms()) {
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

		let validTiles = []
		for (let y = wtop; y < wbottom; y++) {
			for (let x = wleft; x < wright; x++) {
				if (!gameMap.getTile(x, y).blocked() && gameMap.getTile(x, y).actors.length === 0) validTiles.push(x + ',' + y)
			}
		}

		// if there hasn't been a ladder to the next level or a portal to the outside, place one
		if (createdLadders < 1) {
			let coords = randomTile(validTiles)
			if (coords !== null) {
				let [x, y] = coords
				if (!lastDungeon) {
					let texture = ladders.down
					let ladder = new Ladder(x, y, texture, 'down', toPortal)
					gameMap.getTile(x, y).actors.push(ladder)
					createdLadders++
				} else {
					let levelTransition = new LevelTransition(x, y, 1169)
					levelTransition.portal = toPortal
					gameMap.getTile(x, y).actors.push(levelTransition)
					createdLadders++
				}
			}
		}

		let roomWidth = right - left
		let roomHeight = bottom - top
		let maxEnemies = roomWidth > 6 && roomHeight > 6 ? 3 : 2
		let minEnemies = roomWidth > 7 && roomHeight > 7 ? 2 : 1

		let roll = getNormalRandomInt(minEnemies, maxEnemies)
		for (let i = 0; i < roll; i++) {
			let coords = randomTile(validTiles)
			if (coords === null) break
			let [x, y] = coords
			let chosenActor = ROT.RNG.getWeightedValue(mobDistribution)
			let actor = createActor(chosenActor, x, y)
			gameMap.getTile(x, y).actors.push(actor)
		}

		// if there atleast 3 enemies in the room, we might drop a chest in the room
		if (getNormalRandomInt(0, 10) === 8) {
			let coords = randomTile(validTiles)
			if (coords !== null) {
				let [x, y] = coords
				let chest = new Chest(x, y, chestTexture)
				let items = getItemsFromDropTable({
					minItems: 1,
					maxItems: 2,
					dropTable,
					x: chest.x,
					y: chest.y
				})
				items.forEach(item => chest.addToInventory(item))
				gameMap.getTile(x, y).actors.push(chest)
			}
		}
	}

	// Randomly select starting position for player
	let start = randomProperty(freeCells).split(',')
	let [x, y] = start.map(s => parseInt(s))
	gameMap.playerLocation = [x, y]
	// gameMap.getTile(x, y).actors.push(new Player(x, y, Game.playerID + 1)) // set random spot to be the player
	let ladder = new Ladder(x, y, ladders.up, 'up', fromPortal)
	gameMap.getTile(x, y).actors.push(ladder)
	gameMap.revealed = true
	gameMap.type = 'dungeon'
	gameMap.depth = level
	return gameMap
}

/* Returns a randomly generated textured dungeon in GameMap form  */
export function randomDungeon(width, height, options) {
	let { level } = options
	let dc = {}
	if (level <= 5) {
		dc = {
			roomWidth: [5, 7],
			roomHeight: [5, 8],
			corridorLength: [4, 6],
			roomDugPercentage: 0.2
		}
		return dungeonFromTheme(width, height, dungeonThemes.RUINS, new ROT.Map.Uniform(width, height, dc), options, false)
	} else if (level <= 10) {
		dc = {
			roomWidth: [3, 6],
			roomHeight: [4, 7],
			corridorLength: [2, 4],
			roomDugPercentage: 0.2
		}
		return dungeonFromTheme(width, height, dungeonThemes.CATACOMBS, new ROT.Map.Digger(width, height, dc), options)
	} else if (level <= 15) {
		dc = {
			roomWidth: [3, 10],
			roomHeight: [4, 10],
			corridorLength: [1, 10],
			roomDugPercentage: 0.4
		}
		return dungeonFromTheme(width, height, dungeonThemes.MINE, new ROT.Map.Uniform(width, height, dc), options, false)
	} else {
		dc = {
			roomWidth: [3, 20],
			roomHeight: [4, 10],
			corridorLength: [4, 4],
			roomDugPercentage: 0.4
		}
		return dungeonFromTheme(width, height, dungeonThemes.ICE, new ROT.Map.Digger(width, height, dc), options)
	}
}

// STRENGTH_POTION: { chance: 25 },
// HEALTH_POTION: { chance: 30 },
// STEEL_ARROW: { chance: 30 },
// MANA_POTION: { chance: 30 },
// GOLD: { chance: 40, options: { quantity: getRandomInt(10, 30) } },
//
// // IRON_SWORD: { chance: 15, options: { materialType: 'IRON' } },
// // STEEL_SWORD: { chance: 13, options: { materialType: 'STEEL' } },
// // MITHRIL_SWORD: { chance: 10, options: { materialType: 'MITHRIL' } },
// // ADAMANTIUM_SWORD: { chance: 8, options: { materialType: 'ADAMANTIUM' } },
// // ORICHALCUM_SWORD: { chance: 6, options: { materialType: 'ORICHALCUM' } },
// // VULCANITE_SWORD: { chance: 5, options: { materialType: 'VULCANITE' } },
// // AQUANITE_SWORD: { chance: 4, options: { materialType: 'AQUANITE' } },
// // VRONITE_SWORD: { chance: 3, options: { materialType: 'VRONITE' } },
// // LOULOUDIUM_SWORD: { chance: 2, options: { materialType: 'LOULOUDIUM' } },
// // ILIOTIUM_SWORD: { chance: 1, options: { materialType: 'ILIOTIUM' } },
// // LEVANTIUM_SWORD: { chance: 1, options: { materialType: 'LEVANTIUM' } },
// //
// // IRON_BATTLEAXE: { chance: 15, options: { materialType: 'IRON' } },
// // STEEL_BATTLEAXE: { chance: 13, options: { materialType: 'STEEL' } },
// // MITHRIL_BATTLEAXE: { chance: 10, options: { materialType: 'MITHRIL' } },
// // ADAMANTIUM_BATTLEAXE: { chance: 8, options: { materialType: 'ADAMANTIUM' } },
// // ORICHALCUM_BATTLEAXE: { chance: 6, options: { materialType: 'ORICHALCUM' } },
// // VULCANITE_BATTLEAXE: { chance: 5, options: { materialType: 'VULCANITE' } },
// // AQUANITE_BATTLEAXE: { chance: 4, options: { materialType: 'AQUANITE' } },
// // VRONITE_BATTLEAXE: { chance: 3, options: { materialType: 'VRONITE' } },
// // LOULOUDIUM_BATTLEAXE: { chance: 2, options: { materialType: 'LOULOUDIUM' } },
// // ILIOTIUM_BATTLEAXE: { chance: 1, options: { materialType: 'ILIOTIUM' } },
// // LEVANTIUM_BATTLEAXE: { chance: 1, options: { materialType: 'LEVANTIUM' } },
// //
// // IRON_CHEST_ARMOR: { chance: 15, options: { materialType: 'IRON' } },
// // STEEL_CHEST_ARMOR: { chance: 13, options: { materialType: 'STEEL' } },
// // MITHRIL_CHEST_ARMOR: { chance: 10, options: { materialType: 'MITHRIL' } },
// // ADAMANTIUM_CHEST_ARMOR: { chance: 8, options: { materialType: 'ADAMANTIUM' } },
// // ORICHALCUM_CHEST_ARMOR: { chance: 6, options: { materialType: 'ORICHALCUM' } },
// // VULCANITE_CHEST_ARMOR: { chance: 5, options: { materialType: 'VULCANITE' } },
// // AQUANITE_CHEST_ARMOR: { chance: 4, options: { materialType: 'AQUANITE' } },
// // VRONITE_CHEST_ARMOR: { chance: 3, options: { materialType: 'VRONITE' } },
// // LOULOUDIUM_CHEST_ARMOR: { chance: 2, options: { materialType: 'LOULOUDIUM' } },
// // ILIOTIUM_CHEST_ARMOR: { chance: 1, options: { materialType: 'ILIOTIUM' } },
// // LEVANTIUM_CHEST_ARMOR: { chance: 1, options: { materialType: 'LEVANTIUM' } },
// //
// // IRON_LEG_ARMOR: { chance: 15, options: { materialType: 'IRON' } },
// // STEEL_LEG_ARMOR: { chance: 13, options: { materialType: 'STEEL' } },
// // MITHRIL_LEG_ARMOR: { chance: 10, options: { materialType: 'MITHRIL' } },
// // ADAMANTIUM_LEG_ARMOR: { chance: 8, options: { materialType: 'ADAMANTIUM' } },
// // ORICHALCUM_LEG_ARMOR: { chance: 6, options: { materialType: 'ORICHALCUM' } },
// // VULCANITE_LEG_ARMOR: { chance: 5, options: { materialType: 'VULCANITE' } },
// // AQUANITE_LEG_ARMOR: { chance: 4, options: { materialType: 'AQUANITE' } },
// // VRONITE_LEG_ARMOR: { chance: 3, options: { materialType: 'VRONITE' } },
// // LOULOUDIUM_LEG_ARMOR: { chance: 2, options: { materialType: 'LOULOUDIUM' } },
// // ILIOTIUM_LEG_ARMOR: { chance: 1, options: { materialType: 'ILIOTIUM' } },
// // LEVANTIUM_LEG_ARMOR: { chance: 1, options: { materialType: 'LEVANTIUM' } },
// //
// // IRON_HELMET: { chance: 15, options: { materialType: 'IRON' } },
// // STEEL_HELMET: { chance: 13, options: { materialType: 'STEEL' } },
// // MITHRIL_HELMET: { chance: 10, options: { materialType: 'MITHRIL' } },
// // ADAMANTIUM_HELMET: { chance: 8, options: { materialType: 'ADAMANTIUM' } },
// // ORICHALCUM_HELMET: { chance: 6, options: { materialType: 'ORICHALCUM' } },
// // VULCANITE_HELMET: { chance: 5, options: { materialType: 'VULCANITE' } },
// // AQUANITE_HELMET: { chance: 4, options: { materialType: 'AQUANITE' } },
// // VRONITE_HELMET: { chance: 3, options: { materialType: 'VRONITE' } },
// // LOULOUDIUM_HELMET: { chance: 2, options: { materialType: 'LOULOUDIUM' } },
// // ILIOTIUM_HELMET: { chance: 1, options: { materialType: 'ILIOTIUM' } },
// // LEVANTIUM_HELMET: { chance: 1, options: { materialType: 'LEVANTIUM' } },
// //
// // IRON_BOOTS: { chance: 15, options: { materialType: 'IRON' } },
// // STEEL_BOOTS: { chance: 13, options: { materialType: 'STEEL' } },
// // MITHRIL_BOOTS: { chance: 10, options: { materialType: 'MITHRIL' } },
// // ADAMANTIUM_BOOTS: { chance: 8, options: { materialType: 'ADAMANTIUM' } },
// // ORICHALCUM_BOOTS: { chance: 6, options: { materialType: 'ORICHALCUM' } },
// // VULCANITE_BOOTS: { chance: 5, options: { materialType: 'VULCANITE' } },
// // AQUANITE_BOOTS: { chance: 4, options: { materialType: 'AQUANITE' } },
// // VRONITE_BOOTS: { chance: 3, options: { materialType: 'VRONITE' } },
// // LOULOUDIUM_BOOTS: { chance: 2, options: { materialType: 'LOULOUDIUM' } },
// // ILIOTIUM_BOOTS: { chance: 1, options: { materialType: 'ILIOTIUM' } },
// // LEVANTIUM_BOOTS: { chance: 1, options: { materialType: 'LEVANTIUM' } }
