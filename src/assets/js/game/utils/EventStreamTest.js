import EventHandler from './EventHandler'
import EventStream from './EventStream'
const { sign } = Math
const eventStream = new EventStream()

const FindTheGoldGoal = class {
	constructor(e) {
		return theEntity => {
			let { x, y, amount } = e // random info we emit about the gold found somewhere event
			console.log(`Goblin is trying to find ${amount} gold pieces somewhere around ${x},${y}!`)
			theEntity.moveTowards(x, y)

			if (amount >= 20) theEntity.moveTowards(x, y) // if it's more than 20 gold, we get to move twice
			if (theEntity.x !== x || theEntity.y !== y) {
				theEntity.goals.unshift(new FindTheGoldGoal(e))
			}
		}
	}
}

const IdleGoal = class {
	constructor() {
		return theEntity => {
			console.log('The entity does nothing')
		}
	}
}

class Goblin {
	constructor() {
		this.events = new EventHandler(eventStream)
		this.x = 5
		this.y = 5
		this.goals = []
		this.events.on('goldFoundSomewhere', e => {
			console.log('Gold was found somewhere...adding new find the gold goal')
			this.goals.unshift(new FindTheGoldGoal(e))
		})
	}

	act() {
		if (this.goals.length >= 1) {
			this.goals.shift()(this)
		} else {
			this.goals.unshift(new IdleGoal())
		}
	}

	moveTowards(x, y) {
		this.x += sign(x - this.x)
		this.y += sign(y - this.y)
		console.log(`Goblin moves to ${this.x},${this.y}!`)
	}
}

export default function test() {
	let goblin = new Goblin()
	eventStream.emit('goldFoundSomewhere', { x: 2, y: 2, amount: 20 })
	for (let i = 0; i < 10; i++) goblin.act()
}
