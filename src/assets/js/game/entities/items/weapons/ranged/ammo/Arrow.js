import {Ammo} from '#/entities/items/weapons/ranged/ammo/Ammo.js'
import {AMMO_TYPES} from '#/entities/items/weapons/ranged/ammo/Ammo.js'

export class Arrow extends Ammo {
    constructor(x, y, options) {
        options.combat.ammoType = AMMO_TYPES.ARROW;
        super(x,y, options);
    }
}

export class SteelArrow extends Arrow {
    constructor(x,y,id, quantity) {
        super(x,y, {
            id : id,
            type : "Steel Arrow",
            combat : {
                damage : 0,
            },
            quantity : quantity
        });
    }
}
