/**
 * Created by Larken on 6/22/2017.
 */
import {Game} from '#/Game.js'
import SimpleEnemy from '#/entities/actors/enemies/SimpleEnemy.js'

export default class Rat extends SimpleEnemy {
    constructor(x, y, id) {
        super(x, y, {
            id: id,
            name: "rat",
            description: "A fat rat!",
            symbol: "r",
            fg: "grey",
            bg: "seagreen",
            visible: true,
            blocked: true,
            chasing: false,
            combat: {
                /* options.combat, dedicated to all things related to combat */
                description: [" attacked "],
                /* max stats */
                maxhp: 3,
                maxmana: 0,
                /* current stats */
                hp: 2,
                mana: 0,
                str: 6,
                def: 0,
                /* misc */
                hostile: true,
                range: 5,
                invulnerable: false,
            }
        });
    }
}
