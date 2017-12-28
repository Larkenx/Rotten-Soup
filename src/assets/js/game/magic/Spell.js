/* Class to hold spells. Spells can be self-casted or targeted. Some special cases can be considered,
 such as 'reanimate the nearest dead character'. */
import ROT from 'rot-js'
import {getRandomInt, getDiceRoll} from '#/utils/HelperFunctions.js'
import {RegenerationEffect} from '#/modifiers/Effect.js'
import {Game} from '#/Game.js'
import {Corpse, corpseTypes} from '#/entities/items/misc/Corpse.js'
import Skeleton from '#/entities/actors/enemies/Skeleton.js'
import Zombie from '#/entities/actors/enemies/Zombie.js'


export const spellTypes = {
	CONJURATION: 'CONJURATION',
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
	SELF : 'SELF', // applies spell to self
	TARGET : 'TARGET', // applies to a target
}

export class Spell {
	constructor(options) {
		// any characteristics of the spell we get from extensions can just be properties on the class
		if (options.name === undefined || options.hoverInfo === undefined || options.action === undefined ||
            options.type === undefined || options.manaCost === undefined  || options.targetType === undefined)
			throw 'Spell creation failed - insufficient information provided'

		Object.assign(this, options)
	}

	cast(){} // to be overwritten
}

/* Conjuration Spellls */

export class MagicDart extends Spell {
	constructor() {
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
	}

	cast(target, caster) {
		let dmg = getRandomInt(1, 8) // remember to update hover info if this changes!
		if (target === Game.player)
			Game.log(`You took ${dmg} damage from a Magic Dart spell!`, 'attack')
		else
			Game.log(`Magic Dart blasts the ${target.name} for ${dmg} magical damage.`, 'player_move')

		this.action(target, dmg)
	}
}

/* Necromancy Spells */

export class Pain extends Spell {
	constructor() {
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
	}

	cast(target, caster) {
		let dmg = getDiceRoll(3, 3) // remember to update hover info if this changes!
		let adjective = dmg >= 7 ? 'extreme' : 'some'
		if (target === Game.player)
			Game.log(`You feel ${adjective} pain and take ${dmg} damage from a Pain spell!`, 'attack')
		else
			Game.log(`Pain causes ${adjective} trauma the ${target.name} for ${dmg} magical damage.`, 'player_move')

		this.action(target, dmg)
	}
}

export class Regeneration extends Spell {
	constructor() {
		super({
			name: 'Regeneration',
			hoverInfo: 'Regenerates 10 health per turn by reanimating wounds with necromancy.',
			action: (entity) => {
				entity.addNewEffect(new RegenerationEffect())
			},
			splashArt: 'regeneration',
			type: spellTypes.NECROMANCY,
			targetType: targetTypes.SELF,
			manaCost: 3
		})
	}

	cast(target, caster) {
		if (caster === Game.player)
			Game.log('You begin regenerating your wounds with dark magic.', 'player_move')
		else
			Game.log(`${caster.name.capitalize()} begins regenerating its wounds.`, 'alert')

		this.action(target)
	}
}

export class VampiricDraining extends Spell {
	constructor() {
		super({
			name: 'Vampiric Draining',
			hoverInfo: 'Drains the health of an enemy for 10-20 damage, healing the caster half of the damage dealt',
			action: (entity, dmg) => {
				entity.damage(dmg)
			},
			splashArt: 'vampiric_draining',
			type: spellTypes.NECROMANCY,
			targetType: targetTypes.TARGET,
			manaCost: 3
		})
	}

	cast(target, caster) {
		let dmg = getDiceRoll(10, 2) // remember to update hover info if this changes!
		if (caster === Game.player) {
			Game.log(`You suck the life energy out of the ${target.name.toLowerCase()}, damaging it for ${dmg} hp.`, 'player_move')
			Game.log(`You siphon ${~~ (dmg / 2)} hp from the enemy and gain it as health.`, 'lightgreen')
		} else {
			Game.log(`You feel your life energy siphoning away and take ${dmg} damage.`, 'attack')
			Game.log(`${caster.name.capitalize()}`)
		}
		this.action(target, dmg)
		caster.heal(~~ (dmg / 2))
	}
}

const reanimate = (corpse) => {
	let ctile = Game.map.data[corpse.y][corpse.x]
	// remove the corpse from the ground
	ctile.removeActor(corpse)
	let idx = Game.map.actors.indexOf(corpse)
	Game.map.actors.splice(idx, 1)
	let undeadActor = corpse.id === corpseTypes.HUMANOID ?
		new Zombie(corpse.x, corpse.y, 2317) :
		new Skeleton(corpse.x, corpse.y, 2552)

	undeadActor.chasing = true
	ctile.actors.push(undeadActor)
	Game.map.actors.push(undeadActor)
	Game.scheduler.add(undeadActor, true)
}

export class AnimateDead extends Spell {
	constructor() {
		super({
			name: 'Animate Dead',
			hoverInfo: 'Raises all skeletons and corpses within caster\'s line of sight as undead.',
			action: (caster) => {
				let fov = new ROT.FOV.PreciseShadowcasting(function(x, y) {
					return (Game.inbounds(x, y) && Game.map.data[y][x].visible())
				})

				let visibleTiles = []
				fov.compute(caster.x, caster.y, caster.cb.range, function(x, y, r, visibility) {
					if (Game.inbounds(x, y))
						visibleTiles.push(Game.map.data[y][x])
				})

				for (let tile of visibleTiles) {
					let corpses = tile.actors.filter((e) => {return e instanceof Corpse})
					/* TODO: If player is casting this spell, reanimated corpses should be friendly! */
					if (corpses.length >= 1)
						reanimate(corpses[0])
				}
			},
			splashArt: 'animate_dead',
			type: spellTypes.NECROMANCY,
			targetType: targetTypes.SELF,
			manaCost: 7
		})
	}

	cast(target, caster) {
		this.action(caster)
		if (caster === Game.player) {
			Game.log('You raise nearby dead corpses around you into undead zombies and skeletons.', 'lightgreen')
		} else {
			Game.log(`The ${caster.capitalize()} raises all the corpses nearby from the dead`, 'lightpurple')
			Game.log('The undead corpses begin marching towards you.', 'lightpurple')

		}

	}
}
