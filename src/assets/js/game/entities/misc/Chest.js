/**
 * Created by Larken on 7/8/2017.
 */

import {Game} from '@/assets/js/game/Game.js'
import {Entity} from '@/assets/js/game/entities/Entity.js'

export default class Chest extends Entity {
    constructor(x, y, id) {
        super(x, y, {
            id: id,
            visible: true,
            blocked: true,
        });
        this.closed = true;
    }

    react(actor) {
        if (this.closed) {
            this.open();
        } else {
            // open up an inventory screen of items in the chest?
            Game.log("Sorry, your treasure is in another castle...", "information");
        }
    }

    open() {
        this.closed = false;
        this.id = tileset.tileproperties[this.id].activated_id;
    }


}
