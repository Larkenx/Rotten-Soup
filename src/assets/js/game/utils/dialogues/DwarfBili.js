import { createActor, createItem } from '#/utils/EntityFactory.js'
import { DialogueEdge, DialogueNode, DialogueGraph, Dialogue } from '#/utils/DialogueGraph.js'
import { materialTypes } from '#/utils/Constants.js'

import Beer from '#/entities/items/misc/Beer.js'

const addKeyToPlayerInventory = p => {
	p.addToInventory(createItem('KEY', p.x, p.y))
}

const addBessyTheBattleAxeToPlayerInventory = p => {
	let bessy = createItem('BATTLEAXE', p.x, p.y, null, { materialType: materialTypes.STEEL })
	bessy.name = 'Bessy'
	p.addToInventory(bessy)
}

/* Local re-binding of nodes and edges */
const Node = DialogueNode
const Edge = DialogueEdge
const Graph = DialogueGraph

let graph = new Graph('Drunken Dwarf')

let state = {
	startedBeerQuest: true,
	finishedBeerQuest: true,
	acceptedSearchForFriendsQuest: true,
	finishedSavingFriends: true,
	rewardGiven: false
}

/* First interaction */
const introduction = new Node({
	text: '*hic* Nili and Dani, where are you? *hic*',
	origin: true
})

const introduction2 = new Node({
	text: '*hic*...I need another pint. Get me another pint!'
})

const goToNextLine = new Edge({
	text: 'Uh...',
	node: introduction2
})

graph.addVertex(introduction)
graph.addVertex(introduction2)
graph.addEdge(introduction, goToNextLine)

const grumpyEnding = new Node({
	text: "I don't like you...leave me be! *hic*"
})

const startBeerQuest = new Node({
	text: "What're you waitin' for? I 'avent got all day."
})

const youHaveHadEnoughToDrink = new Edge({
	text: "I think you've had enough to drink!",
	node: grumpyEnding
})

const buyAnotherDrink = new Edge({
	text: "Okay, I'll buy you a beer.",
	node: startBeerQuest,
	action: g => {
		state.startedBeerQuest = true
	}
})

const grumpyEndingWalkAway = new Edge({
	text: 'Fine.',
	endsDialogue: true
})

const beRightBackWithYourBeer = new Edge({
	text: 'Okay!',
	endsDialogue: true
})

graph.addVertex(grumpyEnding)
graph.addVertex(startBeerQuest)
graph.addEdge(introduction2, youHaveHadEnoughToDrink)
graph.addEdge(introduction2, buyAnotherDrink)
graph.addEdge(grumpyEnding, grumpyEndingWalkAway)
graph.addEdge(startBeerQuest, beRightBackWithYourBeer)

/* Finishing the Beer Quest graph nodes/edges */
const gotTheBeerYet = new Node({
	text: 'You again. Have ye got my beer?'
})

const noBeerYet = new Edge({
	text: 'Not yet.',
	endsDialogue: true
})

const thankYouKindly = new Node({
	text: 'Thank you kindly...I was just starting to sober up *hic*.'
})

const giveBeer = new Edge({
	text: "Yes, here's your beer. [Give Beer]",
	action: g => {
		g.player.removeItemType(Beer)
		state.finishedBeerQuest = true
	},
	node: thankYouKindly
})

graph.addVertex(gotTheBeerYet)
graph.addVertex(thankYouKindly)
graph.addEdge(gotTheBeerYet, giveBeer)
graph.addEdge(gotTheBeerYet, noBeerYet)

/* After giving the dwarf the beer */

const thankForHelping = new Node({
	text: "Thank you...*hic*...there is a building deep in the woods. I think they've set up camp there."
})

const myFriendsWereCaptured = new Node({
	text:
		"Well, me, Nani, and Bili were on our way travelling throught the forest to Mulberry Town late in the evenin'. We were attacked by a group of orcs and goblins. We split up in the forest, but I 'aven't seen either of'em since. I ran off like a coward."
})
const youAreWelcome = new Edge({
	text: "You're welcome. What's wrong?",
	node: myFriendsWereCaptured
})

const goLookForFriends = new Edge({
	text: "Alright, I'll see what I can do.",
	node: thankForHelping,
	endsDialogue: true
})

const sorryCantLook = new Edge({
	text: "Sorry, I can't help your friends right now. Goodbye.",
	endsDialogue: true
})

const offerToSearchForFriends = new Edge({
	text: 'I can help find your friends.',
	node: thankForHelping,
	action: g => {
		state.acceptedSearchForFriendsQuest = true
	}
})

const helpMyFriends = new Node({
	text: "You're back. Will you help look for my friends?"
})

graph.addVertex(myFriendsWereCaptured)
graph.addVertex(thankForHelping)
graph.addVertex(helpMyFriends)
graph.addEdge(helpMyFriends, offerToSearchForFriends)
graph.addEdge(helpMyFriends, sorryCantLook)
graph.addEdge(thankForHelping, goLookForFriends)
graph.addEdge(thankYouKindly, youAreWelcome)
graph.addEdge(myFriendsWereCaptured, offerToSearchForFriends)
graph.addEdge(myFriendsWereCaptured, sorryCantLook)

/* Ending the search for friends quest */
const didYouFindThem = new Node({
	text: "Oh you're back! Have you found Nani and Bili?"
})

const stillLooking = new Edge({
	text: "I'm still looking.",
	endsDialogue: true
})

graph.addVertex(didYouFindThem)
graph.addEdge(didYouFindThem, stillLooking)

/* After you finish the quest */
const youFoundThem = new Node({
	text: 'You found Nani and Bili! Thank you so much. We will raise a pint to you tonight!'
})

const reward = new Node({
	text:
		"Nani and Bili wanted me to give you this for your help. It was their best mate's battle axe. May it serve you well in your endeavors to smash skulls of orcs and goblins."
})

const itWasNothing = new Edge({
	text: "You're welcome.",
	node: reward
})

const thanks = new Edge({
	text: "Thanks. I'll be sure to put it to good use.",
	action: g => {
		state.rewardGiven = true
		addBessyTheBattleAxeToPlayerInventory(g.player)
	},
	endsDialogue: true
})

graph.addVertex(youFoundThem)
graph.addEdge(youFoundThem, itWasNothing)
graph.addVertex(reward)
graph.addEdge(reward, thanks)

/*  Talking after receiving reward*/
const helloAgain = new Node({
	text: "'Oi mate. We are drinking to your bravery! Cheers!"
})

const cheers = new Edge({
	text: 'Cheers!',
	endsDialogue: true
})

graph.addVertex(helloAgain)
graph.addEdge(helloAgain, cheers)

let init = (game, dialogue) => {
	let { state } = dialogue
	let { startedBeerQuest, finishedBeerQuest, acceptedSearchForFriendsQuest, finishedSavingFriends, rewardGiven } = state
	if (finishedSavingFriends && !rewardGiven) {
		dialogue.currentNode = youFoundThem
	} else if (rewardGiven) {
		dialogue.currentNode = helloAgain
	} else if (startedBeerQuest && !finishedBeerQuest) {
		giveBeer.disabled = !game.player.hasItem(Beer)
		dialogue.currentNode = gotTheBeerYet
	} else if (finishedBeerQuest && !acceptedSearchForFriendsQuest) {
		dialogue.currentNode = helpMyFriends // returning point if you said you couldn't help his friends
	} else if (acceptedSearchForFriendsQuest) {
		dialogue.currentNode = didYouFindThem
	} else {
		dialogue.initializeOrigin()
	}
}

export default new Dialogue(graph, state, init)
