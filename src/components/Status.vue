<template>
  <v-container class="pa-0 ma-0">
    <v-layout row>
      <v-flex md7><b>Current Weapon</b></v-flex>
      <v-flex md5>{{getCurrentWeapon().name }}</v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md7><b>Armor Value</b></v-flex>
      <v-flex md5>{{getDefence()}}</v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md7><b>Damage Value</b></v-flex>
      <v-flex md5>{{getDamageRange()}}</v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
import { xp_levels } from '#/entities/Entity.js'

export default {
	data() {
		return {
			cb: Game.player.cb
		}
	},
	methods: {
		getPlayerSprite() {
			return `../static/images/player_sprites/${Game.player.id}.png`
		},
		getHP() {
			return Game.player.cb.hp
		},
		getMaxHP() {
			return Game.player.cb.maxhp
		},
		getMana() {
			return Game.player.cb.mana
		},
		getMaxMana() {
			return Game.player.cb.maxmana
		},
		getStrength() {
			return Game.player.cb.str
		},
		getDefence() {
			return Game.player.cb.def + Game.player.getDefenceRating()
		},
		getDamageRange() {
			if (Game.player.getMinDmg() === Game.player.getMaxDmg()) return Game.player.getMinDmg()

			return Game.player.getMinDmg() + ' - ' + Game.player.getMaxDmg()
		},
		getLevel() {
			return Game.player.cb.level
		},
		getRemainingXP() {
			return Game.player.remainingXP()
		},
		getPercentToLevel() {
			let costOfLevel = xp_levels[this.getLevel()] - xp_levels[this.getLevel() - 1]
			let expTowards = Game.player.cb.xp - xp_levels[this.getLevel() - 1]
			return expTowards / costOfLevel
		},
		getCurrentWeapon() {
			return Game.player.cb.equipment.weapon
		},
		getCurrentWeaponEnchantments() {
			if (this.getCurrentWeapon() !== null) {
				let enchantments = this.getCurrentWeapon().cb.enchantments
				if (enchantments.length === 0) return null
				else if (enchantments.length === 1) return enchantments[0].name
				else
					return enchantments.reduce((str, enchantment) => {
						return str + ', ' + enchantment.name
					}, '')
			} else {
				return null
			}
		},
		getCurrentSpell() {
			return Game.player.cb.currentSpell
		}
	}
}
</script>

<style>
</style>
