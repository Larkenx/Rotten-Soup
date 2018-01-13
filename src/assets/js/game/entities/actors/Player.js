/**
 * Created by Larken on 6/22/2017.
 */
import ROT from 'rot-js'
import { Game } from '#/Game.js'
import { Actor } from '#/entities/actors/Actor.js'
import { addPrefix } from '#/utils/HelperFunctions.js'
import Item from '#/entities/items/Item.js'
// Weapons
import { Sword } from '#/entities/items/weapons/Sword.js'

import { createBow } from '#/entities/items/weapons/ranged/Bow.js'
import { SteelArrow } from '#/entities/items/weapons/ranged/ammo/Arrow.js'
// Potions
import HealthPotion from '#/entities/items/potions/HealthPotion.js'
import StrengthPotion from '#/entities/items/potions/StrengthPotion.js'
import ManaPotion from '#/entities/items/potions/ManaPotion.js'
// Spells
import { targetTypes, MagicDart, Regeneration, Pain, VampiricDraining, AnimateDead } from '#/magic/Spell.js'
// effects
import { BleedEnchantment } from '#/modifiers/Enchantment.js'
// Misc
import Ladder from '#/entities/misc/Ladder.js'
import { xp_levels } from '#/entities/Entity.js'

function pathfinding(x, y) {
	if (x <= 0 || x >= Game.map.width || y <= 0 || y >= Game.map.height) return false
	return !Game.map.data[y][x].blocked()
}

export default class Player extends Actor {
	constructor(x, y, id) {
		super(x, y, {
			id: id,
			name: 'you',
			description: "It's you!",
			fg: 'yellow',
			bg: 'black',
			visible: true,
			targeting: false,
			casting: false,
			examining: false,
			blocked: true,
			leveled_up: true,
			mouseEnabled: false,
			combat: {
				/* options.combat, dedicated to all things related to combat */
				description: [' attacked ', ' stabbed ', ' jabbed ', ' smashed '],
				/* stat caps */
				maxhp: 50,
				maxmana: 15,
				/* current stats */
				xp: 50,
				level: 1,
				hp: 50,
				mana: 15,
				str: 1,
				def: 1,
				/* Per-turn effects */
				hpRecovery: 5,
				manaRecovery: 2.5,
				invulnerable: false,
				/* Magic & Ranged */
				validTarget: null,
				currentSpell: null,
				spells: [],
				range: 7 // how far we can see
			}
		})
		this.path = new ROT.Path.AStar(this.x, this.y, pathfinding)
		this.nearbyEnemies = []
		this.currentLevel = Game.currentLevel
		// Inventory is an array of objects that contain items and an action that can be done with that item.
		// You can think of the objects as individual 'slots' to store the item with actions like 'use' or 'equip'.
		// Give the player a few starting items:
		// - a health potion
		// - a random sword (equip the sword)
		let sword = new Sword(this.x, this.y, 2, 2, 'Training Sword', 35)
		this.addToInventory(sword)
		// this.equipWeapon(this.inventory[0].item);
		this.addToInventory(createBow(this.x, this.y, 664))
		this.addToInventory(new SteelArrow(this.x, this.y, 784, 5))
		this.addToInventory(new HealthPotion(this.x, this.y, 488))
		this.addToInventory(new ManaPotion(this.x, this.y, 608))

		// this.addToInventory(new ManaPotion(this.x,this.y, 495));
		this.cb.spells.push(new MagicDart())
		// this.cb.spells.push(new Pain())
		// this.cb.spells.push(new Regeneration())
		// this.cb.spells.push(new VampiricDraining())
		// this.cb.spells.push(new AnimateDead())

		this.selectSpell(this.cb.spells[0])
	}

	selectSpell(spell) {
		if (this.cb.spells.includes(spell)) {
			this.cb.currentSpell = spell
		}
	}

	recalculatePath() {
		this.path = new ROT.Path.AStar(this.x, this.y, pathfinding)
	}

