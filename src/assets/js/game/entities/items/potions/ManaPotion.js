import Item from '#/entities/items/Item.js'
import {Game} from '#/Game.js'

export default class ManaPotion extends Item {

    constructor(x, y, id) {
        super(x, y, {
            id : id,
            type : "Mana Potion"
        });
    }

    use () {
        Game.log("You drink a mana potion. It restores a little mana.", "defend");
        Game.player.restore(10);
        Game.player.removeFromInventory(this);
    }

    hoverInfo() {
        return "Effect: Restores 10 mana";
    }
}
