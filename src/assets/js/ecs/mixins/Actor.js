/**
 * Created by larken on 7/12/17.
 */
import ROT from 'rot-js'
import * as PIXI from 'pixi.js'
import { Game } from '#/Game.js'
import { getRandomInt, getNormalRandomInt, addPrefix } from '#/utils/HelperFunctions.js'
import Door from '#/entities/misc/Door.js'
import Chest from '#/entities/misc/Chest.js'
import { Buff } from '#/modifiers/Buff.js'
import { Corpse, corpseTypes } from '#/entities/items/misc/Corpse.js'
import Item from '#/ecs/mixins/Item.js'
import { HasInstance } from 'mixwith'
import { actorTextures } from '#/utils/EntityFactory';

export const Actor = superclass =>
	class extends superclass {
		constructor(config) {
			this.visible = true
			this.blocked = true
			this.cb = {}
			this.corpseType = config.corpseType || corpseTypes.HUMANOID
			this.cb.effects = []
			this.cb.equipment = {
				head: null,
				torso: null,
				legs: null,
				boots: null,
				weapon: null,
				ammo: null,
				ring: null
			}
			this.inventory = []
			super(config)
		}

		act() {
			this.applyEffects()
		}

		applyEffects() {
			this.cb.effects = this.cb.effects.filter(e => {
				return e.duration > 0
			})
			for (let effect of this.cb.effects) {
				if (!(effect instanceof Buff)) Game.log(effect.description(this), 'alert')
				effect.applyEffect(this)
			}
		}

		addNewEffect(effect) {
			this.cb.effects.push(effect)
		}

		addNewBuff(buff) {
			buff.applyEffect(this)
			this.cb.effects.push(buff)
		}

		distanceTo(actor) {
			return Math.sqrt(Math.pow(this.x - actor.x, 2) + Math.pow(this.y - actor.y, 2))
		}

		react(entity) { }

		interact(entity) {
			if (super.interact) super.interact(entity)
			entity.react(this)
		}

		tryMove(nx, ny) {
			if (!Game.inbounds(nx, ny) || Game.tileAt(nx, ny).blocked()) return false
			let tile = Game.tileAt(nx, ny)
			if (tile.actors.length === 0) {
				this.move(nx, ny)
				return true
			} else {
				let actors = tile.actors.filter(entity => HasInstance(entity, Actor))
				let interactableEntities = tile.actors.filter(entity => HasInstance(entity, Interactable))
				if (0 < actors.length) {
					this.interact(actors.slice(-1)[0])
					return true
				}
				if (0 < interactableEntities.length) {
					this.interact(interactableEntities.slice(-1)[0])
					return true

				}
			}
			return false
		}

		attack(actor) {
			// get this actor's weapon & calculate weapon damage based on a roll & current str level
			let { weapon } = this.cb.equipment
			let dmg = weapon !== null ? this.cb.str + weapon.roll() : this.cb.str
			if (weapon && weapon.cb.ranged) dmg = this.cb.str
			// once damage is calculated, roll a defensive dice to see how much dmg is blocked
			let { def } = actor.cb
			let deflectedDamage = getNormalRandomInt(0, def + actor.getDefenceRating() + 1)
			dmg -= deflectedDamage
			if (dmg < 0) {
				dmg = 0
			}

			let verb,
				message = ''
			if (weapon !== null) {
				let { attackVerbs, type } = weapon
				verb = attackVerbs[~~(Math.random() * attackVerbs.length)]
				message = `${addPrefix(this.name).capitalize()} ${verb} ${addPrefix(actor.name)} with ${addPrefix(type.toLowerCase())}`
				let endOfMsg = dmg > 0 ? ` and dealt ${dmg} damage.` : ` but failed to hit.`
				message += endOfMsg
			} else {
				if (dmg > 0) message = `${addPrefix(this.name).capitalize()} attacked ${addPrefix(actor.name)} and dealt ${dmg} damage.`
				else message = `${addPrefix(this.name).capitalize()} tried to attack ${addPrefix(actor.name)} but failed to hit.`
			}

			if (Game.player === this) Game.log(message, 'player_move')
			else Game.log(message, 'attack')

			if (dmg > 0) actor.damage(dmg)
			this.cb.damageDealt += dmg

			if (weapon && weapon.cb.enchantments.length > 0) {
				for (let enchantment of weapon.cb.enchantments) {
					let effect = enchantment.getEffect()
					if (
						!actor.cb.effects.some(e => {
							e.name === effect.name
						})
					) {
						actor.addNewEffect(effect)
					}
				}
			}

			return dmg
		}

		equip(item) {
			// already equipping something in the same slot
			let { equipmentSlot } = item.cb
			if (this.cb.equipment[equipmentSlot] !== null) {
				this.cb.equipment[equipmentSlot].cb.equipped = false
			}
			this.cb.equipment[equipmentSlot] = item
			item.cb.equipped = true
		}

		unequip(item) {
			let { equipmentSlot } = item.cb
			if (this.cb.equipment[equipmentSlot] !== null) {
				this.cb.equipment[equipmentSlot].cb.equipped = false
				this.cb.equipment[equipmentSlot] = null
			}
		}

		damage(hp) {
			if (this.cb.invulnerable) return
			this.cb.damageTaken += hp
			if (this.cb.hp <= hp) this.cb.hp = 0
			else this.cb.hp -= hp
			if (this.isDead()) {
				if (this !== Game.player) Game.player.gain_xp(Math.floor(this.cb.maxhp * 0.5))
				this.death()
			}
			if (this.sprite !== null && !this.isDead) {
				this.sprite.tint = '0xba1b21'
				setTimeout(() => (this.sprite.tint = '0xFFFFFF'), 200)
			}
		}

		heal(hp) {
			this.cb.healthRestored += hp
			if (this.cb.hp + hp > this.cb.maxhp) this.cb.hp = this.cb.maxhp
			else this.cb.hp += hp
		}

		restore(mana) {
			if (this.cb.mana + mana > this.cb.maxmana) this.cb.mana = this.cb.maxmana
			else this.cb.mana += mana
		}

		fireRangedWeapon(ammo, dir) {
			// assuming we have a ranged weapon and ammunition to fire
			let weapon = this.cb.equipment.weapon
			let range = weapon.cb.range
			let dmg = weapon.roll() + ammo.cb.damage + this.cb.str
			let diff = ROT.DIRS[8][dir]
			// iterate from the first to last tile in the given direction
			for (let i = 1; i < range; i++) {
				let tx = this.x + diff[0] * i
				let ty = this.y + diff[1] * i
				let tile = Game.map.data[ty][tx]
				// if the tile is a blocked obstacle, then we want to cancel the projectile's motion
				// since water and some other special obstacles are "blocked", need to use the "blocks vision"
				// attribute to determine if a projectile can pass through
				// (e.g if light can pass through, so can an arrow or crossbow bolt)
				if (!tile.visible()) {
					if (Game.player === this) Game.log(`Your ${ammo.type.toLowerCase()} hit an obstacle!`, 'alert')
					return
				}
				// if we find an enemy on the tile, we damage it and the projectile stops moving
				let enemies = tile.actors.filter(function (e) {
					return e.cb && e.cb.hostile
				})
				if (enemies.length > 0) {
					let enemy = enemies[0]
					let evtdamage = `${addPrefix(this.name).capitalize()} hit ${addPrefix(enemy.name)} with ${addPrefix(
						ammo.type.toLowerCase()
					)} and dealt ${dmg} damage.`
					if (Game.player === this) Game.log(evtdamage, 'player_move')
					else Game.log(evtdamage, 'attack')
					enemy.damage(dmg)
					return
				}
			}
			Game.log(`Your ${ammo.type.toLowerCase()} didn't hit anything!`, 'alert')
			// place the ammo down at
			/*
         let tx = this.x + diff[0]*range;
         let ty = this.y + diff[1]*range;
         let tile = Game.map.data[ty][tx];
         */
		}

		death() {
			let idx = Game.engine._scheduler.remove(this)
			let ctile = Game.map.data[this.y][this.x]
			// remove this actor from the global actors list and the occupied tile
			ctile.removeActor(this)
			// dump the contents of the actor's inventory (items) onto the ground.
			const numberOfEntities = Game.display.background.children.length

			let items = this.inventory
			for (let item of items) {
				this.dropItem(item)
			}
			if (items.length === 0) {
				if (getRandomInt(0, 1) === 0) {
					if (this.corpseType !== undefined && this.corpseType !== null) {
						let corpse = new Corpse(this.x, this.y, this.name, this.corpseType)
						ctile.actors.unshift(corpse)
						Game.scheduler.add(corpse, true)
						Game.display.assignSprite(corpse, true)
					}
				}

				let blood = 2643 + getRandomInt(0, 2)
				// specifically don't want to add blood if it's a skeleton...
				if (this.corpseType === corpseTypes.HUMANOID) {
					let bloodSprite = new PIXI.Sprite(Game.display.tilesetMapping[blood])
					bloodSprite.position.set(this.x * Game.display.tileSize, this.y * Game.display.tileSize)
					Game.display.background.addChildAt(bloodSprite, 1)
				}
			}

			Game.display.background.removeChild(this.sprite)
			if (this.spriteAbove !== undefined) Game.display.background.removeChild(this.spriteAbove)

			if (this === Game.player) {
				Game.log('You died!', 'death')
			} else {
				Game.log(`You killed the ${this.name}.`, 'death')
				Game.player.cb.enemiesKilled++
			}
		}

		removeActor() {
			let idx = Game.engine._scheduler.remove(this)
			let ctile = Game.map.data[this.y][this.x]
			// remove this actor from the global actors list and the occupied tile
			ctile.removeActor(this)
			Game.display.background.removeChild(this.sprite)
			if (this.spriteAbove !== undefined) Game.display.background.removeChild(this.spriteAbove)
		}

		/* >>> dynamic stats getters <<< */
		isDead() {
			return this.cb.hp <= 0
		}

		getMinDmg() {
			let wep = this.cb.equipment.weapon
			let minWeaponDmg = wep !== null ? wep.cb.rolls : 0
			return this.cb.str + minWeaponDmg
		}

		getMaxDmg() {
			let wep = this.cb.equipment.weapon
			let maxWeaponDmg = wep !== null ? wep.cb.rolls * wep.cb.sides : 0
			return this.cb.str + maxWeaponDmg
		}

		getDefenceRating() {
			// goes through all of the actor's equipment and adds up the defensive value of each piece of armor

			let def = 0
			for (let slot in this.cb.equipment) {
				let item = this.cb.equipment[slot]
				if (item !== null && item.cb.def !== undefined) {
					def += item.cb.def
				}
			}
			return def
		}

		/* >>> inventory management <<< */

		memberOfInventory(item) {
			return (
				-1 <
				this.inventory.findIndex(i => {
					return Object.is(item, i)
				})
			)
		}

		hasItem(itemType) {
			return this.inventory.some(i => i instanceof itemType)
		}

		hasExactItem(item) {
			return this.inventory.some(i => i === item)
		}

		removeItemType(itemType) {
			for (let item of this.inventory) {
				if (item instanceof itemType) {
					this.removeFromInventory(item)
					return
				}
			}
		}

		removeZeroQuantityItems() {
			this.inventory = this.inventory.filter(i => {
				return !i.hasOwnProperty('quantity') || i.quantity > 0
			})
		}

		addToInventory(newItem) {
			if ('quantity' in newItem) {
				// some items change textures on quantity changes (gold pieces)
				if (newItem.updateQuantity !== undefined) {
					newItem.updateQuantity()
				}

				for (let i = 0; i < this.inventory.length; i++) {
					let item = this.inventory[i]
					if (item !== null && item.type === newItem.type) {
						item.quantity += newItem.quantity
						return
					}
				}
			}

			this.inventory.push(newItem)
		}

		removeFromInventory(removeItem) {
			let idx = this.inventory.findIndex(i => {
				return Object.is(removeItem, i)
			})
			if (idx != -1) {
				this.inventory.splice(idx, 1)
			} else {
				throw 'invalid item removal - trying to remove an item that cannot be found in inventory!'
			}
		}

		dropItem(item) {
			if (!this.memberOfInventory(item)) throw "Error - trying to drop an item you don't have in your inventory"
			item.inInventory = false
			if (item !== null && 'cb' in item) {
				item.cb.equipped = false
				if (this.cb.equipment[item.cb.equipmentSlot] === item) this.cb.equipment[item.cb.equipmentSlot] = null
			}
			item.placeAt(this.x, this.y)
			Game.display.assignSprite(item, true, 2)
			this.removeFromInventory(item)
		}

		pickup() {
			let ctile = Game.map.data[this.y][this.x]
			let items = ctile.actors.filter(el => {
				return el instanceof Item
			})
			if (items.length > 0) Game.eventStream.emit('LootPickedUpEvent', { items, looter: this })
			if (items.length === 1) {
				Game.display.clearSprite(items[0])
				this.addToInventory(items[0])
				ctile.removeActor(items[0])
			} else if (items.length > 1) {
				let itemTypes = []
				for (let item of items) {
					itemTypes.push(item.type.toLowerCase())
					Game.display.clearSprite(item)
					this.addToInventory(item)
					ctile.removeActor(item)
				}
			}
		}
	}
