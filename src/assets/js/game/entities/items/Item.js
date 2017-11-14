/**
 * Created by larken on 7/12/17.
 */

import {Game} from '#/Game.js'
import {Entity} from '#/entities/Entity.js'
import Weapon from '#/entities/items/weapons/Weapon.js'


export default class Item extends Entity {
    constructor(x, y, options) {
        super(x, y, options);
    }

    /* UI / Front End functions */
    hoverInfo() {
        if (this instanceof Weapon) {
            return `${this.options.type}\n${this.options.name}\n${this.damageInfo()}`;
        } else {
            return `${this.options.type}${this.options.name}\n`;
        }
    }

    clipLocation() {
        let c = getTilesetCoords(this.options.id);
        // let css = `rect(${c[1]}px 32px 32px ${c[0]}px)`;
        let css = `rect(0,32,32,0)`;
        return css;
    }

    use() {
        //
    }
}
