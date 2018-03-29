/**
 * Created by larken on 7/12/17.
 */
import ROT from 'rot-js'
import * as PIXI from 'pixi.js'

import { Game } from '#/Game.js'
import { Entity } from '#/entities/Entity.js'
import { getRandomInt, addPrefix } from '#/utils/HelperFunctions.js'
import Door from '#/entities/misc/Door.js'
import Weapon from '#/entities/items/weapons/Weapon.js'
import { Ammo } from '#/entities/items/weapons/ranged/ammo/Ammo.js'
import { Buff } from '#/modifiers/Buff.js'
import { Corpse, corpseTypes } from '#/entities/items/misc/Corpse.js'
import Item from '#/entities/items/Item.js'

export class Actor extends Entity {
    constructor(x, y, options, routine = null) {
        super(x, y, options)
        this.cb = this.combat
        if (this.corpseType === undefined) this.corpseType = corpseTypes.HUMANOID

        this.cb.effects = []
        this.cb.equipment = {
            head: null,
            torso: null,
            legs: null,
            weapon: null,
            ammo: null
        }
        this.inventory = []
        for (let i = 0; i < 27; i++) {
            this.inventory.push({
                item: null,
                menu: false
            })
        }
    }

    /* Called by the ROT.js game scheduler to indicate a turn */
    act() {
        this.cb.effects = this.cb.effects.filter(e => {
            return e.duration > 0
        })
        // apply all of the effects on this Actor at the beginning of their turn
        for (let effect of this.cb.effects) {
            if (!(effect instanceof Buff)) Game.log(effect.description(this), 'alert')

            effect.applyEffect(this)
        }
        // if any effects have expired, we remove them
    }

    addNewEffect(effect) {
        this.cb.effects.push(effect)
    }

    addNewBuff(buff) {
        buff.applyEffect(this)
        this.cb.effects.push(buff)
    }

    memberOfInventory(item) {
        return (
            -1 <
            this.inventory.findIndex(cell => {
                return Object.is(item, cell.item)
            })
        )
    }