	interact(actor) {
		// returns true if we can continue to move to the tile
		if ('cb' in actor && actor.cb.hostile) {
			this.attack(actor)
			if (!actor.isDead()) actor.react(this)
			else return true // we can move
		} else {
			// non-combat interaction which leties from each actor to another,
			// so we will design non-combat based actors to simply perform actions
			// in a reactionary manner so that it offloads player code blocks.
			actor.react(this)
			return false
		}
	}

	gain_xp(xp) {
		this.cb.xp += xp
		if (xp_levels[this.cb.level] <= this.cb.xp) {
			this.level_up()
		}
	}

	remainingXP() {
		return xp_levels[this.cb.level] - this.cb.xp
	}

	level_up() {
		this.cb.level += 1
		this.cb.maxhp += 5
		this.cb.str += 1
		this.cb.hp = this.cb.maxhp
		this.cb.mana = this.cb.maxmana
		Game.log(`You leveled up! You are now Level ${this.cb.level}.`, 'level_up')
		Game.log('Your strength and health have improved.', 'level_up')
	}

	act() {
		super.act()
		this.path = new ROT.Path.AStar(this.x, this.y, pathfinding)
		this.nearbyEnemies = Game.getNearbyEnemies()
		this.currentLevel = Game.currentLevel
		Game.engine.lock()
		window.addEventListener('keydown', this)
		if (this.mouseEnabled) {
			window.addEventListener('mousemove', this)
			window.addEventListener('click', this)
		}
	}

