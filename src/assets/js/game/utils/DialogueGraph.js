import { Game } from '#/Game.js'

export class DialogueNode {
	constructor(data) {
		Object.assign(this, data)
	}
}

/* Edges in a dialogue are the choices of dialogue that you can express. Every edge has a:
		- text for the dialogue you want to say
		- the node that the edge leads
		- the action or side effect that evaluates as a result of choosing the option (item added, another edge removed, reputation)
 */
export class DialogueEdge {
	constructor(data) {
		this.disabled = false
		this.visited = false
		Object.assign(this, data)
	}
}

/* A graph data structure for storing relations between dialogue choices and their respective responses */
export class DialogueGraph {
	constructor(title) {
		this.title = title
		this.adjacencyList = new Map()
	}

	clearVerticesAndEdges() {
		this.adjacencyList.clear()
	}

	getVertices() {
		return this.adjacencyList.keys()
	}

	getEdges(node) {
		return this.adjacencyList.get(node)
	}

	addVertex(node) {
		if (!this.adjacencyList.has(node)) this.adjacencyList.set(node, [])
	}

	addEdge(u, edge) {
		this.adjacencyList.get(u).push(edge)
	}

	copyToNewVertex(from, to) {
		const edges = this.adjacencyList.get(from)
		this.adjacencyList.set(to, edges)
	}

	printGraph() {
		// iterate over the vertices
		for (const k of this.adjacencyList.keys()) {
			// great the corresponding adjacency list
			// for the vertex
			let edges = this.adjacencyList.get(k)
			let output = ''

			// iterate over the adjacency list
			// concatenate the values into a string
			for (const v of edges) output += v + ' '

			// print the vertex and its adjacency list
			console.log(k + ' -> ' + output)
		}
	}

	getVisualizationFormat() {
		let nodes = []
		for (const node of this.getVertices()) {
			nodes.push({ id: node.text, label: node.text, node })
		}

		let edges = []
		for (const n of nodes) {
			for (const edge of this.getEdges(n.node)) {
				if (edge.node !== undefined) {
					edges.push({ from: n.label, label: edge.text, to: edge.node.text })
				}
			}
		}
		return { nodes, edges }
	}
}

export class Dialogue {
	constructor(graph, state = {}, init = () => {}) {
		this.graph = graph
		this.currentNode = null
		this.dialogueEnded = false
		this.selectedChoice = 0
		// find the origin node (start of the conversation)
		this.initializeOrigin()
		this.state = state
		this.init = init
	}

	initializeOrigin() {
		for (let node of this.graph.getVertices()) {
			if (node.origin) {
				this.currentNode = node
			}
			break
		}
		if (this.currentNode === null) console.error('Dialogue failed to find an origin for the dialogue graph!')
	}

	getTitle() {
		return this.graph.title
	}

	getText() {
		return this.currentNode.text
	}

	getChoices() {
		let choices = this.graph.getEdges(this.currentNode).filter(e => !e.disabled)
		if (choices.length === 0) {
			console.error('Current node has no choices!')
			console.error(this.currentNode)
			this.dialogueEnded = true
		}
		return this.graph.getEdges(this.currentNode).filter(e => !e.disabled)
	}

	selectChoice(selectedChoice) {
		for (const [index, choice] of this.graph.getEdges(this.currentNode).entries()) {
			if (choice === selectedChoice) {
				const { node, text, action, endsDialogue, copyChoicesFrom, removeWhenVisited } = choice
				choice.visited = true
				this.selectedChoice = 0
				if (endsDialogue === true) {
					Game.overlayData.visible = false
					this.initializeOrigin()
					Game.overlayData.dialogue = null
					return
				}
				// perform the action
				if (action !== undefined) action(Game)
				if (!this.dialogueEnded) {
					if (copyChoicesFrom !== undefined) {
						// if we are supposed to have the same options, but
						// provide a response for the selected choice,
						// then we can simply copy the edges
						this.graph.copyToNewVertex(copyChoicesFrom, node)
					}
					// filter this edge from the list of possible edges
					// TODO: perform a DFS on the graph. Trim any path connected to the edge. For now, the edge actually has scope
					// of the graph, and can delete the proper edges/nodes manually
					// if (removeWhenVisited) { }
					// go to the next node
					this.currentNode = node
				}
			}
		}
	}
}
