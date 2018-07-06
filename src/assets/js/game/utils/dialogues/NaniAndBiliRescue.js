import { createActor, createItem } from '#/utils/EntityFactory.js'
import { DialogueEdge, DialogueNode, DialogueGraph, Dialogue } from '#/utils/DialogueGraph.js'
import NPC from '#/entities/actors/NPC.js'
import LevelTransition from '#/entities/misc/LevelTransition.js'
import ROT from 'rot-js'
import DIALOGUES from '#/utils/Dialogues.js'
/* Local re-binding of nodes and edges */
const Node = DialogueNode
const Edge = DialogueEdge
const Graph = DialogueGraph

let graph = new Graph('Nani & Bili')

// introduction
const introduction = new Node({
	text: 'You saved our lives! Thank you so much. Meet us in Mulberry Town!',
	origin: true
})

graph.addVertex(introduction)

// ask about the town
const goodbye = new Edge({
	text: "You're welcome! I'll see you guys there.",
	endsDialogue: true,
	action: g => {
		DIALOGUES.DWARF_BILI.state.finishedSavingFriends = true
		const dwarves = g.findActor(NPC, 5172)
		const levelTransition = g.findActor(LevelTransition, 7906)
		if (dwarves.length !== 2) {
			console.error('could not find bili & nani to move')
		} else if (levelTransition.length !== 1) {
			console.error('could not find portal to mulberry town')
		} else {
			// move both dwarves one at a time towards the level transition until they're off screen, then remove them from
			// the mulberry forest map. Add them to the Mulberry Town map in the tavern
			// let removedSpritesAbove = false
			const moveDwarves = () => {
				const pathfinding = (x, y) => {
					return Game.inbounds(x, y) && !Game.getTile(x, y).blocked()
				}
				let portalToTown = levelTransition[0]
				let pathToExit = new ROT.Path.AStar(portalToTown.x, portalToTown.y, pathfinding)
				const recomputePath = () => {
					pathToExit = new ROT.Path.AStar(portalToTown.x, portalToTown.y, pathfinding)
				}
				let [d1, d2] = dwarves
				// if (!removedSpritesAbove) {
				// 	d1.removeSpriteAbove()
				// 	d2.removeSpriteAbove()
				// 	removedSpritesAbove = true
				// }
				let d1Path = []
				let d2Path = []
				pathToExit.compute(d1.x, d1.y, (x, y) => {
					d1Path.push([x, y])
				})
				pathToExit.compute(d2.x, d2.y, (x, y) => {
					d2Path.push([x, y])
				})
				if (d1Path.length >= 2) {
					let newPos = d1Path[1] // 1 past the current position
					d1.move(newPos[0], newPos[1])
				}

				if (d2Path.length >= 2) {
					let newPos = d2Path[1] // 1 past the current position
					d2.move(newPos[0], newPos[1])
				}

				recomputePath()
				// if either of the dwarves are still in the viewport, recurse and move them further towards the portal,
				// but don't evaluate until 150ms later when their movement animation is finished.
				if (d1.distanceTo(portalToTown) >= 20 || d2.distanceTo(portalToTown) >= 20) {
					setTimeout(moveDwarves, 150)
				} else {
					// if they're both out of the viewport, we can remove the two dwarves from the map
					d1.removeActor()
					d2.removeActor()
					let tiles = Game.getValidPlaceableTilesForMap('Mulberry Town', 5, 11, 19, 16)
					if (tiles.length < 2) {
						console.error('not enough valid tiles at the bar in the mulberry town to move the dwarves!')
					} else {
						let [t1, t2] = tiles
						let nd1 = new NPC(t1.x, t1.y, d1.id)
						let nd2 = new NPC(t2.x, t2.y, d2.id)
						t1.actors.push(nd1)
						t2.actors.push(nd2)
						Game.levels['Mulberry Town'].actors.push(nd1)
						Game.levels['Mulberry Town'].actors.push(nd2)
					}
				}
			}
			moveDwarves()
		}
	}
})

graph.addEdge(introduction, goodbye)
export default new Dialogue(graph)
