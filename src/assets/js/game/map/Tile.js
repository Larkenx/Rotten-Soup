/**
 * Created by Larken on 6/28/2017.
 */
import * as PIXI from 'pixi.js'
import { tileset, Game } from '#/Game.js'
import Player from '#/entities/actors/Player.js'
export function getTileInfo(id) {
	/*
     "FOV": boolean,
     "FOV_id": int,
     "animated": boolean,
     "animated_id": int,
     "bg": color,
     "blocked":boolean,
     "blocks_vision": boolean,
     "entity": boolean,
     */
	// console.log(tileset.tileproperties[id]);
	return tileset.tileproperties[id + '']
}

export default class Tile {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.actors = []
		this.obstacles = []
		this.animatedObstacles = []
		this.animatedSprites = []
		this.textures = {}
	}

	createTexturesFromObstacles() {
		let texture = new PIXI.Container()
		const getTexture = id => {
			return Game.display.tilesetMapping[id]
		}

		for (let obstacle of this.obstacles) {
			let sprite = new PIXI.Sprite(getTexture(obstacle.id))
			texture.addChild(sprite)
		}

		let { renderer } = Game.display.app
		this.texture = renderer.generateTexture(texture)
		this.animatedSprites = this.animatedObstacles.map(o => {
			let { id, animated_id } = o
			let sprite = new PIXI.extras.AnimatedSprite([getTexture(id), getTexture(animated_id)])
			sprite.animationSpeed = 0.01
			return sprite
		})

		for (let a of this.actors) {
			let { animated_id } = getTileInfo(a.id)
			let sprite = new PIXI.extras.AnimatedSprite([getTexture(a.id), getTexture(animated_id)])
			sprite.animationSpeed = 0.01
			this.animatedSprites.push(sprite)
		}
	}

	updateTileInfo(id) {
		let obstacle = {}
		if (id in tileset.tileproperties) {
			// just means there are no tile properties for this guy
			obstacle = getTileInfo(id)
		}
		obstacle.id = id
		if (obstacle.animated === true) this.animatedObstacles.push(obstacle)
		else this.obstacles.push(obstacle) // add to the end of the obstacles to be drawn on top
	}

	/* Indicates whether or not a tile is blocked; however, this excludes the player for AI purposes. */
	blocked() {
		// TODO: fix it so that this actually fires off properly without blocking enemies from moving
		/*
        for (let actor of this.actors) {
            if (actor.blocked)
                return true;
        }
        */
		let obstacles = [...this.obstacles, ...this.animatedObstacles]
		if (obstacles.length > 0) return obstacles[obstacles.length - 1].blocked
		return false
	}

	visible() {
		return !(
			[...this.obstacles, this.animatedObstacles].some(el => {
				return el.blocks_vision
			}) ||
			this.actors.some(el => {
				return !el.visible
			})
		)
	}

	removeActor(a) {
		let idx = this.actors.findIndex(actor => {
			return Object.is(a, actor)
		})
		this.actors.splice(idx, 1)
	}

	bg() {
		let obstacles = [...this.obstacles, this.animatedObstacles]
		if (
			!obstacles.some(e => {
				return 'bg' in e
			})
		) {
			return 'black'
		} else {
			for (let i = obstacles.length - 1; i >= 0; i--) {
				let obs = obstacles[i]
				if ('bg' in obs) return obs.bg
			}
		}
	}
}
