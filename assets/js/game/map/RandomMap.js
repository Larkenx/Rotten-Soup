/**
 * Created by larken on 7/4/17.
 */
function randomProperty(object) {
    let keys = Object.keys(object);
    return keys[Math.floor(keys.length * Math.random())];
}

/* This is a random dungeon map generator. It essentially generates identical
 * JSON data to that of a TILED map, with the unnecessary properties left out */
function randomMap(width, height) {
    let map = {};
    map.revealed = true;
    map.width = width;
    map.height = height;
    map.layers = [
        {"data": [], "properties": {"obstacles": true}},
        {"data": [], "properties": {"obstacles": true}},
        {"data": [], "properties": {"obstacles": false}},
        {"data": [], "properties": {"obstacles": false}}];
    let freeCells = {};
    ROT.RNG.setSeed(1499200778495);
    diggerCallback = function (x, y, blocked) {
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
                map.layers[1].data[dy][dx] = 569 + 1;
            } else {
                map.layers[0].data[dy][dx] = 7741 + 1;
                map.layers[1].data[dy][dx] = 568 + 1;
            }
        });
    }

    let buildsCorrWalls = function (x, y, horizontal, end=false) {
        if (horizontal) {
            let above = map.layers[0].data[y - 1][x];
            let below = map.layers[0].data[y + 1][x];
            map.layers[0].data[y - 1][x] = above === 7046 ? walls.top+1 : above;
            map.layers[0].data[y + 1][x] = below === 7046 ? walls.bottom+1 : below;
        } else {
            let left = map.layers[0].data[y][x - 1];
            let right = map.layers[0].data[y][x + 1];
            map.layers[0].data[y][x - 1] = left === 7046 ? walls.left+1 : left;
            map.layers[0].data[y][x + 1] = right === 7046 ? walls.right+1 : right;
        }

        if (end) {
            let ul = map.layers[0].data[y-1][x-1];
            let ur = map.layers[0].data[y-1][x+1];
            let ll = map.layers[0].data[y+1][x-1];
            let lr = map.layers[0].data[y+1][x+1];
            let above = map.layers[0].data[y - 1][x];
            let below = map.layers[0].data[y + 1][x];
            let left = map.layers[0].data[y][x - 1];
            let right = map.layers[0].data[y][x + 1];

        }

    };

    /* After rooms, we need to clean up textures for corridors, which
     * are stretches of rows or columns */
    for (let corridor of rogueMap.getCorridors()) {
        let sx = corridor._startX;
        let sy = corridor._startY;
        let ex = corridor._endX;
        let ey = corridor._endY;
        if (sx === ex) { // vertical corridor
            // moving down
            if (sy < ey) {
                y = sy;
                buildsCorrWalls(sx, y, false, true);
                map.layers[0].data[y][sx] = 7739 + 1;
                y++;
                while (y < ey) {
                    buildsCorrWalls(sx, y, false);
                    map.layers[0].data[y][sx] = 7859 + 1;
                    y++;
                }
                map.layers[0].data[ey][sx] = 7979 + 1;
                buildsCorrWalls(sx, y, false, true);

            } else {
                // moving up
                y = sy;
                buildsCorrWalls(sx, y, false, true);
                map.layers[0].data[y][sx] = 7979 + 1;
                y--;
                while (y > ey) {
                    buildsCorrWalls(sx, y, false);
                    map.layers[0].data[y][sx] = 7859 + 1;
                    y--;
                }
                map.layers[0].data[ey][sx] = 7739 + 1;
                buildsCorrWalls(sx, y, false, true);
            }
        } else if (sy === ey) { // horizontal corridor
            // moving right
            if (sx < ex) {
                x = sx;
                buildsCorrWalls(x, sy, true, true);
                map.layers[0].data[sy][x] = 7860 + 1;
                x++;
                while (x < ex) {
                    buildsCorrWalls(x, sy, true);
                    map.layers[0].data[sy][x] = 7861 + 1;
                    x++;
                }
                buildsCorrWalls(x, sy, true, true);

                map.layers[0].data[ey][x] = 7862 + 1;
            } else {
                // moving left
                x = sx;
                buildsCorrWalls(x, sy, true, true);

                map.layers[0].data[sy][x] = 7862 + 1;
                x--;
                while (x > ex) {
                    buildsCorrWalls(x, sy, true);
                    map.layers[0].data[sy][x] = 7861 + 1;
                    x--;
                }
                buildsCorrWalls(x, sy, true, true);
                map.layers[0].data[ey][ex] = 7860 + 1;
            }
        } else {
            console.log(`[${sx}, ${sy}] => [${ex},${ey}]`);
        }
    }

    // Randomly select starting position for player
    // let start = randomProperty(freeCells).split(',');
    let start = [1, 44];
    map.layers[2].data[start[1]][start[0]] = Game.playerID; // set random spot to be the player
    map.layers[3].data[start[1]][start[0]] = 477; // place a ladder going back up a level underneath the player.

    // Flatten the layers to mimic Tiled map data
    for (let i = 0; i < map.layers.length; i++)
        map.layers[i].data = flatten(map.layers[i].data);

    return map;
}