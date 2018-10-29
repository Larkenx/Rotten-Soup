import Weapon from '#/entities/items/weapons/Weapon.js'
import { getRandomInt } from '#/utils/HelperFunctions.js'
import { BleedEnchantment } from '#/modifiers/Enchantment.js'
import { materialTypes } from '#/utils/Constants.js'

export class Sword extends Weapon {
	constructor(x, y, rolls, sides, name, id, materialType) {
		super(x, y, {
			id: id,
			name: name,
			type: 'Sword',
			fg: 'orange',
			combat: {
				sides,
				rolls
			},
			attackVerbs: ['slashed', 'stabbed', 'gutted', 'sliced'],
			materialType
		})
	}
}

let swordNames = [
	'Caledfwlch',
	'Hywelbane',
	'Brightkiller',
	'Excalibur',
	'Joyeux',
	'Dyrnwyn',
	'Johnny Corkscrew',
	'The Sword of Leah',
	'The Sword of Shannara',
	'The Vorpal Sword',
	'Seraph Blade',
	'Glorious',
	'Cortana',
	'Heosphorous',
	'Phaesphoros',
	'Maellartach',
	'The Rivan Sword',
	'The Sword of Shadows',
	'Sikanda',
	'Dragnipur',
	'Chance',
	'Vengeance',
	'Grief',
	'The Swords of Night and Day',
	'The Swords of Blood and Fire',
	'Snaga',
	'The Sword of Truth',
	'The Lady Vivamus',
	'Sword of Martin',
	'Verminfate',
	'Rapscallion sword',
	'Callandor',
	'Heron Mark Sword',
	'Graywand',
	'Scalpel',
	'Rhindon',
	'Blackfyre',
	'Brightroar',
	'Dark Siste',
	'Dawn',
	'Hearteater',
	'Heartsbane',
	"Widow's Wail",
	'Ice',
	'Lady Forlorn',
	'Longclaw',
	'Red Rain',
	'Albitr',
	'Needle',
	'The Black Blade',
	'Mournblade',
	'Oathkeeper',
	'Naegling',
	'Arvindr',
	'Ravenbrand',
	"Zar'roc",
	"Lion's Tooth",
	'Doomgiver',
	'Kanajana',
	'Támerlein',
	'Shieldbreaker',
	'Woundhealer',
	'Narsil',
	'Lightbringer',
	'Soulcutter',
	'Sightblinder',
	'Wayfinder',
	'Orcrist',
	'Stonecutter',
	'Townsaver',
	'The Sword of Gryffindor',
	'Farslayer',
	'Mindsword',
	'Dragonslicer',
	'Katopris',
	'Backbiter',
	'Undbitr',
	'Brisingr',
	'Barrow-blade',
	'Coinspinner',
	'Lhang',
	'Traitor',
	'Anglachel',
	'Hadhafang',
	'Vrangr',
	'The Darksword',
	'The Lightsword',
	'Herugrim',
	'Anaklusmos',
	'Gúthwinë',
	'Terminus Est',
	'Memory',
	"Khazid'hea",
	'Clamorer',
	'Backbiter',
	'Thorn',
	"Charon's Claw",
	'Twinkle',
	'Godsbane',
	'Icingdeath',
	'Hrunting',
	'Naegling',
	'The Sword of the Dawn',
	'Hill Cleaver',
	'Werewindle',
	'Kijin-marukuni-shige',
	'Balaraw',
	'Keyblade',
	'Hina',
	'Tessaiga',
	'Sorrow',
	'Singing Sword',
	'Sword of Chaos',
	'The Starsword',
	'Biggoron Sword',
	'Grayswandir',
	'Rain Dragon',
	'Shisui',
	'Gurthang',
	'Aranrúth',
	'Nightfall',
	'Sting'
]

