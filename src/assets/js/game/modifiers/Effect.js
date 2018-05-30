/*
 An effect is exclusively carried out to manipulate an Entity in some way (typically an actor, but we might carry
 it out against other entities like weapons (e.g. imbue a sword with fire damage for 5 turns)). We can divide up effects
 in different types of effects:
 - Effects that are immediate versus Effects that exist over multiple turns/ticks in the game.
 ~ examples include a health potion that restores HP immediately vs a strength potion which might increase str for 5 turns
 */

import { Game } from '#/Game.js'

export class Effect {
	constructor(options) {
		Object.assign(this, options)
		if (this.name === undefined || this.description === undefined || this.action === undefined || this.duration === undefined)
			throw 'Effect missing critical fields'
	}

	applyEffect(entity) {
		if (this.duration == 0) {
			return
		}
		this.action(entity)
		this.duration--
	}
}

export class BleedEffect extends Effect {
	constructor() {
		super({
			name: 'Bleed',
			action: entity => {
				let dmg = ~~(entity.cb.maxhp * 0.1)
				if (dmg === 0) dmg = 1
				entity.damage(dmg)
			},
			description: entity => {
				let dmg = ~~(entity.cb.maxhp * 0.1)
				if (dmg === 0) dmg = 1
				if (entity === Game.player) return `You bleed for ${dmg} damage.`
				else return `${entity.name.capitalize()} took ${dmg} bleed damage.`
			},
			duration: 3
		})
	}
}

export class RegenerationEffect extends Effect {
	constructor() {
		super({
			name: 'Regeneration',
			action: entity => {
				entity.heal(5)
			},
			description: entity => {
				if (entity === Game.player) return 'You regenerate 5 health.'
				else return `${entity.name.capitalize()} regenerated 5 health.`
			},
			duration: 5
		})
	}
}
