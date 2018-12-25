// Miscellaneous
import Chest from '#/entities/misc/Chest.js'
import Door from '#/entities/misc/Door.js'
import LockedDoor from '#/entities/misc/LockedDoor.js'
import LevelTransition from '#/entities/misc/LevelTransition.js'
import Ladder from '#/entities/misc/Ladder.js'
import Key from '#/entities/items/misc/Key.js'
import Gold from '#/entities/items/misc/Gold.js'
import Beer from '#/entities/items/misc/Beer.js'
import { NecromancySpellBook } from '#/entities/items/misc/Spellbook.js'
// Entities
import NPC from '#/entities/actors/NPC.js'
import { Corpse, corpseTypes } from '#/entities/items/misc/Corpse.js'
import Lich from '#/entities/actors/enemies/boss/Lich.js'
import { LootGoblin } from '#/entities/actors/enemies/GoalBasedEnemy.js'
// Items
import HealthPotion from '#/entities/items/potions/HealthPotion.js'
import StrengthPotion from '#/entities/items/potions/StrengthPotion.js'
import ManaPotion from '#/entities/items/potions/ManaPotion.js'
// Weapons
import { SteelArrow } from '#/entities/items/weapons/ranged/ammo/Arrow.js'
import { createSword } from '#/entities/items/weapons/Sword.js'
import { createBattleaxe } from '#/entities/items/weapons/Battleaxe.js'
// Armors
import { createChestArmor } from '#/entities/items/armor/ChestArmor.js'
import { createLegArmor } from '#/entities/items/armor/LegArmor.js'
import { createHelmet } from '#/entities/items/armor/Helmet.js'
import { createBoots } from '#/entities/items/armor/Boots.js'
// Utils
import { getRandomInt, getNormalRandomInt, randomProperty, getWeightedValue } from '#/utils/HelperFunctions.js'
import { StatelessAI } from '#/entities/actors/enemies/StatelessAI'
import entitySpreadsheet from '#/utils/data/data.xlsx'
import xlsx from 'xlsx'

const entityData = xlsx.utils.sheet_to_json(entitySpreadsheet.Sheets['Enemies'], { raw: true })
const entityShop = {
	NPC: (x, y, t) => new NPC(x, y, t),
	LEVEL_TRANSITION: (x, y, t) => new LevelTransition(x, y, t),
	CHEST: (x, y, t) => new Chest(x, y, t),
	DOOR: (x, y, t) => new Door(x, y, t),
	LOCKED_DOOR: (x, y, t) => new LockedDoor(x, y, t),
	LADDER: (x, y, t) => new Ladder(x, y, t),
	ZOMBIE_CORPSE: (x, y, t) => new Corpse(x, y, 'undead', t),
	SKELETON_CORPSE: (x, y, t) => new Corpse(x, y, 'Skeleton', t),
	LICH: (x, y, t) => new Lich(x, y, t),
	LOOT_GOBLIN: (x, y, t) => new LootGoblin(x, y, t)
}

entityData.forEach(entity => {
	let { id, hp, mana, maxhp, maxmana, str, def, range, morale, wanders, description, name } = entity
	entityShop[id] = (x, y, t) => {
		return new StatelessAI(x, y, {
			id: t,
			name,
			description,
			wanders,
			cb: {
				hp,
				maxhp,
				mana,
				maxmana,
				str,
				def,
				range,
				morale,
				invulnerable: false,
				hostile: true
			}
		})
	}
})

const itemShop = {
	GOLD: (x, y, t, options) => new Gold(x, y, t, options.quantity ? options.quantity : 1),
	BEER: (x, y, t) => new Beer(x, y, t),
	HEALTH_POTION: (x, y, t) => new HealthPotion(x, y, t),
	STRENGTH_POTION: (x, y, t) => new StrengthPotion(x, y, t),
	MANA_POTION: (x, y, t) => new ManaPotion(x, y, t),
	SWORD: (x, y, t, options) => createSword(x, y, t, options),
	BATTLEAXE: (x, y, t, options) => createBattleaxe(x, y, t, options),
	HELMET: (x, y, t, options) => createHelmet(x, y, t, options),
	CHEST_ARMOR: (x, y, t, options) => createChestArmor(x, y, t, options),
	LEG_ARMOR: (x, y, t, options) => createLegArmor(x, y, t, options),
	BOOTS: (x, y, t, options) => createBoots(x, y, t, options),
	BOW: (x, y, t) => createBow(x, y, t),
	STEEL_ARROW: (x, y, t) => new SteelArrow(x, y, t, 5),
	KEY: (x, y, t) => new Key(x, y, t),
	NECROMANCY_SPELLBOOK: (x, y, t) => new NecromancySpellBook(x, y, t)
}

