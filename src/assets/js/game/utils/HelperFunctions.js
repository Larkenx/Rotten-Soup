export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is exclusive and the minimum is inclusive
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

    let items = [];
    let roll = getRandomInt(1, 3);
    for (let i = 0; i < roll; i++) {
        let chosenItem = ROT.RNG.getWeightedValue(dropTable);
        switch (chosenItem) {
            case itemTypes.STRENGTH_POTION:
                this.addToInventory(new StrengthPotion(this.x, this.y, 969));
                break;
            case itemTypes.HEALTH_POTION:
                this.addToInventory(new HealthPotion(this.x, this.y, 488));
                break;
            case itemTypes.MANA_POTION:
                this.addTo
            case itemTypes.SWORD:
                this.addToInventory(createSword(this.x, this.y, 35));
                break;
            case itemTypes.STEEL_ARROW:
                this.addToInventory(new SteelArrow(this.x, this.y, 784, 5));
                break;
            default:
                console.log("tried to add some item that doesn't exist to an inventroy from drop table");
                console.log(chosenItem);
        }
    }
    return items;
}
let dropTable = {
    "STRENGTH_POTION": 1,
    "HEALTH_POTION": 1,
    "STEEL_ARROW": 2,
    "SWORD": 1
}