    addToInventory(newItem) {
        if ('quantity' in newItem) {
            for (let i = 0; i < this.inventory.length; i++) {
                let item = this.inventory[i].item
                if (item !== null && item.type === newItem.type) {
                    item.quantity += newItem.quantity
                    return item
                }
            }
        }

        let nextFreeIndex = null
        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i].item == null) {
                nextFreeIndex = i
                break
            }
        }
        if (nextFreeIndex === null) {
            Game.log('Your inventory is full! Drop something in order to pick this up.')
            // if your item is in a chest and you try to pick it up, but your inventory is full,
            // it will drop the item below you.
            this.placeEntityBelow(newItem)
            return newItem
        }

        this.inventory[nextFreeIndex].item = newItem
        // this.inventory[nextFreeIndex].action = newItem.use;
        return this.inventory[nextFreeIndex].item
    }

    placeEntityBelow(entity) {
        if (entity instanceof Item) {
            entity.placeAt(this.x, this.y)
            Game.display.assignSprite(item)
        } else {
            Game.map.data[this.y][this.x].actors.push(entity)
        }
    }

    // expressly want to just remove the item from the inventory.
    // no actions are taken to mutate the item (like unequipping it from the player - this is done in those classes)
    removeFromInventory(removeItem) {
        let idx = this.inventory.findIndex(cell => {
            return Object.is(removeItem, cell.item)
        })
        if (idx != -1) {
            this.inventory[idx].item = null
        } else {
            throw 'invalid item removal - trying to remove an item that cannot be found in inventory!'
        }
    }

    dropItem(item) {
        if (!this.memberOfInventory(item)) throw "Error - trying to drop an item you don't have in your inventory"
        if (item !== null && 'cb' in item) {
            item.cb.equipped = false
            if (this.cb.equipment.weapon == item) this.cb.equipment.weapon = null
        }
        console.log('Dropping item at:', this.x, this.y)
        item.placeAt(this.x, this.y)
        console.log('placed item: ', item)
        Game.display.assignSprite(item, true)
        this.removeFromInventory(item)
    }

    /* The inventory property of actors is an array of object 'slots'. This function
     * returns the actual items that are held at any given time */
    items() {
        return this.inventory.filter(e => e.item !== null).map(e => e.item)
    }

    distanceTo(actor) {
        // linear distance, no obstacles factored in
        return Math.sqrt(Math.pow(this.x - actor.x, 2) + Math.pow(this.y - actor.y, 2))
    }

    /* Used to perform an action against another actor. This always involves "bumper car interaction", so
	it makes sense to have an animation following that concept */
    interact(actor) {
        let nx = actor.x - this.x
        let ny = actor.y - this.y

        Game.display.moveSprite(this.sprite, this.x + nx / 2, this.y + ny / 2)
        setTimeout(() => {
            Game.display.moveSprite(this.sprite, this.x, this.y)
        }, 100)
        return null
    }

    /* Used to react to the interaction of another actor */
    react(actor) {
        return null
    }

    tryMove(nx, ny) {
        // returns true if the turn should end here
        if (nx < 0 || nx === Game.map.width || ny < 0 || ny === Game.map.height) return false
        let ntile = Game.map.data[ny][nx] // new tile to move to
        if (ntile.actors.length === 0 && !ntile.blocked()) {
            this.move(nx, ny)
            return true
        } else if (ntile.actors.length > 0) {
            for (let i = 0; i < ntile.actors.length; i++) {
                let actor = ntile.actors[i]
                // this actor has stumbled upon another actor
                if (actor instanceof Actor && actor.blocked && actor.visible) {
                    if (!actor.isDead()) this.interact(actor)
                    return true
                }
                // actor has stumbled upon a non-Actor entity (an item or miscellaneous entity like a door)
                if (actor instanceof Door) {
                    this.interact(actor)
                    // return actor.blocked;
                }
            }
        }

        if (!ntile.blocked()) {
            this.move(nx, ny)
            return true
        }

        return false
    }

    /* attacks another actor with a melee attack */
    attack(actor) {
        let { weapon } = this.cb.equipment
        let dmg = weapon !== null ? this.cb.str + weapon.roll() : this.cb.str
        if (weapon && weapon.cb.ranged) dmg = this.cb.str
        let verb,
            message = ''
        if (weapon !== null) {
            let { attackVerbs, type } = weapon
            verb = attackVerbs[~~(Math.random() * attackVerbs.length)]
            message = `${addPrefix(this.name).capitalize()} ${verb} ${addPrefix(actor.name)} with ${addPrefix(
                type.toLowerCase()
            )} and dealt ${dmg} damage.`
        } else {
            message = `${addPrefix(this.name).capitalize()} attacked ${addPrefix(actor.name)} and dealt ${dmg} damage.`
        }

        if (Game.player === this) Game.log(message, 'player_move')
        else Game.log(message, 'attack')

        if (dmg > 0) actor.damage(dmg)

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

    equipWeapon(item) {
        if (!(item instanceof Weapon) || !('cb' in item)) throw 'Error - equipped invalid item - ' + this.item.type

        // already wielding a weapon
        if (this.cb.equipment.weapon !== null) {
            this.cb.equipment.weapon.cb.equipped = false
        }
        this.cb.equipment.weapon = item
        item.cb.equipped = true
    }

    equipAmmo(item) {
        if (!(item instanceof Ammo) || !('cb' in item)) throw 'Error - equipped invalid item - ' + this.item.type

        // already wielding a weapon
        if (this.cb.equipment.ammo !== null) {
            this.cb.equipment.ammo.cb.equipped = false
        }
        this.cb.equipment.ammo = item
        this.cb.equipment.ammo.cb.equipped = true
    }

    /* Reduce hp. If less than 0, causes death */
    damage(hp) {
        if (this.cb.invulnerable) return
        this.cb.hp -= hp
        if (this.isDead()) {
            if (this !== Game.player) Game.player.gain_xp(Math.floor(this.cb.maxhp * 0.5))

            this.death()
        }
    }

    /* Restore HP up to maxhp */
    heal(hp) {
        if (this.cb.hp + hp > this.cb.maxhp) this.cb.hp = this.cb.maxhp
        else this.cb.hp += hp
    }

    /* Restores mana up to max */
    restore(mana) {
        if (this.cb.mana + mana > this.cb.maxmana) this.cb.mana = this.cb.maxmana
        else this.cb.mana += mana
    }

    /* Starting out with basic 8 dir firing */
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
                console.log('Projectile collided with an obstacle!')
                return
            }
            // if we find an enemy on the tile, we damage it and the projectile stops moving
            let enemies = tile.actors.filter(function(e) {
                return e.combat && e.cb.hostile
            })
            if (enemies.length > 0) {
                console.log('The project collided with an enemy')
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
        console.log('The projectile did not hit anything')
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
        idx = Game.map.actors.indexOf(this)
        Game.map.actors.splice(idx, 1)
        // dump the contents of the actor's inventory (items) onto the ground.
        if (this.inventory.length > 0) {
            console.log('Dropping enemy items!')
            let items = this.items()
            console.log(items)
            for (let item of items) {
                // if the item was previously equipped, it needs to be 'unequipped'
                this.dropItem(item)
                console.log(item)
            }
        }
        // redraw the tile, either with an appropriate actor or the tile symbol
        /* On death, we want to spray some blood on the tile.
         * We also want to place a corpse corresponding to the actor as well
        */
        if (getRandomInt(0, 1) === 0) {
            let blood = 2644 - getRandomInt(0, 1)
            // specifically don't want to add blood if it's a skeleton...
            if (this.corpseType !== corpseTypes.SKELETON) {
                let bloodSprite = new PIXI.Sprite(Game.display.tilesetMapping[blood])
                bloodSprite.position.set(this.x * Game.display.tileSize, this.y * Game.display.tileSize)
                Game.display.background.addChildAt(bloodSprite, 1)
            }

            if (this.corpseType !== undefined) {
                let corpse = new Corpse(this.x, this.y, this.name, this.corpseType)
                ctile.actors.unshift(corpse)
                Game.scheduler.add(corpse, true)
                Game.display.assignSprite(corpse, true)
            }
        }

        Game.display.background.removeChild(this.sprite)

        if (this === Game.player) {
            Game.log('You died!', 'death')
        } else {
            Game.log(`You killed the ${this.name}.`, 'death')
        }
    }

    isDead() {
        return this.cb.hp <= 0
    }

    getHoverInfo() {
        return `HP: ${this.cb.hp} / ${this.cb.maxhp}<br />\"${this.description}\"`
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
}
