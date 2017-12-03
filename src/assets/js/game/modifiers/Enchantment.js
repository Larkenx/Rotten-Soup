import {BleedEffect} from "#/modifiers/Effect.js";

export class Enchantment {

    constructor(options) {
        Object.assign(this, options);
        if (this.name === undefined || this.description === undefined || this.getEffect === undefined)
            throw "Enchantment missing critical fields";
    }

}

export class BleedEnchantment extends Enchantment {
    constructor() {
        super({
            name: "Bleed",
            description: "Applies a bleed effect on-hit, dealing % max health damage.",
            getEffect: () => {
                return new BleedEffect()
            },
        });
    }

}
