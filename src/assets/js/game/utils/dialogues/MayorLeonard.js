import { createActor, createItem } from '#/utils/EntityFactory.js'
import { DialogueEdge, DialogueNode, DialogueGraph, Dialogue } from '#/utils/DialogueGraph.js'

const addKeyToPlayerInventory = p => {
	p.addToInventory(createItem('KEY', p.x, p.y))
}

/* Local re-binding of nodes and edges */
const Node = DialogueNode
const Edge = DialogueEdge
const Graph = DialogueGraph

let graph = new Graph('Mayor Leonard')

// introduction
const n1 = new Node({
	text: 'Greetings adventurer! I am the Mayor of Mulberry Town. Call me Leonard. What can I do for you?',
	origin: true
})
// informational response
const n2 = new Node({
	text:
		"Mulberry Town is a small, peaceful community of farmers and crafters. We try our best to accomodate travellers. I'm sure you'll feel right at home here. Be sure to visit the tavern and meet with some of the locals."
})
// when asking for a quest, tell them about the dungeon
const n3 = new Node({
	text:
		'Yes, there is something you can help us with. Recently, one of the villagers went missing from their home. When I went to check up on him, I noticed there was a staircase leading down into a dungeon with a bunch of creatures.\nWill you take this key and explore the dungeon to find our missing villager?'
})
// thank for taking quest
const n4 = new Node({
	text: 'Thank you! Please be careful down there - you never know what you might find...'
})
// or say that's ok, come back if you change your mind...
const n5 = new Node({
	text: 'I understand. Please come back if you change your mind.'
})
//  return to main menu
const n6 = new Node({
	text: 'What can I do for you?'
})

graph.addVertex(n1)
graph.addVertex(n2)
graph.addVertex(n3)
graph.addVertex(n4)
graph.addVertex(n5)
graph.addVertex(n6)

// ask about the town
const n1e1 = new Edge({
	text: 'Tell me about Mulberry Town.',
	node: n2,
	copyChoicesFrom: n1
})
// ask for quests
const n1e2 = new Edge({
	text: 'Is there anything I can help with?',
	node: n3
})
// end conversation
const exit = new Edge({
	text: 'Goodbye.',
	endsDialogue: true
})

graph.addEdge(n1, n1e1)
graph.addEdge(n1, n1e2)
graph.addEdge(n1, exit)

// confirm quest, receive key
const n3e1 = new Edge({
	text: "Yes, I'll adventure into the dungeon and find out what happened to the missing villager!",
	action: g => {
		addKeyToPlayerInventory(g.player)
		n1e2.disabled = true
	},
	node: n4
})
// decline quest, for now
const n3e2 = new Edge({
	text: "Sorry, not right now. I don't think I'm up to that just yet."
})

graph.addEdge(n3, n3e1)
graph.addEdge(n3, n3e2)

const askOtherQuestions = new Edge({
	text: 'I had other questions...',
	node: n6,
	copyChoicesFrom: n1
})

graph.addEdge(n4, askOtherQuestions)
graph.addEdge(n5, askOtherQuestions)
graph.addEdge(n4, exit)
graph.addEdge(n5, exit)

export default new Dialogue(graph)
