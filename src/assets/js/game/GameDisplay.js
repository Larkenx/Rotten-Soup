import {Game} from '@/assets/js/game/Game.js'
export default class GameDisplay {
    constructor() {
    }

    act() {
        Game.engine.lock();
        Game.updateDisplay();
        Game.engine.unlock();
    }
}
