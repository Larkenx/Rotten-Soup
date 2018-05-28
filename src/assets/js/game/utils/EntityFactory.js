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

const itemShop = {
	HEALTH_POTION: (x, y, t) => new HealthPotion(x, y, t),
	STRENGTH_POTION: (x, y, t) => new StrengthPotion(x, y, t),
	MANA_POTION: (x, y, t) => new ManaPotion(x, y, t),
	SWORD: (x, y, t) => createSword(x, y, t),
	BOW: (x, y, t) => createBow(x, y, t),
	STEEL_ARROW: (x, y, t) => new SteelArrow(x, y, t, 5)
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

	if (!(itemString in itemShop)) {
		console.error(`Tried to create an item without an entry: ${itemString} with ID: ${id}`)
		return null
	}

	return itemShop[itemString](x, y, texture)
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
	BONE_MAN: [3392, 3393]
}

const entityShop = {
	NPC: (x, y, t) => new NPC(x, y, t),
	LEVEL_TRANSITION: (x, y, t) => new LevelTransition(x, y, t),
	CHEST: (x, y, t) => new Chest(x, y, t),
	DOOR: (x, y, t) => new Door(x, y, t),
	LOCKED_DOOR: (x, y, t) => new LockedDoor(x, y, t),
	LADDER: (x, y, t) => new Ladder(x, y, t),
	ORC: (x, y, t) => new Orc(x, y, t),
	EMPOWERED_ORC: (x, y, t) => new Orc(x, y, t, true),
	KOBOLD: (x, y, t) => new Kobold(x, y, t),
	GOBLIN: (x, y, t) => new Goblin(x, y, t),
	BAT: (x, y, t) => new Bat(x, y, t),
	RAT: (x, y, t) => new Rat(x, y, t),
	SNAKE: (x, y, t) => new Snake(x, y, t),
	SKELETON: (x, y, t) => new Skeleton(x, y, t),
	ZOMBIE: (x, y, t) => new Zombie(x, y, t),
	TROLL: (x, y, t) => new Troll(x, y, t),
	MUMMY: (x, y, t) => new Mummy(x, y, t),
	GHOST: (x, y, t) => new Ghost(x, y, t),
	ICE_ELEMENTAL: (x, y, t) => new IceElemental(x, y, t),
	GOLEM: (x, y, t) => new Golem(x, y, t),
	IMP: (x, y, t) => new Imp(x, y, t),
	SNAKE: (x, y, t) => new Snake(x, y, t),
	SIREN: (x, y, t) => new Siren(x, y, t),
	BANSHEE: (x, y, t) => new Banshee(x, y, t),
	VAMPIRE: (x, y, t) => new Vampire(x, y, t),
	MINOTAUR: (x, y, t) => new Minotaur(x, y, t),
	CYCLOPS: (x, y, t) => new Cyclops(x, y, t),
	DEMON: (x, y, t) => new Demon(x, y, t),
	BONE_MAN: (x, y, t) => new BoneMan(x, y, t)
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
