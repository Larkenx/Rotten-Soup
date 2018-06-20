<template lang="html">
  <v-container fluid>
    <v-container v-show="playerSelected"  class="mt-3" id="main_container" :style="{'max-width': uiWidth+6, 'max-height': uiHeight+6}">
      <!--  Notifications -->
      <v-layout row v-if="unstableBuildMessage">
        <v-flex xs12>
          <v-alert color="yellow darken-4" type="warning" dismissible v-model="unstableBuildMessage">
            This build is unstable. A lot of working is going on under the hood. Expect lots of broken, weird things!
          </v-alert>
        </v-flex>
      </v-layout>
      <!-- Game Display and HUD-->
      <v-layout  row id="ui" :style="{'max-width': uiWidth, 'max-height': uiHeight}">
        <v-flex column :style="{'max-width': gameDisplayWidth}">
          <v-layout id="game_container_row" :style="{'max-height': gameDisplayHeight, 'max-width': gameDisplayWidth}">
            <game-overlay-view ref="gameOverlayView" />
            <div id="game_container" />
          </v-layout>
          <message-log v-if="playerSelected"></message-log>
        </v-flex>
        <hud v-if="playerSelected" :showEquipment="showFooter"></hud>
      </v-layout>
      <death-modal v-if="playerSelected"></death-modal>
    </v-container>
    <start-menu v-show="!playerSelected" v-on:spriteSelected="loadGame"></start-menu>
  </v-container>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
// components
import startMenu from '@/components/StartMenu.vue'
import gameDisplay from '@/components/GameDisplay.vue'
import itemTransferModal from '@/components/ItemTransferModal.vue'
import hud from '@/components/HUD.vue'
import deathModal from '@/components/DeathModal.vue'
import helpDialog from '@/components/HelpDialog.vue'
import gameOverlayView from '@/components/GameOverlayView.vue'

import messageLog from '@/components/MessageLog.vue'
// DEBUG: Imports to export to window
window.Game = Game
let { innerWidth, innerHeight } = window
let uiWidth = '1470px'
let uiHeight = '823px'
let showFooter = true
let gameDisplayWidth = '1024px'
let gameDisplayHeight = '640px'
if (innerWidth <= 1400 || innerHeight <= 800) {
	uiWidth = '1240px'
	uiHeight = '750px'
	showFooter = false
	gameDisplayWidth = '800px'
	gameDisplayHeight = '500px'
}

export default {
	name: 'Game',
	data() {
		return {
			mouseControls: false,
			loading: true,
			playerSelected: false,
			unstableBuildMessage: false,
			gameOverlayVisible: true,
			gameOverlayData: {},
			uiWidth,
			uiHeight,
			gameDisplayWidth,
			gameDisplayHeight,
			showFooter
		}
	},
	mounted() {
		window.addEventListener('resize', this.recomputeSize)
		this.loadGame(4219)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.recomputeSize)
	},
	components: {
		'game-overlay-view': gameOverlayView,
		'start-menu': startMenu,
		'game-display': gameDisplay,
		hud: hud,
		'item-transfer-modal': itemTransferModal,
		'death-modal': deathModal,
		'help-dialog': helpDialog,
		'message-log': messageLog
	},
	methods: {
		loadGame(id) {
			this.playerSelected = true
			Game.init(id, window)
			Game.log('Welcome to Rotten Soup!', 'information')
			Game.log('Press ? to view the controls.', 'player_move')
		},
		recomputeSize(evt) {
			console.log('resizing!')
			this.uiWidth = '1470px'
			this.uiHeight = '823px'
			this.showFooter = true
			this.gameDisplayWidth = '1024px'
			this.gameDisplayHeight = '640px'
			if (window.innerWidth <= 1400 || window.innerHeight <= 800) {
				this.uiWidth = '1240px'
				this.uiHeight = '750px'
				this.showFooter = false
				this.gameDisplayWidth = '800px'
				this.gameDisplayHeight = '500px'
			}
			Game.display.resize()
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
	padding: 0px;
}

#game_container {
	position: absolute;
	z-index: 1;
}

#ui {
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
