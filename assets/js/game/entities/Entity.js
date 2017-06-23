/**
 * Created by Larken on 6/22/2017.
 */
/* Entities are in-game objects that exist in the map. They have symbols,
 * foregrounds, backgrounds, descriptions, names, visibility, and blocked properties. */
class Entity {
    constructor(x, y, options) {
        this.x = x;
        this.y = y;
        this.options = options;
    }

    examine() {
        return this.options.description;
    }

    name() {
        return this.options.name;
    }
}