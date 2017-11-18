import {Game} from '#/Game.js'

/*
    An effect is exclusively carried out to manipulate an Entity in some way (typically an actor, but we might carry
    it out against other entities like weapons (e.g. imbue a sword with fire damage for 5 turns)). We can divide up effects
    in different types of effects:
    - Effects that are immediate versus Effects that exist over multiple turns/ticks in the game.
        ~ examples include a health potion that restores HP immediately vs a strength potion which might increase str for 5 turns
*/
export class Effect {
    constructor(options) {
        Object.assign(this, options);
        if (this.name === undefined || this.description === undefined || this.action === undefined)
            throw "Effect missing critical fields";
    }

    applyEffect(entity) {
        if (this.duration == 0) {
            console.log("The effect has expired");
            return;
        }
        this.action(entity);
        this.duration--;
    }
}

export class Bleed implements Effect {
    constructor() {
        super({
            name : "Bleed",
            action : (entity) => {entity.damage(Math.floor(entity * .15))},
            description : (entity) => {return `${entity.name()} is taking ${bleedDmg(entity)} damage per turn`},
        });
    }
}

// approach 1
// let bleedDmg = (entity) =>  {return Math.floor(entity.cb.maxhp * .15);}
// let bleedEffect = (entity) => {entity.damage(this.calculateBleedDamage(entity))}
// let description = (entity) => {return `${entity.name()} is taking ${bleedDmg(entity)} damage per turn`;}
// export const Bleed = new Effect(bleedEffect, 3, "Bleed", description)

// aproach 2
// export class Bleed implements Effect {
//     constructor() {
//         let action = (entity) => {entity.damage(this.calculateBleedDamage(entity))}
//         let description = (entity) => {return `${entity.name()} is taking ${this.calculateBleedDamage(entity)} damage per turn`;}
//         super(action, 3, "Bleed", description); // "Bleed deals 15% of maximum hp as damage each turn"
//     }
//
//     calculateBleedDamage(entity) {
//         return Math.floor(entity.cb.maxhp * .15);
//     }
//
// }
