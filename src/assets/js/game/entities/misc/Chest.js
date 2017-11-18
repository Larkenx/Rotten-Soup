/**
 * Created by Larken on 7/8/2017.
 */

import {Game} from '#/Game.js'
import {tileset} from '#/Game.js'
import {Entity} from '#/entities/Entity.js'

export default class Chest extends Entity {
    constructor(x, y, id) {
        super(x, y, {
            id: id,
            visible: true,
            blocked: true,
        });
        this.closed = true;
        this.items = [];
    }

    react(actor) {
        if (this.closed) {
            this.open();
        } else {
            // open up an inventory screen of items in the chest?
            if (this.items.length === 0) {
                Game.log("There's nothing left in this chest!", "information");
            } else {
                Game.log("You collect everything from the chest.", "information");
                for (let item of this.items)
                    actor.addToInventory(item);

                this.items = [];
            }

        }
    }

    addToChest(item) {
        this.items.push(item);
    }

    open() {
        this.closed = false;
        this.id = tileset.tileproperties[this.id].activated_id;
    }


}
