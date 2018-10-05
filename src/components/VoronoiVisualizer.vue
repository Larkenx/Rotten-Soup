<template>
    <span>
        <v-container>
            <v-layout justify-space-around>
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>
                            Map Generator
                        </v-toolbar-title>
                        <v-spacer />
                        <v-tooltip top>
                            <v-btn slot="activator" v-if="generated" dark icon @click.native="saveAsJSON()">
                                <v-icon>fas fa-file-download</v-icon>
                            </v-btn>
                            <span>Download this map as JSON</span>
                        </v-tooltip>
                    </v-toolbar>
                    <v-container>
                        <v-layout style="min-height: 400px; min-width: 800px;" align-center justify-center>
                            <div id="pixi_canvas"></div>
                            <v-layout column v-if="!generated" align-center justify-center>
                                <v-flex md12>
                                    There's nothing here yet!
                                </v-flex>
                            </v-layout>
                        </v-layout>
                        <v-container fluid grid-list-md>
                            <v-layout wrap pa-4 align-content-center justify-space-between>
                                <v-flex md3>
                                    <v-checkbox label="Rerender on Zoom" v-model="rerenderOnZoomChange"></v-checkbox>
                                </v-flex>
                                <v-flex md9>
                                    <v-slider @click:prepend="zoomIn()" @click:append="zoomOut()" :always-dirty="true" style="cursor: hand" append-icon="zoom_out" prepend-icon="zoom_in" thumb-label="always" label="Zoom" :min="minZoom" :max="maxZoom" v-model="zoom"></v-slider>
                                </v-flex>
                                <v-flex md2>
                                    <v-text-field label="Seed" v-model="seed" />
                                </v-flex>
                                <v-flex md3>
                                    <v-text-field :rules="[value => !!value || 'You must give a distance between the cells!']" label="Distance between cells" v-model="distanceBetweenCells" />
                                </v-flex>
                                <v-flex md2>
                                    <v-checkbox label="Show edges" v-model="showEdges" @click.stop="rerender()" :disabled="disableShowEdges"></v-checkbox>
                                </v-flex>
                                <v-flex md2>
                                    <v-checkbox label="Islands" v-model="islands"></v-checkbox>
                                </v-flex>
                                <v-flex md2>
                                    <v-select v-if="islands" label="Distance function" :items="distanceFunctions" v-model="distanceFunction"></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-layout>
                            <v-btn :disabled="distanceBetweenCells === ''" block color="primary" @click.native="generateAndRender()">Generate Map</v-btn>
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
			generated: false,
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
			seed: 'ab39dca'
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
		generateAndRender() {
			voronoiMapVisualizer = new VoronoiMapVisualizer(this.width, this.height)
			voronoiMapVisualizer.mountCanvas()
			voronoiMapVisualizer.render(this.generateMap(), { showEdges: this.showEdges })
		},
		rerender() {
			this.showEdges = !this.showEdges
			this.disableShowEdges = true
			setTimeout(() => {
				this.disableShowEdges = false
			}, 500)
			if (this.generated) voronoiMapVisualizer.render(data, { showEdges: this.showEdges })
		},
		generateMap() {
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

