import {Game} from '#/Game.js'

/*
    An effect is exclusively carried out to manipulate an Entity in some way (typically an actor, but we might carry
    it out against other entities like weapons (e.g. imbue a sword with fire damage for 5 turns)). We can divide up effects
    in different types of effects:
    - Effects that are immediate versus Effects that exist over multiple turns/ticks in the game.
        ~ examples include a health potion that restores HP immediately vs a strength potion which might increase str for 5 turns
*/
export default class Effect {
    constructor() {

    }
}
