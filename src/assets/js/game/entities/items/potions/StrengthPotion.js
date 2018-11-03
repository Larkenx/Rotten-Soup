import Potion from '#/entities/items/potions/Potion.js'
import { Game } from '#/Game.js'
import { StrengthBuff } from '#/modifiers/Buff.js'

export default class StrengthPotion extends Potion {
	constructor(x, y, id) {
		super(x, y, {
			id: id,
			type: 'Strength Potion'
		})
		this.buff = new StrengthBuff(3)
	}

	use() {
		super.use()
		Game.player.addNewBuff(this.buff)
		Game.log(`You drink a strength potion. It boosts your strength for the next ${this.buff.duration + 1} moves.`, 'defend')
		Game.player.removeFromInventory(this)
	}

	hoverInfo() {
		return [
			{
				attribute: 'Effect',
				value: `+${this.buff.amount} STR for ${this.buff.duration} moves`
			}
		]
		return `Effect: +${this.buff.amount} STR for ${this.buff.duration} moves`
	}
}
