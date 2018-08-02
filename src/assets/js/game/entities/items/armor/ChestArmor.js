import Armor from '#/entities/items/armor/Armor.js'
import { materialTypes } from '#/utils/Constants.js'
import { getRandomInt } from '#/utils/HelperFunctions.js'
export default class ChestArmor extends Armor {
	constructor(x, y, def, name, id) {
		super(x, y, {
			id: id,
			name: name,
			type: 'Chest Plate',
			fg: 'orange',
			combat: {
				def,
				equipmentSlot: 'torso'
			}
		})
	}
}

const materialTextures = {
	[materialTypes.BRONZE]: [11672, 11673, 11674, 11675, 11676, 11677, 11678],
	[materialTypes.IRON]: [11792, 11793, 11794, 11795, 11796, 11797, 11798],
	[materialTypes.STEEL]: [11912, 11913, 11914, 11915, 11916, 11917, 11918],
	[materialTypes.MITHRIL]: [12032, 12033, 12034, 12035, 12036, 12037, 12038],
	[materialTypes.ADAMANTIUM]: [12152, 12153, 12154, 12155, 12156, 12157, 12158],
	[materialTypes.ORICHALCUM]: [12272, 12273, 12274, 12275, 12276, 12277, 12278],
	[materialTypes.VULCANITE]: [12392, 12393, 12394, 12395, 12396, 12397, 12398],
	[materialTypes.AQUANITE]: [12512, 12513, 12514, 12515, 12516, 12517, 12518],
	[materialTypes.VRONITE]: [12632, 12633, 12634, 12635, 12636, 12637, 12638],
	[materialTypes.LOULOUDIUM]: [12752, 12753, 12754, 12755, 12756, 12757, 12758],
	[materialTypes.ILIOTIUM]: [12872, 12873, 12874, 12875, 12876, 12877, 12878],
	[materialTypes.LEVANTIUM]: [12992, 12993, 12994, 12995, 12996, 12997, 12998]
}

const armorShop = {
	[materialTypes.BRONZE]: (x, y, t) => new ChestArmor(x, y, 1, 'Bronze Chest Plate', t),
	[materialTypes.IRON]: (x, y, t) => new ChestArmor(x, y, 2, 'Iron Chest Plate', t),
	[materialTypes.STEEL]: (x, y, t) => new ChestArmor(x, y, 3, 'Steel Chest Plate', t),
	[materialTypes.MITHRIL]: (x, y, t) => new ChestArmor(x, y, 4, 'Mithril Chest Plate', t),
	[materialTypes.ADAMANTIUM]: (x, y, t) => new ChestArmor(x, y, 5, 'Adamantium Chest Plate', t),
	[materialTypes.ORICHALCUM]: (x, y, t) => new ChestArmor(x, y, 6, 'Orichalcum Chest Plate', t),
	[materialTypes.VULCANITE]: (x, y, t) => new ChestArmor(x, y, 7, 'Vulcanite Chest Plate', t),
	[materialTypes.AQUANITE]: (x, y, t) => new ChestArmor(x, y, 8, 'Aquanite Chest Plate', t),
	[materialTypes.VRONITE]: (x, y, t) => new ChestArmor(x, y, 9, 'Vronite Chest Plate', t),
	[materialTypes.LOULOUDIUM]: (x, y, t) => new ChestArmor(x, y, 10, 'Louloudium Chest Plate', t),
	[materialTypes.ILIOTIUM]: (x, y, t) => new ChestArmor(x, y, 11, 'Iliotium Chest Plate', t),
	[materialTypes.LEVANTIUM]: (x, y, t) => new ChestArmor(x, y, 12, 'Levantium Chest Plate', t)
}

export function createChestArmor(x, y, id, options) {
	let { materialType } = options
	if (materialType in materialTypes) {
		let possibleTextures = materialTextures[materialType]
		let texture = possibleTextures[getRandomInt(0, possibleTextures.length - 1)]
		return armorShop[materialType](x, y, texture)
	} else {
		console.error(`Material Type: ${materialType} not found in material type armor shop.`)
		return new ChestArmor(x, y, 1, 'Bronze Chest Plate', 11672)
	}
}
