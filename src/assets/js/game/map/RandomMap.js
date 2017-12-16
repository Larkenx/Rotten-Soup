/**
 * Created by larken on 7/4/17.
 */
import ROT from "rot-js"
import {
    Game
} from "#/Game.js"
import {
    getRandomInt,
    getNormalRandomInt,
    randomProperty
} from "#/utils/HelperFunctions.js"

const symbolToEntityShop = {
    ORC: [5292, 5293, 5294, 5295, 5296, 5297, 5299],
    EMPOWERED_ORC: [5298],
    GOBLIN: [7440, 7441, 7442, 7443, 7444, 7445, 7446],
    RAT: [2365],
    BAT: [3704, 3706],
    KOBOLD: [5532, 5533, 5534, 5535, 5536, 5537, 5538, 5539]
}

const flatten = arr => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), [])

// function that will yield a random free space in the room
const randomTile = (validTiles) => {
    let index = getRandomInt(0, validTiles.length) // index of a tile
    let tile = validTiles.splice(index, 1)
    if (tile.length === 1) {
        return tile[0].split(',').map(e => Number(e))
    } else {
        return null
    }
}

export function randomDungeon(width, height, dir, level = 1) {
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
    }

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
    }

    let walls = {
        upperLeft: 8117,
        top: 8118,
        upperRight: 8119,
        left: 8237,
        center: 8238,
        right: 8237,
        lowerLeft: 8357,
        bottom: 8118,
        lowerRight: 8359,
        endBottom : 8238,
        endTop : 8239,
        island : 8120,

        leftT: 8240,
        middleT: 8241,
        rightT: 8242,
        topT: 8121,
        bottomT: 8361
    }

    const mobDistribution = {
        "ORC": 1 * (~~(level / 4)) + 1,
        "EMPOWERED_ORC": (~~(level / 4)),
        "KOBOLD": (~~(level / 3)),
        "GOBLIN": 10 - (~~(level / 2)),
        "RAT": 8 - (~~(level / 4)),
        "BAT": 6 - (~~(level / 4))
    }

    let map = {}
    let createdLadders = 0
    map.revealed = true
    map.width = width
    map.height = height
    map.layers = [{
            "data": [],
            "properties": {
                "obstacles": true
            }
        },
        {
            "data": [],
            "properties": {
                "obstacles": true
            }
        },
        {
            "data": [],
            "properties": {
                "actors": true
            }
        },
        {
            "data": [],
            "properties": {
                "actors": true
            }
        }
    ]
    let freeCells = {}
    // ROT.RNG.setSeed(1513141461592)
    let diggerCallback = function(x, y, blocked) {
        if (!blocked) freeCells[x + "," + y] = true
    }
    let rogueMap = new ROT.Map.Digger(width, height, {
        roomWidth: [6, 20],
        corrdiorLength: [4, 4],
        roomDugPercentage: 0.4,
    }).create(diggerCallback)
    // Initialize obstacles and actors
    for (let j = 0; j < height; j++) {
        for (let l = 0; l < map.layers.length; l++)
            map.layers[l].data.push([])

        for (let i = 0; i < width; i++) {
            if (i + "," + j in freeCells)
                map.layers[0].data[j].push(7858)
            else
                map.layers[0].data[j].push(7046)

            map.layers[1].data[j].push(0)
            map.layers[2].data[j].push(0)
            map.layers[3].data[j].push(0)
        }
    }

    let sortCorridors = function(a, b, ) {
        if (a._startX === a._endX && b._startX !== b._endX) {
            return -1
        } else if (b._startX === b._endX && a._startX !== a._endX) {
            return 1
        } else {
            return 0
        }
    }

    /* TODO: Define bitmasking operators to create walls alone. Should be 4-bit bitmask */
    let computeBitmask = (x,y) => {
        let sum = 0
        let above = `${x},${y-1}`
        let below = `${x},${y+1}`
        let left = `${x-1},${y}`
        let right = `${x+1},${y}`

        let ur = `${x+1},${y-1}`;
        let ll = `${x-1},${y+1}`;

        let ul = `${x-1},${y-1}`;
        let lr = `${x+1},${y+1}`;

        if (above in freeCells) sum += 1
        if (right in freeCells) sum += 2
        if (below in freeCells) sum += 4
        if (left in freeCells) sum += 8

        if (sum == 0) {
            if (ul in freeCells)
                return 16
            else if (ur in freeCells)
                return 17
            else if (ll in freeCells)
                return 18
            else if (lr in freeCells)
                return 19
        }


        return sum
    }

    let wallSums = {
        /*
            ? 0 ?
            0 0 0
            ? 0 ?
        */
        0 : 7046, // empty space (black spot)
        /*
            ? 1 ?
            0 0 0
            ? 0 ?
        */
        1 : walls.bottom,
        /*
            ? 0 ?
            0 0 1
            ? 0 ?
        */
        2 : walls.left,
        /*
            ? 1 ?
            0 0 1
            ? 0 ?
        */
        3 : walls.upperRight,
        /*
            ? 0 ?
            0 0 0
            ? 1 ?
        */
        4 : walls.top,
        /*
            ? 1 ?
            0 0 0
            ? 1 ?
        */
        5 : walls.top,
        /*
            ? 0 ?
            0 0 1
            ? 1 ?
        */
        6 : walls.lowerRight,
        /*
            ? 1 ?
            0 0 1
            ? 1 ?
        */
        7 : walls.bottom, // this case is a hard one. Need a new tile that properly ends a wall in one tile
        /*
            ? 0 ?
            1 0 0
            ? 0 ?
        */
        8 : walls.right,
        /*
            ? 1 ?
            1 0 0
            ? 0 ?
        */
        9 : walls.upperLeft,
        /*
            ? 0 ?
            1 0 1
            ? 0 ?
        */
        10 : walls.left, // vertical
        /*
            ? 1 ?
            1 0 1
            ? 0 ?
        */
        11 : walls.endTop,
        /*
            ? 0 ?
            1 0 0
            ? 1 ?
        */
        12 : walls.lowerLeft,
        /*
            ? 1 ?
            1 0 0
            ? 1 ?
        */
        13 : walls.bottom,
        /*
            ? 0 ?
            1 0 1
            ? 1 ?
        */
        14 : walls.endBottom,
        /*
            ? 1 ?
            1 0 1
            ? 1 ?
        */
        15 : walls.center,
        /*
            1 0 ?
            0 0 0
            ? 0 ?
        */
        16 : walls.lowerRight,
        /*
            ? 0 1
            0 0 0
            ? 0 ?
        */
        17 : walls.lowerLeft,
        /*
            ? 0 ?
            0 0 0
            1 0 ?
        */
        18 : walls.upperRight,
        /*
            ? 0 ?
            0 0 0
            ? 0 1
        */
        19 : walls.upperLeft,
    }

    // we want to start +1 from the top and left, and bottom and right -1
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (! (`${x},${y}` in freeCells)) { // only want to place a wall somewhere if it's not a free cell
                // console.log("computing bitmask for", x, y);
                let sum = computeBitmask(x,y);
                // console.log(wallSums[sum]);
                let sym = wallSums[sum]+1;
                map.layers[0].data[y][x] = wallSums[sum]+1;
            }
        }
    }


    /* After rooms, we need to clean up textures for corridors, which
     * are stretches of rows or columns */
    for (let corridor of rogueMap.getCorridors().sort(sortCorridors)) {
        let sx = corridor._startX
        let sy = corridor._startY
        let ex = corridor._endX
        let ey = corridor._endY
        if (sx === ex) { // vertical corridor |
            if (sy > ey) {
                let temp = sy
                sy = ey
                ey = temp
            }
            let y = sy
            map.layers[0].data[y][sx] = corridorFloor.vertical.top + 1
            y++
            while (y < ey) {
                map.layers[0].data[y][sx] = corridorFloor.vertical.middle + 1
                y++
            }
            map.layers[0].data[ey][sx] = corridorFloor.vertical.bottom + 1
        } else if (sy === ey) { // horizontal corridor ------
            if (sx > ex) {
                let temp = sx
                sx = ex
                ex = temp
            }
            let x = sx
            map.layers[0].data[sy][x] = corridorFloor.horizontal.left + 1
            x++
            while (x < ex) {
                map.layers[0].data[sy][x] = corridorFloor.horizontal.middle + 1
                x++
            }
            map.layers[0].data[ey][x] = corridorFloor.horizontal.right + 1
        } else {
            console.log(`[${sx}, ${sy}] => [${ex},${ey}]`)
        }
    }


    /* For every room in the dungeon, we're going to add
     * textures from the tileset for the walls and the floors */
    for (let room of rogueMap.getRooms()) {
        let left = room.getLeft() - 1
        let right = room.getRight() + 1
        let top = room.getTop() - 1
        let bottom = room.getBottom() + 1
        let wleft = room.getLeft()
        let wright = room.getRight()
        let wtop = room.getTop()
        let wbottom = room.getBottom()
        let center = {
            y: ~~ ((wtop + wbottom) / 2),
            x: ~~ ((wright + wleft) / 2)
        }
        // Set the floors up
        map.layers[0].data[wtop][wleft] = floor.upperLeft + 1
        map.layers[0].data[wbottom][wleft] = floor.lowerLeft + 1
        map.layers[0].data[wtop][wright] = floor.upperRight + 1
        map.layers[0].data[wbottom][wright] = floor.lowerRight + 1
        let wx = wleft + 1
        while (wx <= wright - 1) {
            map.layers[0].data[wtop][wx] = floor.top + 1
            map.layers[0].data[wbottom][wx] = floor.bottom + 1
            wx++
        }
        let wy = wtop + 1
        while (wy <= wbottom - 1) {
            map.layers[0].data[wy][wleft] = floor.left + 1
            map.layers[0].data[wy][wright] = floor.right + 1
            wy++
        }

        /* Set up the doors of the room */
        room.getDoors((dx, dy) => {
            let floor_ids = Object.values(corridorFloor.vertical) + Object.values(floor) + Object.values(corridorFloor.horizontal) + Object.values(floor) // doors?
            let above = map.layers[0].data[dy - 1][dx]
            let below = map.layers[0].data[dy + 1][dx]
            if (floor_ids.includes(above-1) && floor_ids.includes(below-1)) { // horizontal door frame
                map.layers[0].data[dy][dx] = 7741 + 1
                map.layers[3].data[dy][dx] = 568 + 1
            } else { // vertical door frame
                map.layers[0].data[dy][dx] = 7741 + 1
                map.layers[3].data[dy][dx] = 569 + 1

            }
        })

        // Now, we can mess around with the centers of each room and place items in the dungeons
        // this places a ladder going further into the dungeon (either deeper or higher)
        let roll = getRandomInt(1, rogueMap.getRooms().length)
        if (roll == 1 || createdLadders == 0) {
            map.layers[2].data[center.y][center.x] = dir === "down" ? 478 : 480
            createdLadders++
        }

        // now I want to populate some random creatures in each room of the dungeon.
        let validTiles = [] // all the non-wall tiles in the room that don't already a ladder
        let possibleWalls = Object.values(walls)
        for (let j = wtop; j < wbottom; j++) {
            for (let i = wleft; i < wright; i++) {
                if (map.layers[2].data[j][i] === 0 && !possibleWalls.includes(map.layers[0].data[j][i]))
                    validTiles.push(i + ',' + j)
            }
        }

        roll = getNormalRandomInt(1, 5)
        for (let i = 0; i < roll; i++) {
            let coords = randomTile(validTiles)
            if (coords === null) break
            let chosenMob = ROT.RNG.getWeightedValue(mobDistribution)
            // console.log(chosenMob)
            let mobArray = symbolToEntityShop[chosenMob]
            let randomMob = mobArray[getRandomInt(0, mobArray.length - 1)] + 1
            map.layers[2].data[coords[1]][coords[0]] = randomMob
        }
        // if there atleast 4 enemies in the room, drop a chest in the room too!
        if (roll >= 4) {
            let coords = randomTile(validTiles)
            if (coords !== null) {
                map.layers[2].data[coords[1]][coords[0]] = 58
            }
        }

    }

    // Randomly select starting position for player
    let start = randomProperty(freeCells).split(',')
    // let start = [1, 44]
    map.layers[2].data[start[1]][start[0]] = Game.playerID // set random spot to be the player
    map.layers[3].data[start[1]][start[0]] = dir === "down" ? 480 : 478 // place a ladder going back up a level underneath the player.

    // Flatten the layers to mimic Tiled map data
    for (let i = 0; i < map.layers.length; i++)
        map.layers[i].data = flatten(map.layers[i].data)

    return map
}


