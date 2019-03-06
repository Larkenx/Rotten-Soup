import { ammoTypes } from "#/utils/Constants";
import { verifyProps } from "#/utils/HelperFunctions";


export const Combat = superclass => class extends superclass {
    constructor(config) {
        this.cb = {}
        super(config)
    }
}

export const DamageRoll = superclass => class extends superclass {
    constructor(config) {
        verifyProps(config, ['cb'])
        verifyProps(config.cb, ['sides', 'rolls'])
        super(config)
    }
}

export const Stackable = superclass => class extends superclass {
    constructor(configuration) {
        super(configuration)
        if (!configuration.equipmentSlot) console.warn(`Defaulting to stackable quantity of 1 for stackable item: ${this}!`)
        this.quantity = configuration.quantity || 1
    }
}

export const Equippable = superclass => class extends superclass {
    constructor(configuration) {
        super(configuration)
        if (!configuration.equipmentSlot) throw `Unable to create equippable item without equipment slot: ${this}!`
        this.equipmentSlot = configuration.equipmentSlot
    }
}

export const Consumable = superclass => class extends superclass {
    constructor(configuration) {
        super(configuration)
        if (!configuration.use) throw `Unable to create consumable item without "use" function: ${this}!`
        this.use = configuration.use
    }
}

export const Fireable = superclass => class extends superclass {
    constructor(configuration) {
        super(configuration)
        if (!configuration.range) console.warn(`No maximum firable range set for this item: ${this}`)
        this.cb.range = configuration.range || null
        this.cb.ranged = true
    }
}

export const AmmunitionTyped = superclass => class extends superclass {
    constructor(configuration) {
        super(configuration)
        if (!configuration.ammoType) console.warn(`No ammunition type specified for this item, assuming it can be fired with anything: ${this}`)
        this.ammoType = configuration.ammoType || ammoTypes.ANY
    }
}

export const Shielding = superclass => class extends superclass {

}