	handleEvent(evt) {
		let endTurn = () => {
			window.removeEventListener('keydown', this)
			window.removeEventListener('mousemove', this)
			window.removeEventListener('click', this)
			Game.engine.unlock()
			Game.clearTempLog()
		}

		let restartTurn = () => {
			window.removeEventListener('keydown', this)
			window.removeEventListener('mousemove', this)
			window.removeEventListener('click', this)
			window.addEventListener('keydown', this)
			if (this.mouseEnabled) {
				console.log('Adding event listener for mousemove and click')
				window.addEventListener('mousemove', this)
				window.addEventListener('click', this)
			}
		}

		const confirmTargeting = () => {
			let { x, y } = Game.selectedTile
			let tile = Game.map.data[y][x]
			let ammo = this.cb.equipment.ammo
			let weapon = this.cb.equipment.weapon
			let dmg = weapon.roll() + ammo.cb.damage + this.cb.str
			ammo.quantity--
			if (ammo.quantity === 0) {
				Game.log(`You fire your last ${ammo.type.toLowerCase()}!`, 'alert')
			}
			// find actors on this tile
			let enemies = tile.actors.filter(e => {
				return e.cb !== undefined && e.cb.hostile
			})
			if (enemies.length > 0) {
				let enemy = enemies[0]
				this.targeting = false
				let evtdamage = `${addPrefix(this.name).capitalize()} hit ${addPrefix(enemy.name)} with ${addPrefix(
					ammo.type.toLowerCase()
				)} and dealt ${dmg} damage.`
				Game.log(evtdamage, 'player_move')
				enemy.damage(dmg)
			} else {
				Game.log(`Your ${ammo.type.toLowerCase()} didn't hit anything!`, 'alert')
			}
			if (ammo.quantity == 0) {
				this.unequipAmmo()
				this.removeFromInventory(ammo)
			}
			this.targeting = false
			Game.enemyCycle = null
			this.validTarget = null
			Game.pathToTarget = {}
			if (this.mouseEnabled) Game.redrawSelectedTile(false)

			endTurn()
		}

		const confirmCasting = () => {
			let { x, y } = Game.selectedTile
			let tile = Game.map.data[y][x]
			// find actors on this tile
			let enemies = tile.actors.filter(e => {
				return e.cb !== undefined && e.cb.hostile
			})
			if (enemies.length > 0) {
				let enemy = enemies[0]
				Game.log(`You cast ${this.cb.currentSpell.name} at the ${enemies[0].name}.`, 'magic')
				this.cb.currentSpell.cast(enemies[0], this)
			} else {
				Game.log(`You cast ${this.cb.currentSpell.name} but it hits nothing!`, 'magic')
			}
			this.cb.mana -= this.cb.currentSpell.manaCost
			this.casting = false
			Game.enemyCycle = null
			Game.pathToTarget = {}
			if (this.mouseEnabled) Game.redrawSelectedTile(false)

			this.validTarget = null
			endTurn()
		}

		/* Mouse controls to hover over tiles for info (describe) */
		if (evt.type === 'click') {
			let loc = Game.eventToTile(evt)
			if (this.targeting) {
				if (this.validTarget) {
					confirmTargeting()
				} else {
					Game.log("You cannot shoot this tile because it's blocked or out of range!", 'alert')
				}
			} else if (this.casting) {
				if (this.validTarget) {
					confirmCasting()
				} else {
					Game.log(
						`You cannot cast ${
							this.cb.currentSpell.name
						} at this tile because it's blocked or too far away.`,
						'alert'
					)
				}
			}
			return
		}

		if (evt.type === 'mousemove') {
			let loc = Game.eventToTile(evt)
			Game.clearSelectedTile()
			this.validTarget = Game.changeToExactSelectedTile(loc, this.targeting || this.casting)
			setTimeout(() => {
				this.mouseMoved = true
			}, 18)
			if (this.mouseMoved) {
				Game.drawViewPort()
				this.mouseMoved = false
			}
			return
		}

		let code = evt.keyCode
		let shift_pressed = evt.getModifierState('Shift')
		let movementKeys = [0, 1, 2, 3, 4, 5, 6, 7]
		let cycleKeys = [9, 61, 187, 191]
		let confirmKeys = [101, 13, 190]
		if (cycleKeys.includes(code)) {
			evt.preventDefault()
		}

		let keyMap = {
			/* Arrow Key movement */
			39: 2,
			37: 6,
			38: 0,
			40: 4,
			/* Num Pad Movement */
			104: 0,
			105: 1,
			102: 2,
			99: 3,
			98: 4,
			97: 5,
			100: 6,
			103: 7,
			/* Rest using '5' in numpad */
			101: 'rest',
			/* vi movement */
			75: 0,
			85: 1,
			76: 2,
			78: 3,
			74: 4,
			66: 5,
			72: 6,
			89: 7,
			/* Fire a weapon */
			70: 'fire',
			/* Cast a spell */
			90: 'cast',
			/* Misc */
			188: 'pickup',
			71: 'pickup',
			190: 'rest',
			88: 'examine'
		}

		if (this.targeting) {
			if (!movementKeys.includes(keyMap[code]) && !confirmKeys.includes(code)) {
				if (code === 70 || code == 27) {
					Game.log(`You put away your ${this.cb.equipment.weapon.type.toLowerCase()}.`, 'information')
					this.targeting = false
					Game.enemyCycle = null
					Game.pathToTarget = {}
					if (this.mouseEnabled) Game.redrawSelectedTile(false)
					else Game.clearSelectedTile()
					Game.clearTempLog()
				} else if (cycleKeys.includes(code)) {
					this.validTarget = Game.cycleThroughSelectableEnemies()
				}
			} else if (movementKeys.includes(keyMap[code])) {
				let diff = ROT.DIRS[8][keyMap[code]]
				this.validTarget = Game.changeSelectedTile(diff)
			} else {
				if (confirmKeys.includes(code)) {
					if (this.validTarget) {
						confirmTargeting()
						return
					} else {
						Game.log("You cannot shoot this tile because it's blocked or out of range!", 'alert')
					}
				}
			}

			restartTurn()
			return
		}

		// currently casting a spell
		if (this.casting) {
			if (!movementKeys.includes(keyMap[code]) && !confirmKeys.includes(code)) {
				if (code === 90 || code == 27) {
					Game.log('You stop casting the spell.', 'information')
					this.casting = false
					Game.enemyCycle = null
					Game.pathToTarget = {}
					if (this.mouseEnabled) Game.redrawSelectedTile(false)
					else Game.clearSelectedTile()
				} else if (cycleKeys.includes(code)) {
					this.validTarget = Game.cycleThroughSelectableEnemies()
				}
			} else if (movementKeys.includes(keyMap[code])) {
				let diff = ROT.DIRS[8][keyMap[code]]
				this.validTarget = Game.changeSelectedTile(diff)
			} else {
				if (this.validTarget) {
					if (confirmKeys.includes(code)) {
						confirmCasting()
						return
					}
				} else {
					Game.log(
						`You cannot cast ${
							this.cb.currentSpell.name
						} at this tile because it's blocked or too far away.`,
						'alert'
					)
				}
			}
			restartTurn()
			return
		}

		if (this.examining) {
			if (!movementKeys.includes(keyMap[code])) {
				if (code === 27 || code == 88) {
					Game.log('You quit examining the area.', 'information')
					this.examining = false
					Game.clearSelectedTile()
					Game.clearTempLog()
				}
			} else if (movementKeys.includes(keyMap[code])) {
				let diff = ROT.DIRS[8][keyMap[code]]
				this.validTarget = Game.changeSelectedTile(diff)
			}

			restartTurn()
			return
		}

		if (!(code in keyMap)) {
			// invalid key press, retry turn
			restartTurn()
			return
		}

		if (keyMap[code] === 'rest' && !shift_pressed) {
			// Rest
			// this.heal(this.cb.hpRecovery);
			// this.restore(this.cb.manaRecovery);
			Game.log('You rest for a turn.', 'player_move')
		} else if (keyMap[code] === 'pickup' && !shift_pressed) {
			this.pickup()
		} else if (keyMap[code] === 'rest' && shift_pressed) {
			// climb down
			this.climb('down')
		} else if (keyMap[code] === 'pickup' && shift_pressed) {
			this.climb('up')
		} else if (keyMap[code] === 'fire' && !shift_pressed) {
			let weapon = this.cb.equipment.weapon
			let ammo = this.cb.equipment.ammo
			if (
				weapon !== null &&
				ammo !== null &&
				weapon.cb.ranged &&
				ammo.cb.ammoType === weapon.cb.ammoType &&
				ammo.quantity > 0
			) {
				Game.log(`You take aim with your ${weapon.type.toLowerCase()}.`, 'information')
				Game.log(
					`Select a target with the movement keys and press [enter] to fire your ${weapon.type.toLowerCase()}.`,
					'player_move'
				)
				this.validTarget = Game.redrawSelectedTile(true)
				this.targeting = true
				restartTurn()
				return
			} else {
				if (weapon === null || !weapon.cb.ranged) {
					Game.log("You don't have a ranged weapon equipped!", 'information')
				} else if (ammo === null) {
					Game.log("You don't have any ammunition equipped.", 'information')
				} else if (ammo.cb.ammoType !== weapon.cb.ammoType) {
					Game.log("You don't have the right ammunition equipped for this weapon.", 'information')
				}
				restartTurn()
				return
			}
		} else if (keyMap[code] === 'cast') {
			let currentSpell = this.cb.currentSpell
			if (currentSpell === null) {
				Game.log('You must select a spell to cast. Select one from the spellbook!', 'information')
				restartTurn()
				return
			} else if (currentSpell.manaCost > this.cb.mana) {
				Game.log(`You don't have enough mana to cast ${currentSpell.name}!`, 'alert')
				restartTurn()
				return
			}

			if (currentSpell.targetType === targetTypes.SELF) {
				Game.log(`You cast ${currentSpell.name}.`, 'magic')
				currentSpell.cast(this, this)
				this.cb.mana -= currentSpell.manaCost
				restartTurn()
				return
			} else if (currentSpell.targetType === targetTypes.TARGET) {
				Game.log('You begin casting a spell.', 'defend')
				Game.log('Select a target with the movement keys and press [enter] to cast the spell.', 'player_move')
				this.validTarget = Game.redrawSelectedTile(true)
				this.casting = true
				// our first selected tile can be the nearest enemy
				restartTurn()
				return
			}
		} else if (keyMap[code] === 'examine') {
			this.examining = true
			// Game.selectNearestEnemyTile()
			restartTurn()
			return
		} else {
			let diff = ROT.DIRS[8][keyMap[code]]
			let nx = this.x + diff[0]
			let ny = this.y + diff[1]
			if (!this.tryMove(nx, ny)) {
				restartTurn()
				return
			}
		}
		endTurn()
	}

