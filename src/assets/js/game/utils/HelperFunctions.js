import ROT from "rot-js";

import HealthPotion from "#/entities/items/potions/HealthPotion.js";
import StrengthPotion from "#/entities/items/potions/StrengthPotion.js";
import ManaPotion from "#/entities/items/potions/ManaPotion.js";
import {createSword} from "#/entities/items/weapons/Sword.js";
import {SteelArrow} from "#/entities/items/weapons/ranged/ammo/Arrow.js";

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is exclusive and the minimum is inclusive
}

export function getNormalRandomInt(min, max) {
    let gaussianRand = () => {
        let rand = 0;
        for (let i = 0; i < 6; i++)
            rand += Math.random();

        return rand / 6
    }
    return Math.floor(min + gaussianRand() * (max - min + 1));
}

export function randomProperty(object) {
    let keys = Object.keys(object);
    return keys[Math.floor(keys.length * Math.random())];
}

export function addPrefix(name) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    if (name !== "you") {
        if (name[0] in vowels)
            return "an " + name;
        else
            return "a " + name;
    } else {
        return name;
    }
}

export let itemTypes = {
    STRENGTH_POTION : "STRENGTH_POTION",
    MANA_POTION : "MANA_POTION",
    HEALTH_POTION : "HEALTH_POTION",
    SWORD : "SWORD",
    STEEL_ARROW : "STEEL_ARROW",
}

export function getItemsFromDropTable(options) {
    if (options.dropTable == undefined ||
        options.minItems == undefined ||
        options.maxItems == undefined ||
        options.x == undefined || options.y == undefined)
        throw "Not enough arguments given. Expected drop table object, min and max number of items to produce, and x,y location";

    let {dropTable, minItems, maxItems, x, y} = options;
    let items = [];
    let roll = getRandomInt(minItems, maxItems);
    for (let i = 0; i < roll; i++) {
        let chosenItem = ROT.RNG.getWeightedValue(dropTable);
        switch (chosenItem) {
            case itemTypes.STRENGTH_POTION:
                items.push(new StrengthPotion(x, y, 969));
                break;
            case itemTypes.HEALTH_POTION:
                items.push(new HealthPotion(x, y, 488));
                break;
            case itemTypes.MANA_POTION:
                items.push(new ManaPotion(x, y, 608));
                break;
            case itemTypes.SWORD:
                items.push(createSword(x, y, 35));
                break;
            case itemTypes.STEEL_ARROW:
                items.push(new SteelArrow(x, y, 784, 5));
                break;
            default:
                console.log("tried to add some item that doesn't exist to an inventroy from drop table");
                console.log(chosenItem);
        }
    }
    // console.log("Generated drop table", items)
    return items;
}
