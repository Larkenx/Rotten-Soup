export class DialogueNode {
	constructor(data) {
		Object.assign(this, data)
		console.log(this)
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
		this.adjacencyList.get(u).push({ edge })
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
}

export class Dialogue {
	constructor(graph) {
		this.graph = graph
		this.currentNode = null
		this.dialogueEnded = false
		this.selectedChoice
		// find the origin node (start of the conversation)
		for (let node of graph.getVertices()) {
			if (node.origin) this.currentNode = node
			break
		}
		if (this.currentNode === null) console.error('Dialogue failed to find an origin for the dialogue graph!')
	}

	getTitle() {
		return graph.title
	}

	getChoices() {
		let choices = graph.getEdges(this.currentNode).filter(e => !e.disabled)
		if (choices.length === 0) {
			console.error('Current node has no choices!')
			console.error(this.currentNode)
			this.dialogueEnded = true
		}
		return graph.getEdges(this.currentNode).filter(e => !e.disabled)
	}

	selectChoice(selectedChoice) {
		for (const choice of this.graph.getEdges(this.currentNode)) {
			if (choice === selectedChoice) {
				const { node, text, action, endsDialogue, copyPreviousChoices, removeWhenVisited } = choice
				choice.visited = true
				this.dialogueEnded = endsDialogue === true
				// perform the action
				if (action !== undefined) action()
				if (!this.dialogueEnded) {
					if (copyChoicesFrom !== undefined) {
						// if we are supposed to have the same options, but
						// provide a response for the selected choice,
						// then we can simply copy the edges
						graph.copyToNewVertex(copyChoicesFrom, node)
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