const materialTextures = {
	[materialTypes.BRONZE]: [11640, 11641, 11642, 11643, 11648, 11649, 11650, 11651, 11652, 11653, 11654, 11655],
	[materialTypes.IRON]: [11760, 11761, 11762, 11763, 11768, 11769, 11770, 11771, 11772, 11773, 11774, 11775],
	[materialTypes.STEEL]: [11880, 11881, 11882, 11883, 11888, 11889, 11890, 11891, 11892, 11893, 11894, 11895],
	[materialTypes.MITHRIL]: [12000, 12001, 12002, 12003, 12008, 12009, 12010, 12011, 12012, 12013, 12014, 12015],
	[materialTypes.ADAMANTIUM]: [12120, 12121, 12122, 12123, 12128, 12129, 12130, 12131, 12132, 12133, 12134, 12135],
	[materialTypes.ORICHALCUM]: [12240, 12241, 12242, 12243, 12248, 12249, 12250, 12251, 12252, 12253, 12254, 12255],
	[materialTypes.VULCANITE]: [12360, 12361, 12362, 12363, 12368, 12369, 12370, 12371, 12372, 12373, 12374, 12375],
	[materialTypes.AQUANITE]: [12480, 12481, 12482, 12483, 12488, 12489, 12490, 12491, 12492, 12493, 12494, 12495],
	[materialTypes.VRONITE]: [12600, 12601, 12602, 12603, 12608, 12609, 12610, 12611, 12612, 12613, 12614, 12615],
	[materialTypes.LOULOUDIUM]: [12720, 12721, 12722, 12723, 12728, 12729, 12730, 12731, 12732, 12733, 12734, 12735],
	[materialTypes.ILIOTIUM]: [12840, 12841, 12842, 12843, 12848, 12849, 12850, 12851, 12852, 12853, 12854, 12855],
	[materialTypes.LEVANTIUM]: [12960, 12961, 12962, 12963, 12968, 12969, 12970, 12971, 12972, 12973, 12974, 12975]
}

const swordShop = {
	[materialTypes.BRONZE]: (x, y, t) => new Sword(x, y, 1, 4, 'Bronze Sword', t, materialTypes.BRONZE),
	[materialTypes.IRON]: (x, y, t) => new Sword(x, y, 2, 2, 'Iron Sword', t, materialTypes.IRON),
	[materialTypes.STEEL]: (x, y, t) => new Sword(x, y, 1, 6, 'Steel Sword', t, materialTypes.STEEL),
	[materialTypes.MITHRIL]: (x, y, t) => new Sword(x, y, 2, 3, 'Mithril Sword', t, materialTypes.MITHRIL),
	[materialTypes.ADAMANTIUM]: (x, y, t) => new Sword(x, y, 1, 8, 'Adamantium Sword', t, materialTypes.ADAMANTIUM),
	[materialTypes.ORICHALCUM]: (x, y, t) => new Sword(x, y, 2, 4, 'Orichalcum Sword', t, materialTypes.ORICHALCUM),
	[materialTypes.VULCANITE]: (x, y, t) => new Sword(x, y, 1, 10, 'Vulcanite Sword', t, materialTypes.VULCANITE),
	[materialTypes.AQUANITE]: (x, y, t) => new Sword(x, y, 2, 5, 'Aquanite Sword', t, materialTypes.AQUANITE),
	[materialTypes.VRONITE]: (x, y, t) => new Sword(x, y, 2, 6, 'Vronite Sword', t, materialTypes.VRONITE),
	[materialTypes.LOULOUDIUM]: (x, y, t) => new Sword(x, y, 4, 3, 'Louloudium Sword', t, materialTypes.LOULOUDIUM),
	[materialTypes.ILIOTIUM]: (x, y, t) => new Sword(x, y, 3, 5, 'Iliotium Sword', t, materialTypes.ILIOTIUM),
	[materialTypes.LEVANTIUM]: (x, y, t) => new Sword(x, y, 5, 3, 'Levantium Sword', t, materialTypes.LEVANTIUM)
}

export function createSword(x, y, id, options) {
	let { materialType } = options
	if (materialType in materialTypes) {
		let possibleTextures = materialTextures[materialType]
		let texture = possibleTextures[getRandomInt(0, possibleTextures.length - 1)]
		return swordShop[materialType](x, y, texture)
	} else {
		console.error(`Material Type: ${materialType} not found in material type sword shop.`)
		return new Sword(x, y, 1, getRandomInt(2, 4), swordNames[getRandomInt(0, swordNames.length - 1)], 32, materialType)
	}
}
