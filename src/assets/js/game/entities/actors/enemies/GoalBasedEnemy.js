import { Game } from '#/Game.js'
import GoalBasedAI from '#/entities/actors/GoalBasedAI.js'
import { LootFilter, DoNothingGoal, RandomMovementGoal } from '#/utils/Goals.js'
import Gold from '#/entities/items/misc/Gold.js'
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

export class GreedyGoblin extends GoalBasedEnemy {
	constructor(x, y, id) {
		super(x, y, {
			id,
			name: 'Greedy Goblin',
			description: 'A goblin with an unfulfillable desire for treasure.',
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
					fn: e => LootFilter(e, [Gold], FindGoldGoal)
				}
			]
		})
	}
}
