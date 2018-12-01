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
import { getRandomInt, getNormalRandomInt, computeBitmaskFloors, computeBitmaskWalls, randomProperty } from '#/utils/HelperFunctions.js'
import { createActor, getItemsFromDropTable } from '#/utils/EntityFactory.js'
// Wall & Floor textures
import { wallTypes, floorTypes } from '#/utils/Constants.js'
import data from '#/utils/data/data.xlsx'
import xlsx from 'xlsx'

const wallTexturesData = xlsx.utils.sheet_to_json(data.Sheets['Wall Textures'], { raw: true })
const floorTexturesData = xlsx.utils.sheet_to_json(data.Sheets['Floor Textures'], { raw: true })

const wallTextures = {}
const floorTextures = {}

wallTexturesData.forEach(wt => (wallTextures[wt.id] = { ...wt }))
floorTexturesData.forEach(ft => (floorTextures[ft.id] = { ...ft }))

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
		floorType: floorTypes.STONE,
		wallType: wallTypes.DARK_STONE,
		doors: {
			vertical: 569,
			horizontal: 568
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
		floorType: floorTypes.STONE,
		wallType: wallTypes.DARK_STONE,
		doors: {
			vertical: 569,
			horizontal: 568
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
		floorType: floorTypes.STONE,
		wallType: wallTypes.DARK_STONE,
		doors: {
			vertical: 569,
			horizontal: 568
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
		floorType: floorTypes.STONE,
		wallType: wallTypes.DARK_STONE,
		doors: {
			vertical: 569,
			horizontal: 568
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
		floorType: floorTypes.STONE,
		wallType: wallTypes.DARK_STONE,
		doors: {
			vertical: 569,
			horizontal: 568
		}
	}
}

const ladders = {
	up: 477,
	down: 479
}

const chestTexture = 57

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
	const { tint, type, mobDistribution, dropTable, floorType, wallType, doors } = theme
	const walls = wallTextures[wallType]
	const floors = floorTextures[floorType]
	// Generate ROT map and store empty tiles in hashm ap
	let createdLadders = 0
	let freeCells = {}
	const roomSizeHistogram = {}
	let mapGeneratorCallback = (x, y, blocked) => {
		if (!blocked) freeCells[x + ',' + y] = true
	}
	let rotMap = mapGenerator.create(mapGeneratorCallback)
	gameMap.dungeon = rotMap

	for (let room of rotMap.getRooms()) {
		room.getDoors((dx, dy) => {
			freeCells[dx + ',' + dy] = true
		})
		let width = room.getRight() - room.getLeft() + 1
		let height = room.getBottom() - room.getTop() + 1
		let coord = `${width},${height}`
		if (coord in roomSizeHistogram) roomSizeHistogram[coord]++
		else roomSizeHistogram[coord] = 1
	}
	// console.log(roomSizeHistogram)

	// Using bitmasking, texture the floors and walls
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			let tile = gameMap.getTile(x, y)
			if (!(`${x},${y}` in freeCells)) {
				let sym = getWallTexture(walls, computeBitmaskWalls(x, y, freeCells))
				tile.updateTileInfo(sym, tint)
			} else {
				let sym = getFloorTexture(floors, computeBitmaskFloors(x, y, freeCells))
				tile.updateTileInfo(sym, tint)
			}
		}
	}

	for (let corridor of rotMap.getCorridors()) {
		let sx = corridor._startX
		let sy = corridor._startY
		let ex = corridor._endX
		let ey = corridor._endY
		let torchTexture = 4888
		let torchesPlaced = 0
		if (sy === ey) {
			if (sx > ex) {
				let temp = sx
				sx = ex
				ex = temp
			}
			let x = sx
			while (x < ex) {
				let ul = gameMap.getTile(x - 1, sy - 1)
				let above = gameMap.getTile(x, sy - 1)
				let ur = gameMap.getTile(x + 1, sy - 1)
				const hasWallTop = tile => tile.obstacles.map(o => o.id).includes(walls.top)
				const hasTorchAlready = tile => tile.obstacles.map(o => o.id).includes(torchTexture)
				const noDoor = gameMap.getTile(x, sy).obstacles.every(id => id !== doors.horizontal && id !== doors.vertical)
				if (
					torchesPlaced < 2 &&
					noDoor &&
					hasWallTop(above) &&
					!hasTorchAlready(ul) &&
					!hasTorchAlready(ur) &&
					getRandomInt(0, 3) === 1
				) {
					above.updateTileInfo(torchTexture)
					torchesPlaced++
				}
				x++
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
			if (!containsDoor(gameMap.getTile(dx, dy))) {
				if (above.blocked() && below.blocked() && !containsActors(left) && !containsActors(right)) {
					// horizontal door frame
					gameMap.getTile(dx, dy).actors.push(new Door(dx, dy, doors.vertical))
				} else if (left.blocked() && right.blocked() && !containsActors(above) && !containsActors(below)) {
					// vertical door frame
					gameMap.getTile(dx, dy).actors.push(new Door(dx, dy, doors.horizontal))
				}
			}
		})
	}

	const shuffle = a => {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[a[i], a[j]] = [a[j], a[i]]
		}
		return a
	}

	// create a copy of all the prefabs, and add a boolean flag of whether or
	// not a prefab has been used in the dungeon already
	let availablePrefabs = shuffle(
		prefabs.map(p => {
			p.used = false
			return p
		})
	)
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
		const anyIdIsObstacle = arr => {
			return arr.some(id => {
				if (Game.display.tileset.tileproperties[id + '']) return Game.display.tileset.tileproperties[id + ''].blocked
				return false
			})
		}
		const within = (value, maximum, diff) => {
			return value <= maximum && value >= maximum - diff
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
			let canPlacePrefab = prefab.width === roomWidth && prefab.height === roomHeight // within(prefab.width, roomWidth, 2) && within(prefab.height, roomHeight, 2)
			if (prefab.walls) {
				roomWidth = right - left + 1
				roomHeight = bottom - top + 1
				offsetLeft = left
				offsetTop = top
				canPlacePrefab = prefab.width === roomWidth && prefab.height === roomHeight
			}
			if (canPlacePrefab) {
				for (let y = 0; y < prefab.height; y++) {
					for (let x = 0; x < prefab.width; x++) {
						prefab.data[y][x].forEach(id => {
							let dx = offsetLeft + x
							let dy = offsetTop + y
							if (`${dx},${dy}` in doors || (hasSurroundingDoors(dx, dy) && anyIdIsObstacle(prefab.data[y][x]))) {
								// gameMap.getTile(dx, dy).updateTileInfo(prefab.doorFloorReplacementId)
							} else {
								// check above, below, right, and left for doors because we don't want to block entrances
								gameMap.getTile(dx, dy).updateTileInfo(id)
							}
						})
					}
				}
				prefab.used = true
				availablePrefabs = availablePrefabs.filter(p => !p.used)
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
		for (let y = top; y <= bottom; y++) {
			for (let x = left; x <= right; x++) {
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
	let possibleStarts = []
	for (let y = 0; y < gameMap.height; y++) {
		for (let x = 0; x < gameMap.width; x++) {
			if (!gameMap.getTile(x, y).blocked() && gameMap.getTile(x, y).actors.length === 0 && `${x},${y}` in freeCells)
				possibleStarts.push(`${x},${y}`)
		}
	}
	let start = randomTile(possibleStarts)
	let [x, y] = start
	gameMap.playerLocation = [x, y]
	// gameMap.getTile(x, y).actors.push(new Player(x, y, Game.playerID + 1)) // set random spot to be the player
	let ladder = new Ladder(x, y, ladders.up, 'up', fromPortal)
	gameMap.getTile(x, y).actors.push(ladder)
	gameMap.revealed = false
	gameMap.type = 'dungeon'
	gameMap.depth = level
	return gameMap
}

const tryButCatchRotException = (fn, depth = 0) => {
	if (depth < 3) {
		try {
			return fn()
		} catch (exception) {
			console.error(exception)
			return tryButCatchRotException(fn, depth++)
		}
	}
}

/* Returns a randomly generated textured dungeon in GameMap form  */
export function randomDungeon(width, height, options) {
	let { level } = options
	let dc = {}
	if (level <= 5) {
		dc = {
			roomWidth: [5, 6],
			roomHeight: [4, 8],
			corridorLength: [4, 4],
			roomDugPercentage: 0.2
		}
		return tryButCatchRotException(() =>
			dungeonFromTheme(width, height, dungeonThemes.RUINS, new ROT.Map.Uniform(width, height, dc), options, false)
		)
	} else if (level <= 10) {
		dc = {
			roomWidth: [3, 6],
			roomHeight: [4, 7],
			corridorLength: [2, 4],
			roomDugPercentage: 0.2
		}
		return tryButCatchRotException(() =>
			dungeonFromTheme(width, height, dungeonThemes.CATACOMBS, new ROT.Map.Digger(width, height, dc), options)
		)
	} else if (level <= 15) {
		dc = {
			roomWidth: [3, 10],
			roomHeight: [4, 10],
			corridorLength: [1, 10],
			roomDugPercentage: 0.4
		}
		return tryButCatchRotException(() =>
			dungeonFromTheme(width, height, dungeonThemes.MINE, new ROT.Map.Uniform(width, height, dc), options, false)
		)
	} else {
		dc = {
			roomWidth: [3, 20],
			roomHeight: [4, 10],
			corridorLength: [4, 4],
			roomDugPercentage: 0.4
		}
		return tryButCatchRotException(() =>
			dungeonFromTheme(width, height, dungeonThemes.ICE, new ROT.Map.Digger(width, height, dc), options)
		)
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
