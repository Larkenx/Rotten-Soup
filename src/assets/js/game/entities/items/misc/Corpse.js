import Item from "#/entities/items/Item.js";
import {Game} from "#/Game.js";
// import Skeleton from "#/entities/actors/enemies/Skeleton.js";
// import Zombie from "#/entities/actors/enemies/Zombie.js";

export const corpseTypes = {
    SKELETON : 5489,
    HUMANOID : 2280,
};

export class Corpse extends Item {

    constructor(x, y, name, id) {
        super(x, y, { id, type: `${name.capitalize()} Corpse`});
    }

    hoverInfo() {
        return '';
    }

}
