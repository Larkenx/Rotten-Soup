import {Ammo} from '#/entities/items/weapons/ranged/ammo/Ammo.js'
import {AMMO_TYPES} from '#/entities/items/weapons/ranged/ammo/Ammo.js'

export class Arrow extends Ammo {
    constructor(x, y, options) {
        super(x,y, {...options, ammoType : AMMO_TYPES.ARROW});
    }
}

export class SteelArrow extends Arrow {
    constructor(x,y,id, quantity) {
        super(x,y, {
            id : id,
            type : "Steel Arrow",
            damage : 3,
            quantity : quantity
        });
    }
}
