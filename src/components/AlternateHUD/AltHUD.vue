<template>
    <v-flex id="hud_container" class="elevation-0 pa-2">
        <v-layout wrap align-center justify-space-around>
            <v-flex xs6>
                <b>HP:</b>
            </v-flex>
            <v-flex xs6>
                <b :style="getHPStyling()">{{getHP()}} </b>/ {{getMaxHP()}}
            </v-flex>
            <v-flex xs6>
                <b>Magic:</b>
            </v-flex>
            <v-flex xs6>
                {{getMana()}} / {{getMaxMana()}}
            </v-flex>
            <v-flex xs6>
                <b>Location:</b>
            </v-flex>
            <v-flex xs6>
                {{getCurrentLevel().capitalize()}}
            </v-flex>
            <v-flex xs6 v-if="getCurrentLevelDepth() > 0">
                <b>Floor:</b>
            </v-flex>
            <v-flex xs6 v-if="getCurrentLevel() > 0">
                {{getCurrentLevelDepth()}}
            </v-flex>
        </v-layout>
    </v-flex>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
import helpDialog from '@/components/HelpDialog.vue'
import toolDialog from '@/components/ToolDialog.vue'

export default {
	data() {
		return {
			activeTab: null,
			currentLevel: Game.currentLevel,
			cb: Game.player.cb,
			equipment: Game.player.cb.equipment // head, torso, legs, weapon, ammo
		}
	},
	methods: {
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
		getCurrentLevel() {
			let levelName = Game.currentLevel.name
			return levelName
		},
		getCurrentLevelDepth() {
			return Game.currentLevel.depth
		},
		getHPStyling() {
			let hpPercentage = this.getHP() / this.getMaxHP()
			let style = {
				color: 'white'
			}
			if (hpPercentage === 1) {
				style.color = 'white'
			} else if (hpPercentage >= 0.75) {
				style.color = 'darkgreen'
			} else if (hpPercentage >= 0.6) {
				style.color = 'lightgreen'
			} else if (hpPercentage >= 0.4) {
				style.color = 'yellow'
			} else if (hpPercentage >= 0.2) {
				style.color = 'lightred'
			} else {
				style.color = 'darkred'
			}
			return style
		}
	},
	components: {
		'help-dialog': helpDialog,
		'tool-dialog': toolDialog
	},
	created() {}
}
</script>

<style>
#hud_container {
	color: white;
	font-size: 13px;
	background-color: #1e1f1f;
	z-index: 3;
	padding: 0px;
	min-width: 250px;
	border: 3px solid #4f4f4f;
	background-color: #1e1f1f;
	/* margin-left: 20px; */
}

/* #hpBar {
	border: solid 2px hsl(0, 59%, 40%);
	border-radius: 2px;
}

#manaBar {
	border: solid 2px rgb(20, 99, 177);
	border-radius: 2px;
} */
</style>