	pickup() {
		let ctile = Game.map.data[this.y][this.x]
		let tileItems = ctile.actors.filter(function(el) {
			return el instanceof Item
		})
		if (tileItems.length === 1) {
			Game.log(`You picked up a ${tileItems[0].type.toLowerCase()}.`, 'information')
			this.addToInventory(tileItems[0])
			ctile.removeActor(tileItems[0])
		} else if (tileItems.length > 1) {
			let itemTypes = []
			for (let item of tileItems) {
				itemTypes.push(item.type.toLowerCase())
				this.addToInventory(item)
				ctile.removeActor(item)
			}
			let prettyItemTypes = itemTypes.slice(1, itemTypes.length - 1)
			prettyItemTypes = prettyItemTypes.reduce((buf, str) => {
				return buf + ', a ' + str
			}, 'a  ' + itemTypes.slice(0, 1))
			let lastItem = ` and a ${itemTypes.slice(-1)}.`
			let buffer = `You picked up ${prettyItemTypes + lastItem}`
			Game.log(buffer, 'information')
		} else {
			Game.log("There's nothing to pick up.", 'information')
		}
	}

	// Overriding the actor
	equipWeapon(item) {
		super.equipWeapon(item)
		Game.log(`You wield the ${item.type.toLowerCase()}.`, 'information')
	}

