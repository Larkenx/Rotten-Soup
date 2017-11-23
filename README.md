# Rotten Soup
![screenshot](static/images/screen.gif)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

Rotten Soup is roguelike written in JavaScript with [rot.js](http://ondras.github.io/rot.js/hp/). I used [Vue.js](https://vuejs.org/) and [Vuetify](https://vuetifyjs.com/) to build the UI. Throughout the summer I'll continue to release as much content as I can and see where it goes. Special thanks to DragonDePlatino and DawnBringer who created the free tileset, Dawnlike, that I use for Rotten Soup.

# Controls
*You can find all of the controls in-game by pressing `?` or clicking the help icon in the upper right*

- Movement is 8-directional using either the numpad or vim keys. You may also use the arrow-keys for 4-directional movement.
```
         y k u   7  8  9
         \ | /    \ | /
         h-+-l    4-5-6
         / | \    / | \
         b j n    1 2 3
         vi-keys   numpad
```
* To fight an enemy with your fists or melee weapon, move into a tile where they are standing.
* You can move up and down ladders using `>` (down) and `<` (up).
* You can rest for a turn with `.` or `5` on the numpad.
* You can pick up items with `,` or `g`. If there are multiple items on the ground, all of the items are picked up at once.
* To equip or use an item, `click` on the item in your inventory. You can hover over it to see
what it does or what stats are associated with it.
* To drop an item, hold `shift` and `click` the item you want to drop. (If you drop an item, you can still pick it up again).
* If you have a ranged weapon and proper ammunition equipped, press `f` to fire your ranged weapon. You will enter into a targeting mode where you may choose which direction to fire. Select the direction you want to fire in using the movement keys. To cancel firing your ranged weapon, press `escape` or `f` again.

# Current Features
* Field of view / Fog of war
* Minimap, revealed as you explore in maps where the map is hidden (dungeons)
* Static overworld map
* Randomly generated dungeons
* Transitions between overworld and dungeons with persistent maps
* Inventory System
* Items
    - Swords
    - Health and Strength Potions
* Simple AI for Goblins, Rats, Orcs, and Empowered Orcs
* Graphical tiles

# Future Goals
* Skills
* Distinct Regions of Overworld map
* Over-arching simple quest (e.g collect the 4 diamonds from the 4 regions)
* Abilites, ranged combat, and magic combat
* Noise for dungeon generation
* Unique random generation for different sections
* Shop with items
* Friendly NPC's
* More enemy types with stronger AI and unique abilities

# Contact / Feedback
If you have any feedback, please send me an email at larkenx@gmail.com or drop an issue on GitHub. Any feedback is welcome and greatly appreciated.
