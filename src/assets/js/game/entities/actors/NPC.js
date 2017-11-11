/**
 * Created by larken on 7/12/17.
 */

import Actor from '@/assets/js/game/entities/actors/Actor.js'

export default class NPC extends Actor {
    constructor(x,y,id) {
        super(x,y,{
            id: id,
            visible: true,
            blocked: true,
            combat : {
                hostile: false
            }
        });
    }
}
