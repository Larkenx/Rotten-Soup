export default class PlayerController {
	constructor() {}

	act() {
		Game.engine.lock()
		setTimeout(() => {
			Game.engine.unlock()
			let ladder = Game.getNearestLadder()
		})
	}
}
