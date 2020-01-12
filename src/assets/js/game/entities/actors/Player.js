/**
 * Created by Larken on 6/22/2017.
 */
import ROT from 'rot-js'
import { Game } from '#/Game.js'
import { Actor } from '#/entities/actors/Actor.js'

import { addPrefix, pathfinding, getVisibleTiles } from '#/utils/HelperFunctions.js'
// Weapons
import { materialTypes } from '#/utils/Constants.js'
import { Sword } from '#/entities/items/weapons/Sword.js'

import { createBow } from '#/entities/items/weapons/ranged/Bow.js'
import { SteelArrow } from '#/entities/items/weapons/ranged/ammo/Arrow.js'
// Potions
import HealthPotion from '#/entities/items/potions/HealthPotion.js'
import StrengthPotion from '#/entities/items/potions/StrengthPotion.js'
import ManaPotion from '#/entities/items/potions/ManaPotion.js'
// Spells
import { targetTypes, spellTypes, MagicDart, FireBall, Rage, MinorHeal, Shock } from '#/magic/Spell.js'
// effects
import { BleedEnchantment } from '#/modifiers/Enchantment.js'
// Misc
import Ladder from '#/entities/misc/Ladder.js'
import { xp_levels } from '#/entities/Entity.js'
import Gold from '#/entities/items/misc/Gold.js'
import Chest from '#/entities/misc/Chest.js'
import Item from '#/entities/items/Item.js'
import { createItem } from '#/utils/EntityFactory.js'
import { AutoexploreGoal } from '../../utils/Goals'
import MapRevealingScroll from '../items/scrolls/MapRevealingScroll'

