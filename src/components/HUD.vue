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
	max-width: 450px;
	border: 2px solid #4f4f4f;
	background-color: #1e1f1f;
	border-radius: 4px;
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
          <v-layout row align-center style="margin-bottom: -20px; margin-top: -10px">
              <v-flex style="min-width: 75px;" md1 col><b>Health </b></v-flex>
              <v-flex md4 col>
                  <v-progress-linear id="hpBar" color="error" :value="(getHP() / getMaxHP()) * 100" height="15"></v-progress-linear>
              </v-flex>
              <v-flex md3 col style="padding-left: 5px;">{{getHP()}} / {{getMaxHP()}}</v-flex>
      		<v-flex md1>
      			<help-dialog></help-dialog>
      		</v-flex>
          </v-layout>

          <!-- Magic Bar -->
          <v-layout row align-center>
              <v-flex md1 style="min-width: 75px;" col><b>Magic</b></v-flex>
              <v-flex md4 col>
                  <v-progress-linear id="manaBar" :value="(getMana() / getMaxMana()) * 100" height="15" info></v-progress-linear>
              </v-flex>
              <v-flex md3 col style="padding-left: 5px;">{{getMana()}} / {{getMaxMana()}}</v-flex>
              <v-flex md1 >
      			<tool-dialog></tool-dialog>
      		</v-flex>
          </v-layout>

					<stats-tab-content></stats-tab-content>

        <!-- Current World -->
        <v-layout row align-center class="mt-4">
            <v-flex xs5 col><b>Location:</b> {{getCurrentLevel().capitalize()}}</v-flex>
            <v-flex v-if="getCurrentLevelDepth() > 0" col><b>Level: {{getCurrentLevelDepth()}}</b></v-flex>
        </v-layout>

        <!-- Mini-map -->
        <v-layout row class="text-xs-center" style="pa-1">
            <v-flex xs10 fluid id="minimap_container"></v-flex>
        </v-layout>

				<spellbook></spellbook>

        <!-- Inventory -->
        <inventory></inventory>

    </v-container>
</v-flex>

</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
import inventory from './Inventory.vue'
import enemyOverview from './EnemyOverview.vue'
import minimap from './Minimap.vue'
import statsTabContent from './HUD/StatsTabContent.vue'
import spellBook from './HUD/Spellbook.vue'
import helpDialog from '@/components/HelpDialog.vue'
import toolDialog from '@/components/ToolDialog.vue'

export default {
	data() {
		return {
			activeTab: null,
			currentLevel: Game.currentLevel,
			cb: Game.player.cb
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
			let levelName = Game.currentLevel.name.replace(/[0-9]/g, '')
			return levelName
		},
		getCurrentLevelDepth() {
			return parseInt(Game.currentLevel.name.replace(/[^0-9]/g, ''))
		}
	},
	components: {
		inventory: inventory,
		'enemy-overview': enemyOverview,
		'mini-map': minimap,
		'stats-tab-content': statsTabContent,
		spellbook: spellBook,
		'help-dialog': helpDialog,
		'tool-dialog': toolDialog
	},
	created() {}
}
</script>