export function randomCave(width, height, dir, level = 1) {
    let map = {}
    let createdLadders = 0
    map.revealed = true
    map.width = width
    map.height = height
    map.layers = [{
            "data": [],
            "properties": {
                "obstacles": true
            }
        },
        {
            "data": [],
            "properties": {
                "obstacles": true
            }
        },
        {
            "data": [],
            "properties": {
                "actors": true
            }
        },
        {
            "data": [],
            "properties": {
                "actors": true
            }
        }
    ]
    let freeCells = {}
    let mapCallback = function(x, y, blocked) {
        if (!blocked) freeCells[x + "," + y] = true
    }
    let cellularMap = new ROT.Map.Cellular(width, height)
    cellularMap.randomize(0.5)
    for (let i = 0; i < 10; i++)
        cellularMap.create()

    cellularMap.connect(mapCallback)

    // Initialize obstacles and actors
    for (let j = 0; j < height; j++) {
        for (let l = 0; l < map.layers.length; l++)
            map.layers[l].data.push([])

        for (let i = 0; i < width; i++) {
            if (i + "," + j in freeCells)
                map.layers[0].data[j].push(9297 + 1)
            else
                map.layers[0].data[j].push(9200 + 1)

            map.layers[1].data[j].push(0)
            map.layers[2].data[j].push(0)
            map.layers[3].data[j].push(0)
        }
    }

    let validTiles = Object.keys(freeCells)
    // Randomly select starting position for player
    let start = randomTile(validTiles)
    if ((start) === null)
        throw "Could not find an open spot on the map to place the player!"

    map.layers[2].data[start[1]][start[0]] = Game.playerID // set random spot to be the player
    map.layers[3].data[start[1]][start[0]] = dir === "down" ? 238 : 237 // place a ladder going back up a level underneath the player.

    let ladderGoingDown = randomTile(validTiles)
    map.layers[2].data[ladderGoingDown[1]][ladderGoingDown[0]] = dir === "down" ? 237 : 238
    ladderGoingDown = randomTile(validTiles)
    map.layers[2].data[ladderGoingDown[1]][ladderGoingDown[0]] = dir === "down" ? 237 : 238

    const mobDistribution = {
        "ORC": 1 * (~~(level / 4)) + 1,
        "EMPOWERED_ORC": (~~(level / 4)),
        "KOBOLD": (~~(level / 3)),
        "GOBLIN": 10 - (~~(level / 2)),
        "BAT": 8 - (~~(level / 4)),
        "RAT": 8 - (~~(level / 4))
    }

    let roll = getNormalRandomInt(7 + level, 25 + level)
    for (let i = 0; i < roll; i++) {
        let coords = randomTile(validTiles)
        if (coords === null) break
        let chosenMob = ROT.RNG.getWeightedValue(mobDistribution)
        // console.log(chosenMob)
        let mobArray = symbolToEntityShop[chosenMob]
        let randomMob = mobArray[getRandomInt(0, mobArray.length - 1)] + 1
        map.layers[2].data[coords[1]][coords[0]] = randomMob
    }

    // Flatten the layers to mimic Tiled map data
    for (let i = 0; i < map.layers.length; i++)
        map.layers[i].data = flatten(map.layers[i].data)

    return map
}
