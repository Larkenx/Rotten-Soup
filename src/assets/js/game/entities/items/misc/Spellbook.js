import Item from '#/entities/items/Item.js'
import * as magic from '#/magic/Spell.js'
import { Game } from '#/Game.js'

export class Spellbook extends Item {
	constructor(x, y, id, options) {
		super(x, y, {
			id: id,
			action: 'Read',
			type: 'Spellbook',
			...options
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
		Game.player.removeFromInventory(this)
	}

	hoverInfo() {
		return this.spells.map(spell => {
			return { attribute: spell.name, value: `${spell.hoverInfo}` }
		})
		// return `${this.type}${this.name}\n`
	}
}

export class NecromancySpellBook extends Spellbook {
	constructor(x, y, id) {
		super(x, y, id, {
			spells: [new magic.Pain(), new magic.VampiricDraining(), new magic.AnimateDead(), new magic.Regeneration()],
			name: 'Book of Death'
		})
	}

	use() {
		super.use()
		Game.log('You have learned necromancy spells...but at what cost?', 'lightgreen')
	}
}