	unequipWeapon() {
		if (this.cb.equipment.weapon !== null) {
			this.cb.equipment.weapon.cb.equipped = false
			this.cb.equipment.weapon = null
		} else {
			throw 'Tried to uneqip weapon but no item was equipped.'
		}
	}

	unequipAmmo() {
		if (this.cb.equipment.ammo !== null) {
			this.cb.equipment.ammo.cb.equipped = false
			this.cb.equipment.ammo = null
		} else {
			throw 'Tried to uneqip ammo but no item was equipped.'
		}
	}

	climb(dir) {
		let ctile = Game.map.data[this.y][this.x]
		let ladder = ctile.actors.filter(a => {
			return a instanceof Ladder
		})[0]
		if (ladder === undefined || ladder.direction !== dir) {
			Game.log(`You cannot climb ${dir} here.`, 'information')
		} else {
			ladder.react(this)
		}
	}

	tryMove(nx, ny) {
		// returns true if the turn should end here
		if (nx < 0 || nx === Game.map.width || ny < 0 || ny === Game.map.height) return
		let ntile = Game.map.data[ny][nx] // new tile to move to
		if (ntile.actors.length === 0 && !ntile.blocked()) {
			this.move(nx, ny)
			Game.clearSelectedTile()
			return true
		} else if (ntile.actors.length > 0) {
			for (let i = 0; i < ntile.actors.length; i++) {
				let actor = ntile.actors[i]
				if (actor.blocked) {
					this.interact(actor)
					return true
				}
			}
		}

		if (!ntile.blocked()) {
			this.move(nx, ny)
			Game.clearSelectedTile()
			return true
		}

		return false
	}

	attack(actor) {
		let dmg = super.attack(actor)
	}

	death() {
		super.death()
		window.removeEventListener('keydown', this)
		this.cb.hp = 0
		// Game.scheduler.remove(Game.player);
		Game.scheduler.clear()
	}
}
