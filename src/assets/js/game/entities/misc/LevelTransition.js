import { Game } from '#/Game.js'
import { Entity } from '#/entities/Entity.js'

export default class LevelTransition extends Entity {
    constructor(x, y, id, dir) {
        super(x, y, {
            id: id,
            name: 'path',
            direction: dir,
            description: 'A path leading to a new area!',
            fg: 'brown',
            bg: 'orange',
            blocked: true,
            visible: true
        })
        this.portal = null
    }

    act() {}

    react(actor) {
        Game.log(`You leave the ${Game.currentLevel.name} and go to the ${this.portal}.`, 'information')
        Game.changeLevels(this.portal)
    }
}
