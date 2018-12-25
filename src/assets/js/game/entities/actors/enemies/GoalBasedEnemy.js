import { Game } from '#/Game.js'
import GoalBasedAI from '#/entities/actors/GoalBasedAI.js'
import Gold from '#/entities/items/misc/Gold.js'
import Chest from '#/entities/misc/Chest.js'
import { getVisibleTiles, getRandomInt } from '#/utils/HelperFunctions'
import {
	LootFilter,
	EntityFilter,
	FindLooterGoal,
	DoNothingGoal,
	RandomMovementGoal,
	FindGoldGoal,
	FindTreasureGoal,
	AStarPathingGoal,
	AutoexploreGoal
} from '#/utils/Goals.js'
import { createItem } from '#/utils/EntityFactory.js'
export default class GoalBasedEnemy extends GoalBasedAI {
	constructor(x, y, options) {
		super(x, y, options)
		this.cb.hostile = true
	}

	interact(actor) {
		super.interact(actor)
		if (actor === Game.player) {
			this.attack(actor)
		} else {
			actor.react(this)
		}
	}
}

export class LootGoblin extends GoalBasedEnemy {
	constructor(x, y, id) {
		super(x, y, {
			id,
			name: 'Loot Goblin',
			description: 'A goblin with an unfulfillable desire for treasure & loot.',
			visible: true,
			blocked: true,
			chasing: false,
			wanders: true,
			canLoot: true,
			cb: {
				maxhp: 20,
				maxmana: 5,
				hp: 20,
				mana: 5,
				str: 4,
				def: 2,
				range: 7
			},
			invulnerable: false,
			events: []
		})
		this.interactedEntities = []
	}

	addIdleGoal() {
		this.seenTiles = []
		this.addGoal(AutoexploreGoal())
	}

	performGoal() {
		let visibleTiles = getVisibleTiles(this)
		const tileHasGoldOrChest = t => {
			return t.actors.some(a => (a instanceof Chest && a.closed) || a instanceof Gold)
		}
		let tilesWithTreasure = visibleTiles.filter(t => !this.interactedEntities.includes(t) && tileHasGoldOrChest(t))
		if (tilesWithTreasure.length > 0) { // TODO: need to make sure we don't revisit the same target twice
			let entity = tilesWithTreasure.pop()
			this.addGoal(AStarPathingGoal(
				{
					entity,
					stopCondition: ({ entity }) => !tileHasGoldOrChest(entity),
					finalAction: () => this.pickup()

				}))
			this.interactedEntities.push(entity)
		}
		super.performGoal()
	}

	// interact() {
	// 	// A Loot Goblin has a unique interact method
	// 	// It will be able to try and steal gold from other entities,
	// 	// and from chests!
	// }

	addGoal(goal) {
		super.addGoal(goal)
		// if (goal) console.log(`${this.name} received new goal! Goals: `, this.goals)
	}

	tryMove(x, y) {
		// Whenever a loot goblin moves it has a chance to drop gold
		super.tryMove(x, y)
		if (getRandomInt(0, 10) === 0) {
			const gold = this.inventory.filter(item => item instanceof Gold && item.quantity >= 3)
			if (gold.length >= 1) {
				let quantity = getRandomInt(1, 3)
				for (let item of this.inventory) {
					if (item instanceof Gold) {
						item.quantity -= quantity
						item.updateQuantity()
						this.removeZeroQuantityItems()
						break
					}
				}
				this.placeEntityBelow(createItem('GOLD', this.x, this.y, null, { quantity }))
			}
		}
	}
}
