/**
 * Created by Larken on 6/22/2017.
 */
import ROT from 'rot-js'
import { Game } from '#/Game.js'
import { Actor } from '#/entities/actors/Actor.js'
import { addPrefix } from '#/utils/HelperFunctions.js'
import Item from '#/entities/items/Item.js'
// Weapons
import { Sword, materialTypes } from '#/entities/items/weapons/Sword.js'

import { createBow } from '#/entities/items/weapons/ranged/Bow.js'
import { SteelArrow } from '#/entities/items/weapons/ranged/ammo/Arrow.js'
// Potions
import HealthPotion from '#/entities/items/potions/HealthPotion.js'
import StrengthPotion from '#/entities/items/potions/StrengthPotion.js'
import ManaPotion from '#/entities/items/potions/ManaPotion.js'
// Spells
import { targetTypes, MagicDart, Regeneration, Pain, VampiricDraining, AnimateDead, MinorHeal } from '#/magic/Spell.js'
// effects
import { BleedEnchantment } from '#/modifiers/Enchantment.js'
// Misc
import Ladder from '#/entities/misc/Ladder.js'
import { xp_levels } from '#/entities/Entity.js'
import Gold from '#/entities/items/misc/Gold.js'
import { createItem } from '#/utils/EntityFactory.js'

function pathfinding(x, y) {
	return !Game.getTile(x, y).blocked() && Game.inbounds(x, y)
}

