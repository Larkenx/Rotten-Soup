export default class Ring extends Armor {
	constructor(x, y, def, name, id) {
		super(x, y, {
			id: id,
			name: name,
			type: 'Ring',
			fg: 'orange',
			combat: {
				def,
				equipmentSlot: 'ring'
			}
		})
	}
}
