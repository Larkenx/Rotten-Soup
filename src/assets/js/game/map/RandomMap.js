/**
 * Created by larken on 7/4/17.
 */
import ROT from 'rot-js'
import {Game} from '#/Game.js'
import {getRandomInt} from '#/entities/Entity.js'

const symbolToEntityShop = {
    ORC : [5292,5293,5294,5295,5296,5297,5299],
    EMPOWERED_ORC : [5298],
    GOBLIN : [7440, 7441,7442,7443,7444,7445,7446],
    RAT : [2365],
};

const mobDistribution = {
    "ORC" : 2,
    "EMPOWERED_ORC" : 1,
    "GOBLIN" : 10,
    "RAT" : 8
};

const flatten = arr => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);

function randomProperty(object) {
    let keys = Object.keys(object);
    return keys[Math.floor(keys.length * Math.random())];
}

/* This is a random dungeon map generator. It essentially generates identical
 * JSON data to that of a TILED map, with the unnecessary properties left out */
export function randomMap(width, height, dir) {
    let map = {};
    let createdLadders = 0;
    map.revealed = true;
    map.width = width;
    map.height = height;
    map.layers = [
        {"data": [], "properties": {"obstacles": true}},
        {"data": [], "properties": {"obstacles": true}},
        {"data": [], "properties": {"actors": true}},
        {"data": [], "properties": {"actors": true}}];
    let freeCells = {};
    // ROT.RNG.setSeed(1499200778495);
    let diggerCallback = function (x, y, blocked) {
        if (!blocked) freeCells[x + "," + y] = true;
    };
    let rogueMap = new ROT.Map.Digger(width, height, {
        roomWidth: [4, 20],
        corrdiorLength: [3, 20]
    }).create(diggerCallback);
    // Initialize obstacles and actors
    for (let j = 0; j < height; j++) {
        for (let l = 0; l < map.layers.length; l++)
            map.layers[l].data.push([]);

        for (let i = 0; i < width; i++) {
            if (i + "," + j in freeCells)
                map.layers[0].data[j].push(7858);
            else
                map.layers[0].data[j].push(7046);

            map.layers[1].data[j].push(0);
            map.layers[2].data[j].push(0);
            map.layers[3].data[j].push(0);
        }
    }

    // Generate a width by height sized generated map
    // Now, we can access the dug rooms and corridors.
    let floor = {
        upperLeft: 7736,
        top: 7737,
        upperRight: 7738,
        left: 7856,
        center: 7857,
        right: 7858,
        lowerLeft: 7976,
        bottom: 7977,
        lowerRight: 7978,
    };

    let corridorFloor = {
        horizontal: {
            left: 7860,
            middle: 7861,
            right: 7862,
        },
        vertical: {
            top: 7739,
            middle: 7859,
            bottom: 7979,
        },
    };

    let walls = {
        upperLeft: 8117,
        top: 8118,
        upperRight: 8119,
        left: 8237,
        center: null,
        right: 8237,
        lowerLeft: 8357,
        bottom: 8361,
        lowerRight: 8359,
    };
    /* For every room in the dungeon, we're going to add
     * textures from the tileset for the walls and the floors */
    for (let room of rogueMap.getRooms()) {
        let left = room.getLeft() - 1;
        let right = room.getRight() + 1;
        let top = room.getTop() - 1;
        let bottom = room.getBottom() + 1;
        let wleft = room.getLeft();
        let wright = room.getRight();
        let wtop = room.getTop();
        let wbottom = room.getBottom();
        let center = {
            y : Math.floor((wtop + wbottom) / 2),
            x : Math.floor((wright + wleft) / 2)
        }
        /* Generate the corner tiles */
        // Set the walls up
        map.layers[0].data[top][left] = walls.upperLeft + 1;
        map.layers[0].data[bottom][left] = walls.lowerLeft + 1;
        map.layers[0].data[top][right] = walls.upperRight + 1;
        map.layers[0].data[bottom][right] = walls.lowerRight + 1;
        // Set the floors up
        map.layers[0].data[wtop][wleft] = floor.upperLeft + 1;
        map.layers[0].data[wbottom][wleft] = floor.lowerLeft + 1;
        map.layers[0].data[wtop][wright] = floor.upperRight + 1;
        map.layers[0].data[wbottom][wright] = floor.lowerRight + 1;
        /* Generate the side tiles */
        // Set the walls up
        let x = left + 1;
        while (x <= right - 1) {
            map.layers[0].data[top][x] = walls.top + 1;
            map.layers[0].data[bottom][x] = walls.bottom + 1;
            x++;
        }
        let y = top + 1;
        while (y <= bottom - 1) {
            map.layers[0].data[y][left] = walls.left + 1;
            map.layers[0].data[y][right] = walls.right + 1;
            y++;
        }
        // Set the floors up
        let wx = wleft + 1;
        while (wx <= wright - 1) {
            map.layers[0].data[wtop][wx] = floor.top + 1;
            map.layers[0].data[wbottom][wx] = floor.bottom + 1;
            wx++;
        }
        let wy = wtop + 1;
        while (wy <= wbottom - 1) {
            map.layers[0].data[wy][wleft] = floor.left + 1;
            map.layers[0].data[wy][wright] = floor.right + 1;
            wy++;
        }
        /* Set up the doors of the room
         * TODO: Doors need to be entities in layer 2 or 3*/
        room.getDoors((dx, dy) => {
            let above = map.layers[0].data[dy - 1][dx];
            let below = map.layers[0].data[dy + 1][dx];
            if (above === walls.right + 1 || above === walls.left + 1 || below === walls.left + 1 || below === walls.right + 1) {
                map.layers[0].data[dy][dx] = 7741 + 1;
                map.layers[3].data[dy][dx] = 569 + 1;
            } else {
                map.layers[0].data[dy][dx] = 7741 + 1;
                map.layers[3].data[dy][dx] = 568 + 1;
            }
        });

        // Now, we can mess around with the centers of each room and place items in the dungeons

        // this places a ladder going further into the dungeon (either deeper or higher)
        let roll = getRandomInt(1,rogueMap.getRooms().length);
        if (roll == 1 || createdLadders == 0) {
            map.layers[2].data[center.y][center.x] = dir === "down" ? 478 : 480;
            createdLadders++;
        }

        // now I want to populate some random creatures in each room of the dungeon.
        let validTiles = []; // all the non-wall tiles in the room that don't already a ladder
        for (let i = left+1; i < right-1; i++) {
            for (let j = top+1; j < bottom-1; j++) {
                if (map.layers[2].data[j][i] === 0)
                    validTiles.push(j+','+i);
            }
        }
        // function that will yield a random free space in the room
        let randomTile = () => {
            let index = getRandomInt(0, validTiles.length); // index of a tile
            let randomTile = validTiles.splice(index, 1);
            if (randomTile.length === 1) {
                return randomTile[0].split(',')
            } else {
                return null;
            }
        }
        roll = getRandomInt(2,5);
        for (let i = 0; i < roll; i++) {
            let coords = randomTile();
            if (coords === null) break;
            let chosenMob = ROT.RNG.getWeightedValue(mobDistribution);
            console.log(chosenMob);
            let mobArray = symbolToEntityShop[chosenMob];
            let randomMob = mobArray[getRandomInt(0,mobArray.length-1)]+1;
            map.layers[2].data[coords[0]][coords[1]] = randomMob;
        }
    }

    let buildsCorrWalls = function (x, y, horizontal, end = false) {
        let floor_ids = Object.values(corridorFloor.vertical) + Object.values(floor) + Object.values(corridorFloor.horizontal) + [7741, 569 + 1, 568 + 1];
        if (horizontal) {
            let above = map.layers[0].data[y - 1][x];
            let below = map.layers[0].data[y + 1][x];
            map.layers[0].data[y - 1][x] = !floor_ids.includes(above - 1) ? walls.top + 1 : above;
            map.layers[0].data[y + 1][x] = !floor_ids.includes(below - 1) ? walls.bottom + 1 : below;
        } else {
            let left = map.layers[0].data[y][x - 1];
            let right = map.layers[0].data[y][x + 1];
            map.layers[0].data[y][x - 1] = !floor_ids.includes(left - 1) ? walls.left + 1 : left;
            map.layers[0].data[y][x + 1] = !floor_ids.includes(right - 1) ? walls.right + 1 : right;
        }

        if (end) {
            let ul = map.layers[0].data[y - 1][x - 1];
            let ur = map.layers[0].data[y - 1][x + 1];
            let ll = map.layers[0].data[y + 1][x - 1];
            let lr = map.layers[0].data[y + 1][x + 1];
            let above = map.layers[0].data[y - 1][x];
            let below = map.layers[0].data[y + 1][x];
            let left = map.layers[0].data[y][x - 1];
            let right = map.layers[0].data[y][x + 1];
            map.layers[0].data[y - 1][x - 1] = ul === 7046 ? walls.upperLeft + 1 : ul;
            map.layers[0].data[y - 1][x + 1] = ur === 7046 ? walls.upperRight + 1 : ur;
            map.layers[0].data[y + 1][x - 1] = ll === 7046 ? walls.lowerLeft + 1 : ll;
            map.layers[0].data[y + 1][x + 1] = lr === 7046 ? walls.lowerRight + 1 : lr;
            map.layers[0].data[y - 1][x] = !floor_ids.includes(above - 1) ? walls.top + 1 : above;
            map.layers[0].data[y + 1][x] = !floor_ids.includes(below - 1) ? walls.bottom + 1 : below;
            map.layers[0].data[y][x - 1] = !floor_ids.includes(left - 1) ? walls.left + 1 : left;
            map.layers[0].data[y][x + 1] = !floor_ids.includes(right - 1) ? walls.right + 1 : right;
        }

    };

    let sortCorridors = function (a, b,) {
        if (a._startX === a._endX && b._startX !== b._endX) {
            return -1;
        } else if (b._startX === b._endX && a._startX !== a._endX) {
            return 1;
        } else {
            return 0;
        }
    };

    /* After rooms, we need to clean up textures for corridors, which
     * are stretches of rows or columns */
    for (let corridor of rogueMap.getCorridors().sort(sortCorridors)) {
        let sx = corridor._startX;
        let sy = corridor._startY;
        let ex = corridor._endX;
        let ey = corridor._endY;
        if (sx === ex) { // vertical corridor |
            if (sy > ey) {
                let temp = sy;
                sy = ey;
                ey = temp;
            }
            let y = sy;
            buildsCorrWalls(sx, y, false, true);
            map.layers[0].data[y][sx] = corridorFloor.vertical.top + 1;
            y++;
            while (y < ey) {
                buildsCorrWalls(sx, y, false);
                map.layers[0].data[y][sx] = corridorFloor.vertical.middle + 1;
                y++;
            }
            map.layers[0].data[ey][sx] = corridorFloor.vertical.bottom + 1;
            buildsCorrWalls(sx, y, false, true);
        } else if (sy === ey) { // horizontal corridor ------
            if (sx > ex) {
                let temp = sx;
                sx = ex;
                ex = temp;
            }
            let x = sx;
            buildsCorrWalls(x, sy, true, true);
            map.layers[0].data[sy][x] = corridorFloor.horizontal.left + 1;
            x++;
            while (x < ex) {
                buildsCorrWalls(x, sy, true);
                map.layers[0].data[sy][x] = corridorFloor.horizontal.middle + 1;
                x++;
            }
            buildsCorrWalls(x, sy, true, true);
            map.layers[0].data[ey][x] = corridorFloor.horizontal.right + 1;
        } else {
            console.log(`[${sx}, ${sy}] => [${ex},${ey}]`);
        }
    }

    // Randomly select starting position for player
    let start = randomProperty(freeCells).split(',');
    // let start = [1, 44];
    map.layers[2].data[start[1]][start[0]] = Game.playerID; // set random spot to be the player
    map.layers[3].data[start[1]][start[0]] = dir === "down" ? 480 : 478; // place a ladder going back up a level underneath the player.

    // Flatten the layers to mimic Tiled map data
    for (let i = 0; i < map.layers.length; i++)
        map.layers[i].data = flatten(map.layers[i].data);

    return map;
}