export default class Player extends Actor {
	constructor(x, y, id) {
		super(x, y, {
			id: id,
			name: 'you',
			description: "It's you!",
			fg: 'yellow',
			bg: 'yellow',
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
				maxmana: 18,
				/* current stats */
				xp: 50,
				level: 1,
				hp: 50,
				mana: 18,
				str: 1,
				def: 1,
				/* Per-turn effects */
				hpRecovery: 1,
				manaRecovery: 2.5,
				invulnerable: false,
				/* Magic & Ranged */
				validTarget: null,
				currentSpell: null,
				spells: [],
				range: 7, // how far we can see
				/* End Game data */
				turnsTaken: 0,
				enemiesKilled: 0,
				damageDealt: 0,
				damageTaken: 0,
				spellsCast: 0,
				potionsConsumed: 0,
				healthRestored: 0,
				dungeonsExplored: 0,
				chestsOpened: 0,
				dead: false
			},
			keyTimer: null
		})
		this.keyMap = {
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
			/* AWSD Movement */
			68: 2,
			65: 6,
			87: 0,
			83: 4,
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
			/* Interact */
			69: 'interact',
			/* Misc */
			188: 'pickup',
			71: 'pickup',
			190: 'rest',
			88: 'examine'
		}
		this.path = new ROT.Path.AStar(this.x, this.y, pathfinding)
		this.nearbyEnemies = []
		this.currentLevel = Game.currentLevel
		// Inventory is an array of objects that contain items and an action that can be done with that item.
		// You can think of the objects as individual 'slots' to store the item with actions like 'use' or 'equip'.
		// Give the player a few starting items:
		// - a health potion
		// - a random sword (equip the sword)
		this.addToInventory(createItem('SWORD', this.x, this.y, null, { materialType: materialTypes.BRONZE }))
		super.equipWeapon(this.inventory[0].item)
		this.addToInventory(new Gold(this.x, this.y, 1388, 5))
		this.addToInventory(createBow(this.x, this.y, 664))
		this.addToInventory(new SteelArrow(this.x, this.y, 784, 7))
		this.addToInventory(new HealthPotion(this.x, this.y, 488))
		this.addToInventory(new ManaPotion(this.x, this.y, 608))
		this.cb.spells.push(new MagicDart())
		this.cb.spells.push(new MinorHeal())
		this.selectSpell(this.cb.spells[0])
		this.mouseEnabled = false
		this.commandQueue = []
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
		super.interact(actor)
		// returns true if we can continue to move to the tile
		if ('cb' in actor && actor.cb.hostile) {
			this.attack(actor)
			if (!actor.isDead()) actor.react(this)
			else return true // we can move
		} else {
			// non-combat interaction which varies from each actor to another,
			// so we will design non-combat based actors to simply perform actions
			// in a reactionary manner so that it offloads player code blocks.
			actor.react(this)
			return false
		}
	}

	gain_xp(xp) {
		this.cb.xp += xp
		if (xp_levels[this.cb.level] <= this.cb.xp && !this.isDead()) {
			this.level_up()
		}
	}

	remainingXP() {
		return xp_levels[this.cb.level] - this.cb.xp
	}

	level_up() {
		this.cb.level += 1
		Game.log(`You leveled up! You are now Level ${this.cb.level}.`, 'level_up')
		if (this.cb.level % 2 === 0) {
			Game.log('Your strength and health have improved.', 'level_up')
			this.cb.maxhp += 5
			this.cb.str += 1
		}
		this.cb.hp = this.cb.maxhp
		this.cb.mana = this.cb.maxmana
	}

	act() {
		super.act()
		this.path = new ROT.Path.AStar(this.x, this.y, pathfinding)
		this.nearbyEnemies = Game.getNearbyEnemies()
		this.currentLevel = Game.currentLevel
		Game.engine.lock()
		this.cb.turnsTaken++
		if (this.cb.turnsTaken % 5 === 0) this.heal(this.cb.hpRecovery)
		if (this.cb.turnsTaken % 10 === 0) this.restore(this.cb.manaRecovery)
		if (this.commandQueue.length > 0) {
			// perform player commands and unlock
			let { fn } = this.commandQueue.pop()
			fn()
			Game.engine.unlock()
			return
		}

		window.addEventListener('keydown', this)
		/*
			if (this.mouseEnabled) {
				window.addEventListener('mousemove', this.mouseHandler)
				window.addEventListener('click', this.mouseHandler)
			}
		*/
	}

	endTurn() {
		let waitUntilPlayerReleases = evt => {
			this.keyTimer = null
		}
		// setTimeout(() => Game.engine.unlock(), 18)
		window.removeEventListener('keyup', waitUntilPlayerReleases)

		window.removeEventListener('keydown', this)
		window.removeEventListener('mousemove', this.mouseHandler)
		window.removeEventListener('click', this.mouseHandler)
		window.addEventListener('keyup', waitUntilPlayerReleases)
		Game.clearTempLog()
		Game.engine.unlock()
	}

	handleExamineEvent(evt) {
		let { keyCode } = evt
		let cycleKeys = [9, 61, 187, 191]
		let confirmKeys = [101, 13, 190, 110]
		let exitKeys = [70, 27, 90, 88]
		let movementKeys = [0, 1, 2, 3, 4, 5, 6, 7]

		if (exitKeys.includes(keyCode)) {
			Game.log('You quit examining the area.', 'information')
			this.examining = false
			Game.clearTempLog()
			Game.clearSelectedTile()
		} else if (movementKeys.includes(this.keyMap[keyCode])) {
			let diff = ROT.DIRS[8][this.keyMap[keyCode]]
			let x = Game.selectedTile.x + diff[0]
			let y = Game.selectedTile.y + diff[1]
			if (Game.inbounds(x, y) && Game.inViewport(x, y)) {
				Game.changeSelectedTile(Game.getTile(x, y))
				this.validTarget = !Game.selectedTile.blocked() && Game.map.visible_tiles[x + ',' + y] !== undefined
			}
		} else if (cycleKeys.includes(keyCode)) {
			this.validTarget = Game.cycleThroughSelectableEnemies()
		}
		return
	}

	handleRangedFireEvent(evt) {
		let { keyCode } = evt
		evt.preventDefault()
		let cycleKeys = [9, 61, 187, 191]
		let confirmKeys = [101, 13, 190, 110]
		let exitKeys = [70, 27, 90, 88]
		let movementKeys = [0, 1, 2, 3, 4, 5, 6, 7]

		const confirmRangedFire = () => {
			let tile = Game.selectedTile
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
			this.validTarget = null
			// create an arrow sprite and move it to the fired location
			// let ammoSprite = new PIXI.Sprite(Game.display.getTexture(ammo.id))
			// Game.display.background.addChild(ammoSprite)
			// ammoSprite.position.set(this.x * Game.display.tileSize, this.y * Game.display.tileSize)
			// // ammoSprite.scale.y = -1
			// ammoSprite.anchor.set(0.5)
			// // Math.atan2(tile.x - this.x, tile.y - this.y)
			// ammoSprite.rotation = 2.356
			// let x = 0
			// let y = 0
			// if (tile.x < this.x) x = tile.x - this.x
			// if (this.x < tile.x) x = this.x - tile.x
			// if (tile.y > this.y) y = tile.y - this.y
			// if (this.y < tile.y) y = this.y - tile.y
			// ammoSprite.rotation += Math.atan2(x, y)
			// Game.display.moveSprite(ammoSprite, tile.x, tile.y)
			Game.clearSelectedTile()
			this.endTurn()
		}

		if (exitKeys.includes(keyCode)) {
			Game.log(`You put away your ${this.cb.equipment.weapon.type.toLowerCase()}.`, 'information')
			this.casting = this.targeting = this.examining = false
			Game.clearTempLog()
			Game.clearSelectedTile()
		} else if (confirmKeys.includes(keyCode)) {
			if (this.validTarget) {
				confirmRangedFire()
			} else {
				Game.log("You cannot shoot this tile because it's blocked or out of range!", 'alert')
			}
		} else if (movementKeys.includes(this.keyMap[keyCode])) {
			let diff = ROT.DIRS[8][this.keyMap[keyCode]]
			let x = Game.selectedTile.x + diff[0]
			let y = Game.selectedTile.y + diff[1]
			if (Game.inbounds(x, y) && Game.inViewport(x, y)) {
				Game.changeSelectedTile(Game.getTile(x, y))
				this.validTarget = !Game.selectedTile.blocked() && Game.map.visible_tiles[x + ',' + y] !== undefined
			}
		} else if (cycleKeys.includes(keyCode)) {
			this.validTarget = Game.cycleThroughSelectableEnemies()
		}
		return
	}

	handleMagicEvent(evt) {
		let { keyCode } = evt
		evt.preventDefault()
		let cycleKeys = [9, 61, 187, 191]
		let confirmKeys = [101, 13, 190, 110]
		let exitKeys = [70, 27, 90, 88]
		let movementKeys = [0, 1, 2, 3, 4, 5, 6, 7]

		const confirmSpellcasting = () => {
			let tile = Game.selectedTile
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
			this.validTarget = null
			this.cb.spellsCast++
			Game.clearSelectedTile()
			this.endTurn()
		}

		if (exitKeys.includes(keyCode)) {
			Game.log('You stop casting the spell.', 'information')
			this.casting = false
			Game.clearTempLog()
			Game.clearSelectedTile()
		} else if (confirmKeys.includes(keyCode)) {
			if (this.validTarget) {
				confirmSpellcasting()
			} else {
				Game.log(`You cannot cast ${this.cb.currentSpell.name} at this tile because it's blocked or too far away.`, 'alert')
			}
		} else if (movementKeys.includes(this.keyMap[keyCode])) {
			let diff = ROT.DIRS[8][this.keyMap[keyCode]]
			let x = Game.selectedTile.x + diff[0]
			let y = Game.selectedTile.y + diff[1]
			if (Game.inbounds(x, y) && Game.inViewport(x, y)) {
				Game.changeSelectedTile(Game.getTile(x, y))
				this.validTarget = !Game.selectedTile.blocked() && Game.map.visible_tiles[x + ',' + y] !== undefined
			}
		} else if (cycleKeys.includes(keyCode)) {
			this.validTarget = Game.cycleThroughSelectableEnemies()
		}
	}

	helpScreenHandler(evt) {}

	npcDialogHandler(evt) {
		let { keyCode } = evt
		evt.preventDefault()
		const confirm = [ROT.VK_RETURN, ROT.VK_E]
		const up = [ROT.VK_UP, ROT.VK_NUMPAD8, ROT.VK_W]
		const down = [ROT.VK_DOWN, ROT.VK_NUMPAD2, ROT.VK_S]
		const numbers = [ROT.VK_1, ROT.VK_2, ROT.VK_3, ROT.VK_4, ROT.VK_5, ROT.VK_6, ROT.VK_7, ROT.VK_8, ROT.VK_9]
		const dialogue = Game.overlayData.dialogue
		const selectedChoiceIndex = dialogue.selectedChoice // the index of the choice we've selected
		const choices = Game.overlayData.dialogue.getChoices()
		if (confirm.includes(keyCode)) {
			// select that choice and proceed in dialog
			const selectedChoice = choices[selectedChoiceIndex] // the selected choice
			dialogue.selectChoice(selectedChoice)
		} else if (numbers.includes(keyCode)) {
			const index = keyCode - 49 // the key code for 1 starts at 49 leading up to 57
			if (index <= choices.length - 1) {
				dialogue.selectChoice(choices[index])
			}
		} else if (down.includes(keyCode)) {
			if (selectedChoiceIndex < choices.length - 1) Game.overlayData.dialogue.selectedChoice++
		} else if (up.includes(keyCode)) {
			if (selectedChoiceIndex > 0) Game.overlayData.dialogue.selectedChoice--
		}
	}

	mouseHandler(evt) {
		/* Mouse controls to hover over tiles for info (describe) */
		if (evt.type === 'click') {
			if (this.targeting) {
				if (this.validTarget) {
					confirmRangedFire()
				} else {
					Game.log("You cannot shoot this tile because it's blocked or out of range!", 'alert')
				}
			} else if (this.casting) {
				if (this.validTarget) {
					confirmSpellcasting()
				} else {
					Game.log(`You cannot cast ${this.cb.currentSpell.name} at this tile because it's blocked or too far away.`, 'alert')
				}
			}
			// else, if the tile is within one square of the player, they can move to that tile by clicking
			return
		}

		if (evt.type === 'mousemove') {
			let tile = Game.eventToTile()
			if (tile !== null) {
				this.validTarget = Game.changeSelectedTile(tile)
			}

			setTimeout(() => {
				this.mouseMoved = true
			}, 18)
			if (this.mouseMoved) {
				this.mouseMoved = false
			}
			return
		}
	}

	handleEvent(evt) {
		/* Switches event handlers based on context of what the player is currently doing
			 Possibilities:
				- Examining
				- Ranged Targeting
				- Magic Spell Casting
				- Movement, Picking up items, Climbing Ladders
				- Mouse movement
				- Navigating a Menu
					* Help Dialog Screen
					* NPC Dialogue
					* ...
		 */

		// updating our vision with the most up to date information
		Object.assign(Game.map.seen_tiles, Game.map.visible_tiles)
		Game.map.visible_tiles = {}

		// FOV calculations
		let fov = new ROT.FOV.PreciseShadowcasting((x, y) => {
			return Game.inbounds(x, y) && Game.getTile(x, y).visible()
		})

		fov.compute(Game.player.x, Game.player.y, Game.player.cb.range, (x, y, r, visibility) => {
			Game.map.visible_tiles[x + ',' + y] = true
		})

		if (Game.overlayData.visible) {
			switch (Game.overlayData.component) {
				case 'npc-dialogue':
					return this.npcDialogHandler(evt)
				default:
					console.error('Game is showing overlay for which the player cannot handle')
			}
		} else if (this.examining) {
			this.handleExamineEvent(evt)
		} else if (this.casting) {
			this.handleMagicEvent(evt)
		} else if (this.targeting) {
			this.handleRangedFireEvent(evt)
		} else if (this.helpDialogOpen) {
			this.helpScreenHandler(evt)
		} else if (this.npcDialogOpen) {
			this.npcDialogHandler(evt)
		} else {
			let { keyCode } = evt
			let shiftPressed = evt.getModifierState('Shift')
			let movementKeys = [0, 1, 2, 3, 4, 5, 6, 7]

			if (!(keyCode in this.keyMap)) {
				// invalid key press, retry turn
				return
			}

			evt.preventDefault()

			/* If the key event isn't repeated within the last 160 milliseconds (too soon), then we proceed but we keep track of this
			 	key movement time */
			if (evt.type === 'keydown' && movementKeys.includes(this.keyMap[keyCode])) {
				if (this.keyTimer === null) {
					this.keyTimer = new Date()
				} else {
					let start = this.keyTimer.getTime()
					let now = new Date().getTime()
					if (!(now - start >= 160)) {
						return
					} else {
						// we've waited long enough, but add another timer just in case
						this.keyTimer = new Date()
					}
				}
			}

			const action = this.keyMap[keyCode]
			if (action === 'rest' && !shiftPressed) {
				Game.log('You rest for a turn.', 'player_move')
			} else if (action === 'pickup' && !shiftPressed) {
				this.pickup()
			} else if ((action === 'rest' && shiftPressed) || (action === 'pickup' && shiftPressed) || action === 'interact') {
				this.climb()
			} else if (action === 'fire' && !shiftPressed) {
				let weapon = this.cb.equipment.weapon
				let ammo = this.cb.equipment.ammo
				if (
					weapon !== null &&
					ammo !== null &&
					weapon.cb.ranged &&
					ammo.cb.ammoType === weapon.cb.ammoType &&
					ammo.quantity > 0
				) {
					Game.log(`You take aim with your ${weapon.type.toLowerCase()}.`, 'darkgreen')
					Game.log(
						`Select a target with the movement keys and press [enter] or [.] to fire your ${weapon.type.toLowerCase()}.`,
						'player_move'
					)
					this.validTarget = Game.selectNearestEnemyTile()
					if (!this.validTarget) Game.changeSelectedTile(Game.getTile(this.x, this.y))
					this.targeting = true
					return
				} else {
					if (weapon === null || !weapon.cb.ranged) {
						Game.log("You don't have a ranged weapon equipped!", 'information')
					} else if (ammo === null) {
						Game.log("You don't have any ammunition equipped.", 'information')
					} else if (ammo.cb.ammoType !== weapon.cb.ammoType) {
						Game.log("You don't have the right ammunition equipped for this weapon.", 'information')
					}
					return
				}
			} else if (action === 'cast') {
				let currentSpell = this.cb.currentSpell
				if (currentSpell === null) {
					Game.log('You must select a spell to cast. Select one from the spellbook!', 'information')
					return
				} else if (currentSpell.manaCost > this.cb.mana) {
					Game.log(`You don't have enough mana to cast ${currentSpell.name}!`, 'alert')
					return
				}

				if (currentSpell.targetType === targetTypes.SELF) {
					Game.log(`You cast ${currentSpell.name}.`, 'magic')
					currentSpell.cast(this, this)
					this.cb.mana -= currentSpell.manaCost
				} else if (currentSpell.targetType === targetTypes.TARGET) {
					Game.log('You begin casting a spell.', 'magic')
					Game.log('Select a target with the movement keys and press [enter] or [.] to cast the spell.', 'player_move')
					this.validTarget = Game.selectNearestEnemyTile()
					if (!this.validTarget) Game.changeSelectedTile(Game.getTile(this.x, this.y))
					this.casting = true
					// our first selected tile can be the nearest enemy
					return
				}
			} else if (action === 'examine') {
				Game.log('You begin examining the area.', 'information')
				this.examining = true
				Game.changeSelectedTile(Game.getTile(this.x, this.y))
				return
			} else {
				let diff = ROT.DIRS[8][action]
				let nx = this.x + diff[0]
				let ny = this.y + diff[1]
				if (!this.tryMove(nx, ny)) {
					return
				}
			}
			this.endTurn()
		}
	}

	pickup() {
		let ctile = Game.map.data[this.y][this.x]
		let tileItems = ctile.actors.filter(el => {
			return el instanceof Item
		})
		if (tileItems.length === 1) {
			Game.log(`You picked up a ${tileItems[0].type.toLowerCase()}.`, 'information')
			Game.display.clearSprite(tileItems[0])
			this.addToInventory(tileItems[0])
			ctile.removeActor(tileItems[0])
		} else if (tileItems.length > 1) {
			let itemTypes = []
			for (let item of tileItems) {
				itemTypes.push(item.type.toLowerCase())
				Game.display.clearSprite(item)
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
			Game.log("There's nothing here to pick up.", 'information')
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

	climb() {
		let ctile = Game.map.data[this.y][this.x]
		let ladder = ctile.actors.filter(a => {
			return a instanceof Ladder
		})[0]

		if (ladder === undefined) {
			Game.log('There are no steps or ladders here to use!', 'information')
		} else {
			ladder.react(this)
		}
	}

	tryMove(nx, ny) {
		// returns true if the turn should end here
		if (!Game.inbounds(nx, ny)) return
		let ntile = Game.getTile(nx, ny) // new tile to move to
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
		this.cb.dead = true
		// Game.scheduler.remove(Game.player);
		Game.scheduler.clear()
	}
}
