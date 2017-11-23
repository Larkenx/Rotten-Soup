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
        if (this.name === undefined || this.description === undefined || this.action === undefined || this.duration === undefined)
            throw "Effect missing critical fields";
    }

    applyEffect(entity) {
        if (this.duration == 0) {
            return;
        }
        this.action(entity);
        this.duration--;
    }
}

export class BleedEffect extends Effect {
    constructor() {
        super({
            name : "Bleed",
            action : (entity) => {entity.damage(Math.floor(entity.cb.hp * .15))},
            description : (entity) => {return `${entity.name} is taking ${bleedDmg(entity)} damage per turn`},
            duration : 3
        });
    }
}
