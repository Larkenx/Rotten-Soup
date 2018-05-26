// Miscellaneous
import Chest from '#/entities/misc/Chest.js'
import Door from '#/entities/misc/Door.js'
import LockedDoor from '#/entities/misc/LockedDoor.js'
import LevelTransition from '#/entities/misc/LevelTransition.js'
import Ladder from '#/entities/misc/Ladder.js'
import NPC from '#/entities/actors/NPC.js'
import { Corpse, corpseTypes } from '#/entities/items/misc/Corpse.js'
// Items
import HealthPotion from '#/entities/items/potions/HealthPotion.js'
import StrengthPotion from '#/entities/items/potions/StrengthPotion.js'
import ManaPotion from '#/entities/items/potions/ManaPotion.js'
import { createSword } from '#/entities/items/weapons/Sword.js'
import { SteelArrow } from '#/entities/items/weapons/ranged/ammo/Arrow.js'
// Enemies
import Orc from '#/entities/actors/enemies/Orc.js'
import Kobold from '#/entities/actors/enemies/Kobold.js'
import Goblin from '#/entities/actors/enemies/Goblin.js'
import Bat from '#/entities/actors/enemies/Bat.js'
import Rat from '#/entities/actors/enemies/Rat.js'
import Skeleton from '#/entities/actors/enemies/Skeleton.js'
import Zombie from '#/entities/actors/enemies/Zombie.js'
import Troll from '#/entities/actors/enemies/Troll.js'
import Mummy from '#/entities/actors/enemies/Mummy.js'
import Ghost from '#/entities/actors/enemies/Ghost.js'
import IceElemental from '#/entities/actors/enemies/IceElemental.js'
import Golem from '#/entities/actors/enemies/Golem.js'
import Imp from '#/entities/actors/enemies/Imp.js'
import Snake from '#/entities/actors/enemies/Snake.js'
import Siren from '#/entities/actors/enemies/Siren.js'
import Vampire from '#/entities/actors/enemies/Vampire.js'
import Banshee from '#/entities/actors/enemies/Banshee.js'
import Minotaur from '#/entities/actors/enemies/Minotaur.js'
import Cyclops from '#/entities/actors/enemies/Cyclops.js'
import Demon from '#/entities/actors/enemies/Demon.js'
import BoneMan from '#/entities/actors/enemies/BoneMan.js'
import { getRandomInt, getNormalRandomInt, randomProperty } from '#/utils/HelperFunctions.js'

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
	BONE_MAN: [3392, 3393]
}

export function createItem(itemString, x, y, id = null) {
	const defaultItemTextures = {
		HEALTH_POTION: 488,
		MANA_POTION: 608,
		STRENGTH_POTION: 969,
		SWORD: 35,
		BOW: 664,
		STEEL_ARROW: 784
	}
	const texture = id === null ? defaultItemTextures[itemString] : id
	const itemShop = {
		HEALTH_POTION: () => new HealthPotion(x, y, texture),
		STRENGTH_POTION: () => new StrengthPotion(x, y, texture),
		MANA_POTION: () => new ManaPotion(x, y, texture),
		SWORD: () => createSword(x, y, texture),
		BOW: () => createBow(x, y, texture),
		STEEL_ARROW: () => new SteelArrow(x, y, texture, 5)
	}
	if (!(itemString in itemShop)) {
		console.error(`Tried to create an item without an entry: ${itemString} with ID: ${id}`)
		return null
	}
	return itemShop[itemString]()
}

export function createActor(actorString, x, y, id = null) {
	let texture = id
	if (id === null) {
		let possibleActorTextures = actorTextures[actorString]
		let texture = possibleActorTextures[getRandomInt(0, possibleActorTextures.length - 1)]
	}
	const entityShop = {
		NPC: () => new NPC(x, y, texture),
		LEVEL_TRANSITION: () => new LevelTransition(x, y, texture),
		CHEST: () => new Chest(x, y, texture),
		DOOR: () => new Door(x, y, texture),
		LOCKED_DOOR: () => new LockedDoor(x, y, texture),
		LADDER: () => new Ladder(x, y, texture),
		ORC: () => new Orc(x, y, texture),
		EMPOWERED_ORC: () => new Orc(x, y, texture, true),
		KOBOLD: () => new Kobold(x, y, texture),
		GOBLIN: () => new Goblin(x, y, texture),
		BAT: () => new Bat(x, y, texture),
		RAT: () => new Rat(x, y, texture),
		SNAKE: () => new Snake(x, y, texture),
		SKELETON: () => new Skeleton(x, y, texture),
		ZOMBIE: () => new Zombie(x, y, texture),
		TROLL: () => new Troll(x, y, texture),
		MUMMY: () => new Mummy(x, y, texture),
		GHOST: () => new Ghost(x, y, texture),
		ICE_ELEMENTAL: () => new IceElemental(x, y, texture),
		GOLEM: () => new Golem(x, y, texture),
		IMP: () => new Imp(x, y, texture),
		SNAKE: () => new Snake(x, y, texture),
		SIREN: () => new Siren(x, y, texture),
		BANSHEE: () => new Banshee(x, y, texture),
		VAMPIRE: () => new Vampire(x, y, texture),
		MINOTAUR: () => new Minotaur(x, y, texture),
		CYCLOPS: () => new Cyclops(x, y, texture),
		DEMON: () => new Demon(x, y, texture),
		BONE_MAN: () => new BoneMan(x, y, texture)
	}
	if (!(actorString in entityShop)) {
		console.error(`Tried to create entity without an entry: ${actorString} with ID: ${id}`)
		return null
	}
	return entityShop[actorString]()
}
