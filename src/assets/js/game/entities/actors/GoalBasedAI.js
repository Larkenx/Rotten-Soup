import { Game } from '#/Game.js'
import { Actor } from '#/entities/actors/Actor.js'
import EventHandler from '#/utils/EventHandler.js'
import { DoNothingGoal, RandomMovementGoal } from '#/utils/Goals.js'
/* 
    Inspired by: https://youtu.be/4uxN5GqXcaA (Caves of Qud goal driven AI), 
    this class will host some methods and instantiation to make way for adding dynamic goals for an AI
    as well as reactions to events that are emitted via the Game's main event stream. The AI's behavior & turn-to-turn action will be completely dictated by goals.
*/
export default class GoalBasedAI extends Actor {
	constructor(x, y, options) {
		super(x, y, options)
		this.goalHistory = []
		this.goals = []
		this.eventHandler = new EventHandler(Game.eventStream)
		this.subscribeToEventStream()
	}

	subscribeToEventStream() {
		this.events.forEach(({ topic, fn }) => this.eventHandler.on(topic, fn))
	}

	addGoal(goal) {
		if (goal !== null) this.goals.unshift(goal)
	}

	/* every entity must have an idle goal defined */
	addIdleGoal() {
		if (this.wanders) {
			this.addGoal(RandomMovementGoal())
		} else {
			this.addGoal(DoNothingGoal())
		}
	}

	// goals are cleared whenever an actor is scheduled back into the game (level changes)
	clearGoals() {
		this.goalHistory = [...this.goalHistory, ...this.goals]
		this.goals = []
	}

	performGoal() {
		if (this.goals.length === 0) this.addIdleGoal()
		this.goals.shift()(this)
	}

	act() {
		super.act()
		Game.engine.lock()
		// console.log(this, `${this.name} is taking a turn.`, this.goals)
		this.performGoal()
		Game.engine.unlock()
	}
}
