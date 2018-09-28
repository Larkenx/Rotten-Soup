<template>
	<span>
		<v-toolbar>
			<v-toolbar-title>
				Playground
			</v-toolbar-title>
			<v-spacer />
			<v-btn raised color="primary" @click.native="renderMap()">Generate</v-btn>
		</v-toolbar>
		<v-container fluid fill-height align-content-center justify-center>
			<v-layout column>
				<div id="pixi_canvas"></div>
				<div id="debug_canvas"></div>
			</v-layout>
		</v-container>
	</span>
</template>

<script>
import * as PIXI from 'pixi.js'
import SimplexNoise from 'simplex-noise'
import RNG from 'prng-parkmiller-js'
import { Delaunay } from 'd3-delaunay'
import { getRandomInt, getNormalRandomInt, randomProperty, between } from '#/utils/HelperFunctions.js'

const width = 800
const height = 400
const renderer = PIXI.autoDetectRenderer(width, height, { antialias: true })
const debugRenderer = PIXI.autoDetectRenderer(width, height, { antialias: true })
const stage = new PIXI.Container()
const debugStage = new PIXI.Container()
export default {
	data() {
		return {}
	},
	mounted() {
		let child = document.getElementById('pixi_canvas').firstChild
		while (child) {
			document.getElementById('pixi_canvas').removeChild(child)
			child = document.getElementById('pixi_canvas').firstChild
		}
		let debugChild = document.getElementById('debug_canvas').firstChild
		while (debugChild) {
			document.getElementById('debug_canvas').removeChild(debugChild)
			debugChild = document.getElementById('debug_canvas').firstChild
		}
		document.getElementById('pixi_canvas').appendChild(renderer.view)
		document.getElementById('debug_canvas').appendChild(debugRenderer.view)

		this.renderMap()
	},
	methods: {
		generateColor() {
			return parseInt(('00000' + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6), 16)
		},
		generateRandomPoints(regions) {
			for (let j = 0; j < height; j += height / regions) {
				for (let i = 0; i < width; i += width / regions) {
					let x = i + getRandomInt(0, 50)
					let y = j + getRandomInt(0, 50)
					points.push([x, y])
				}
			}
		},
		generatePoints(regions) {
			const textures = {
				COASTAL_WATER: 0x649ffc,
				FOREST: 0x0d7744,
				OCEAN: 0x13218c,
				MOUNTAIN: 0xc9cad6,
				PEAK: 0x848484
			}

			const points = []
			let seed1 = 908234
			let seed2 = 908234
			let rng1 = RNG.create(seed1)
			let rng2 = RNG.create(seed2)
			let gen1 = new SimplexNoise(rng1.nextDouble.bind(rng1))
			let gen2 = new SimplexNoise(rng2.nextDouble.bind(rng2))
			let frequency = 2.0

			const noise1 = (nx, ny) => {
				return gen1.noise2D(nx, ny) / 2 + 0.5
			}

			const noise2 = (nx, ny) => {
				return gen2.noise2D(nx, ny) / 2 + 0.5
			}

			const getElevation = (x, y) => {
				let nx = x / width - 0.5,
					ny = y / height - 0.5
				let e =
					1.0 * noise1(frequency * 1 * nx, frequency * 1 * ny) +
					0.5 * noise1(frequency * 2 * nx, frequency * 2 * ny) +
					0.25 * noise1(frequency * 4 * nx, frequency * 4 * ny) +
					0.13 * noise1(frequency * 8 * nx, frequency * 8 * ny) +
					0.06 * noise1(frequency * 16 * nx, frequency * 16 * ny) +
					0.03 * noise1(frequency * 32 * nx, frequency * 32 * ny)
				e /= 1.0 + 0.5 + 0.25 + 0.13 + 0.06 + 0.03
				e = Math.pow(e, 5.0)
				return e * 100
			}

			const getMoisture = (x, y) => {
				let nx = x / width - 0.5,
					ny = y / height - 0.5
				let m =
					1.0 * noise2(1 * nx, 1 * ny) +
					0.75 * noise2(2 * nx, 2 * ny) +
					0.33 * noise2(4 * nx, 4 * ny) +
					0.33 * noise2(8 * nx, 8 * ny) +
					0.33 * noise2(16 * nx, 16 * ny) +
					0.5 * noise2(32 * nx, 32 * ny)
				m /= 1.0 + 0.75 + 0.33 + 0.33 + 0.33 + 0.5
				return m
			}

			const getBiome = e => {
				if (e < 1.0) {
					return textures.OCEAN
				} else if (e < 7) {
					return textures.FOREST
				} else if (e < 24) {
					return textures.MOUNTAIN
				} else {
					return textures.PEAK
				}
			}
			for (let y = 0; y < height; y += height / regions) {
				for (let x = 0; x < width; x += width / regions) {
					let dx = x + getRandomInt(0, 50)
					let dy = y + getRandomInt(0, 50)
					points.push({ x: dx, y: dy, color: getBiome(getElevation(dx, dy)), randomColor: this.generateColor() })
				}
			}
			return points
		},
		distance(p1, p2) {
			return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
		},
		manhattan(p1, p2) {
			return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
		},
		nearestPoint(p, points) {
			let minDistance = Infinity
			let nearest = null
			for (let v of points) {
				let d = this.distance(p, v)
				if (d <= minDistance) {
					minDistance = d
					nearest = v
				}
			}
			return nearest
		},
		renderDelaunaryTriangulation() {
			const points = this.generateRandomPoints()
			const delaunay = Delaunay.from(points)
			const voronoi = delaunay.voronoi([0, 0, width, height])
		},
		renderMap() {
			let g = new PIXI.Graphics()
			let points = this.generatePoints(30)
			let computedNearestPoints = {}
			let size = 5
			for (let y = 0; y < height; y += size) {
				for (let x = 0; x < width; x += size) {
					let nearestPoint = this.nearestPoint({ x, y }, points)
					computedNearestPoints[x + ',' + y] = nearestPoint
					let roll = getRandomInt(0, 4)
					g.beginFill(nearestPoint.color)
					g.drawRect(x, y, size, size)
					g.endFill()
				}
			}
			stage.addChild(g)
			renderer.render(stage)
			this.renderDebug(size, points, computedNearestPoints)
		},
		renderDebug(size, points, computedNearestPoints) {
			let g = new PIXI.Graphics()
			for (let y = 0; y < height; y += size) {
				for (let x = 0; x < width; x += size) {
					let nearestPoint = computedNearestPoints[x + ',' + y]
					g.beginFill(nearestPoint.randomColor)
						.drawRect(x, y, size, size)
						.endFill()
				}
			}
			debugStage.addChild(g)
			debugRenderer.render(debugStage)
		}
	}
}
</script>



