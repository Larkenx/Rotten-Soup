import Armor from '#/entities/items/armor/Armor.js'
import { materialTypes } from '#/utils/Constants.js'
import { getRandomInt } from '#/utils/HelperFunctions.js'
export default class Helmet extends Armor {
	constructor(x, y, def, name, id, materialType) {
		super(x, y, {
			id: id,
			name: name,
			type: 'Helmet',
			fg: 'orange',
			cb: {
				def,
				equipmentSlot: 'head'
			},
			materialType
		})
	}
}

const materialTextures = {
	[materialTypes.BRONZE]: [11686, 11687, 11688, 11689, 11690],
	[materialTypes.IRON]: [11806, 11807, 11808, 11809, 11810],
	[materialTypes.STEEL]: [11926, 11927, 11928, 11929, 11930],
	[materialTypes.MITHRIL]: [12046, 12047, 12048, 12049, 12050],
	[materialTypes.ADAMANTIUM]: [12166, 12167, 12168, 12169, 12170],
	[materialTypes.ORICHALCUM]: [12286, 12287, 12288, 12289, 12290],
	[materialTypes.VULCANITE]: [12406, 12407, 12408, 12409, 12410],
	[materialTypes.AQUANITE]: [12526, 12527, 12528, 12529, 12530],
	[materialTypes.VRONITE]: [12646, 12647, 12648, 12649, 12650],
	[materialTypes.LOULOUDIUM]: [12766, 12767, 12768, 12769, 12770],
	[materialTypes.ILIOTIUM]: [12886, 12887, 12888, 12889, 12890],
	[materialTypes.LEVANTIUM]: [13006, 13007, 13008, 13009, 13010]
}

const armorShop = {
	[materialTypes.BRONZE]: (x, y, t) => new Helmet(x, y, 1, 'Bronze Helmet', t, materialTypes.BRONZE),
	[materialTypes.IRON]: (x, y, t) => new Helmet(x, y, 1, 'Iron Helmet', t, materialTypes.IRON),
	[materialTypes.STEEL]: (x, y, t) => new Helmet(x, y, 2, 'Steel Helmet', t, materialTypes.STEEL),
	[materialTypes.MITHRIL]: (x, y, t) => new Helmet(x, y, 2, 'Mithril Helmet', t, materialTypes.MITHRIL),
	[materialTypes.ADAMANTIUM]: (x, y, t) => new Helmet(x, y, 3, 'Adamantium Helmet', t, materialTypes.ADAMANTIUM),
	[materialTypes.ORICHALCUM]: (x, y, t) => new Helmet(x, y, 3, 'Orichalcum Helmet', t, materialTypes.ORICHALCUM),
	[materialTypes.VULCANITE]: (x, y, t) => new Helmet(x, y, 4, 'Vulcanite Helmet', t, materialTypes.VULCANITE),
	[materialTypes.AQUANITE]: (x, y, t) => new Helmet(x, y, 4, 'Aquanite Helmet', t, materialTypes.AQUANITE),
	[materialTypes.VRONITE]: (x, y, t) => new Helmet(x, y, 6, 'Vronite Helmet', t, materialTypes.VRONITE),
	[materialTypes.LOULOUDIUM]: (x, y, t) => new Helmet(x, y, 6, 'Louloudium Helmet', t, materialTypes.LOULOUDIUM),
	[materialTypes.ILIOTIUM]: (x, y, t) => new Helmet(x, y, 7, 'Iliotium Helmet', t, materialTypes.ILIOTIUM),
	[materialTypes.LEVANTIUM]: (x, y, t) => new Helmet(x, y, 7, 'Levantium Helmet', t, materialTypes.LEVANTIUM)
}

export function createHelmet(x, y, id, options) {
	let { materialType } = options
	if (materialType in materialTypes) {
		let possibleTextures = materialTextures[materialType]
		let texture = possibleTextures[getRandomInt(0, possibleTextures.length - 1)]
		return armorShop[materialType](x, y, texture)
	} else {
		console.error(`Material Type: ${materialType} not found in material type armor shop.`)
		return new Helmet(x, y, 1, 'Bronze Helmet', 11679, null)
	}
}
