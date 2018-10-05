<template>
	<span>
		<v-container>
			<v-layout justify-space-around>
				<v-card>
					<v-toolbar color="primary">
						<v-toolbar-title>
							Map Generator
						</v-toolbar-title>
						<v-spacer />
						<v-tooltip right>
							<v-btn slot="activator" :disabled="!generated" dark icon @click.native="saveAsJSON()">
								<v-icon>fas fa-file-download</v-icon>
							</v-btn>
							<span>Download this map as JSON</span>
						</v-tooltip>
					</v-toolbar>
					<v-container>
						<v-layout justify-space-around>
							<v-flex xs4>
								<v-text-field :rules="sizeRules" prepend-icon="fa-arrows-alt-h" label="Width" v-model="width" suffix="px" />
							</v-flex>
							<v-flex xs4>
								<v-text-field prepend-icon="fa-arrows-alt-v" label="Height" v-model="height" suffix="px" />
							</v-flex>
						</v-layout>
						<v-layout align-center justify-center :style="{minWidth: width+'px', minHeight: height+'px'}">
							<div id="pixi_canvas"></div>
							<v-layout column v-if="!generated" align-center justify-center>
								<v-flex md12>
									There's nothing here yet!
								</v-flex>
							</v-layout>
						</v-layout>
						<v-container fluid grid-list-md>
							<v-layout wrap align-content-center justify-space-between>
								<v-flex xs2>
									<v-checkbox label="Show edges" v-model="showEdges" @click.stop="rerender()" :disabled="disableShowEdges"></v-checkbox>
								</v-flex>
								<v-flex xs3>
									<v-checkbox label="Rerender on Zoom" v-model="rerenderOnZoomChange"></v-checkbox>
								</v-flex>
								<v-flex xs6>
									<v-slider @end="zoomBlurred()" @click:prepend="zoomIn()" @click:append="zoomOut()" :always-dirty="true" style="cursor: hand" append-icon="zoom_out" prepend-icon="zoom_in" thumb-label="always" label="Zoom" :min="minZoom" :max="maxZoom" v-model="zoom"></v-slider>
								</v-flex>
							</v-layout>
							<v-layout wrap align-content-center justify-space-between>
								<v-flex xs2>
									<v-text-field append-icon="sync" @click:append="() => createNewSeed()" label="Seed" v-model="seed" />
								</v-flex>
								<v-flex xs3>
									<v-text-field :rules="[value => !!value || 'You must give a distance between the cells!']" label="Distance between cells" v-model="distanceBetweenCells" />
								</v-flex>

								<v-flex xs2>
									<v-checkbox label="Islands" v-model="islands"></v-checkbox>
								</v-flex>
								<v-flex xs3>
									<v-select :disabled="!islands" label="Distance function" :items="distanceFunctions" v-model="distanceFunction"></v-select>
								</v-flex>
							</v-layout>
						</v-container>
						<v-layout>
							<v-btn :loading="generating" :disabled="distanceBetweenCells === ''" block color="primary" @click.native="generateAndRender()">Generate Map</v-btn>
						</v-layout>
					</v-container>
				</v-card>
			</v-layout>
		</v-container>
	</span>
</template>

<script>
import { VoronoiMapGenerator, VoronoiMapVisualizer } from '#/map/generation/VoronoiMapGenerator'
let voronoiMapVisualizer = null
let data = null
export default {
	data() {
		return {
			distanceFunction: 'Euclidean',
			distanceFunctions: ['Euclidean', 'Manhattan'],
			generating: false,
			generated: false,
			updatedSize: false,
			width: 800,
			height: 400,
			zoom: 4,
			minZoom: 1,
			maxZoom: 10,
			distanceBetweenCells: 10,
			showEdges: false,
			disableShowEdges: false,
			islands: false,
			rerenderOnZoomChange: true,
			seed: '6zPFSoo0',
			sizeRules: [
				value => !!value || 'This field is required!',
				value => parseInt(value, 10) >= 100 || 'This field must be at least 100px!'
			]
		}
	},
	methods: {
		zoomIn() {
			if (this.zoom > this.minZoom) {
				--this.zoom
				if (this.generated && this.rerenderOnZoomChange) this.generateAndRender()
			}
		},
		zoomOut() {
			if (this.zoom < this.maxZoom) {
				++this.zoom
				if (this.generated && this.rerenderOnZoomChange) this.generateAndRender()
			}
		},
		zoomBlurred(n) {
			if (this.generated && this.rerenderOnZoomChange) this.generateAndRender()
		},
		async generateAndRender() {
			this.generating = true
			if (this.generated) voronoiMapVisualizer.destroy()
			voronoiMapVisualizer = new VoronoiMapVisualizer(this.width, this.height)
			voronoiMapVisualizer.mountCanvas()
			voronoiMapVisualizer.render(await this.generateMap(), { showEdges: this.showEdges })
			this.generating = false
		},
		rerender() {
			this.showEdges = !this.showEdges
			this.disableShowEdges = true
			setTimeout(() => {
				this.disableShowEdges = false
			}, 500)
			if (this.generated) {
				voronoiMapVisualizer.render(data, { showEdges: this.showEdges })
			}
		},
		async generateMap() {
			let mapGen = new VoronoiMapGenerator()
			data = mapGen.export(
				mapGen.generate(
					this.width,
					this.height,
					this.zoom,
					this.distanceBetweenCells,
					this.islands,
					this.seed,
					this.distanceFunction
				)
			)
			this.generated = true
			return data
		},
		createNewSeed() {
			let text = ''
			let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

			for (let i = 0; i < 8; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length))

			this.seed = text
		},
		saveAsJSON() {
			if (this.generated) {
				let { cells } = data
				for (let cell of cells) cell.color = '#' + cell.color.toString(16)
				let a = document.createElement('a')
				let file = new Blob([JSON.stringify(cells, null, 2)], { type: 'text/json' })
				a.href = URL.createObjectURL(file)
				a.download = this.seed + '.json'
				a.click()
			}
		}
	}
}
</script>

