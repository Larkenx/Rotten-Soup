/**
 * Created by Larken on 6/22/2017.
 */
import Equippable from '#/entities/items/Equippable.js'
import { getNormalRandomInt } from '#/utils/HelperFunctions.js'

export default class Armor extends Equippable {
	constructor(x, y, options) {
		super(x, y, options)
	}

	// rolls for defence value
	roll() {
		let { def } = this.cb
		return getNormalRandomInt(0, def)
	}

	hoverInfo() {
		return [
			{
				attribute: 'Defence',
				value: `${this.cb.def}`
			},
			{
				attribute: 'Material',
				value: `${this.materialType[0] + this.materialType.substring(1).toLowerCase()}`
			}
		]
		// return `Defence: ${this.cb.def}`
	}
}
