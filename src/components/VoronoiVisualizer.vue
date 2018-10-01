<template>
    <span>
        <v-toolbar>
            <v-toolbar-title>
                Map Generator
            </v-toolbar-title>
            <v-spacer />
        </v-toolbar>
        <v-layout justify-center>
            <v-card>
                <v-container>
                    <v-layout style="min-height: 610px; min-width: 800px;">
                        <div id="pixi_canvas"></div>
                    </v-layout>
                    <v-layout wrap pa-4 align-content-center justify-space-between>
                        <v-flex md12>
                            <v-slider style="cursor: hand" append-icon="zoom_out" prepend-icon="zoom_in" :tick-size="0.5" thumb-label="always" label="Zoom" :min="1" :max="15" v-model="zoom"></v-slider>
                        </v-flex>
                        <v-flex md3>
                            <v-text-field label="Distance between cells" v-model="distanceBetweenCells" />
                        </v-flex>
                        <v-flex md3>
                            <v-checkbox label="Islands" v-model="islands"></v-checkbox>
                        </v-flex>
                        <v-flex md3>
                            <v-checkbox label="Show edges" v-model="showEdges" @click.stop="rerender();" :disabled="disableShowEdges"></v-checkbox>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-btn block color="primary" @click.native="generateAndRender()">Generate</v-btn>
                    </v-layout>
                </v-container>
            </v-card>
        </v-layout>
    </span>
</template>

<script>
import { VoronoiMapGenerator, VoronoiMapVisualizer } from '#/map/generation/VoronoiMapGenerator'
let voronoiMapVisualizer = null
let data = null
export default {
	data() {
		return {
			generated: false,
			width: 800,
			height: 600,
			zoom: 1,
			distanceBetweenCells: 15,
			showEdges: true,
			disableShowEdges: false,
			islands: true
		}
	},
	methods: {
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
			data = mapGen.export(mapGen.generate(this.width, this.height, this.zoom, this.distanceBetweenCells))
			this.generated = true
			return data
		}
	}
}
</script>

