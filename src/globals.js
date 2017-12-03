import ROT from "rot-js";
// Entities
import Entity from "./assets/js/game/entities/Entity.js";
import Actor from "./assets/js/game/entities/actors/Actor.js";
import Player from "./assets/js/game/entities/actors/Player.js";
import Goblin from "./assets/js/game/entities/actors/enemies/Goblin.js";
import Orc from "./assets/js/game/entities/actors/enemies/Orc.js";
import Rat from "./assets/js/game/entities/actors/enemies/Rat.js";
// Items
import Item from "./assets/js/game/entities/items/Item.js";
import Weapon from "./assets/js/game/entities/items/weapons/Weapon.js";
import Sword from "./assets/js/game/entities/items/weapons/Sword.js";
// Misc Entities
import Chest from "./assets/js/game/entities/misc/Chest.js";
import Door from "./assets/js/game/entities/misc/Door.js";
import Ladder from "./assets/js/game/entities/misc/Ladder.js";
import Store from "./assets/js/game/entities/misc/Store.js";
// Map
import Tile from "./assets/js/game/map/Tile.js";
import RandomMap from "./assets/js/game/map/RandomMap.js";
import Map from "./assets/js/game/map/Map.js";
// Game objects
import Game from "./assets/js/game/Game.js";
import GameDisplay from "./assets/js/game/GameDisplay.js";

Window.ROT = ROT; // set the node module ROT.js to global

// Setting global entities
Window.Entity = Entity;
Window.Actor = Actor;
Window.Player = Player;
Window.Goblin = Goblin;
Window.Orc = Orc;
Window.Rat = Rat;
Window.Item = Item;
Window.Weapon = Weapon;
Window.Sword = Sword;
Window.Chest = Chest;
Window.Door = Door;
Window.Ladder = Ladder;
Window.Store = Store;
Window.Tile = Tile;
Window.RandomMap = RandomMap;
Window.Map = Map;
Window.Game = Game;
Window.GameDisplay = GameDisplay;
