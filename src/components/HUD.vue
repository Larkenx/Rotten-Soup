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

/* .v-tab-card {
	min-height: 103px;
} */
</style>

<template>
	<v-flex class="hud_container elevation-0" column>
	    <v-container fluid class="pa-2">
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

				<v-layout >
					<stats></stats>
				</v-layout>

	      <!-- Current World -->
	      <v-layout align-center class="mt-2">
          <v-flex xs6><b>Location:</b> {{getCurrentLevel().capitalize()}}</v-flex>
          <v-flex xs4 class="pl-3" v-if="getCurrentLevelDepth() > 0" ><b>Level:</b> {{getCurrentLevelDepth()}}</v-flex>
	      </v-layout>


	      <!-- Mini-map -->
	      <v-layout class="text-xs-center" >
          <v-flex xs10 fluid id="minimap_container"></v-flex>
	      </v-layout>

				<!--  Placeholder Row for stuff -->
				<v-layout class="pt-1" style="min-height: 145px;" v-if="showEquipment">
					<equipment></equipment>
				</v-layout>

				<!-- Spells  -->
				<v-layout >
					<spellbook></spellbook>
				</v-layout>

	      <!-- Inventory -->
				<v-layout class="mt-1">
					<inventory></inventory>
				</v-layout>
	    </v-container>
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
