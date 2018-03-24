import ROT from 'rot-js'

import { Game, tileset } from '#/Game.js'
import Item from '#/entities/items/Item.js'
import * as PIXI from 'pixi.js'

export let getTilesetCoords = id => {
    let tileWidth = tileset.tilewidth
    let tileHeight = tileset.tileheight
    let cols = tileset.columns
    let rowNumber = Math.floor(id / cols) * tileHeight
    let colNumber = (id % cols) * tileHeight
    return [colNumber, rowNumber]
}

export default class GameDisplay {
    constructor() {
        this.app = new PIXI.Application({
            forceCanvas: true,
            width: 1024,
            height: 640
        })
        // this will be the texture we generate by creating a container, rendering it and generating it from
        // the renderer
        /*
			this.staticBackground = renderer.generateTexture(theContainer)
		*/
        this.staticBackground = null
        this.animatedBackground = null
        this.movingSprites = []
        this.viewPort = null
        this.tileSize = 32
        this.tilesetMapping = {}
    }
    /*
			I want to iterate through every tile in the map that is an obstacle (animated or not).
			For each obstacle:
				if it is animated, create a new PIXI.extras.AnimatedSprite for it with the proper frames and animation speed
				if it is not animated, create a normal PIXI.Sprite
				Once the obstacle sprite is created, add it to a container
		*/
    renderMap(map) {
        let { renderer, stage } = this.app
        stage.removeChildren()

        let staticBackground = new PIXI.Container()
        this.animatedBackground = new PIXI.Container()
        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                let tile = map.data[y][x]
                for (let o of tile.obstacles) {
                    if (o.animated === true && o.animated_id !== undefined && this.getTexture(o.animated_id) !== undefined) {
                        let frames = [this.getTexture(o.id), this.getTexture(o.animated_id)]
                        let sprite = new PIXI.extras.AnimatedSprite(frames)
                        sprite.position.set(x * this.tileSize, y * this.tileSize)
                        sprite.animationSpeed = 0.04
                        sprite.play()
                        this.animatedBackground.addChild(sprite)
                    } else {
                        let sprite = new PIXI.Sprite(this.getTexture(o.id))
                        sprite.position.set(x * this.tileSize, y * this.tileSize)
                        staticBackground.addChild(sprite)
                    }
                }
            }
        }

        this.staticBackground = new PIXI.Sprite(renderer.generateTexture(staticBackground))
        this.staticBackground.position.set(0, 0)
        this.animatedBackground.position.set(0, 0)
        this.background = new PIXI.Container()
        this.background.addChild(this.staticBackground)
        this.background.addChild(this.animatedBackground)
        stage.addChild(this.background)
        let x = Game.player.x - ~~(Game.width / 2)
        let y = Game.player.y - ~~(Game.height / 2)
        this.background.position.set(-x * this.tileSize, -y * this.tileSize)
        // draw the actors last because they should be on the top-most layer
        for (let a of map.actors) {
            if (!(a instanceof Item)) {
                this.assignSprite(a)
            }
        }
    }

    getTexture(id) {
        return this.tilesetMapping[id]
    }

    moveSprite(sprite, x, y) {
        // used to smoothly pan the map from its curent location to a new one
        // by adding it to the list of sprites who should smoothly progress towards some location
        let nx = x * this.tileSize
        let ny = y * this.tileSize
        let existingMovementObject = this.movingSprites.filter(o => {
            return o.sprite === sprite
        })
        if (existingMovementObject.length > 0) {
            // sprite.position.set(nx, ny)
            this.movingSprites = this.movingSprites.filter(o => {
                return o.sprite !== sprite
            })
        }

        this.movingSprites.push({ sprite, target: { x: nx, y: ny } })
    }

    assignSprite(actor) {
        let { x, y, id } = actor
        let props = tileset.tileproperties[actor.id + '']
        // if (actor.sprite === null || actor.sprite === undefined) {
        if (props.animated === true && props.animated_id !== undefined && this.getTexture(props.animated_id) !== undefined) {
            let frames = [this.getTexture(actor.id), this.getTexture(props.animated_id)]
            let sprite = new PIXI.extras.AnimatedSprite(frames)
            actor.setSprite(sprite)
            sprite.animationSpeed = 0.065
            sprite.play()
            this.background.addChild(sprite)
            sprite.position.set(actor.x * this.tileSize, actor.y * this.tileSize)
        } else {
            let sprite = new PIXI.Sprite(this.getTexture(actor.id))
            actor.setSprite(sprite)
            this.background.addChild(sprite)
            sprite.position.set(actor.x * this.tileSize, actor.y * this.tileSize)
        }
    }

    clearSprite(actor) {
        this.background.removeChild(actor.sprite)
        actor.sprite = null
    }

    updateMap() {
        let camera = {
            // camera x,y resides in the upper left corner
            x: Game.player.x - ~~(Game.width / 2),
            y: Game.player.y - ~~(Game.height / 2),
            width: Math.ceil(Game.width),
            height: Game.height
        }
        let startingPos = [camera.x, camera.y]
        if (camera.x < 0) {
            // far left
            startingPos[0] = 0
        }
        if (camera.x + camera.width > Game.map.width) {
            // far right
            startingPos[0] = Game.map.width - camera.width
        }
        if (camera.y <= 0) {
            // at the top of the map
            startingPos[1] = 0
        }
        if (camera.y + camera.height > Game.map.height) {
            // at the bottom of the map
            startingPos[1] = Game.map.height - camera.height
        }
        Game.camera = {
            x: startingPos[0],
            y: startingPos[1]
        }
        let { x, y } = Game.camera
        this.moveSprite(this.background, -x, -y)
    }

    getContainer() {
        return this.app.view
    }

    loadAssets() {
        // destructuring common aliases
        let { renderer, stage, view } = this.app
        // append the canvas to the game container
        // prepare paths for the dungeon walls, floors, and shadows
        const spritesheet = {
            url: 'static/images/DawnLike/Compiled/compiled_tileset_32x32.png',
            name: 'spritesheet'
        }
        // gameContainer.appendChild(this.getContainer())

        PIXI.loader
            .add(spritesheet)
            .on('progress', (l, r) => this.handleAssetLoad(l, r))
            .load(() => {
                let ids = new Set(Game.loadedIDS)
                for (let id of Object.keys(tileset.tileproperties)) {
                    ids.add(id)
                    let props = tileset.tileproperties[id]
                    if (props.animated_id !== undefined) ids.add(props.animated_id)
                    if (props.activated_id !== undefined) ids.add(props.activated_id)
                }
                for (let id of ids) {
                    let coords = getTilesetCoords(id)
                    let frame = new PIXI.Rectangle(coords[0], coords[1], this.tileSize, this.tileSize)
                    let texture = new PIXI.Texture(PIXI.loader.resources['spritesheet'].texture, frame)
                    this.tilesetMapping[id] = texture
                }

                this.clear()
                this.renderMap(Game.map)
                let renderLoop = delta => {
                    // maintain a track of all the sprites that should have updated movement on this tick
                    // if they are at their location, filter them from the record
                    for (let obj of this.movingSprites)
                        if (obj.sprite.x === obj.target.x && obj.sprite.y === obj.target.y)
                            this.movingSprites = this.movingSprites.filter(o => o.sprite !== obj.sprite)

                    // update the location of every sprite
                    for (let obj of this.movingSprites) {
                        let { sprite, target } = obj
                        let x = 0
                        let y = 0
                        let distX = Math.abs(sprite.x - target.x)
                        let distY = Math.abs(sprite.y - target.y)
                        let shouldSlowDown = (distX <= 12 && distX !== 0) || (distY <= 12 && distY !== 0)
                        let movementSpeed = shouldSlowDown ? 2.0 : 4.0
                        if (target.x > sprite.x) x = movementSpeed
                        if (target.x < sprite.x) x = -movementSpeed
                        if (target.y > sprite.y) y = movementSpeed
                        if (target.y < sprite.y) y = -movementSpeed
                        if (Math.abs(x) > distX) x = distX
                        if (Math.abs(y) > distY) y = distY
                        sprite.position.set(sprite.x + x, sprite.y + y)
                    }
                }
                this.app.ticker.add(delta => renderLoop(delta))
                let x = Game.player.x - ~~(Game.width / 2)
                let y = Game.player.y - ~~(Game.height / 2)
                // this.moveSprite(this.background, ...startingPos.map(c => -c))
                console.log(x, y)
                this.background.position.set(-x * this.tileSize, -y * this.tileSize)
            })
    }

    handleAssetLoad(loader, resource) {
        let { stage, renderer } = this.app
        this.clear()
        let graphics = new PIXI.Graphics()
        let cx = renderer.width / 2
        let cy = renderer.height / 2
        let barLength = renderer.width / 2
        let text = new PIXI.Text(`Loading ${resource.name}... ${Math.floor(loader.progress)}%`, {
            fill: 0xffffff,
            fontSize: 16,
            fontFamily: ['Source Code Pro', 'Menlo', 'Consolas'],
            x: cx,
            y: cy
        })
        // clear the previous progress bar
        // draw the progress bar outline
        graphics.lineStyle(50, 0x6f6f6f)
        graphics.drawRoundedRect(cx - barLength / 2, cy, barLength, 4)
        // draw the progress bar interior
        let maxInteriorBarLength = barLength - 10
        let currentBarLength = maxInteriorBarLength * (loader.progress / 100)
        graphics.lineStyle(30, 0x04ab34)
        graphics.drawRoundedRect(cx - maxInteriorBarLength / 2, cy, currentBarLength, 4)
        stage.addChild(graphics)
        stage.addChild(text)
    }

    clear() {
        this.app.stage.removeChildren()
    }

    act() {
        Game.engine.lock()
        this.updateMap()
        Game.drawMiniMap()
        Game.engine.unlock()
    }
}
