<template>
	<span>
		<v-toolbar>
			<v-toolbar-title>
				Playground
			</v-toolbar-title>
			<v-spacer />
			<v-btn raised color="primary" @click.native="renderDelaunaryTriangulation()">Generate</v-btn>
		</v-toolbar>
		<v-container fluid fill-height align-content-center justify-center>
			<v-layout column>
				<div id="pixi_canvas"></div>
				<div id="debug_canvas"></div>
			</v-layout>
			<v-layout column>
				<v-flex xs-2 v-for="elevation of histogram" key="elevation">
					{{`${elevation}:${histogram[elevation]}`}}
				</v-flex>
			</v-layout>
		</v-container>
	</span>
</template>

<script>
import * as PIXI from 'pixi.js'
import SimplexNoise from 'simplex-noise'
import Poisson from 'poisson-disk-sampling'
import RNG from 'prng-parkmiller-js'
import { Delaunay } from 'd3-delaunay'
import { getRandomInt, getNormalRandomInt, randomProperty, between } from '#/utils/HelperFunctions.js'
let seed1 = 908234
let seed2 = 908234
let rng1 = RNG.create()
let rng2 = RNG.create()
let gen1 = new SimplexNoise(rng1)
let gen2 = new SimplexNoise(rng2)
const width = 800
const height = 500
const renderer = PIXI.autoDetectRenderer(width, height, { antialias: true, backgroundColor: 0x474747 })
const debugRenderer = PIXI.autoDetectRenderer(width, height, { antialias: true })
const stage = new PIXI.Container()
const debugStage = new PIXI.Container()
let elevationHistogram = {}
export default {
	data() {
		return {
			histogram: null
		}
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
		// document.getElementById('debug_canvas').appendChild(debugRenderer.view)

		// this.renderMap()
		this.renderDelaunaryTriangulation()
	},
	methods: {
		clearStage() {
			for (let i = stage.children.length - 1; i >= 0; i--) {
				stage.removeChild(stage.children[i])
			}
		},
		getBiomeColor(x, y) {
			const textures = {
				OCEAN: 0x444578,
				BEACH: 0xd9cebc,
				SCORCHED: 0x575c4f,
				BARE: 0xbbbbbb,
				TUNDRA: 0xdddcbd,
				SNOW: 0xf8f8f8,
				TEMPERATE_DESERT: 0xe4e7cb,
				SHRUBLAND: 0xc4ccbc,
				TAIGA: 0xccd4bc,
				GRASSLAND: 0xc4d3ac,
				TEMPERATE_DECIDUOUS_FOREST: 0xb4c8aa,
				TEMPERATE_RAIN_FOREST: 0xa5c3a9,
				SUBTROPICAL_DESERT: 0xe9ddc8,
				TROPICAL_SEASONAL_FOREST: 0xaacba5,
				TROPICAL_RAIN_FOREST: 0x9dbba9
			}

			const colorToTextureString = {
				[0x444578]: 'OCEAN',
				[0xd9cebc]: 'BEACH',
				[0x575c4f]: 'SCORCHED',
				[0xbbbbbb]: 'BARE',
				[0xdddcbd]: 'TUNDRA',
				[0xf8f8f8]: 'SNOW',
				[0xe4e7cb]: 'TEMPERATE_DESERT',
				[0xc4ccbc]: 'SHRUBLAND',
				[0xccd4bc]: 'TAIGA',
				[0xc4d3ac]: 'GRASSLAND',
				[0xb4c8aa]: 'TEMPERATE_DECIDUOUS_FOREST',
				[0xa5c3a9]: 'TEMPERATE_RAIN_FOREST',
				[0xe9ddc8]: 'SUBTROPICAL_DESERT',
				[0xaacba5]: 'TROPICAL_SEASONAL_FOREST',
				[0x9dbba9]: 'TROPICAL_RAIN_FOREST'
			}

			let zoom = 5.0
			let exponent = 1.0

			const noise1 = (nx, ny) => {
				return gen1.noise2D(zoom * nx, zoom * ny) / 2 + 0.5
			}

			const noise2 = (nx, ny) => {
				return gen2.noise2D(zoom * nx, zoom * ny) / 2 + 0.5
			}

			const getElevation = (x, y) => {
				let nx = x / width - 0.5,
					ny = y / height - 0.5
				let e =
					1.0 * noise1(1 * nx, 1 * ny) +
					0.5 * noise1(2 * nx, 2 * ny) +
					0.25 * noise1(4 * nx, 4 * ny) +
					0.13 * noise1(8 * nx, 8 * ny) +
					0.06 * noise1(16 * nx, 16 * ny) +
					0.03 * noise1(32 * nx, 32 * ny)
				e /= 1.0 + 0.5 + 0.25 + 0.13 + 0.06 + 0.03
				e = Math.pow(e, exponent)
				return e
			}

			// var nx = x / width - 0.5,
			// 	ny = y / height - 0.5
			// var e =
			// 	1.0 * noise1(1 * nx, 1 * ny) +
			// 	0.5 * noise1(2 * nx, 2 * ny) +
			// 	0.25 * noise1(4 * nx, 4 * ny) +
			// 	0.13 * noise1(8 * nx, 8 * ny) +
			// 	0.06 * noise1(16 * nx, 16 * ny) +
			// 	0.03 * noise1(32 * nx, 32 * ny)
			// e /= 1.0 + 0.5 + 0.25 + 0.13 + 0.06 + 0.03
			// e = Math.pow(e, 5.0)

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

			const getBiome = (e, m) => {
				if (e < 0.1) return textures.OCEAN
				if (e < 0.12) return textures.BEACH

				if (e > 0.8) {
					if (m < 0.1) return textures.SCORCHED
					if (m < 0.2) return textures.BARE
					if (m < 0.5) return textures.TUNDRA
					return textures.SNOW
				}

				if (e > 0.6) {
					if (m < 0.33) return textures.TEMPERATE_DESERT
					if (m < 0.66) return textures.SHRUBLAND
					return textures.TAIGA
				}

				if (e > 0.3) {
					if (m < 0.16) return textures.TEMPERATE_DESERT
					if (m < 0.5) return textures.GRASSLAND
					if (m < 0.83) return textures.TEMPERATE_DECIDUOUS_FOREST
					return textures.TEMPERATE_RAIN_FOREST
				}

				if (m < 0.16) return textures.SUBTROPICAL_DESERT
				if (m < 0.33) return textures.GRASSLAND
				if (m < 0.66) return textures.TROPICAL_SEASONAL_FOREST
				return textures.TROPICAL_RAIN_FOREST
			}
			let elevation = getElevation(x, y)
			let rounded = elevation.toFixed(1)
			if (rounded in elevationHistogram) elevationHistogram[rounded]++
			else elevationHistogram[rounded] = 1

			let texture = getBiome(elevation, getMoisture(x, y))
			return texture
		},
		generateColor() {
			return parseInt(('00000' + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6), 16)
		},
		generateRandomPoints(minDist, maxDist) {
			// const points = []
			// for (let j = 0; j < height; j += regions) {
			// 	for (let i = 0; i < width; i += regions) {
			// 		let x = i + getRandomInt(0, 50)
			// 		let y = j + getRandomInt(0, 50)
			// 		points.push([x, y])
			// 	}
			// }
			return new Poisson([width, height], minDist, maxDist, 10).fill()
		},
		generatePoints(regions) {
			for (let y = 0; y < height; y += height / regions) {
				for (let x = 0; x < width; x += width / regions) {
					let dx = x + getRandomInt(0, 50)
					let dy = y + getRandomInt(0, 50)
					points.push({ x: dx, y: dy, color: this.getBiomeColor(dx, dy), randomColor: this.generateColor() })
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
			this.clearStage()
			let g = new PIXI.Graphics()
			let point = (x, y) => new PIXI.Point(x, y)
			const initialPoints = this.generateRandomPoints(15, 15)
			let voronoi = null
			try {
				voronoi = Delaunay.from(initialPoints).voronoi([0, 0, width, height])
			} catch (exception) {
				console.warn('Generated random points cannnot be triangulated...Retrying generation.')
				return this.renderDelaunaryTriangulation()
			}
			const { delaunay, circumcenters, vectors } = voronoi
			const { triangles, points, halfedges } = delaunay

			const renderCells = () => {
				for (let i = 0; i <= triangles.length; i++) {
					const t0 = triangles[i]
					const v1 = point(points[t0 * 2], points[t0 * 2 + 1])
					g.beginFill(this.getBiomeColor(v1.x, v1.y))
						.drawPolygon(voronoi.cellPolygon(delaunay.find(v1.x, v1.y)).map(p => point(p[0], p[1])))
						.endFill()
				}
			}
			const renderHalfEdges = () => {
				for (let i = 0, n = halfedges.length; i < n; ++i) {
					const j = halfedges[i]
					if (j < i) continue
					const ti = ~~(i / 3) * 2
					const tj = ~~(j / 3) * 2
					const xi = circumcenters[ti]
					const yi = circumcenters[ti + 1]
					const xj = circumcenters[tj]
					const yj = circumcenters[tj + 1]
					g.lineStyle(1, 0x93939381)
						.moveTo(xi, yi)
						.lineTo(xj, yj)
				}
			}

			const renderCircumcenters = () => {
				for (let i = 0; i < circumcenters.length; i += 2) {
					let cx = circumcenters[i]
					let cy = circumcenters[i + 1]
					g.beginFill(0x0000bb)
						.drawCircle(cx, cy, 4)
						.endFill()
				}
			}
			const renderTriangulation = () => {
				for (let i = 0; i <= triangles.length; i += 3) {
					const t0 = triangles[i]
					const t1 = triangles[i + 1]
					const t2 = triangles[i + 2]
					const v1 = point(points[t0 * 2], points[t0 * 2 + 1])
					const v2 = point(points[t1 * 2], points[t1 * 2 + 1])
					const v3 = point(points[t2 * 2], points[t2 * 2 + 1])
					g.beginFill(this.getBiomeColor(v1.x, v1.y))
						.drawCircle(v1.x, v1.y, 4)
						.endFill()
					g.beginFill(this.getBiomeColor(v2.x, v2.y))
						.drawCircle(v2.x, v2.y, 4)
						.endFill()
					g.beginFill(this.getBiomeColor(v3.x, v3.y))
						.drawCircle(v3.x, v3.y, 4)
						.endFill()

					g.lineStyle(1, 1)
						.drawPolygon([v1, v2, v3])
						.endFill()
				}
			}
			renderHalfEdges()
			// renderCircumcenters()
			renderCells()
			// renderTriangulation()
			stage.addChild(g)
			renderer.render(stage)
			console.log(elevationHistogram)
			this.histogram = elevationHistogram.entries()
		},
		renderMap() {
			this.clearStage()
			let g = new PIXI.Graphics()
			let points = this.generatePoints(100)
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
			// this.renderDebug(size, points, computedNearestPoints)
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



