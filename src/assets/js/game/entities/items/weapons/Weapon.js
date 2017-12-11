/**
 * Created by Larken on 6/22/2017.
 */
import {Game} from "#/Game.js";
import Item from "#/entities/items/Item.js";
import {getRandomInt} from "#/utils/HelperFunctions.js";

export default class Weapon extends Item {

    constructor(x, y, options) {
        if (options.combat === null) throw `Error - no options.combat property defined. Bad weapon creation for ${options.name}`;
        options.visible = true;
        options.blocked = false;
        options.combat.equippable = true;
        options.combat.equipped = false;
        super(x, y, options);
        this.cb = this.combat;
        this.cb.enchantments = [];
        this.action = "Equip";
    }

    use() {
        Game.player.equipWeapon(this);
    }

    roll() {
        let dmg = 0;
        for (let i = 0; i < this.cb.rolls; i++) {
            dmg += getRandomInt(1, this.cb.sides);
        }
        return dmg;
    }

    /* Effects are equivalent to enchantments, in a way...
     * Might need to do some work on editing how these are displayed in the UI
     */
    addNewEnchantment(enchantment) {
        this.cb.enchantments.push(enchantment);
    }

    hoverInfo() {
        return `Damage: ${this.cb.rolls}-${this.cb.sides * this.cb.rolls}`;
    }
}
