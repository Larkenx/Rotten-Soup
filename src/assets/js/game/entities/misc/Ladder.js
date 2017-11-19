/**
 * Created by Larken on 6/22/2017.
 */
import {Game} from '#/Game.js'
import {Entity} from '#/entities/Entity.js'

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
        this.portal = null;
    }

    act() {

    }

    react(actor) {
        let levelName = Game.currentLevel.replace(/[0-9]/g, "");
        let levelNumber = parseInt(Game.currentLevel.replace(/[^0-9]/g, ""));
        if (this.options.direction === "down") {
            Game.log("You climb down the ladder...", "player_move");
            switch(levelName) {
                case "overworld":
                    Game.changeLevels('dungeon1', this.options.direction);
                    break;
                case "dungeon": // dungeon level numbers increase as you go deeper
                    Game.changeLevels('dungeon' + (levelNumber+1), this.options.direction == "down" ? "up" : "down");
                    break;
                default: // default numbers decrease as you go down (think towers)
                    if (levelNumber === 1) Game.changeLevels("overworld", this.options.direction);
                    else Game.changeLevels(levelName + (levelNumber-1), this.options.direction);
                    break;
            }
        } else {
            Game.log("You climb up the ladder...", "player_move");
            switch(levelName) {
                case "overworld":
                    Game.changeLevels(this.portal, this.options.direction == "down" ? "up" : "down");
                    break;
                case "dungeon":
                    if (levelNumber === 1) Game.changeLevels('overworld', this.options.direction);
                    else Game.changeLevels('dungeon' + (levelNumber-1), this.options.direction);
                    break;
                default:
                    Game.changeLevels(levelName + (levelNumber+1), this.options.direction == "down" ? "up" : "down");
                    break;
            }
        }
    }
}
