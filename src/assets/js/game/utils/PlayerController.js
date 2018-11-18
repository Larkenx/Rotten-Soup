import ROT from 'rot-js'
import { Game } from '#/Game.js'
import Chest from '#/entities/misc/Chest.js'

export default class PlayerController {
	constructor() {
		this.turns = 0
	}

	act() {
		Game.engine.lock()
		Game.player.invulnerable = true
		this.turns++
		const pathfinding = (x, y) => {
			if (x <= 0 || x >= Game.map.width || y <= 0 || y >= Game.map.height) return false
			const hasAChest = Game.getTile(x, y).actors.filter(a => a instanceof Chest).length > 0
			return !Game.getTile(x, y).blocked() && !hasAChest
		}
		setTimeout(() => {
			Game.engine.unlock()
			let ladder = Game.getNearestLadder()
			let levelTransition = Game.getNearestLevelTransition()
			if (ladder !== null && ladder.direction !== 'up') {
				let ladderPath = new ROT.Path.AStar(ladder.x, ladder.y, pathfinding)
				let pathToLadder = []
				ladderPath.compute(Game.player.x, Game.player.y, (x, y) => {
					pathToLadder.push([x, y])
				})
				if (pathToLadder.length > 1) {
					let newPos = pathToLadder[1] // 1 past the current position
					Game.player.commandQueue.push({
						fn: () => {
							Game.player.tryMove(newPos[0], newPos[1])
						}
					})
				} else {
					Game.player.commandQueue.push({
						fn: () => Game.player.climb()
					})
				}
			} else if (levelTransition !== null) {
				let levelTransitionPath = new ROT.Path.AStar(levelTransition.x, levelTransition.y, pathfinding)
				let pathToLevelTransition = []
				levelTransitionPath.compute(Game.player.x, Game.player.y, (x, y) => {
					pathToLevelTransition.push([x, y])
				})
				if (pathToLevelTransition.length > 2) {
					console.log(this.turns)
					// stop just before entering the portal!
					let newPos = pathToLevelTransition[1] // 1 past the current position
					Game.player.commandQueue.push({
						fn: () => {
							Game.player.tryMove(newPos[0], newPos[1])
						}
					})
					Game.engine._scheduler.remove(this)
				}
			} else {
				console.log('<<< removing player controller because could not find ladder or portal')
				Game.engine._scheduler.remove(this)
			}
		}, 150)
	}
}
