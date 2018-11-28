import { Game } from '#/Game.js'
import GoalBasedAI from '#/entities/actors/GoalBasedAI.js'
import Gold from '#/entities/items/misc/Gold.js'
import Chest from '#/entities/misc/Chest.js'
import {
	LootFilter,
	EntityFilter,
	FindGoldLooterGoal,
	DoNothingGoal,
	RandomMovementGoal,
	FindGoldGoal,
	FindTreasureGoal
} from '#/utils/Goals.js'
import { AStarPathingGoal } from '../../../utils/Goals'
export default class GoalBasedEnemy extends GoalBasedAI {
	constructor(x, y, options) {
		super(x, y, options)
		this.hostile = true
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
			events: [
				{
					topic: 'LootPickedUpEvent',
					fn: e => LootFilter(e, [Gold], FindGoldLooterGoal)
				},
				{
					topic: 'EntitySpawnedEvent',
					fn: e => EntityFilter(e, [Chest], AStarPathingGoal)
				}
			]
		})
	}

	interact() {
		// A Loot Goblin has a unique interact method
		// It will be able to try and steal gold from other entities,
		// and from chests!
	}

	tryMove(x, y) {
		// Whenever a loot goblin moves it has a chance to drop gold
		super.tryMove(x, y)
	}
}
