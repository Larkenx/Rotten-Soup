import Armor from '#/entities/items/armor/Armor.js'
import { materialTypes } from '#/utils/Constants.js'
import { getRandomInt } from '#/utils/HelperFunctions.js'
export default class Boots extends Armor {
	constructor(x, y, def, name, id, materialType) {
		super(x, y, {
			id: id,
			name: name,
			type: 'Boots',
			fg: 'orange',
			cb: {
				def,
				equipmentSlot: 'boots'
			},
			materialType
		})
	}
}

const materialTextures = {
	[materialTypes.BRONZE]: [11691, 11692, 11693, 11694, 11695, 11696, 11697, 11698, 11699],
	[materialTypes.IRON]: [11811, 11812, 11813, 11814, 11815, 11816, 11817, 11818, 11819],
	[materialTypes.STEEL]: [11931, 11932, 11933, 11934, 11935, 11936, 11937, 11938, 11939],
	[materialTypes.MITHRIL]: [12051, 12052, 12053, 12054, 12055, 12056, 12057, 12058, 12059],
	[materialTypes.ADAMANTIUM]: [12171, 12172, 12173, 12174, 12175, 12176, 12177, 12178, 12179],
	[materialTypes.ORICHALCUM]: [12291, 12292, 12293, 12294, 12295, 12296, 12297, 12298, 12299],
	[materialTypes.VULCANITE]: [12411, 12412, 12413, 12414, 12415, 12416, 12417, 12418, 12419],
	[materialTypes.AQUANITE]: [12531, 12532, 12533, 12534, 12535, 12536, 12537, 12538, 12539],
	[materialTypes.VRONITE]: [12651, 12652, 12653, 12654, 12655, 12656, 12657, 12658, 12659],
	[materialTypes.LOULOUDIUM]: [12771, 12772, 12773, 12774, 12775, 12776, 12777, 12778, 12779],
	[materialTypes.ILIOTIUM]: [12891, 12892, 12893, 12894, 12895, 12896, 12897, 12898, 12899],
	[materialTypes.LEVANTIUM]: [13011, 13012, 13013, 13014, 13015, 13016, 13017, 13018, 13019]
}

const armorShop = {
	[materialTypes.BRONZE]: (x, y, t) => new Boots(x, y, 1, 'Bronze Boots', t, materialTypes.BRONZE),
	[materialTypes.IRON]: (x, y, t) => new Boots(x, y, 1, 'Iron Boots', t, materialTypes.IRON),
	[materialTypes.STEEL]: (x, y, t) => new Boots(x, y, 2, 'Steel Boots', t, materialTypes.STEEL),
	[materialTypes.MITHRIL]: (x, y, t) => new Boots(x, y, 2, 'Mithril Boots', t, materialTypes.MITHRIL),
	[materialTypes.ADAMANTIUM]: (x, y, t) => new Boots(x, y, 3, 'Adamantium Boots', t, materialTypes.ADAMANTIUM),
	[materialTypes.ORICHALCUM]: (x, y, t) => new Boots(x, y, 3, 'Orichalcum Boots', t, materialTypes.ORICHALCUM),
	[materialTypes.VULCANITE]: (x, y, t) => new Boots(x, y, 4, 'Vulcanite Boots', t, materialTypes.VULCANITE),
	[materialTypes.AQUANITE]: (x, y, t) => new Boots(x, y, 4, 'Aquanite Boots', t, materialTypes.AQUANITE),
	[materialTypes.VRONITE]: (x, y, t) => new Boots(x, y, 5, 'Vronite Boots', t, materialTypes.VRONITE),
	[materialTypes.LOULOUDIUM]: (x, y, t) => new Boots(x, y, 5, 'Louloudium Boots', t, materialTypes.LOULOUDIUM),
	[materialTypes.ILIOTIUM]: (x, y, t) => new Boots(x, y, 6, 'Iliotium Boots', t, materialTypes.ILIOTIUM),
	[materialTypes.LEVANTIUM]: (x, y, t) => new Boots(x, y, 6, 'Levantium Boots', t, materialTypes.LEVANTIUM)
}

export function createBoots(x, y, id, options) {
	let { materialType } = options
	if (materialType in materialTypes) {
		let possibleTextures = materialTextures[materialType]
		let texture = possibleTextures[getRandomInt(0, possibleTextures.length - 1)]
		return armorShop[materialType](x, y, texture)
	} else {
		console.error(`Material Type: ${materialType} not found in material type armor shop.`)
		return new Boots(x, y, 1, 'Bronze Boots', 11691, null)
	}
}
