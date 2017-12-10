/* Class to hold spells. Spells can be self-casted or targeted. Some special cases can be considered,
 such as "reanimate the nearest dead character". */

import {getRandomInt} from "#/utils/HelperFunctions.js";
import {Effect} from "#/modifiers/Effect.js";
import {Game} from "#/Game.js";

export const spellTypes = {
    CONJURATION: "CONJURATION",
    CHARMS: "CHARMS",
    ICE: "ICE",
    AIR: "AIR",
    EARTH: "EARTH",
    FIRE: "FIRE",
    POISON: "POISON",
    NECROMANCY: "NECROMANCY",
    TRANSLOCATION: "TRANSLOCATION",
    TRANSMUTATION: "TRANSMUTATION",
    HEXES: "HEXES"
}

export class Spell {
    constructor(options) {
        // any characteristics of the spell we get from extensions can just be properties on the class
        if (options.name === undefined || options.hoverInfo === undefined || options.action === undefined ||
            options.description === undefined || options.type === undefined || options.manaCost === undefined)
            throw "Spell creation failed - insufficient information provided"

        Object.assign(this, options);
    }

    cast(){} // to be overwritten
}

export class MagicDart extends Spell {
    constructor() {
        super({
            name: "Magic Dart",
            hoverInfo: "Deals 1-8 damage to a target",
            description: (entity, hit) => {
                if (entity === Game.player)
                    return `You took ${hit} damage from a Magic Dart spell!`
                else
                    return `Magic Dart blasts the ${entity.name} for ${hit} magical damage.`
            },
            action: (entity, hit) => {
                entity.damage(hit);
            },
            splashArt: "magic_dart",
            type: spellTypes.CONJURATION,
            manaCost: 3
        });
    }

    cast(target) {
        let dmg = getRandomInt(1, 8); // remember to update hover info if this changes!
        Game.log(this.description(target, dmg), "player_move");
        this.action(target, dmg);
    }
}
