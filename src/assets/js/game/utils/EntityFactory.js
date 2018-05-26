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

export function createActor(actorString, x, y) {
	let possibleActorTextures = actorTextures[actorString]
	let randomTexture = possibleActorTextures[getRandomInt(0, possibleActorTextures.length - 1)]
	switch (actorString) {
		case 'ORC':
			return new Orc(x, y, randomTexture)
		case 'EMPOWERED_ORC':
			return new Orc(x, y, randomTexture, true)
		case 'KOBOLD':
			return new Kobold(x, y, randomTexture)
		case 'GOBLIN':
			return new Goblin(x, y, randomTexture)
		case 'BAT':
			return new Bat(x, y, randomTexture)
		case 'RAT':
			return new Rat(x, y, randomTexture)
		case 'SNAKE':
			return new Snake(x, y, randomTexture)
		case 'SKELETON':
			return new Skeleton(x, y, randomTexture)
		case 'ZOMBIE':
			return new Zombie(x, y, randomTexture)
		case 'TROLL':
			return new Troll(x, y, randomTexture)
		case 'MUMMY':
			return new Mummy(x, y, randomTexture)
		case 'GHOST':
			return new Ghost(x, y, randomTexture)
		case 'ICE_ELEMENTAL':
			return new IceElemental(x, y, randomTexture)
		case 'GOLEM':
			return new Golem(x, y, randomTexture)
		case 'IMP':
			return new Imp(x, y, randomTexture)
		case 'SNAKE':
			return new Snake(x, y, randomTexture)
		case 'SIREN':
			return new Siren(x, y, randomTexture)
		case 'BANSHEE':
			return new Banshee(x, y, randomTexture)
		case 'VAMPIRE':
			return new Vampire(x, y, randomTexture)
		case 'MINOTAUR':
			return new Minotaur(x, y, randomTexture)
		case 'CYCLOPS':
			return new Cyclops(x, y, randomTexture)
		case 'DEMON':
			return new Demon(x, y, randomTexture)
		case 'BONE_MAN':
			return new BoneMan(x, y, randomTexture)
		default:
			throw 'Unidentified actor given to create actor'
	}
}
