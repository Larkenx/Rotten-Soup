import {Game} from '#/Game.js'
import {Effect} from '#/modifiers/Effect.js'
/* Very similar class to Effect; however, instead of performing an action each turn, this will perform
it once during the initial proc of the effect, then it will remove the effect after the buff wears off. It will
still be added as an effect under the Actor effects array */
export class Buff extends Effect  {
    constructor(options) {
        // buffs must specify a way to 'undo' the temporary effect it has on the entity
        if (options.undoAction === undefined)
            throw "Buffs must declare a way to undo temporary effects";

        super(options);
        this.initialDuration = this.duration; // 'remember' the initial duration
    }

    // overriding super method
    applyEffect(entity) {
        if (this.duration === this.initialDuration) {
            this.action(entity);
            this.duration--;
        } else if (this.duration === 1) {
            console.log("The buff has expired");
            Game.log(`Your ${this.name} has expired.`, "alert")
            this.undoAction(entity);
            this.duration--;
        } else {
            this.duration--;
        }
    }
}

export class StrengthBuff extends Buff {
    constructor(amt) {
        super({
            name : "Strength Buff",
            action : (entity) => {entity.cb.str += amt},
            undoAction : (entity) => {entity.cb.str -= amt},
            description : (entity) => {return `${entity.name()} has +${amt} Strength for ${this.duration} turns`},
            duration : 5,
            amount : amt
        });
    }
}
