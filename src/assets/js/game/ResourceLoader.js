import * as PIXI from 'pixi.js'

export default function loadResources(callbacks) {
	/* Images & Texture Atlas */
	const spritesheet = {
		url: 'static/images/compiled_tileset_32x32.png',
		name: 'spritesheet'
	}
	const textureAtlas = {
		url: 'static/compiled_dawnlike.json',
		name: 'textureAtlas'
	}
	/* Maps */
	const mulberryTown = {
		url: 'static/maps/mulberryTown.json',
		name: 'mulberryTown'
	}

	const mulberryForest = {
		url: 'static/maps/mulberryForest.json',
		name: 'mulberryForest'
	}

	const mulberryGraveyard = {
		url: 'static/maps/mulberryGraveyard.json',
		name: 'mulberryGraveyard'
	}

	const lichLair = {
		url: 'static/maps/lichLair.json',
		name: 'lichLair'
	}

	const prefabs = []
	for (let i = 1; i <= 5; i++) {
		prefabs.push({
			name: `ruins-${i}`,
			url: `static/maps/prefabs/ruins-${i}.json`
		})
	}

	PIXI.loader
		.add(spritesheet)
		.add(textureAtlas)
		.add(mulberryTown)
		.add(mulberryForest)
		.add(mulberryGraveyard)
		.add(lichLair)
		.add(prefabs)
		.load((loader, resources) => {
			for (let cb of callbacks) cb(resources)
		})
}
