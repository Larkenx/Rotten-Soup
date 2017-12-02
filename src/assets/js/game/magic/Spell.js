/* Class to hold spells. Spells can be self-casted or targeted. Some special cases can be considered,
such as "reanimate the nearest dead character". */

import {getRandomInt} from '#/entities/Entity.js'
import {Effect} from '#/modifiers/Effect.js'
import {Game} from '#/Game.js'

export const spellTypes = {
    CONJURATION : "CONJURATION",
    CHARMS : "CHARMS",
    ICE : "ICE",
    AIR : "AIR",
    EARTH : "EARTH",
    FIRE : "FIRE",
    POISON : "POISON",
    NECROMANCY : "NECROMANCY",
    TRANSLOCATION : "TRANSLOCATION",
    TRANSMUTATION : "TRANSMUTATION",
    HEXES : "HEXES"
}

export class Spell {
    constructor(options) {
        // any characteristics of the spell we get from extensions can just be properties on the class
        if (options.effect === undefined ||
            options.name === undefined ||
            options.description === undefined ||
            options.type === undefined) throw "Spell creation failed - insufficient information provided"
            Object.assign(this,options);
        }

        cast(target) {
            target.addNewEffect(this.effect);
        }
    }

    const MagicDartEffect = new Effect({
        name : "Magic Dart Effect",
        lastDamageDealt : null,
        duration : 1,
        action : entity => {
            this.lastDamageDealt = getRandomInt(1,8);
            entity.damage(lastDamageDealt);
        },
        description : entity => {
            if (entity === Game.player)
            return `You took ${this.lastDamageDealt} damage from a Magic Dart spell!`
            else
            return `${entity.name.capitalize()} took ${this.lastDamageDealt} damage from Magic Dart.`
        }
    });

    export class MagicDart extends Spell {
        constructor() {
            super({
                name : "Magic Dart",
                description : "Deals 1-8 damage to a target",
                effect : MagicDartEffect,
                splashArt : "magic_dart",
                type : spellTypes.CONJURATION
            });
        }
    }
