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
		for (let y = 0; y < map.height; y++) {
			for (let x = 0; x < map.width; x++) {
				let { sprite } = map.data[y][x]
				sprite.position.set(x * this.tileSize, y * this.tileSize)
				map.data[y][x].setTexture(Game.turn % 2, !map.revealed && !(`${x},${y}` in map.visible_tiles))
				this.app.stage.addChild(sprite)
			}
		}
		// this.app.renderer.render(this.app.stage)
	}

	updateMap(map, animate) {
		for (let y = 0; y < map.height; y++) {
			for (let x = 0; x < map.width; x++) {
				map.data[y][x].setTexture(animate, map.revealed || `${x},${y}` in this.map.visible_tiles)
			}
		}

		this.app.renderer.render(this.app.stage)
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
		this.clear()
		// this.renderMap(Game.map)
		this.updateMap(Game.map, Game.turn % 2)
		Game.engine.unlock()
	}
}
