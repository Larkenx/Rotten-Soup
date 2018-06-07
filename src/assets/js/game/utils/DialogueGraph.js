class DialogueNode {
	constructor(data) {
		this.data = data
		this.edges = {}
	}
}

/* A graph data structure for storing relations between dialogue choices and their respective responses */
export class DialogueGraph {
	constructor() {
		this.adjacencyList = new Map()
	}

	addVertex(node) {
		if (!this.adjacencyList.has(node)) this.adjacencyList.set(node, [])
	}

	addEdge(u, v) {
		this.adjacencyList.get(u).push(v)
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

let g = new DialogueGraph()
const boilerplate = { title: 'Mayor Leonard', selectedChoice: 0 }
/* introduction */
let d1 = new DialogueNode({
	...boilerplate,
	text: 'Hello there! I am Mayor Leonard of Mulberry Town. Welcome to our humble village.',
	choices: []
})

/* confirm quest */
