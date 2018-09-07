/**
 * Created by Larken on 6/22/2017.
 */
class Ladder extends Entity {
    constructor(x, y, symbol, dir) {
        super(x, y, {
            name: "ladder",
            direction: dir,
            description: "A ladder leading " + dir,
            symbol: symbol,
            fg: "brown",
            bg: "black",
            blocked: false,
            visible: true
        });
    }

    act() {
    }
}
