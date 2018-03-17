/**
 * Created by Larken on 6/22/2017.
 */
class Sword extends Weapon {
    constructor(x, y, sides, name) {
        super(x, y, {
            name: name,
            symbol: String.fromCharCode(11264),
            type: "Sword",
            fg: 'orange',
            combat: {
                rolls: getRandomInt(1,3),
                sides: sides,
            }
        });
    }
}

let swordNames = ["Caledfwlch", "Hywelbane", "Brightkiller", "Excalibur", "Joyeux", "Dyrnwyn", "Johnny Corkscrew", "The Sword of Leah", "The Sword of Shannara", "The Vorpal Sword", "Seraph Blade", "Glorious", "Cortana", "Heosphorous", "Phaesphoros", "Maellartach", "The Rivan Sword", "The Sword of Shadows", "Sikanda", "Dragnipur", "Chance", "Vengeance", "Grief", "The Swords of Night and Day", "The Swords of Blood and Fire", "Snaga", "The Sword of Truth", "The Lady Vivamus", "Sword of Martin", "Verminfate", "Rapscallion sword", "Callandor", "Heron Mark Sword", "Graywand", "Scalpel", "Rhindon", "Blackfyre", "Brightroar", "Dark Siste", "Dawn", "Hearteater", "Heartsbane", "Widow's Wail", "Ice", "Lady Forlorn", "Longclaw", "Red Rain", "Albitr", "Needle", "The Black Blade", "Mournblade", "Oathkeeper", "Naegling", "Arvindr", "Ravenbrand", "Zar'roc", "Lion's Tooth", "Doomgiver", "Kanajana", "Támerlein", "Shieldbreaker", "Woundhealer", "Narsil", "Lightbringer", "Soulcutter", "Sightblinder", "Wayfinder", "Orcrist", "Stonecutter", "Townsaver", "The Sword of Gryffindor", "Farslayer", "Mindsword", "Dragonslicer", "Katopris", "Backbiter", "Undbitr", "Brisingr", "Barrow-blade", "Coinspinner", "Lhang", "Traitor", "Anglachel", "Hadhafang", "Vrangr", "The Darksword", "The Lightsword", "Herugrim", "Anaklusmos", "Gúthwinë", "Terminus Est", "Memory", "Khazid'hea", "Clamorer", "Backbiter", "Thorn", "Charon's Claw", "Twinkle", "Godsbane", "Icingdeath", "Hrunting", "Naegling", "The Sword of the Dawn", "Hill Cleaver", "Werewindle", "Kijin-marukuni-shige", "Balaraw", "Keyblade", "Hina", "Tessaiga", "Sorrow", "Singing Sword", "Sword of Chaos", "The Starsword", "Biggoron Sword", "Grayswandir", "Rain Dragon", "Shisui", "Gurthang", "Aranrúth", "Nightfall", "Sting"];

function createSword(x, y) {
    return new Sword(x, y, getRandomInt(2, 5), swordNames[getRandomInt(0, swordNames.length - 1)]);
}