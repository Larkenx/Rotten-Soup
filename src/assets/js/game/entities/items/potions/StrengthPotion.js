import Item from '#/entities/items/Item.js'
import {Game} from '#/Game.js'

export default class StrengthPotion extends Item {

    constructor(x, y, id) {
        super(x, y, {
            id : id,
            type : "Potion"
        });
    }

    use () {
        Game.log("You drink a strength potion. It boosts your strength for the next 5 moves.", "defend");
        Game.player.heal(25);
        Game.player.removeFromInventory(this);
    }

    hoverInfo() {
        return "Effect: +3 STR for 5 moves";
    }
}
