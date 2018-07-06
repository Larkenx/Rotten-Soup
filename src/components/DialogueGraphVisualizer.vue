<template lang="html">
  <network ref="network" class="network" :nodes="nodes" :edges="edges" :options="options"/>
</template>

<script>
import DIALOGUES from '#/utils/Dialogues.js'
import { Network } from 'vue2vis'
const visualizationData = DIALOGUES.MAYOR_LEONARD.graph.getVisualizationFormat()
let edges = visualizationData.edges.map(edge => {
	return { from: edge.from, to: edge.to, label: edge.label }
})
let nodes = visualizationData.nodes.map(node => {
	return { from: node.from, to: node.to, label: node.label, shape: 'box' }
})

export default {
	components: {
		Network
	},
	data() {
		return {
			nodes: visualizationData.nodes,
			edges,
			options: {
				layout: {
					randomSeed: undefined,
					improvedLayout: true,
					hierarchical: {
						enabled: false,
						levelSeparation: 150,
						nodeSpacing: 200,
						treeSpacing: 200,
						blockShifting: true,
						edgeMinimization: true,
						parentCentralization: true
					}
				},
				nodes: {
					font: {
						size: 10,
						color: 'white'
					},
					mass: 5,
					shape: 'box',
					widthConstant: {
						maximum: 1
					}
				},
				edges: {
					font: {
						size: 10
					}
				}
			}
		}
	}
}
</script>

<style lang="css">
.network {
  background-color: darkgrey;
  border: 1px solid #ccc;
  height: 100%;
  margin: 5px 0;
}
</style>
