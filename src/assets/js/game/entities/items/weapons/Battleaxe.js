/**
 * Created by Larken on 6/22/2017.
 */

import Weapon from '#/entities/items/weapons/Weapon.js'
import { getRandomInt } from '#/utils/HelperFunctions.js'
import { BleedEnchantment } from '#/modifiers/Enchantment.js'

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

export function createBattleaxe(x, y, id) {
	let axe = new Battleaxe(x, y, 8, 2, axeNames[getRandomInt(0, axeNames.length - 1)], id)
	// axe.addNewEnchantment(new BleedEnchantment())
	return axe
}
