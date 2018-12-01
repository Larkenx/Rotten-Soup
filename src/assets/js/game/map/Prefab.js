export const prefabs = []

export function generatePrefabs(resources) {
	for (let resourceId in resources) {
		let resource = resources[resourceId].data
		if (resource && resource.properties && resource.properties.type === 'prefab') prefabs.push(new Prefab(resource))
	}
	let prefabHistogram = {}
	prefabs.forEach(
		p =>
			`${p.width},${p.height}` in prefabHistogram
				? prefabHistogram[`${p.width},${p.height}`]++
				: (prefabHistogram[`${p.width},${p.height}`] = 1)
	)
	// console.table(prefabHistogram)
}

export class Prefab {
	constructor(json) {
		const { width, height, layers, properties } = json
		const { name, walls, doorFloorReplacementId } = properties
		this.json = json
		this.name = name
		this.walls = walls
		this.doorFloorReplacementId = doorFloorReplacementId
		this.width = width
		this.height = height
		this.data = []
		for (let i = 0; i < this.height; i++) {
			this.data.push([])
			for (let j = 0; j < this.width; j++) {
				let layerIds = layers
					.filter(layer => layer.type === 'tilelayer' && (!layer.properties || !layer.properties.disabled))
					.map(layer => {
						return layer.data[i * this.width + j] - 1
					})
				this.data[i].push(layerIds.filter(n => n > 0))
			}
		}
	}
}
