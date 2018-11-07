<template>
	<v-container>
		<v-card class="pa-2">
			<v-layout justify-center>
				<code style="background-color: black; color: white; line-height: 1;">
					{{ dungeon}}
				</code>
			</v-layout>
			<v-card-actions>
				<v-spacer />
				<v-text-field class="mr-2" style="max-width: 40px" label="Floor" v-model="level"></v-text-field>
				<v-btn flat color="yellow darken-4" @click.native="createDungeon()">Generate</v-btn>
			</v-card-actions>
		</v-card>
	</v-container>
</template>

<script>
import { randomDungeon } from '#/map/generation/RandomDungeon.js'
export default {
	mounted() {
		Game.init(4219, { width: this.width, height: this.height, testing: true, additionalCallback: () => this.createDungeon() })
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
				level: this.level
			})
			this.dungeon = map.toString()
			console.log(map.dungeon)
		}
	}
}
</script>

