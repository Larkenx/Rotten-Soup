<template>
	<v-layout align-center wrap fill-height id="hud_container" class="elevation-0 pa-2">
		<v-flex xs12>
			<v-layout wrap align-center justify-space-between style="font-size: 14px;">
				<v-flex xs5>
					<b>HP:</b>
				</v-flex>
				<v-flex xs7 class="text-xs-left pl-2">
					<b :style="getHPStyling()">{{getHP()}} </b>/ {{getMaxHP()}}
				</v-flex>
				<v-flex xs5>
					<b>Magic:</b>
				</v-flex>
				<v-flex xs7 class="text-xs-left pl-2">
					{{getMana()}} / {{getMaxMana()}}
				</v-flex>
				<v-flex xs5>
					<b>Location:</b>
				</v-flex>
				<v-flex xs7 class="text-xs-left pl-2">
					{{getCurrentLevel().capitalize()}}
				</v-flex>
				<v-flex xs5 v-if="getCurrentLevelDepth() > 0">
					<b>Floor:</b>
				</v-flex>
				<v-flex xs7 class="text-xs-left pl-2" v-if="getCurrentLevelDepth() > 0">
					{{getCurrentLevelDepth()}}
				</v-flex>
				<v-flex xs12>
					<v-layout class="text-xs-center mt-2">
						<v-flex>
							<v-flex id="minimap_container"></v-flex>
						</v-flex>
					</v-layout>
				</v-flex>
				<!-- Add active weapon & active spell -->
				<v-flex xs12>
				</v-flex>
			</v-layout>
		</v-flex>
		<v-flex xs12 class="mt-2" style="flex-grow: 1;">
			<v-layout fill-height wrap style="font-size: 14px;">
				<message-log></message-log>
			</v-layout>
		</v-flex>
		<v-flex xs12 style="align-self: flex-end">
			<v-layout justify-end align-center>
				<tool-dialog />
				<help-dialog />
			</v-layout>
		</v-flex>
	</v-layout>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
import helpDialog from '@/components/HelpDialog.vue'
import toolDialog from '@/components/ToolDialog.vue'
import messageLog from '@/components/MessageLog.vue'

export default {
	name: 'hud',
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
		'tool-dialog': toolDialog,
		'message-log': messageLog
	},
	created() {}
}
</script>

<style scoped>
#hud_container {
	color: white;
	font-size: 13px;
	background-color: #1e1f1f;
	z-index: 3;
	padding: 0px;
	min-width: 275px;
	max-width: 275px;
	min-height: 806px;
	max-height: 806px;
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