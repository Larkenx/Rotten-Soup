import { createActor, createItem } from '#/utils/EntityFactory.js'

const addKeyToPlayerInventory = p => {
	p.addToInventory(createItem('KEY', p.x, p.y))
}

export default {
	MAYOR_LEONARD: {
		title: 'Mayor Leonard',
		text: 'You must be the adventurer we sent for! Take this key and clear out anything you find down there!',
		choices: [
			{
				text: 'Sure!',
				result: game => {
					addKeyToPlayerInventory(game.player)
					game.log('You received a key from Mayor Leonard.', 'lightblue')
					game.overlayData.visible = false
				}
			},
			{
				text: 'Ok.',
				result: game => {
					addKeyToPlayerInventory(game.player)
					game.log('You received a key from Mayor Leonard.', 'lightblue')
					game.overlayData.visible = false
				}
			}
		],
		selectedChoice: 0
	}
}
