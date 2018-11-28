import EventHandler from './EventHandler'
import EventStream from './EventStream'
const { sign } = Math
const eventStream = new EventStream()

const FindTheGoldGoal = e => {
	return theEntity => {
		let { x, y, amount } = e // random info we emit about the gold found somewhere event
		console.log(`Goblin is trying to find ${amount} gold pieces somewhere around ${x},${y}!`)
		theEntity.moveTowards(x, y)
		if (theEntity.x !== x || theEntity.y !== y) {
			theEntity.goals.unshift(FindTheGoldGoal(e))
		} else {
			console.log(`Goblin is at the original gold pieces location!`)
		}
	}
}

const IdleGoal = e => {
	return theEntity => {
		console.log('The entity does nothing')
	}
}

const RunAwayGoal = e => {
	return theEntity => {
		let { x, y } = e // run away from a given location
		console.log(`Goblin is running away from the danger at ${x},${y}!`)
		theEntity.moveTowards(x + 10, y + 10)
		let dist = ~~(((theEntity.x - x) ** 2, (theEntity.y - y) ** 2) ** 0.5)
		if (dist <= 5) {
			theEntity.goals.unshift(RunAwayGoal(e))
		} else {
			console.log(`Goblin has escaped the danger!`)
		}
	}
}

class Goblin {
	constructor() {
		this.events = new EventHandler(eventStream)
		this.x = 5
		this.y = 5
		this.goals = []
		this.events
			.on('goldFoundSomewhere', e => {
				console.log('Gold was found somewhere...adding new find the gold goal')
				this.goals.unshift(FindTheGoldGoal(e))
			})
			.on('nearbyGoblinDied', e => {
				console.log(`Goblin is running away because a nearby goblin died!`)
				this.goals.unshift(RunAwayGoal(e))
			})
	}

	act() {
		if (this.goals.length >= 1) {
			this.goals.shift()(this)
		} else {
			this.goals.unshift(IdleGoal())
		}
	}

	moveTowards(x, y) {
		this.x += sign(x - this.x)
		this.y += sign(y - this.y)
		// console.log(`Goblin moves to ${this.x},${this.y}!`)
	}
}

export default function test() {
	let goblin = new Goblin()
	eventStream.emit('goldFoundSomewhere', { x: 2, y: 2, amount: 20 })
	for (let i = 0; i < 5; i++) goblin.act()
	eventStream.emit('goldFoundSomewhere', { x: 2, y: 2, amount: 20 }).emit('nearbyGoblinDied', { x: 2, y: 2 })
	for (let i = 0; i < 10; i++) goblin.act()
}

// Gold was found somewhere...adding new find the gold goal
// 3x Goblin is trying to find 20 gold pieces somewhere around 2,2!
// Goblin is at the original gold pieces location!
// The entity does nothing
// Gold was found somewhere...adding new find the gold goal
// Goblin is running away because a nearby goblin died!
// 6x Goblin is running away from the danger at 2,2!
// Goblin has escaped the danger!
// 4x Goblin is trying to find 20 gold pieces somewhere around 2,2!
