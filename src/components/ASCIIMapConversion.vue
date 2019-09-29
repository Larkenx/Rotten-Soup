<template>
	<v-container>
		<!-- <v-card class="pa-2"> -->
		<v-layout justify-center>
			<code
				style="background-color: black; color: white; line-height: 1; font-size: 15px;"
			>{{ dungeon}}</code>
		</v-layout>
		<!-- <v-card-actions>
        <v-spacer/>
        <v-text-field class="mr-2" style="max-width: 40px" label="Floor" v-model="level"></v-text-field>
        <v-btn flat color="yellow darken-4" @click.native="createDungeon()">Generate</v-btn>
		</v-card-actions>-->
		<!-- </v-card> -->
	</v-container>
</template>

<script>
import { randomDungeon } from '#/map/generation/RandomDungeon.js'
import { createFovDijkstraMap, stringifyDijkstraMap, getVisibleTiles, unkey } from '#/utils/HelperFunctions.js'
export default {
	mounted() {
		Game.init(4219, {
			width: this.width,
			height: this.height,
			testing: true,
			additionalCallback: () => this.createDijkstraMapRepresentation()
		})
	},
	data() {
		return {
			dungeon: '',
			level: 1
		}
	},
	methods: {
		createDungeon() {
			let map = new randomDungeon(100, 40, {
				dungeonName: 'Playground',
				lastDungeon: false,
				fromPortal: 'Overworld',
				toPortal: 'Playground 2',
				level: this.level,
				addPrefabs: true,
				addEntities: true
			})
			this.dungeon = map.toString()
		},
		createDijkstraMapRepresentation() {
			let map = new randomDungeon(100, 40, {
				dungeonName: 'Playground',
				lastDungeon: false,
				fromPortal: 'Overworld',
				toPortal: 'Playground 2',
				level: this.level,
				addEntities: false
			})
			let [x, y] = map.playerLocation
			let visibleTilesArray = getVisibleTiles({ x, y, cb: { range: 7 } }, map)
			let visibleTiles = {}
			visibleTilesArray.forEach(tile => (visibleTiles[tile.x + ',' + tile.y] = true))
			let notVisibleTiles = {}
			map.forEachTile(tile => {
				let key = `${tile.x},${tile.y}`
				if (map.inbounds(tile.x, tile.y) && !tile.blocked() && !(key in visibleTiles)) notVisibleTiles[key] = true
			})
			let dijkstraMap = createFovDijkstraMap(
				{ x, y },
				Object.keys(notVisibleTiles).map(k => unkey(k)),
				(x, y) => map.inbounds(x, y) && !map.getTile(x, y).blocked()
			)
			this.dungeon = stringifyDijkstraMap(dijkstraMap, { x, y }, map.width, map.height).reduce((p, c) => {
				return `${p}\n${c.join('')}`
			}, '')
		}
	}
}
</script>

