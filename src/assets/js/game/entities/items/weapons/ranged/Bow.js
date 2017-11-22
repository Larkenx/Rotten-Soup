import RangedWeapon from '#/entities/items/weapons/ranged/RangedWeapon.js'
import {AMMO_TYPES} from '#/entities/items/weapons/ranged/ammo/Ammo.js'

export class Bow extends RangedWeapon {
    constructor(x, y, id, name, rolls, sides, range) {
        super(x,y,{
            id : id,
            name : name,
            type : "Bow",
            combat: {
                rolls: rolls,
                sides: sides,
                range : range,
                ammoType : AMMO_TYPES.ARROW,
            }
        });
    }
}

export const createBow = (x,y,id) => {
    return new Bow(x,y,id, "Bow of the Sunwalker", 3, 3, 8);
}
