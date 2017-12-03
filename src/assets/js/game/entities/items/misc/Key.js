import Item from "#/entities/items/Item.js";
import {Game} from "#/Game.js";

export default class Key extends Item {

    constructor(x, y, id) {
        super(x, y, {
            id: id,
            type: "Key"
        });
    }

    hoverInfo() {
        return "";
    }
}
