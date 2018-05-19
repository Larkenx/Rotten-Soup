<template>
  <v-app dark class="black">
    <v-content>
      <v-container v-show="playerSelected" id="main_container">
          <!--  Notifications -->
          <v-layout row v-if="unstableBuildMessage">
            <v-flex xs12>
              <v-alert color="yellow darken-4" type="warning" dismissible v-model="unstableBuildMessage">
                This build is unstable. A lot of working is going on under the hood. Expect lots of broken, weird things!
              </v-alert>
            </v-flex>
          </v-layout>
          <!-- Game Display and HUD-->
          <v-layout class="mt-3" row id="ui">
            <v-flex column style="max-width: 1024px;">
              <v-layout id="game_container_row">
                <div id="game_container" />
              </v-layout>
              <message-log v-if="playerSelected"></message-log>
            </v-flex>
            <hud v-if="playerSelected"></hud>
          </v-layout>
          <death-modal v-if="playerSelected"></death-modal>
      </v-container>
      <start-menu v-show="!playerSelected" v-on:spriteSelected="loadGame"></start-menu>
    </v-content>
    <v-footer app>
      <small class="pl-2">RottenSoup</small>
      <v-btn target="_blank" href="https://github.com/Larkenx/Rotten-Soup" icon ripple>
        <v-icon>fa-github</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
// components
import startMenu from './components/StartMenu.vue'
import gameDisplay from './components/GameDisplay.vue'
import itemTransferModal from './components/ItemTransferModal.vue'
import hud from './components/HUD.vue'
import deathModal from './components/DeathModal.vue'
import helpDialog from './components/HelpDialog.vue'
import messageLog from './components/MessageLog.vue'
window.Game = Game
// DEBUG: Imports to export to window

export default {
	name: 'app',
	data() {
		return {
			mouseControls: false,
			loading: true,
			playerSelected: false,
			unstableBuildMessage: false
		}
	},
	components: {
		'start-menu': startMenu,
		'game-display': gameDisplay,
		hud: hud,
		'item-transfer-modal': itemTransferModal,
		'death-modal': deathModal,
		'help-dialog': helpDialog,
		'message-log': messageLog
	},
	created() {
		this.loadGame(4219)
	},
	mounted() {},
	methods: {
		loadGame(id) {
			this.playerSelected = true
			Game.init(id)
			Game.log('Welcome to Rotten Soup!', 'information')
			Game.log('Press ? to view the controls.', 'player_move')
		}
	}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Droid+Sans+Mono|PT+Mono');
.black {
	background-color: black;
}

html {
	overflow: hidden;
}

* {
	font-family: 'Droid Sans Mono', monospace;
	-webkit-touch-callout: none;
	/* iOS Safari */
	-webkit-user-select: none;
	/* Safari */
	-khtml-user-select: none;
	/* Konqueror HTML */
	-moz-user-select: none;
	/* Firefox */
	-ms-user-select: none;
	/* Internet Explorer/Edge */
	user-select: none;
}

#main_container {
	max-width: 1470px;
	max-height: 823px;
	padding: 0px;
}

#ui {
	max-width: 1470px;
	border: 3px solid #4f4f4f;
	background-color: #1e1f1f;
	border-radius: 4px;
}

#game_container_row {
	height: 640px;
	max-height: 640px;
}

.test {
	background-color: #824d03;
}

/* Overriding Vuetify's tool tip so that it is centered :) */

[data-tooltip] {
	position: relative;
	text-align: center;
}

.modal {
	border: 2px solid #3d3d3d;
	border-radius: 4px;
	background-color: black;
	color: white;
	width: 400px;
	padding: 10px;
	/*height: 600px;*/
	position: absolute;
	left: 20%;
	top: 25%;
	/*margin-left: -150px;*/
	z-index: 2;
	/*margin-top: -150px;*/
}
</style>
