import { Game } from '#/Game.js'
export default class GameDisplay {
	constructor() {}

	act() {
		Game.engine.lock()
		Game.updateDisplay()
		Game.engine.unlock()
	}
}