const movementKeys = [
	ROT.VK_RIGHT,
	ROT.VK_LEFT,
	ROT.VK_UP,
	ROT.VK_DOWN,
	ROT.VK_NUMPAD8,
	ROT.VK_NUMPAD9,
	ROT.VK_NUMPAD6,
	ROT.VK_NUMPAD3,
	ROT.VK_NUMPAD2,
	ROT.VK_NUMPAD1,
	ROT.VK_NUMPAD4,
	ROT.VK_NUMPAD7,
	ROT.VK_H,
	ROT.VK_U,
	ROT.VK_L,
	ROT.VK_N,
	ROT.VK_J,
	ROT.VK_B,
	ROT.VK_K,
	ROT.VK_Y
]

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
			canLoot: true,
			cb: {
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
			// Arrow Pad
			[ROT.VK_RIGHT]: 2,
			[ROT.VK_LEFT]: 6,
			[ROT.VK_UP]: 0,
			[ROT.VK_DOWN]: 4,
			// Numpad Movement
			[ROT.VK_NUMPAD8]: 0,
			[ROT.VK_NUMPAD9]: 1,
			[ROT.VK_NUMPAD6]: 2,
			[ROT.VK_NUMPAD3]: 3,
			[ROT.VK_NUMPAD2]: 4,
			[ROT.VK_NUMPAD1]: 5,
			[ROT.VK_NUMPAD4]: 6,
			[ROT.VK_NUMPAD7]: 7,
			// vi movement
			[ROT.VK_H]: 6,
			[ROT.VK_U]: 1,
			[ROT.VK_L]: 2,
			[ROT.VK_N]: 3,
			[ROT.VK_J]: 4,
			[ROT.VK_B]: 5,
			[ROT.VK_K]: 0,
			[ROT.VK_Y]: 7,
			// Rest using '5' in numpad
			[ROT.VK_NUMPAD5]: 'rest',
			// Fire a weapon
			[ROT.VK_F]: 'fire',
			// Cast a spell
			[ROT.VK_Z]: 'cast',
			// Interact
			[ROT.VK_E]: 'interact',
			[ROT.VK_ADD]: 'climb',
			[ROT.VK_SUBTRACT]: 'climb',

			// Misc
			[ROT.VK_I]: 'openInventory',
			[ROT.VK_S]: 'openSpellbook',
			[ROT.VK_M]: 'openSpellbook',
			[ROT.VK_COMMA]: 'pickup',
			[ROT.VK_G]: 'pickup',
			[ROT.VK_PERIOD]: 'rest',
			[ROT.VK_X]: 'examine',
			[ROT.VK_TAB]: 'autoexplore',
			[ROT.VK_NUMPAD0]: 'autoexplore',
			[ROT.VK_SPACE]: 'interact'
		}
		this.recalculatePath()
		this.nearbyEnemies = []
		this.currentLevel = Game.currentLevel
		// Inventory is an array of objects that contain items and an action that can be done with that item.
		// You can think of the objects as individual 'slots' to store the item with actions like 'use' or 'equip'.
		// Give the player a few starting items:
		// - a health potion
		// - a random sword (equip the sword)
		this.addToInventory(
			createItem('SWORD', this.x, this.y, null, {
				materialType: materialTypes.BRONZE
			})
		)

		this.equip(this.inventory[0])
		this.addToInventory(new Gold(this.x, this.y, 1388, 5))
		this.addToInventory(createBow(this.x, this.y, 664))
		this.addToInventory(new SteelArrow(this.x, this.y, 784, 7))
		this.addToInventory(new HealthPotion(this.x, this.y, 488))
		this.addToInventory(new ManaPotion(this.x, this.y, 608))
		this.addToInventory(new MapRevealingScroll(this.x, this.y, 918))
		this.cb.spells.push(new MagicDart())
		this.cb.spells.push(new MinorHeal())
		this.cb.spells.push(new Shock())
		this.cb.spells.push(new FireBall())
		this.cb.spells.push(new Rage())
		this.selectSpell(this.cb.spells[0])
		this.mouseEnabled = false
		this.commandQueue = []
		this.selectedItemSlot = { item: null, index: null }
		this.selectedSpellSlot = { spell: null, index: null }
		this.seenTiles = []
		// Event Handling boolean flags
		this.interacting = false
		this.examining = false
		this.casting = false
		this.targeting = false
		this.helpDialogOpen = false
	}

	swapInventorySlots(origin, target) {
		if (origin >= 0 && origin < this.inventory.length && target >= 0 && target < this.inventory.length && origin !== target) {
			let originalItem = this.inventory[origin]
			this.inventory.splice(origin, 1, this.inventory[target])
			this.inventory.splice(target, 1, originalItem)
			return true
		}
		return false
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
		this.recalculatePath()
		this.nearbyEnemies = Game.getNearbyEnemies()
		this.currentLevel = Game.currentLevel
		Game.engine.lock()
		this.cb.turnsTaken++
		if (this.cb.turnsTaken % 5 === 0) this.heal(this.cb.hpRecovery)
		if (this.cb.turnsTaken % 10 === 0) this.restore(this.cb.manaRecovery)

		// updating our vision with the most up to date information
		Object.assign(Game.map.seen_tiles, Game.map.visible_tiles)
		Game.map.visible_tiles = {}

		// FOV calculations
		let fov = new ROT.FOV.RecursiveShadowcasting((x, y) => {
			return Game.inbounds(x, y) && Game.getTile(x, y).visible()
		})
		if (Game.map.revealed) this.seenTiles = Game.map.getTiles()

		let visibleTiles = getVisibleTiles(this)
		for (let t of visibleTiles) {
			if (!this.seenTiles.includes(t)) {
				this.seenTiles.push(t)
			}
		}

		fov.compute(Game.player.x, Game.player.y, Game.player.cb.range, (x, y, r, visibility) => {
			Game.map.visible_tiles[x + ',' + y] = true
		})

		if (this.commandQueue.length > 0) {
			// perform player commands and unlock
			setTimeout(() => {
				this.commandQueue.shift()(this)
				Game.engine.unlock()
			}, 150)
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
		Game.drawMiniMap()
		Game.engine.unlock()
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
		if (evt.getModifierState('Control') || evt.metaKey) return

		evt.preventDefault()

		if (Game.overlayData.visible) {
			switch (Game.overlayData.component) {
				case 'npc-dialogue':
					return this.handleNPCDialogueEvent(evt)
				case 'inventory-equipment-view':
					return this.handleInventoryEvent(evt)
				case 'spellbook':
					return this.handleSpellbookEvent(evt)
				default:
					console.error('Game is showing overlay for which the player cannot handle')
			}
		} else if (this.interacting) {
			this.handleInteract(evt)
		} else if (this.examining) {
			this.handleExamineEvent(evt)
		} else if (this.casting) {
			this.handleMagicEvent(evt)
		} else if (this.targeting) {
			this.handleRangedFireEvent(evt)
		} else if (this.helpDialogOpen) {
			this.handleHelpScreenEvent(evt)
		} else {
			let { keyCode } = evt
			let shiftPressed = evt.getModifierState('Shift')
			let movementKeys = [0, 1, 2, 3, 4, 5, 6, 7]
			if (!(keyCode in this.keyMap)) {
				// invalid key press, retry turn
				return
			}

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
				// Game.log('You rest for a turn.', 'player_move')
			} else if (action === 'pickup' && !shiftPressed) {
				this.pickup()
			} else if (action === 'autoexplore') {
				// stop autoexploring when we find a tile
				// with a hostile actor or if there's loot
				this.addGoal(
					AutoexploreGoal({
						stopCondition: () => {
							let visibleTiles = getVisibleTiles(this)
							let shouldStop =
								visibleTiles.some(t => t.actors.some(a => a.cb.hostile)) ||
								visibleTiles.some(t => t.actors.some(a => a instanceof Chest && a.closed)) ||
								visibleTiles.some(t => t.actors.some(a => a instanceof Item))
							if (shouldStop) Game.log('You stop autoexploring because you see something!', 'information')
							return shouldStop
						},
						doneCallback: () => {
							Game.log(`There's nothing else to explore!`, 'information')
						}
					})
				)
			} else if ((action === 'rest' && shiftPressed) || (action === 'pickup' && shiftPressed) || action === 'climb') {
				this.climb()
			} else if (action === 'openInventory') {
				Game.openInventory()
				return
			} else if (action === 'openSpellbook' || (action === 'cast' && shiftPressed)) {
				Game.openSpellbook()
				return
			} else if (action === 'fire' && !shiftPressed) {
				let weapon = this.cb.equipment.weapon
				let ammo = this.cb.equipment.ammo
				if (weapon !== null && ammo !== null && weapon.cb.ranged && ammo.cb.ammoType === weapon.cb.ammoType && ammo.quantity > 0) {
					this.validTarget = Game.selectNearestEnemyTile(`You are aiming with your ${weapon.type.toLowerCase()}. `)
					if (!this.validTarget)
						Game.changeSelectedTile(Game.getTile(this.x, this.y), `You are aiming with your ${weapon.type.toLowerCase()}. `)
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
					this.validTarget = Game.selectNearestEnemyTile(`You are casting ${currentSpell.name}. `)
					if (!this.validTarget) Game.changeSelectedTile(Game.getTile(this.x, this.y), `You are casting ${currentSpell.name}. `)
					this.casting = true
					// our first selected tile can be the nearest enemy
					return
				}
			} else if (action === 'examine') {
				this.examining = true
				Game.changeSelectedTile(Game.getTile(this.x, this.y), 'You are examining the area. ')
				return
			} else if (action === 'interact') {
				this.interacting = true
				Game.log(`[Interact with what?]`, 'player_move', true)
				return
			} else {
				let diff = ROT.DIRS[8][action]
				let ny = this.y + diff[1]
				let nx = this.x + diff[0]
				if (!this.tryMove(nx, ny)) {
					return
				}
			}
			this.endTurn()
		}
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
		// evt.preventDefault()
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
				this.unequip(ammo)
				this.removeFromInventory(ammo)
			}
			this.targeting = false
			this.validTarget = null
			// // create an arrow sprite and move it to the fired location
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
		// evt.preventDefault()
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

	handleHelpScreenEvent(evt) {}

	handleInteract(evt) {
		let { keyCode } = evt
		const cancelKeys = [ROT.VK_SPACE, ROT.VK_ESCAPE]
		if (movementKeys.includes(keyCode)) {
			let [x, y] = ROT.DIRS[8][this.keyMap[keyCode]]
			let dx = this.x + x
			let dy = this.y + y
			if (Game.inbounds(dx, dy)) {
				let { actors } = Game.getTile(dx, dy)
				if (actors.length > 0) {
					this.interact(actors.slice(-1).pop())
				}
			}
			Game.clearTempLog()
			this.interacting = false
			this.endTurn()
		} else if (cancelKeys.includes(keyCode)) {
			this.interacting = false
			Game.clearTempLog()
		}
	}

	resetSelectedItem() {}

	initializeSelectedItem() {
		const initialSelectedInventoryItemSlot = { contextMenuOpen: false, index: null, item: null }
		if (this.inventory.length !== 0) {
			this.selectedItemSlot = { contextMenuOpen: false, index: 0, item: this.inventory[0] }
		} else {
			this.selectedItemSlot = { ...initialSelectedInventoryItemSlot }
		}
	}

	useSelectedItem() {
		let { item } = this.selectedItemSlot
		item.use()
		// if the item is gone on use
		if (!this.hasExactItem(item)) {
			// set the currently selected item as null OR next item
			this.resetSelectedItem()
		}
	}

	dropSelectedItem() {
		setTimeout(() => {
			if (this.inventory.length === 1) {
				this.selectedItemSlot.item = null
				this.selectedItemSlot.index = null
				this.inventory[0].drop()
			} else {
				this.selectedItemSlot.item.drop()
				this.resetSelectedItem()
			}
		}, 250)
	}

	resetSelectedItem() {
		let { index } = this.selectedItemSlot
		// if there's a next item after the current item in the inventory,
		// then select it
		if (this.inventory.length > index) {
			this.selectedItemSlot.item = this.inventory[index]
			// otherwise, if there isn't an item next to the existing one in the inventory
			// select the previous item
		} else if (this.inventory.length > index - 1) {
			this.selectedItemSlot.index = index - 1
			this.selectedItemSlot.item = this.inventory[index - 1]
			// finally, if that doesn't work then we can select nothing
		} else {
			this.selectedItemSlot.item = null
			this.selectedItemSlot.index = null
		}
	}

	selectItemAtIndex(index) {
		if (index < this.inventory.length) {
			this.selectedItemSlot.item = this.inventory[index]
			this.selectedItemSlot.index = index
		}
	}

	handleInventoryEvent(evt) {
		let { keyCode } = evt

		// evt.preventDefault()
		const exit = [ROT.VK_ESCAPE, ROT.VK_I]
		const confirm = [ROT.VK_RETURN, ROT.VK_E]
		const drop = [ROT.VK_D]
		const up = [ROT.VK_UP, ROT.VK_NUMPAD8, ROT.VK_W, ROT.VK_K]
		const down = [ROT.VK_DOWN, ROT.VK_NUMPAD2, ROT.VK_S, ROT.VK_J]
		const left = [ROT.VK_LEFT, ROT.VK_NUMPAD4, ROT.VK_H]
		const right = [ROT.VK_RIGHT, ROT.VK_NUMPAD6, ROT.VK_L]
		const ul = [ROT.VK_NUMPAD7, ROT.VK_Y]
		const lr = [ROT.VK_NUMPAD3, ROT.VK_N]
		const ur = [ROT.VK_NUMPAD9, ROT.VK_U]
		const ll = [ROT.VK_NUMPAD1, ROT.VK_B]
		/* If the key event isn't repeated within the last 160 milliseconds (too soon), then we proceed but we keep track of this
	  key movement time */
		if (evt.type === 'keydown' && up.concat(down).includes(keyCode)) {
			if (this.keyTimer === null) {
				this.keyTimer = new Date()
			} else {
				let start = this.keyTimer.getTime()
				let now = new Date().getTime()
				if (!(now - start >= 100)) {
					return
				} else {
					// we've waited long enough, but add another timer just in case
					this.keyTimer = new Date()
				}
			}
		}
		let { index, item } = this.selectedItemSlot
		// at this point, we can assume that the
		if (exit.includes(keyCode)) Game.closeGameOverlayScreen()
		if (item !== null) {
			if (exit.includes(keyCode)) {
				Game.closeGameOverlayScreen()
			} else if (up.includes(keyCode) || down.includes(keyCode)) {
				let change = up.includes(keyCode) ? -3 : 3
				let newSelectedIndex = index + change
				if (newSelectedIndex >= 0 && newSelectedIndex < this.inventory.length) {
					this.selectedItemSlot.index = newSelectedIndex
					this.selectedItemSlot.item = this.inventory[newSelectedIndex]
				}
			} else if (left.includes(keyCode) || right.includes(keyCode)) {
				let change = left.includes(keyCode) ? -1 : 1
				let newSelectedIndex = index + change
				if (newSelectedIndex >= 0 && newSelectedIndex < this.inventory.length) {
					this.selectedItemSlot.index = newSelectedIndex
					this.selectedItemSlot.item = this.inventory[newSelectedIndex]
				}
			} else if (ul.includes(keyCode) || lr.includes(keyCode)) {
				let change = ul.includes(keyCode) ? -4 : 4
				let newSelectedIndex = index + change
				if (newSelectedIndex >= 0 && newSelectedIndex < this.inventory.length) {
					this.selectedItemSlot.index = newSelectedIndex
					this.selectedItemSlot.item = this.inventory[newSelectedIndex]
				}
			} else if (ll.includes(keyCode) || ur.includes(keyCode)) {
				let change = ur.includes(keyCode) ? -2 : 2
				let newSelectedIndex = index + change
				if (newSelectedIndex >= 0 && newSelectedIndex < this.inventory.length) {
					this.selectedItemSlot.index = newSelectedIndex
					this.selectedItemSlot.item = this.inventory[newSelectedIndex]
				}
			} else if (confirm.includes(keyCode)) {
				this.useSelectedItem()
			} else if (drop.includes(keyCode)) {
				this.dropSelectedItem()
			}
		}
	}

	initializeSelectedSpell() {
		if (this.cb.spells.length !== 0) {
			this.selectedSpellSlot = { index: 0, spell: this.cb.spells[0] }
		} else {
			this.selectedSpellSlot = { index: null, spell: null }
		}
	}

	selectSpellAtIndex(index) {
		if (index < this.cb.spells.length) {
			this.selectedSpellSlot.spell = this.cb.spells[index]
			this.selectedSpellSlot.index = index
		}
	}

	handleSpellbookEvent(evt) {
		let { keyCode } = evt
		let shiftPressed = evt.getModifierState('Shift')
		// evt.preventDefault()
		const exit = [ROT.VK_ESCAPE, ROT.VK_Z, ROT.VK_S, ROT.VK_M]
		const confirm = [ROT.VK_RETURN, ROT.VK_E]
		const up = [ROT.VK_UP, ROT.VK_NUMPAD8, ROT.VK_W, ROT.VK_K]
		const down = [ROT.VK_DOWN, ROT.VK_NUMPAD2, ROT.VK_S, ROT.VK_J]
		const left = [ROT.VK_LEFT, ROT.VK_NUMPAD4, ROT.VK_H]
		const right = [ROT.VK_RIGHT, ROT.VK_NUMPAD6, ROT.VK_L]
		const ul = [ROT.VK_NUMPAD7, ROT.VK_Y]
		const lr = [ROT.VK_NUMPAD3, ROT.VK_N]
		const ur = [ROT.VK_NUMPAD9, ROT.VK_U]
		const ll = [ROT.VK_NUMPAD1, ROT.VK_B]
		/* If the key event isn't repeated within the last 160 milliseconds (too soon), then we proceed but we keep track of this
	  key movement time */
		if (evt.type === 'keydown' && up.concat(down).includes(keyCode)) {
			if (this.keyTimer === null) {
				this.keyTimer = new Date()
			} else {
				let start = this.keyTimer.getTime()
				let now = new Date().getTime()
				if (!(now - start >= 100)) {
					return
				} else {
					// we've waited long enough, but add another timer just in case
					this.keyTimer = new Date()
				}
			}
		}
		let { index, spell } = this.selectedSpellSlot
		// at this point, we can assume that the
		if (spell !== null) {
			if (exit.includes(keyCode)) {
				Game.closeGameOverlayScreen()
			} else if (up.includes(keyCode) || down.includes(keyCode)) {
				let change = up.includes(keyCode) ? -3 : 3
				let newSelectedIndex = index + change
				if (newSelectedIndex >= 0 && newSelectedIndex < this.inventory.length) {
					this.selectedSpellSlot.index = newSelectedIndex
					this.selectedSpellSlot.spell = this.cb.spells[newSelectedIndex]
				}
			} else if (left.includes(keyCode) || right.includes(keyCode)) {
				let change = left.includes(keyCode) ? -1 : 1
				let newSelectedIndex = index + change
				if (newSelectedIndex >= 0 && newSelectedIndex < this.cb.spells.length) {
					this.selectedSpellSlot.index = newSelectedIndex
					this.selectedSpellSlot.spell = this.cb.spells[newSelectedIndex]
				}
			} else if (ul.includes(keyCode) || lr.includes(keyCode)) {
				let change = ul.includes(keyCode) ? -4 : 4
				let newSelectedIndex = index + change
				if (newSelectedIndex >= 0 && newSelectedIndex < this.cb.spells.length) {
					this.selectedSpellSlot.index = newSelectedIndex
					this.selectedSpellSlot.spell = this.cb.spells[newSelectedIndex]
				}
			} else if (ll.includes(keyCode) || ur.includes(keyCode)) {
				let change = ur.includes(keyCode) ? -2 : 2
				let newSelectedIndex = index + change
				if (newSelectedIndex >= 0 && newSelectedIndex < this.cb.spells.length) {
					this.selectedSpellSlot.index = newSelectedIndex
					this.selectedSpellSlot.spell = this.cb.spells[newSelectedIndex]
				}
			} else if (confirm.includes(keyCode)) {
				this.selectSpell(spell)
			}
		}
	}

	handleNPCDialogueEvent(evt) {
		let { keyCode } = evt
		// evt.preventDefault()
		const confirm = [ROT.VK_RETURN, ROT.VK_E]
		const up = [ROT.VK_UP, ROT.VK_NUMPAD8, ROT.VK_W, ROT.VK_K]
		const down = [ROT.VK_DOWN, ROT.VK_NUMPAD2, ROT.VK_S, ROT.VK_J]
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

	pickup() {
		let ctile = Game.map.data[this.y][this.x]
		let tileItems = ctile.actors.filter(el => {
			return el instanceof Item
		})
		if (tileItems.length > 0) Game.eventStream.emit('LootPickedUpEvent', { items: tileItems, looter: this })
		if (tileItems.length === 1) {
			Game.log(`You picked up ${addPrefix(tileItems[0].type.toLowerCase())}.`, 'information')
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
				return buf + ', ' + addPrefix(str)
			}, addPrefix(itemTypes.slice(0, 1)[0]))
			let lastItem = ` and ${addPrefix(itemTypes.slice(-1)[0])}.`
			let buffer = `You picked up ${prettyItemTypes + lastItem}`
			Game.log(buffer, 'information')
		} else {
			Game.log("There's nothing here to pick up.", 'information')
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
		Game.closeGameOverlayScreen()
	}

	addGoal(goal) {
		if (goal !== null) this.commandQueue.unshift(goal)
	}
}
