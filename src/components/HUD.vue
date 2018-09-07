<style>
#hud_container .hud_tabs_card {
	background-color: #2a2a2a;
}

.hud_tab {
	background-color: #294646;
}

.hud_container {
	color: white;
	font-size: 13px;
	max-width: 440px;
	border-left: 4px solid #4f4f4f;
	background-color: #1e1f1f;
	z-index: 1;
	padding: 0px;
	/* margin-left: 20px; */
}

#hpBar {
	border: solid 2px hsl(0, 59%, 40%);
	border-radius: 2px;
}

#manaBar {
	border: solid 2px rgb(20, 99, 177);
	border-radius: 2px;
}

.statsBar {
	/*border : solid 2px goldenrod;*/
	/*border-radius: 2px;*/
}

.xpCircleFont {
	font-size: 5px;
}

#minimap_container > canvas {
	border: 2px solid #4f4f4f;
	background-color: #294646;
	border-radius: 4px;
}

/* .v-tab-card {
	min-height: 103px;
} */
</style>

<template>
	<v-flex class="hud_container elevation-0 pa-2" column>

			<!-- Health Bar -->
			<v-layout align-center style="margin-bottom: -20px; margin-top: -10px">
				<v-flex style="min-width: 75px;" md1 ><b>Health </b></v-flex>
				<v-flex md8>
					<v-progress-linear id="hpBar" color="error" :value="(getHP() / getMaxHP()) * 100" height="15"></v-progress-linear>
				</v-flex>
				<v-flex md3 class="text-xs-center" style="padding-left: 5px;">{{getHP()}} / {{getMaxHP()}}</v-flex>
				<v-flex>
					<help-dialog></help-dialog>
				</v-flex>
			</v-layout>

			<!-- Magic Bar -->
			<v-layout align-center>
				<v-flex md1 style="min-width: 75px;" ><b>Magic</b></v-flex>
				<v-flex md8 >
					<v-progress-linear id="manaBar" :value="(getMana() / getMaxMana()) * 100" height="15" info></v-progress-linear>
				</v-flex>
				<v-flex md3 class="text-xs-center" style="padding-left: 5px;">{{getMana()}} / {{getMaxMana()}}</v-flex>
				<v-flex>
					<tool-dialog></tool-dialog>
				</v-flex>
			</v-layout>

			<v-layout align-center class="mt-2">
				<v-flex xs8><b>Location:</b> {{getCurrentLevel().capitalize()}}</v-flex>
				<v-flex xs4 class="pl-3" v-if="getCurrentLevelDepth() > 0" ><b>Floor:</b> {{getCurrentLevelDepth()}}</v-flex>
			</v-layout>

			<!-- Mini-map -->
			<v-layout class="text-xs-center mt-2">
				<v-flex>
					<v-flex id="minimap_container"></v-flex>
				</v-flex>
			</v-layout>

			<v-layout class="mt-4 pa-1 ml-3" style="min-height: 145px;" v-if="showEquipment">
					<v-flex xs6 align-content-center class="pr-1">
						<v-layout>
							<v-flex md1 style="min-width: 75px;"> <b>Equipment</b></v-flex>
						</v-layout>
						<equipment></equipment>
					</v-flex>
					<v-flex xs6 class="pl-1">
						<v-layout>
							<v-flex md1 style="min-width: 75px;"> <b>Stats</b></v-flex>
						</v-layout>
						<stats></stats>
					</v-flex>
			</v-layout>

			<!-- Spells  -->
			<v-layout class="mt-4">
				<spellbook></spellbook>
			</v-layout>

			<!-- Inventory -->
			<v-layout class="mt-4">
				<inventory></inventory>
			</v-layout>
	</v-flex>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
import inventory from './Inventory.vue'
import enemyOverview from './EnemyOverview.vue'
import minimap from './Minimap.vue'
import stats from './HUD/Stats.vue'
import spellBook from './HUD/Spellbook.vue'
import equipment from './HUD/Equipment.vue'

import helpDialog from '@/components/HelpDialog.vue'
import toolDialog from '@/components/ToolDialog.vue'

export default {
	props: ['showEquipment'],
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
		}
	},
	components: {
		inventory: inventory,
		'enemy-overview': enemyOverview,
		'mini-map': minimap,
		stats: stats,
		spellbook: spellBook,
		'help-dialog': helpDialog,
		'tool-dialog': toolDialog,
		equipment: equipment
	},
	created() {}
}
</script>
