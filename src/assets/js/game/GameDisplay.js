class GameDisplay {
    constructor() {}

    act() {
        Game.engine.lock();
        Game.updateDisplay();
        Game.engine.unlock();
    }
}
