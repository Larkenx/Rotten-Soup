import { Actor } from '#/entities/actors/Actor.js'
import { Game } from '#/Game.js'
import ROT from 'rot-js'

import { targetTypes, MagicDart, Regeneration, Pain, VampiricDraining, getNearbyCorpses, AnimateDead } from '#/magic/Spell.js'
import { getVisibleTiles, getRandomInt } from '#/utils/HelperFunctions'
export default class OrcPriest extends Actor {
	constructor(x, y, id) {
		super(x, y, {
			id: id,
			name: 'Orc Priest',
			description: 'A member of a religious zealot orc society, gifted in healing and life absorbing spells.',
			visible: true,
			blocked: true,
			chasing: false,
			cb: {
				maxhp: 40,
				maxmana: 25,
				hp: 40,
				mana: 25,
				str: 5,
				def: 1,
				range: 7,
				hostile: true
			},
			invulnerable: false
		})

		this.spells = {
			regeneration: new Regeneration({ cd: 0, maxCD: 15 }),
			pain: new Pain({ cd: 0, maxCD: 2 }),
			vampiricDraining: new VampiricDraining({ cd: 0, maxCD: 5 }),
			animateDead: new AnimateDead({ cd: 0, maxCD: 7 })
		}
	}

	act() {
		Game.engine.lock()
		// reduce the cooldown of every spell by 1
		for (let spell in this.spells) {
			this.spells[spell].cd = this.spells[spell].cd === 0 ? 0 : this.spells[spell].cd - 1
		}
		// To make these computations more efficient, we can determine whether or not the SimpleEnemy
		// is rendered on the current game screen. If not, we shouldn't really worry about what the enemy can see
		// or its path to the player. So, we can essentially skip their turn.
		let dx = Math.abs(this.x - Game.player.x)
		let dy = Math.abs(this.y - Game.player.y)
		if (dx > Game.width / 2 || dy > Game.height / 2) {
			Game.engine.unlock()
			super.act()
			return
		}
		if (!this.intro) {
			Game.log('You feel a sense of hopelessness and fear come over you.', 'crimson')
			Game.log('Something evil is nearby.', 'crimson')
		}
		this.intro = true

		Game.player.recalculatePath()

		let visibleTiles = getVisibleTiles(this)
		let allVisibleActors = visibleTiles.reduce((actors, tile) => {
			return actors.concat(tile.actors)
		}, [])
		let pathToPlayer = []

		if (
			allVisibleActors.some(a => {
				return a === Game.player
			})
		) {
			if (!this.chasing) Game.log(`A ${this.name} sees you.`, 'alert')
			this.chasing = true
			Game.player.path.compute(this.x, this.y, function(x, y) {
				pathToPlayer.push([x, y])
			})

			let lostHP = this.cb.maxhp - this.cb.hp
			let nearbyCorpses = getNearbyCorpses(this)
			const cooldown = spell => {
				spell.cd = spell.maxCD
			}

			const getFarthestAwayTile = () => {
				let nearbyTiles = findNearbyTiles()
				let maxDist = playerDistToTile(nearbyTiles[0])
				let farthestTile = nearbyTiles[0]
				for (let tile of nearbyTiles) {
					let currentDist = playerDistToTile(tile)
					if (currentDist >= maxDist) {
						maxDist = currentDist
						farthestTile = tile
					}
				}
				return farthestTile
			}

			// We can see the player
			if (pathToPlayer.length === 2) {
				// player is in melee range. we know we can hit pretty high against the player if he's in melee range, and probably kill them
				if (Game.player.cb.hp <= 15) {
					// melee attack
					let newPos = pathToPlayer[1]
					this.tryMove(newPos[0], newPos[1])
					// if we can't kill them, but vamp drain is up and we're missing some hp, use it
				} else if (lostHP >= 10 && this.spells.vampiricDraining.cd === 0) {
					// cast vampiric drain
					this.spells.vampiricDraining.cast(Game.player, this)
					cooldown(this.spells.vampiricDraining)
				} else if (lostHP >= 25 && this.spells.regeneration.cd === 0) {
					// we're badly hurt even though we're at close range
					// so we cast regenerate to get some hp
					this.spells.regeneration.cast(this, this)
					cooldown(this.spells.regeneration)
				} else {
					// we can't regenerate or drain with vamp, so we need to either raise the undead around us, fight, or flee
					if (nearbyCorpses.length >= 2 && this.spells.animateDead.cd === 0) {
						this.spells.animateDead.cast(this, this)
						cooldown(this.spells.animateDead)
					} else {
						// TODO: add logic to run away from the player
						// melee attack
						let newPos = pathToPlayer[1]
						this.tryMove(newPos[0], newPos[1])
					}
				}
			} else {
				// player is not in melee range (we cast raise undead, regenerate, pain, or attempt to move away from the player)
				if (Game.player.cb.hp <= 9 && this.spells.pain.cd === 0) {
					this.spells.pain.cast(Game.player, this)
					cooldown(this.spells.pain)
				} else if (nearbyCorpses.length >= 2 && this.spells.animateDead.cd === 0) {
					this.spells.animateDead.cast(this, this)
					cooldown(this.spells.animateDead)
				} else if (lostHP >= 25 && this.spells.regeneration.cd === 0) {
					// we're badly hurt even though we're at close range
					// so we cast regenerate to get some hp
					this.spells.regeneration.cast(this, this)
					cooldown(this.spells.regeneration)
				} else if (this.spells.pain.cd === 0) {
					this.spells.pain.cast(Game.player, this)
					cooldown(this.spells.pain)
				}
			}
		} else {
			// player is not in field of view. if we are low on hp, cast regenerate. if corpses are nearby, raise them
			let dx = this.x + getRandomInt(-1, 1)
			let dy = this.y + getRandomInt(-1, 1)
			this.tryMove(dx, dy)
		}

		Game.engine.unlock()
		super.act()
	}

	interact(actor) {
		if (actor === Game.player) {
			let dmg = this.attack(actor)
		} else {
			actor.react(this)
		}
	}
}
