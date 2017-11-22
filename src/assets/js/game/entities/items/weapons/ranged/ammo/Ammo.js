/**
 * Created by Larken on 6/22/2017.
 */
import Item from '#/entities/items/Item.js'

export const AMMO_TYPES = {
    ARROW : "Arrow"
};

export class Ammo extends Item {
    constructor(x, y, options) {
        let {type, ammoType, quantity, damage} = options;
        super(x,y,{
            id: id,
            type: type, // as in the type of item, not the ammotype
            ammoType : ammoType
            combat: {
                damage : damage
            },
            quantity : quantity
        });
        this.options.combat = this.cb;
    }
}