export function createItem(itemString, x, y, id, options = {}) {
	const defaultItemTextures = {
		GOLD: 1388,
		BEER: 1190,
		KEY: 24,
		HEALTH_POTION: 488,
		MANA_POTION: 608,
		STRENGTH_POTION: 969,
		SWORD: 35,
		BOW: 664,
		STEEL_ARROW: 784,
		NECROMANCY_SPELLBOOK: 3264,
		BATTLEAXE: 153
	}

	const texture = id == null ? defaultItemTextures[itemString] : id

	if (itemString.includes('SWORD')) {
		return itemShop['SWORD'](x, y, texture, options)
	} else if (itemString.includes('BATTLEAXE')) {
		return itemShop['BATTLEAXE'](x, y, texture, options)
	} else if (itemString.includes('CHEST_ARMOR')) {
		return itemShop['CHEST_ARMOR'](x, y, texture, options)
	} else if (itemString.includes('LEG_ARMOR')) {
		return itemShop['LEG_ARMOR'](x, y, texture, options)
	} else if (itemString.includes('HELMET')) {
		return itemShop['HELMET'](x, y, texture, options)
	} else if (itemString.includes('BOOTS')) {
		return itemShop['BOOTS'](x, y, texture, options)
	}

	if (!(itemString in itemShop)) {
		console.error(`Tried to create an item without an entry: ${itemString} with ID: ${id}`)
		return null
	}

	return itemShop[itemString](x, y, texture, options)
}

export function getItemsFromDropTable(options) {
	let { dropTable, minItems, maxItems, x, y } = options
	let items = []
	let roll = getRandomInt(minItems, maxItems)
	for (let i = 0; i < roll; i++) {
		let chosenItem = getWeightedValue(dropTable)
		items.push(createItem(chosenItem, x, y, null, dropTable[chosenItem].options))
	}
	return items
}

export const actorTextures = {
	ORC: [5292, 5293, 5294, 5295, 5296, 5297, 5299],
	EMPOWERED_ORC: [5298],
	GOBLIN: [7440, 7441, 7442, 7443, 7444, 7445, 7446],
	RAT: [2365],
	BAT: [3704, 3706],
	KOBOLD: [5532, 5533, 5534, 5535, 5536, 5537, 5538, 5539],
	SKELETON: [2552, 2553, 2554, 2555],
	ZOMBIE: [2314, 2317],
	TROLL: [9481, 9480],
	MUMMY: [2432, 2433, 2434, 2435, 2436, 2437, 2438, 2439],
	GHOST: [2792, 2793, 2794],
	ICE_ELEMENTAL: [2460, 2461],
	GOLEM: [2457],
	IMP: [5412, 5413],
	SNAKE: [4360, 4361, 4362, 4363, 4364, 4365, 4366, 4367],
	SIREN: [2289, 2295],
	VAMPIRE: [2672],
	MINOTAUR: [7080],
	CYCLOPS: [7081],
	BANSHEE: [3154],
	DEMON: [2409, 2410, 2411, 2412, 2413, 2414, 2415],
	BONE_MAN: [3392, 3393],
	LOOT_GOBLIN: [10200, 10202]
}

export function createActor(actorString, x, y, id = null) {
	let texture = id
	if (id === null) {
		let possibleActorTextures = actorTextures[actorString]
		texture = possibleActorTextures[getRandomInt(0, possibleActorTextures.length - 1)]
	}
	if (!(actorString in entityShop)) {
		console.error(`Tried to create entity without an entry: ${actorString} with ID: ${id}`)
		return null
	}
	return entityShop[actorString](x, y, texture)
}
