/**
 * Created by Larken on 6/22/2017.
 */
 import {Game} from '@/assets/js/game/Game.js'
import {Entity} from '@/assets/js/game/entities/Entity.js'


export default class Store extends Entity {

    constructor(x, y) {
        super(x, y, {
            name: "Store",
            description: "A store filled with gold and goodies",
            symbol: "$",
            fg: "darkgreen",
            bg: "transparent",
            visible: true,
            blocked: true
        });
        this.items = [];
        this.exchangeRate = 0.5;
        this.gold = 1000;
    }

    act() {
        super.act();
    }

    interact(actor) {
    }

    react(actor) {
    }

    /* Returns the number of items available for a given item */
    stock(item) {
        return 0;
    }

    /* Sells an item(s) to the player */
    sell(item, quantity) {
        if (stock(item) >= quantity) {
            items[item].amount -= quantity;
            return true;
        }
        return false;
    }
}
