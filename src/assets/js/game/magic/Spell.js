/* Class to hold spells. Spells can be self-casted or targeted. Some special cases can be considered,
 such as 'reanimate the nearest dead character'. */
import ROT from 'rot-js'
import { getRandomInt, getDiceRoll } from '#/utils/HelperFunctions.js'
import { RegenerationEffect } from '#/modifiers/Effect.js'
import { Game } from '#/Game.js'
import { Corpse, corpseTypes } from '#/entities/items/misc/Corpse.js'
import Skeleton from '#/entities/actors/enemies/Skeleton.js'
import Zombie from '#/entities/actors/enemies/Zombie.js'

export const spellTypes = {
	CONJURATION: 'CONJURATION',
	RESTORATION: 'RESTORATION',
	CHARMS: 'CHARMS',
	ICE: 'ICE',
	AIR: 'AIR',
	EARTH: 'EARTH',
	FIRE: 'FIRE',
	POISON: 'POISON',
	NECROMANCY: 'NECROMANCY',
	TRANSLOCATION: 'TRANSLOCATION',
	TRANSMUTATION: 'TRANSMUTATION',
	HEXES: 'HEXES'
}

export const targetTypes = {
	SELF: 'SELF', // applies spell to self
	TARGET: 'TARGET' // applies to a target
}

export class Spell {
	constructor(options) {
		// any characteristics of the spell we get from extensions can just be properties on the class
		if (
			options.name === undefined ||
			options.hoverInfo === undefined ||
			options.action === undefined ||
			options.type === undefined ||
			options.manaCost === undefined ||
			options.targetType === undefined
		)
			throw 'Spell creation failed - insufficient information provided'

		Object.assign(this, options)
	}

	cast() {} // to be overwritten
}

/* Restoration Spells */
export class MinorHeal extends Spell {
	constructor(options) {
		super({
			name: 'Minor Heal',
			hoverInfo: 'Regenerates 20 health.',
			action: entity => {
				entity.heal(20)
			},
			splashArt: 'minor_heal',
			type: spellTypes.RESTORATION,
			targetType: targetTypes.SELF,
			manaCost: 5
		})
		Object.assign(this, options)
	}

	cast(target, caster) {
		if (caster === Game.player) Game.log('You heal yourself for 20 health points.', '#e3c91c')
		else Game.log(`${caster.name.capitalize()} used minor heal to regenerate 20 health points.`, 'plum')

		this.action(target)
	}
}

/* Conjuration Spellls */

export class MagicDart extends Spell {
	constructor(options) {
		super({
			name: 'Magic Dart',
			hoverInfo: 'Deals 1-8 damage to a target',
			action: (entity, hit) => {
				entity.damage(hit)
			},
			splashArt: 'magic_dart',
			type: spellTypes.CONJURATION,
			targetType: targetTypes.TARGET,
			manaCost: 3
		})
		Object.assign(this, options)
	}

	cast(target, caster) {
		let dmg = getRandomInt(1, 8) // remember to update hover info if this changes!
		if (target === Game.player) Game.log(`You took ${dmg} damage from a Magic Dart spell!`, 'attack')
		else Game.log(`Magic Dart blasts the ${target.name} for ${dmg} magical damage.`, 'player_move')

		this.action(target, dmg)
	}
}

/* Necromancy Spells */

export class Pain extends Spell {
	constructor(options) {
		super({
			name: 'Pain',
			hoverInfo: 'Deals 3-9 negative energy to a target',
			action: (entity, hit) => {
				entity.damage(hit)
			},
			splashArt: 'pain',
			type: spellTypes.NECROMANCY,
			targetType: targetTypes.TARGET,
			manaCost: 3
		})
		Object.assign(this, options)
	}

	cast(target, caster) {
		let dmg = getDiceRoll(3, 3) // remember to update hover info if this changes!
		let adjective = dmg >= 7 ? 'extreme' : 'some'
		if (target === Game.player) {
			Game.log(`The ${caster.name.capitalize()} casts ${this.name} on ${target.name.toLowerCase()}.`, 'plum')
			Game.log(`You feel ${adjective} pain and take ${dmg} damage.`, 'attack')
		} else {
			Game.log(`Pain causes ${adjective} trauma the ${target.name} for ${dmg} magical damage.`, 'player_move')
		}

		this.action(target, dmg)
	}
}

