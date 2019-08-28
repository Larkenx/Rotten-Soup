import { Game } from '#/Game.js'
import Scroll from './Scroll'
import { bfs, key, unkey } from '../../../utils/HelperFunctions'

export default class MapRevealingScroll extends Scroll {
	constructor(x, y, id) {
		super(x, y, {
			id: id,
			type: 'Map Revealing Scroll'
		})
	}

	use() {
		super.use()
		Game.log(
			`You read the scroll. You immediately become aware of your surroundings and have an increased sense of direction.`,
			'defend'
		)
		// From the player position, expand out with a BFS ripple, revealing (and animating) the reveal as we go
		let allReachablePositions = [...bfs(Game.player.x, Game.player.y, Game.map)]
		Game.closeGameOverlayScreen()
		Game.player.removeFromInventory(this)
		for (let [index, tile] of Object.entries(allReachablePositions)) {
			setTimeout(() => {
				Game.map.seen_tiles[tile] = true
				Game.display.updateFOV()
				Game.drawMiniMap()
			}, 5 * index)
		}
	}

	hoverInfo() {
		return [
			{
				attribute: 'Effect',
				value: `Reveals the entire dungeon map floor.`
			}
		]
	}
}
