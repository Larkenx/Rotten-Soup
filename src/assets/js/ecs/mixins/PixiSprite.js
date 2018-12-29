import { Game } from '#/Game.js'
import { verifyProps } from '#/utils/HelperFunctions'

export const PixiSprite = superclass =>
	class extends superclass {
		constructor(config) {
			super(config)
			verifyProps(this, ['x', 'y', 'id', 'move', 'placeAt'])
			this.sprite = null
			this.spriteAbove = null
		}

		setSprite(sprite) {
			this.sprite = sprite
		}

		setSpriteAbove(sprite) {
			this.spriteAbove = sprite
		}

		removeSpriteAbove() {
			Game.display.removeChild(this.spriteAbove)
			this.spriteAbove = null
		}

		move(nx, ny) {
			super.move(nx, ny)
			Game.display.moveSprite(this.sprite, nx, ny)
			if (this.x < nx) {
				this.sprite.scale.x = -1
				this.sprite.anchor.set(1, 0)
			} else if (this.x > nx) {
				this.sprite.scale.x = 1
				this.sprite.anchor.set(0, 0)
			}
			if (this.spriteAbove !== undefined) {
				Game.display.moveSprite(this.spriteAbove, nx, ny - 0.5)
			}
		}

		placeAt(nx, ny) {
			super.placeAt(nx, ny)
			if (this.sprite !== null) Game.display.moveSprite(this.sprite, nx, ny, false)
		}

		interact(actor) {
			let nx = actor.x - this.x
			let ny = actor.y - this.y
			if (Game.userSettings.animationsEnabled) {
				Game.display.moveSprite(this.sprite, this.x + nx / 2, this.y + ny / 2)
				setTimeout(() => {
					Game.display.moveSprite(this.sprite, this.x, this.y)
				}, 100)
			}
		}
	}