export class Regeneration extends Spell {
	constructor(options) {
		super({
			name: 'Regeneration',
			hoverInfo: 'Regenerates 5 health per turn by reanimating wounds with necromancy.',
			action: entity => {
				entity.addNewEffect(new RegenerationEffect())
			},
			splashArt: 'regeneration',
			type: spellTypes.NECROMANCY,
			targetType: targetTypes.SELF,
			manaCost: 3
		})
		Object.assign(this, options)
	}

	cast(target, caster) {
		if (caster === Game.player) Game.log('You begin regenerating your wounds with dark magic.', 'player_move')
		else Game.log(`${caster.name.capitalize()} begins regenerating its wounds.`, 'plum')

		this.action(target)
	}
}

export class VampiricDraining extends Spell {
	constructor(options) {
		super({
			name: 'Vampiric Draining',
			hoverInfo: 'Drains the health of an enemy for 6-12 damage, healing the caster half of the damage dealt',
			action: (entity, dmg) => {
				entity.damage(dmg)
			},
			splashArt: 'vampiric_draining',
			type: spellTypes.NECROMANCY,
			targetType: targetTypes.TARGET,
			manaCost: 3
		})
		Object.assign(this, options)
	}

	cast(target, caster) {
		let dmg = getDiceRoll(2, 6) // remember to update hover info if this changes!
		if (caster === Game.player) {
			Game.log(`You suck the life energy out of the ${target.name.toLowerCase()}, damaging it for ${dmg} hp.`, 'player_move')
			Game.log(`You siphon ${~~(dmg / 2)} hp from the enemy and gain it as health.`, 'lightgreen')
		} else {
			Game.log(`The ${caster.name.capitalize()} casts ${this.name} on ${target.name.toLowerCase()}.`, 'plum')
			Game.log(`You feel your life energy slipping away and take ${dmg} damage.`, 'alert')
			Game.log(`The ${caster.name.capitalize()} gains ${~~(dmg / 2)} health.`, 'plum')
		}
		this.action(target, dmg)
		caster.heal(~~(dmg / 2))
	}
}

export const reanimate = corpse => {
	let ctile = Game.map.data[corpse.y][corpse.x]
	// remove the corpse from the ground
	ctile.removeActor(corpse)
	let idx = Game.map.actors.indexOf(corpse)
	Game.map.actors.splice(idx, 1)
	Game.display.removeChild(corpse)
	let undeadActor =
		corpse.id === corpseTypes.HUMANOID ? new Zombie(corpse.x, corpse.y, 2317) : new Skeleton(corpse.x, corpse.y, 2552)

	undeadActor.chasing = true
	ctile.actors.push(undeadActor)
	Game.display.assignSprite(undeadActor)
	Game.map.actors.push(undeadActor)
	Game.scheduler.add(undeadActor, true)
}

/* returns an array of corpses :) */
export const getNearbyCorpses = actor => {
	let fov = new ROT.FOV.PreciseShadowcasting(function(x, y) {
		return Game.inbounds(x, y) && Game.map.data[y][x].visible()
	})

	let visibleTiles = []
	fov.compute(actor.x, actor.y, actor.cb.range, function(x, y, r, visibility) {
		if (Game.inbounds(x, y)) visibleTiles.push(Game.map.data[y][x])
	})

	let cartOfCorpses = []
	for (let tile of visibleTiles) {
		let corpses = tile.actors.filter(e => {
			return e instanceof Corpse
		})
		if (corpses.length > 0) cartOfCorpses.push(corpses[0])
	}
	return cartOfCorpses
}

export class AnimateDead extends Spell {
	constructor(options) {
		super({
			name: 'Animate Dead',
			hoverInfo: "Raises all skeletons and corpses within caster's line of sight as undead.",
			action: caster => {
				getNearbyCorpses(caster).forEach(corpse => {
					reanimate(corpse)
				})
			},
			splashArt: 'animate_dead',
			type: spellTypes.NECROMANCY,
			targetType: targetTypes.SELF,
			manaCost: 7
		})
		Object.assign(this, options)
	}

	cast(target, caster) {
		this.action(caster)
		if (caster === Game.player) {
			Game.log('You raise nearby dead corpses around you into undead zombies and skeletons.', 'lightgreen')
		} else {
			Game.log(`The ${caster.name.capitalize()} raises nearby corpses as undead minions.`, 'plum')
			Game.log('The undead begin marching towards you.', 'plum')
		}
	}
}
