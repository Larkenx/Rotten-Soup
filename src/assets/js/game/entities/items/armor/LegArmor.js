import Armor from '#/entities/items/armor/Armor.js'
import { materialTypes } from '#/utils/Constants.js'
import { getRandomInt } from '#/utils/HelperFunctions.js'
export default class LegArmor extends Armor {
	constructor(x, y, def, name, id, materialType) {
		super(x, y, {
			id: id,
			name: name,
			type: 'Plate Legs',
			fg: 'orange',
			cb: {
				def,
				equipmentSlot: 'legs'
			},
			materialType
		})
	}
}

const materialTextures = {
	[materialTypes.BRONZE]: [11679, 11680, 11681, 11682, 11683, 11684, 11685],
	[materialTypes.IRON]: [11799, 11800, 11801, 11802, 11803, 11804, 11805],
	[materialTypes.STEEL]: [11919, 11920, 11921, 11922, 11923, 11924, 11925],
	[materialTypes.MITHRIL]: [12039, 12040, 12041, 12042, 12043, 12044, 12045],
	[materialTypes.ADAMANTIUM]: [12159, 12160, 12161, 12162, 12163, 12164, 12165],
	[materialTypes.ORICHALCUM]: [12279, 12280, 12281, 12282, 12283, 12284, 12285],
	[materialTypes.VULCANITE]: [12399, 12400, 12401, 12402, 12403, 12404, 12405],
	[materialTypes.AQUANITE]: [12519, 12520, 12521, 12522, 12523, 12524, 12525],
	[materialTypes.VRONITE]: [12639, 12640, 12641, 12642, 12643, 12644, 12645],
	[materialTypes.LOULOUDIUM]: [12759, 12760, 12761, 12762, 12763, 12764, 12765],
	[materialTypes.ILIOTIUM]: [12879, 12880, 12881, 12882, 12883, 12884, 12885],
	[materialTypes.LEVANTIUM]: [12999, 13000, 13001, 13002, 13003, 13004, 13005]
}

const armorShop = {
	[materialTypes.BRONZE]: (x, y, t) => new LegArmor(x, y, 1, 'Bronze Plate Legs', t, materialTypes.BRONZE),
	[materialTypes.IRON]: (x, y, t) => new LegArmor(x, y, 2, 'Iron Plate Legs', t, materialTypes.IRON),
	[materialTypes.STEEL]: (x, y, t) => new LegArmor(x, y, 3, 'Steel Plate Legs', t, materialTypes.STEEL),
	[materialTypes.MITHRIL]: (x, y, t) => new LegArmor(x, y, 4, 'Mithril Plate Legs', t, materialTypes.MITHRIL),
	[materialTypes.ADAMANTIUM]: (x, y, t) => new LegArmor(x, y, 5, 'Adamantium Plate Legs', t, materialTypes.ADAMANTIUM),
	[materialTypes.ORICHALCUM]: (x, y, t) => new LegArmor(x, y, 6, 'Orichalcum Plate Legs', t, materialTypes.ORICHALCUM),
	[materialTypes.VULCANITE]: (x, y, t) => new LegArmor(x, y, 7, 'Vulcanite Plate Legs', t, materialTypes.VULCANITE),
	[materialTypes.AQUANITE]: (x, y, t) => new LegArmor(x, y, 8, 'Aquanite Plate Legs', t, materialTypes.AQUANITE),
	[materialTypes.VRONITE]: (x, y, t) => new LegArmor(x, y, 9, 'Vronite Plate Legs', t, materialTypes.VRONITE),
	[materialTypes.LOULOUDIUM]: (x, y, t) => new LegArmor(x, y, 10, 'Louloudium Plate Legs', t, materialTypes.LOULOUDIUM),
	[materialTypes.ILIOTIUM]: (x, y, t) => new LegArmor(x, y, 11, 'Iliotium Plate Legs', t, materialTypes.ILIOTIUM),
	[materialTypes.LEVANTIUM]: (x, y, t) => new LegArmor(x, y, 12, 'Levantium Plate Legs', t, materialTypes.LEVANTIUM)
}

export function createLegArmor(x, y, id, options) {
	let { materialType } = options
	if (materialType in materialTypes) {
		let possibleTextures = materialTextures[materialType]
		let texture = possibleTextures[getRandomInt(0, possibleTextures.length - 1)]
		return armorShop[materialType](x, y, texture)
	} else {
		console.error(`Material Type: ${materialType} not found in material type armor shop.`)
		return new LegArmor(x, y, 1, 'Bronze Plate Legs', 11679, null)
	}
}
