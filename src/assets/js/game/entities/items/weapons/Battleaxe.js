/**
 * Created by Larken on 6/22/2017.
 */

import Weapon from '#/entities/items/weapons/Weapon.js'
import { getRandomInt } from '#/utils/HelperFunctions.js'
import { materialTypes } from '#/utils/Constants.js'

export class Battleaxe extends Weapon {
	constructor(x, y, sides, rolls, name, id) {
		super(x, y, {
			id: id,
			name: name,
			type: 'Battleaxe',
			fg: 'orange',
			combat: {
				rolls: rolls,
				sides: sides
			},
			attackVerbs: ['slashed', 'stabbed', 'gutted', 'sliced']
		})
	}
}

let axeNames = [
	'Celeste',
	'Emergency',
	'Severance',
	'Reincarnated Broadaxe',
	'Thirsty Cleaver',
	'Proud Bronzed Reaver',
	'Runed Bone Axe',
	'Chasm, Ravager of the Covenant',
	'Ashrune, Favor of Slaughter',
	'Termination, Promise of Mercy',
	"Winter's Bite",
	'Daytime',
	"King's Defender",
	'Flaming Chopper',
	'Wrathful Ravager',
	'Loyal Bone Axe',
	'Enchanted Glass War Axe',
	'Omega, Warblade of Delusions',
	'Devourer, Reaver of Traitors',
	'Deathspade, Glory of Hellish Torment,',
	'Retirement',
	'Armageddon',
	'Skullcrusher',
	"Keeper's Maul",
	'Battleworn Maul',
	'Moonlit Silver Battle Axe',
	"Solitude's Obsidian Ravager",
	"Hell's Scream, Bond of the Sun",
	'Devourer, Gift of Necromancy',
	'Savagery, Etcher of Fallen Souls'
]

const materialTextures = {
	[materialTypes.BRONZE]: [11668, 11669, 11670, 11671],
	[materialTypes.IRON]: [11788, 11789, 11790, 11791],
	[materialTypes.STEEL]: [11908, 11909, 11910, 11911],
	[materialTypes.MITHRIL]: [12028, 12029, 12030, 12031],
	[materialTypes.ADAMANTIUM]: [12148, 12149, 12150, 12151],
	[materialTypes.ORICHALCUM]: [12268, 12269, 12270, 12271],
	[materialTypes.VULCANITE]: [12388, 12389, 12390, 12391],
	[materialTypes.AQUANITE]: [12508, 12509, 12510, 12511],
	[materialTypes.VRONITE]: [12628, 12629, 12630, 12631],
	[materialTypes.LOULOUDIUM]: [12748, 12749, 12750, 12751],
	[materialTypes.ILIOTIUM]: [12868, 12869, 12870, 12871],
	[materialTypes.LEVANTIUM]: [12988, 12989, 12990, 12991]
}

const battleAxeShop = {
	[materialTypes.BRONZE]: (x, y, t) => new Battleaxe(x, y, 1, 4, 'Bronze Battleaxe', t),
	[materialTypes.IRON]: (x, y, t) => new Battleaxe(x, y, 1, 5, 'Iron Battleaxe', t),
	[materialTypes.STEEL]: (x, y, t) => new Battleaxe(x, y, 1, 6, 'Steel Battleaxe', t),
	[materialTypes.MITHRIL]: (x, y, t) => new Battleaxe(x, y, 1, 7, 'Mithril Battleaxe', t),
	[materialTypes.ADAMANTIUM]: (x, y, t) => new Battleaxe(x, y, 1, 8, 'Adamantium Battleaxe', t),
	[materialTypes.ORICHALCUM]: (x, y, t) => new Battleaxe(x, y, 1, 9, 'Orichalcum Battleaxe', t),
	[materialTypes.VULCANITE]: (x, y, t) => new Battleaxe(x, y, 1, 11, 'Vulcanite Battleaxe', t),
	[materialTypes.AQUANITE]: (x, y, t) => new Battleaxe(x, y, 1, 12, 'Aquanite Battleaxe', t),
	[materialTypes.VRONITE]: (x, y, t) => new Battleaxe(x, y, 1, 13, 'Vronite Battleaxe', t),
	[materialTypes.LOULOUDIUM]: (x, y, t) => new Battleaxe(x, y, 1, 14, 'Louloudium Battleaxe', t),
	[materialTypes.ILIOTIUM]: (x, y, t) => new Battleaxe(x, y, 1, 15, 'Iliotium Battleaxe', t),
	[materialTypes.LEVANTIUM]: (x, y, t) => new Battleaxe(x, y, 1, 16, 'Levantium Battleaxe', t)
}

export function createBattleaxe(x, y, id, options) {
	let { materialType } = options
	if (materialType in materialTypes) {
		let possibleTextures = materialTextures[materialType]
		let texture = possibleTextures[getRandomInt(0, possibleTextures.length - 1)]
		return battleAxeShop[materialType](x, y, texture)
	} else {
		console.error(`Material Type: ${materialType} not found in material type sword shop.`)
		return new Battleaxe(x, y, 1, getRandomInt(2, 4), axeNames[getRandomInt(0, axeNames.length - 1)])
	}
}
