/**
 * Created by larken on 7/12/17.
 */

import {Game} from "#/Game.js";
import {Entity} from "#/entities/Entity.js";


export default class Item extends Entity {
    constructor(x, y, options) {
        options.visible = true;
        super(x, y, options);
    }

    /* UI / Front End functions */
    hoverInfo() {
        return `${this.type}${this.name}\n`;
    }

    clipLocation() {
        let c = getTilesetCoords(this.id);
        // let css = `rect(${c[1]}px 32px 32px ${c[0]}px)`;
        let css = `rect(0,32,32,0)`;
        return css;
    }

    use() {
        // to be overwritten
    }

// making a major assumption that the player is the only thing that drops things.
// might change if some enemy type needs to do so
    drop() {
        Game.player.dropItem(this);

    }
}
