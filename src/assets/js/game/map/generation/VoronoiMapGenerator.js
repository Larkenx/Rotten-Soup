import * as PIXI from 'pixi.js'
import SimplexNoise from 'simplex-noise'
import Poisson from 'poisson-disk-sampling'
import RNG from 'prng-parkmiller-js'
import { Delaunay } from 'd3-delaunay'
const { max, pow, sqrt, abs } = Math

export const BIOMES = {
	OCEAN: 'OCEAN',
	BEACH: 'BEACH',
	SCORCHED: 'SCORCHED',
	BARE: 'BARE',
	TUNDRA: 'TUNDRA',
	SNOW: 'SNOW',
	TEMPERATE_DESERT: 'TEMPERATE_DESERT',
	SHRUBLAND: 'SHRUBLAND',
	TAIGA: 'TAIGA',
	GRASSLAND: 'GRASSLAND',
	TEMPERATE_DECIDUOUS_FOREST: 'TEMPERATE_DECIDUOUS_FOREST',
	TEMPERATE_RAIN_FOREST: 'TEMPERATE_RAIN_FOREST',
	SUBTROPICAL_DESERT: 'SUBTROPICAL_DESERT',
	TROPICAL_SEASONAL_FOREST: 'TROPICAL_SEASONAL_FOREST',
	TROPICAL_RAIN_FOREST: 'TROPICAL_RAIN_FOREST'
}

export const BIOME_COLORS = {
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

// 908234
// 908234
// ab39dca

export class VoronoiMapGenerator {
	constructor() {}

	/* Returns d3 voronoi object */
	generate(width, height, zoom, distanceBetweenCells, islands, seed, distanceFunction) {
		this.width = width
		this.height = height
		this.zoom = zoom
		this.distanceBetweenCells = distanceBetweenCells
		this.islands = islands
		this.gen1 = new SimplexNoise(seed.toString())
		this.gen2 = new SimplexNoise(seed.toString())
		this.distanceFunction = distanceFunction.toLowerCase()
		const randomPoints = new Poisson(
			[this.width, this.height],
			this.distanceBetweenCells,
			this.distanceBetweenCells,
			10
		).fill()
		let voronoi = null
		try {
			voronoi = Delaunay.from(randomPoints).voronoi([0, 0, this.width, this.height])
		} catch (exception) {
			console.warn('Generated random points cannnot be triangulated...Retrying generation.')
			// throw exception
			return this.generate(this.width, this.height, this.distanceBetweenCells)
		}
		return voronoi
	}

	/* Returns data object of cells & half edges / circumcenters from d3-voronoi object */
	export(voronoi) {
		const { delaunay, circumcenters } = voronoi
		const { triangles, points, halfedges } = delaunay
		const cells = []
		for (let i = 0; i <= triangles.length; i++) {
			const triangle = triangles[i]
			const center = { x: points[triangle * 2], y: points[triangle * 2 + 1] }
			const elevation = this.getElevation(center.x, center.y)
			const moisture = this.getMoisture(center.x, center.y)
			const biome = this.getBiome(elevation, moisture)
			const color = this.getBiomeColor(biome)
			const polygonVertices = voronoi
				.cellPolygon(delaunay.find(center.x, center.y))
				.map(p => ({ x: p[0], y: p[1] }))
			cells.push({ center, elevation, moisture, biome, color, polygonVertices })
		}
		return { cells, halfedges, circumcenters }
	}

	getElevation(x, y) {
		let nx = x / this.width - 0.5,
			ny = y / this.height - 0.5
		let e = this.gen1.noise2D(this.zoom * nx, this.zoom * ny) / 2 + 0.5
		let flatElevationIncrease = 0.0
		let b = 1.0
		let c = 2.0
		if (this.islands) {
			let d = 2 * sqrt(nx * nx + ny * ny) // adjusting based on distance from the center of the map
			if (this.distanceFunction === 'manhattan') d = 2 * Math.max(Math.abs(nx), Math.abs(ny))

			e = (e + flatElevationIncrease) * (b - pow(d, c))
		}
		return max(e, 0)
	}

	getMoisture(x, y) {
		const noise = (nx, ny) => {
			return this.gen2.noise2D(this.zoom * nx, this.zoom * ny) / 2 + 0.5
		}
		let nx = x / this.width - 0.5,
			ny = y / this.height - 0.5
		let m =
			1.0 * noise(1 * nx, 1 * ny) +
			0.75 * noise(2 * nx, 2 * ny) +
			0.33 * noise(4 * nx, 4 * ny) +
			0.33 * noise(8 * nx, 8 * ny) +
			0.33 * noise(16 * nx, 16 * ny) +
			0.5 * noise(32 * nx, 32 * ny)
		m /= 1.0 + 0.75 + 0.33 + 0.33 + 0.33 + 0.5
		return m
	}

	getBiome(e, m) {
		if (e < 0.1) return BIOMES.OCEAN
		if (e < 0.12) return BIOMES.BEACH

		if (e > 0.8) {
			if (m < 0.1) return BIOMES.SCORCHED
			if (m < 0.2) return BIOMES.BARE
			if (m < 0.5) return BIOMES.TUNDRA
			return BIOMES.SNOW
		}

		if (e > 0.6) {
			if (m < 0.33) return BIOMES.TEMPERATE_DESERT
			if (m < 0.66) return BIOMES.SHRUBLAND
			return BIOMES.TAIGA
		}

		if (e > 0.3) {
			if (m < 0.16) return BIOMES.TEMPERATE_DESERT
			if (m < 0.5) return BIOMES.GRASSLAND
			if (m < 0.83) return BIOMES.TEMPERATE_DECIDUOUS_FOREST
			return BIOMES.TEMPERATE_RAIN_FOREST
		}

		if (m < 0.16) return BIOMES.SUBTROPICAL_DESERT
		if (m < 0.33) return BIOMES.GRASSLAND
		if (m < 0.66) return BIOMES.TROPICAL_SEASONAL_FOREST
		return BIOMES.TROPICAL_RAIN_FOREST
	}

	getBiomeColor(biome) {
		return BIOME_COLORS[biome]
	}
}

export class VoronoiMapVisualizer {
	constructor(width, height) {
		this.width = width
		this.height = height
		this.renderer = PIXI.autoDetectRenderer({
			width,
			height,
			antialias: true,
			backgroundColor: 0x474747
		})
		console.log(this.renderer)
		this.stage = new PIXI.Container()
	}

	destroy() {
		this.renderer.destroy()
	}

	mountCanvas() {
		document.getElementById('pixi_canvas').innerHTML = ''
		document.getElementById('pixi_canvas').appendChild(this.renderer.view)
	}

	clearStage(stage) {
		for (let i = stage.children.length - 1; i >= 0; i--) {
			stage.removeChild(stage.children[i])
		}
	}

	render(data, options) {
		this.clearStage(this.stage)
		const { circumcenters, halfedges, cells } = data
		let g = new PIXI.Graphics()
		for (const { center, elevation, moisture, biome, color, polygonVertices } of data.cells) {
			g.beginFill(color)
				.drawPolygon(polygonVertices.map(p => new PIXI.Point(p.x, p.y)))
				.endFill()
		}

		if (options.showEdges) {
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

		this.stage.addChild(g)
		this.renderer.render(this.stage)
	}
}
