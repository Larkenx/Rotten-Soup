import ROT from 'rot-js'

import { Game, tileset } from '#/Game.js'
import * as PIXI from 'pixi.js'

export function getTilesetCoords(id) {
	let tileWidth = tileset.tilewidth
	let tileHeight = tileset.tileheight
	let cols = tileset.columns
	let rowNumber = Math.floor(id / cols) * tileHeight
	let colNumber = (id % cols) * tileHeight
	return [colNumber, rowNumber]
}

export default class GameDisplay {
	constructor() {
		this.app = new PIXI.Application({ forceCanvas: true, width: 1024, height: 640 })
		this.tileSize = 32
		this.tilesetMapping = {}
		// this.loadAssets()
	}

	renderMap(map) {
		// first, we need to get every sprite for every tile,
		// then add it to the stage at the right spot
		this.spriteMap = []
		for (let y = 0; y < Game.height; y++) {
			this.spriteMap.push([])
			for (let x = 0; x < Game.width; x++) {
				let sprite = new PIXI.Sprite()
				sprite.position.set(x * this.tileSize, y * this.tileSize)
				this.spriteMap[y].push(sprite)
				this.app.stage.addChild(sprite)
			}
		}
	}

	updateMap(map, animate) {
		let camera = {
			// camera x,y resides in the upper left corner
			x: Game.player.x - ~~(Game.width / 2),
			y: Game.player.y - ~~(Game.height / 2),
			width: Math.ceil(Game.width),
			height: Game.height
		}
		let startingPos = [camera.x, camera.y]
		if (camera.x < 0) {
			// far left
			startingPos[0] = 0
		}
		if (camera.x + camera.width > Game.map.width) {
			// far right
			startingPos[0] = Game.map.width - camera.width
		}
		if (camera.y <= 0) {
			// at the top of the map
			startingPos[1] = 0
		}
		if (camera.y + camera.height > Game.map.height) {
			// at the bottom of the map
			startingPos[1] = Game.map.height - camera.height
		}
		Game.camera = {
			x: startingPos[0],
			y: startingPos[1]
		}
		let endingPos = [startingPos[0] + camera.width, startingPos[1] + camera.height]
		let dx = 0
		let dy = 0
		// Clear the last visible tiles that were available to be seen
		Object.assign(Game.map.seen_tiles, Game.map.visible_tiles)
		Game.map.visible_tiles = {}

		// FOV calculations
		let fov = new ROT.FOV.PreciseShadowcasting(function(x, y) {
			return Game.inbounds(x, y) && Game.map.data[y][x].visible()
		})

		fov.compute(Game.player.x, Game.player.y, Game.player.cb.range, function(x, y, r, visibility) {
			Game.map.visible_tiles[x + ',' + y] = true
		})
		console.log(this.spriteMap)
		for (let x = startingPos[0]; x < endingPos[0]; x++) {
			for (let y = startingPos[1]; y < endingPos[1]; y++) {
				let tile = Game.map.data[y][x]
				this.spriteMap[dy++][dx].texture = tile.getTexture(false, false)
			}
			dx++
			dy = 0
		}
	}

	getContainer() {
		return this.app.view
	}

	loadAssets() {
		// destructuring common aliases
		let { renderer, stage, view } = this.app
		// append the canvas to the game container
		// prepare paths for the dungeon walls, floors, and shadows
		const spritesheet = { url: 'static/images/DawnLike/Compiled/compiled_tileset_32x32.png', name: 'spritesheet' }

		PIXI.loader
			.add(spritesheet)
			.on('progress', (l, r) => this.handleAssetLoad(l, r))
			.load(() => {
				document.getElementById('game_container').appendChild(this.getContainer())
				let ids = new Set(Game.loadedIDS.concat(Object.keys(tileset.tileproperties)))
				console.log(ids)
				for (let id of ids) {
					let coords = getTilesetCoords(id)
					let frame = new PIXI.Rectangle(coords[0], coords[1], this.tileSize, this.tileSize)
					let texture = new PIXI.Texture(PIXI.loader.resources['spritesheet'].texture, frame)
					this.tilesetMapping[id] = texture
				}
				let { map } = Game
				for (let y = 0; y < map.height; y++) {
					for (let x = 0; x < map.width; x++) {
						this.handleAssetLoad({ progress: x * y / (map.height * map.width) * 100 }, { name: `${x},${y}` })
						map.data[y][x].createTexturesFromObstacles()
					}
				}
				this.clear()
				this.renderMap(Game.map)
				this.updateMap(false, false)
			})
	}

	handleAssetLoad(loader, resource) {
		let { stage, renderer } = this.app
		this.clear()
		let graphics = new PIXI.Graphics()
		let cx = renderer.width / 2
		let cy = renderer.height / 2
		let barLength = renderer.width / 2
		let text = new PIXI.Text(`Loading ${resource.name}... ${Math.floor(loader.progress)}%`, {
			fill: 0xffffff,
			fontSize: 16,
			fontFamily: ['Source Code Pro', 'Menlo', 'Consolas'],
			x: cx,
			y: cy
		})
		// clear the previous progress bar
		// draw the progress bar outline
		graphics.lineStyle(50, 0x6f6f6f)
		graphics.drawRoundedRect(cx - barLength / 2, cy, barLength, 4)
		// draw the progress bar interior
		let maxInteriorBarLength = barLength - 10
		let currentBarLength = maxInteriorBarLength * (loader.progress / 100)
		graphics.lineStyle(30, 0x04ab34)
		graphics.drawRoundedRect(cx - maxInteriorBarLength / 2, cy, currentBarLength, 4)
		stage.addChild(graphics)
		stage.addChild(text)
	}

	draw(x, y, sprites, fg, bg) {
		// given an array of sprites to render
		const renderSprite = sprite => {
			sprite.position.set(x * this.tileSize, y * this.tileSize)
		}
		for (let s of sprites) renderSprite(s)
	}

	clear() {
		this.app.stage.removeChildren()
	}

	act() {
		Game.engine.lock()
		// this.clear()
		// this.renderMap(Game.map)
		this.updateMap(Game.map, Game.turn % 2)
		Game.engine.unlock()
	}
}
