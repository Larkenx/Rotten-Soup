import { Actor } from '#/entities/actors/Actor.js'
import { Game } from '#/Game.js'
import ROT from 'rot-js'

import { targetTypes, MagicDart, Regeneration, Pain, VampiricDraining, AnimateDead } from '#/magic/Spell.js'
import { getVisibleTiles } from '#/utils/HelperFunctions'
export default class Lich extends Actor {
	constructor(x, y, id) {
		super(x, y, {
			id: id,
			name: 'Lich',
			description: 'Once a powerful necromancer, now transformed into a lich.',
			visible: true,
			blocked: true,
			chasing: false,
			combat: {
				/* options.combat, dedicated to all things related to combat */
				description: [' attacked '],
				/* max stats */
				maxhp: 120,
				maxmana: 25,
				/* current stats */
				hp: 120,
				mana: 25,
				str: 10,
				def: 5,
				/* misc */
				hostile: true,
				range: 7,
				invulnerable: false,
			}
		})

		this.spells = {
			regeneration: {
				spell: new Regeneration(),
				cooldown: 0,
				maxCooldown: 5,
			},
			pain: {
				spell: new Pain(),
				cooldown: 0,
				maxCooldown: 1,
			},
			vampiricDraining: {
				spell: new VampiricDraining(),
				cooldown: 0,
				maxCooldown: 5,
			},
			animateDead: {
				spell: new AnimateDead(),
				cooldown: 0,
				maxCooldown: 7,
			}
		}
	}

	act() {
		Game.engine.lock()
		// To make these computations more efficient, we can determine whether or not the SimpleEnemy
		// is rendered on the current game screen. If not, we shouldn't really worry about what the enemy can see
		// or its path to the player. So, we can essentially skip their turn.
		let dx = Math.abs(this.x - Game.player.x)
		let dy = Math.abs(this.y - Game.player.y)
		if (dx > (Game.width / 2) || dy > (Game.height / 2)) {
			Game.engine.unlock()
			super.act()
			return
		}

		Game.player.recalculatePath()

		let visibleTiles = getVisibleTiles(this) 
		let allVisibleActors = visibleTiles.reduce((actors, tile) => {
			return actors.concat(tile.actors)
		}, [])
		let pathToPlayer = []

		if (allVisibleActors.some(a => { return a === Game.player })) {
			if (!this.chasing)
				Game.log(`A ${this.name} sees you.`, 'alert')
			this.chasing = true
			Game.player.path.compute(this.x, this.y, function(x, y) {
				pathToPlayer.push([x, y])
			})

			// We can see the player
			if (pathToPlayer.length === 2) { // player is in melee range

			} else { // player is out of range

			}


		} else {

		}

		Game.engine.unlock()
		super.act()

	}

	interact(actor) {
		if (actor === Game.player) {
			let dmg = this.attack(actor)
			if (this.cb.empowered) {
				let amtHealed = Math.floor(dmg / 2)
				Game.log(`The empowered orc steals your health and regenerates ${amtHealed} health!`, 'alert')
				this.heal(amtHealed)
			}
		} else {
			actor.react(this)
		}
	}
}
