/**
 * Created by Larken on 6/28/2017.
 */
import * as PIXI from 'pixi.js'
import { Game } from '#/Game.js'
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
	return Game.display.tileset.tileproperties[id + '']
}

export default class Tile {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.actors = []
		this.obstacles = []
	}

	updateTileInfo(id) {
		let obstacle = {}
		if (id in Game.display.tileset.tileproperties) {
			// just means there are no tile properties for this guy
			obstacle = getTileInfo(id)
		}
		obstacle.id = id
		this.obstacles.push(obstacle) // add to the end of the obstacles to be drawn on top
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
		if (this.obstacles.length > 0) return this.obstacles[this.obstacles.length - 1].blocked
		return false
	}

	visible() {
		return !(
			this.obstacles.some(el => {
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
		let obstacles = this.obstacles
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
