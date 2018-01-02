import Item from '#/entities/items/Item.js'
import * as magic from '#/magic/Spell.js'
import { Game } from '#/Game.js'

export class Spellbook extends Item {
	constructor(x, y, id, spells) {
		super(x, y, {
			id: id,
			action: 'Read',
			type: 'Spellbook',
			spells
		})
	}

	use() {
		for (let spell of this.spells) {
			if (
				!Game.player.cb.spells.some(s => {
					return s.name === spell.name
				})
			)
				Game.player.cb.spells.push(spell)
		}
	}
}

export class NecromancySpellBook extends Spellbook {
	constructor(x, y, id) {
		super(x, y, id, [
			new magic.Pain(),
			new magic.VampiricDraining(),
			new magic.AnimateDead(),
			new magic.Regeneration()
		])
	}

	use() {
		super.use()
		Game.log(
			'You have learned necromancy spells...but at what cost?',
			'lightgreen'
		)
	}
}
