// Jonas, the blacksmith in Mulberry
import { Game } from '#/Game'
import { DialogueEdge, DialogueNode, DialogueGraph, Dialogue } from '#/utils/DialogueGraph.js'

const openStoreInterface = p => {}

/* Local re-binding of nodes and edges */
const Node = DialogueNode
const Edge = DialogueEdge
const Graph = DialogueGraph

let graph = new Graph('Jonas the Blacksmith apprentice')

// introduction
const introduction = new Node({
	text: 'Hey mate. Looking to buy some weapons or armor?',
	origin: true
})

graph.addVertex(introduction)

// ask about the town
const openStore = new Edge({
	text: 'Show me your wares.',
	node: null,
	copyChoicesFrom: introduction
})
// end conversation
const exit = new Edge({
	text: 'Goodbye.',
	endsDialogue: true
})

graph.addEdge(introduction, openStore)
graph.addEdge(introduction, exit)

export default new Dialogue(graph)
