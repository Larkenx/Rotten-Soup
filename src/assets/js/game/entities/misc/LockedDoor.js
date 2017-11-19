/**
 * Created by Larken on 7/8/2017.
 */
import {Game} from '#/Game.js'

import {tileset} from '#/Game.js'
import Player from '#/entities/actors/Actor.js'
import Door from '#/entities/misc/Door.js'
import Key from '#/entities/items/misc/Key.js'

export default class LockedDoor extends Door {
    constructor(x, y, id) {
        super(x, y, id);
    }

    react(actor) {
        if (this.closed) {
            // if it's closed, then we need to make sure this
            // actor who is trying to open the door has a key
            let keys = actor.items().filter((i) => {return i instanceof Key});
            if (keys.length === 0 && actor instanceof Player) {
                Game.log("You need a key to open this door.", "information");
            } else {
                Game.log("You use a key to unlock the door.", "information");
                actor.removeFromInventory(keys[0]);
                this.openDoor();
            }
        }
    }

    openDoor() {
        this.closed = false;
        this.options.blocked = false;
        this.options.visible = true;
        this.id = tileset.tileproperties[this.id].activated_id;
    }

    closeDoor() {
        this.closed = false;
        this.options.blocked = false;
        this.options.visible = true;
        this.options.id = this.id;
    }

}
