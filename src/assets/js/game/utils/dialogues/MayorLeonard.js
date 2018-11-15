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
const introduction = new Node({
	text: 'Hi there! I am the Mayor of Mulberry. Call me Leonard. What can I do for you?',
	origin: true
})
// informational response
const mulberryDescription = new Node({
	text:
		"Mulberry Town is a small, peaceful community of farmers and crafters. We try our best to accomodate travellers. I'm sure you'll feel right at home here. Be sure to visit the tavern and meet with some of the locals."
})
// when asking for a quest, tell them about the dungeon
const missingVillagerIntroduction = new Node({
	text:
		'Yes, there is something you can help us with. Recently, one of the villagers went missing from their home. When I went to check up on him, I noticed there was a staircase leading down into a dungeon with a bunch of creatures. Will you take this key and explore the dungeon to find our missing villager?'
})
// thank for taking quest
const confirmMissingVillagerQuest = new Node({
	text: 'Thank you! Please be careful down there - you never know what you might find...'
})
// or say that's ok, come back if you change your mind...
const declineMissingVillagerQuest = new Node({
	text: 'I understand. Please come back if you change your mind.'
})
//  return to main menu
const moreQuestions = new Node({
	text: 'What can I do for you?'
})

graph.addVertex(introduction)
graph.addVertex(mulberryDescription)
graph.addVertex(missingVillagerIntroduction)
graph.addVertex(confirmMissingVillagerQuest)
graph.addVertex(declineMissingVillagerQuest)
graph.addVertex(moreQuestions)

// ask about the town
const askAboutMulberryTown = new Edge({
	text: 'Tell me about Mulberry Town.',
	node: mulberryDescription,
	copyChoicesFrom: introduction
})
// ask for quests
const askForQuests = new Edge({
	text: 'Is there anything I can help with?',
	node: missingVillagerIntroduction,
	disabled: true
})
// end conversation
const exit = new Edge({
	text: 'Goodbye.',
	endsDialogue: true
})

graph.addEdge(introduction, askAboutMulberryTown)
graph.addEdge(introduction, askForQuests)
graph.addEdge(introduction, exit)

// confirm quest, receive key
const acceptMissingVillagerQuest = new Edge({
	text: "Yes, I'll adventure into the dungeon and find out what happened to the missing villager!",
	action: g => {
		addKeyToPlayerInventory(g.player)
		g.log('You received a key from Mayor Leonard!', 'lightblue')
		askForQuests.disabled = true
	},
	node: confirmMissingVillagerQuest
})
// decline quest, for now
const rejectMissingVillagerQuest = new Edge({
	text: "Sorry, not right now. I don't think I'm up to that just yet.",
	node: declineMissingVillagerQuest
})

graph.addEdge(missingVillagerIntroduction, acceptMissingVillagerQuest)
graph.addEdge(missingVillagerIntroduction, rejectMissingVillagerQuest)

const askOtherQuestions = new Edge({
	text: 'I had other questions...',
	node: moreQuestions,
	copyChoicesFrom: introduction
})

graph.addEdge(confirmMissingVillagerQuest, askOtherQuestions)
graph.addEdge(declineMissingVillagerQuest, askOtherQuestions)
graph.addEdge(confirmMissingVillagerQuest, exit)
graph.addEdge(declineMissingVillagerQuest, exit)

export default new Dialogue(graph)
