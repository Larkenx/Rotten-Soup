import { createActor, createItem } from '#/utils/EntityFactory.js'
import { DialogueEdge, DialogueNode, DialogueGraph, Dialogue } from '#/utils/DialogueGraph.js'

const addKeyToPlayerInventory = p => {
	p.addToInventory(createItem('KEY', p.x, p.y))
}

/* Local re-binding of nodes and edges */
const Node = DialogueNode
const Edge = DialogueEdge
const Graph = DialogueGraph

let graph = new Graph('Drunken Dwarf')

const introduction = new Node({
	text: '*hic* Nili and Dani, where are you? *hic*',
	origin: true
})

const introduction2 = new Node({
	text: '*hic*...I need another pint. Get me another pint!'
})

const goToNextLine = new Edge({
	text: 'Uh...',
	node: introduction2
})

graph.addVertex(introduction)
graph.addVertex(introduction2)
graph.addEdge(introduction, goToNextLine)

const grumpyEnding = new Node({
	text: "I don't like you...leave me be! *hic*"
})

const startBeerQuest = new Node({
	text: "What're you waitin' for? I 'avent got all day."
})

const youHaveHadEnoughToDrink = new Edge({
	text: "I think you've had enough to drink!",
	node: grumpyEnding
})

const buyAnotherDrink = new Edge({
	text: "Okay, I'll buy you another beer.",
	node: startBeerQuest
})

const grumpyEndingWalkAway = new Edge({
	text: 'Fine.',
	endsDialogue: true
})

const beRightBackWithYourBeer = new Edge({
	text: 'Okay!',
	endsDialogue: true
})

graph.addVertex(grumpyEnding)
graph.addVertex(startBeerQuest)
graph.addEdge(introduction2, youHaveHadEnoughToDrink)
graph.addEdge(introduction2, buyAnotherDrink)
graph.addEdge(grumpyEnding, grumpyEndingWalkAway)
graph.addEdge(startBeerQuest, beRightBackWithYourBeer)

export default new Dialogue(graph)
