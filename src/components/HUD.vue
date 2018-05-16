<style>
.hud_tabs_card {
	background-color: #2a2a2a;
}

.hud_tab {
	background-color: #294646;
}

.hud {
	color: white;
	font-size: 13px;
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

<v-flex class="hud elevation-0" column style="max-width: 450px;">
    <v-container fluid class="pa-0">
          <!-- Health Bar -->
          <v-layout row align-center style="margin-bottom: -20px; margin-top: -10px">
              <v-flex style="min-width: 75px;" md1 col><b>Health </b></v-flex>
              <v-flex md4 col>
                  <v-progress-linear id="hpBar" color="error" :value="(getHP() / getMaxHP()) * 100" height="13"></v-progress-linear>
              </v-flex>
              <v-flex md3 col style="padding-left: 5px;">{{getHP()}} / {{getMaxHP()}}</v-flex>
      		<v-flex md1 >
      			<help-dialog></help-dialog>
      		</v-flex>
          </v-layout>

          <!-- Magic Bar -->
          <v-layout row align-center style="margin-bottom: -5px">
              <v-flex md1 style="min-width: 75px;" col><b>Magic</b></v-flex>
              <v-flex md4 col>
                  <v-progress-linear id="manaBar" :value="(getMana() / getMaxMana()) * 100" height="13" info></v-progress-linear>
              </v-flex>
              <v-flex md3 col style="padding-left: 5px;">{{getMana()}} / {{getMaxMana()}}</v-flex>
              <v-flex md1 >
      			<tool-dialog></tool-dialog>
      		</v-flex>
          </v-layout>


        <!-- Current World -->
        <v-layout row align-center>
            <v-flex xs5 col><b>Location: {{getCurrentLevel().capitalize()}}</b></v-flex>
            <v-flex v-if="getCurrentLevelDepth() > 0" col><b>Level: {{getCurrentLevelDepth()}}</b></v-flex>
        </v-layout>

        <!-- Mini-map -->
        <v-layout row class="text-xs-center" style="pa-1">
            <v-flex xs10 fluid id="minimap_container"></v-flex>
        </v-layout>

        <!-- Tabbed Menu (Stats, Enemies, Spellbook) -->
        <v-layout row>
            <v-tabs slider-color="yellow darken-4" :scrollable="false" grow v-model="activeTab" style="min-width: 400px; font-size: 11px;">
                <v-tab class="hud_tab" key="stats" href="#stats">
                    Stats
                </v-tab>
                <!-- <v-tab class="hud_tab" key="enemyOverview" href="#enemyOverview">
                    Enemies
                </v-tab> -->
                <v-tab class="hud_tab" key="spellBook" href="#spellBook">
                    Spellbook
                </v-tab>
                <v-tab-item class="hud_tabs_card" key="stats" id="stats">
                    <v-card style="background-color: inherit" flat height="120px">
                        <stats-tab-content></stats-tab-content>
                    </v-card>
                </v-tab-item>
                <!-- <v-tab-item key="enemyOverview" id="enemyOverview">
                    <v-card class="hud_tabs_card" flat height="120px">
                        <enemy-overview></enemy-overview>
                    </v-card>
                </v-tab-item> -->
                <v-tab-item class="hud_tabs_card" key="spellBook" id="spellBook">
                    <v-card style="background-color: inherit"  flat height="120px">
                        <spellbook></spellbook>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-layout>
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
