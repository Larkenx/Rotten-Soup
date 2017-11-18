/* Very similar class to Effect; however, instead of performing an action each turn, this will perform
it once during the initial proc of the effect, then it will remove the effect after the buff wears off. It will
still be added as an effect under the Actor effects array */
export class Buff extends Effect  {
    constructor() {
        super({
            name : "Strength Buff",
            action : (entity) => {entity.cb.str += 3},
            duration : 5,
            description : (entity) => {return `${entity.name()} has increased strength for ${this.duration} turns`}
        });
    }

    applyEffect(entity) {

    }
}
