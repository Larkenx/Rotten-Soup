import { Game } from '#/Game.js'

describe('game init function', () => {
	it('loads the game', () => {
		Game.init()
		let greeting = 'Welcome to Rotten Soup!'
		Game.log(greeting, 'information')
		expect(Game.messageHistory[0]).toEqual(greeting)
	})
})

