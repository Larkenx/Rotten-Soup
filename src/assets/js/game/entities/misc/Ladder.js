/**
 * Created by Larken on 6/22/2017.
 */
import Entity from '@/assets/js/game/entities/Entity.js'


export default class Ladder extends Entity {
    constructor(x, y, id, dir) {
        super(x, y, {
            id: id,
            name: "ladder",
            direction: dir,
            description: "A ladder leading " + dir,
            fg: "brown",
            bg: "black",
            blocked: false,
            visible: true
        });
    }

    act() {
    }
}
