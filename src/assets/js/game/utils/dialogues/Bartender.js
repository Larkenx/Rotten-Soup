import { createActor, createItem } from '#/utils/EntityFactory.js'
import { DialogueEdge, DialogueNode, DialogueGraph, Dialogue } from '#/utils/DialogueGraph.js'
import Gold from '#/entities/items/misc/Gold.js'

const addBeerToPlayerInventory = p => {
	p.addToInventory(createItem('BEER', p.x, p.y))
}

/* Local re-binding of nodes and edges */
const Node = DialogueNode
const Edge = DialogueEdge
const Graph = DialogueGraph

let graph = new Graph('Bartender')

const introduction = new Node({
	text: "Hi, I'm Jack, the bartender and inn keeper. What can I get you?",
	origin: true
})

const confirmOrDecline = new Node({
	text: "That'll be two gold pieces."
})

const buyABeer = new Edge({
	text: "I'd like to buy a drink!",
	node: confirmOrDecline,
	action: g => {
		const gold = g.player.inventory.filter(item => item instanceof Gold && item.quantity >= 2)
		if (gold.length === 0) {
			confirmBeerPurchase.disabled = true
		} else {
			confirmBeerPurchase.disabled = false
		}
	}
})

const goodbye = new Edge({
	text: 'Goodbye!',
	endsDialogue: true
})

const confirmBeerPurchase = new Edge({
	text: '[Pay two gold pieces]',
	action: g => {
		for (let slot of g.player.inventory) {
			if (slot.item instanceof Gold) {
				slot.item.quantity -= 2
				slot.item.updateQuantity()
				break
			}
		}
		addBeerToPlayerInventory(g.player)
	},
	node: introduction
})

const declineBeerPurchase = new Edge({
	text: 'I changed my mind.',
	node: introduction
})

graph.addVertex(introduction)
graph.addVertex(confirmOrDecline)
graph.addEdge(introduction, buyABeer)
graph.addEdge(introduction, goodbye)
graph.addEdge(confirmOrDecline, confirmBeerPurchase)
graph.addEdge(confirmOrDecline, declineBeerPurchase)

export default new Dialogue(graph)
