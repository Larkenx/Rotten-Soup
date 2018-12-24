import * as PIXI from 'pixi.js'

export default function loadResources(callbacks) {
	/* Images & Texture Atlas */
	const spritesheet = {
		url: 'images/compiled_tileset_32x32.png',
		name: 'spritesheet'
	}
	const textureAtlas = {
		url: 'tileset/compiled_dawnlike.json',
		name: 'textureAtlas'
	}
	/* Maps */
	const mulberryTown = {
		url: 'maps/mulberryTown.json',
		name: 'mulberryTown'
	}

	const mulberryForest = {
		url: 'maps/mulberryForest.json',
		name: 'mulberryForest'
	}

	const mulberryGraveyard = {
		url: 'maps/mulberryGraveyard.json',
		name: 'mulberryGraveyard'
	}

	const lichLair = {
		url: 'maps/lichLair.json',
		name: 'lichLair'
	}

	const lootGoblinLair = {
		url: 'maps/lootGoblinLair.json',
		name: 'lootGoblinLair'
	}

	const prefabs = []
	for (let i = 1; i <= 35; i++) {
		prefabs.push({
			name: `ruins-${i}`,
			url: `maps/prefabs/ruins-${i}.json`
		})
	}
	PIXI.loader.reset()
	PIXI.loader
		.add(spritesheet)
		.add(textureAtlas)
		.add(mulberryTown)
		.add(mulberryForest)
		.add(mulberryGraveyard)
		.add(lichLair)
		.add(lootGoblinLair)
		.add(prefabs)
		.load((loader, resources) => {
			for (let cb of callbacks) cb(resources)
		})
}
