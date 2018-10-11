<template lang="html">
  <v-container class="pa-0" fill-height>
    <div class="pa-0" v-show="playerSelected">
		<div id="root_container">
			<!-- Game Display -->
			<div id="game_container" />
			<!-- The game overlay  -->
			<div id="game_overlay_view" 
				v-show="overlayVisible()" 
				:is="overlayData.component" 
				:style="{ left: this.offset + 'px', top: this.offset + 'px', width: this.width - (this.offset*4) + 'px', height: this.height - (this.offset*4) + 'px'}" 
			/>
			<!-- The HUD -->
			<div id="hud" :style="{ left: this.width + this.borderWidth + 'px', top: '0px',}" v-if="playerSelected">
				<hud />
			</div>
		</div>
      <death-modal v-if="playerSelected"></death-modal>
	  <v-dialog v-model="navigateAwayModalActive" max-width="600px">
		  <v-card>
			<v-card-text class="text-xs-center">
				<h2 class="pa-1">Navigating Away</h2>
		  	</v-card-text>
			<v-card-text>
				If you navigate away, you will lose your progress with this game! Are you sure you want to navigate away?
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="yellow darken-4" raised @click.native="navigate(true)">Continue</v-btn>
				<v-btn color="yellow darken-4" flat @click.native="navigate(false)">Cancel</v-btn>
			</v-card-actions>
		</v-card>
	  </v-dialog>
    </div>
    <start-menu v-show="!playerSelected" v-on:spriteSelected="loadGame"></start-menu>
  </v-container>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
// components
import startMenu from '@/components/StartMenu'
import altHud from '@/components/AlternateHUD/AltHud'
import deathModal from '@/components/DeathModal'
import gameOverlayView from '@/components/GameOverlayView'
import NPCDialogue from '@/components/NPCDialogue'
export default {
	name: 'AltGame',
	data() {
		return {
			width: 1280,
			height: 800,
			offset: 20,
			borderWidth: 6,
			navigateAwayModalActive: false,
			handleNavigateAway: () => {},
			mouseControls: false,
			playerSelected: false,
			overlayData: Game.overlayData
		}
	},
	mounted() {
		if (window.location.host.includes('localhost')) this.loadGame(4219)
	},
	components: {
		'game-overlay-view': gameOverlayView,
		'npc-dialogue': NPCDialogue,
		'start-menu': startMenu,
		hud: altHud,
		'death-modal': deathModal
	},
	methods: {
		loadGame(id) {
			this.playerSelected = true
			Game.init(id, { width: this.width, height: this.height })
			Game.log('Welcome to Rotten Soup!', 'information')
			Game.log('Press ? to view the controls.', 'player_move')
		},
		navigate(didNavigate) {
			this.navigateAwayModalActive = false
			this.handleNavigateAway(didNavigate)
		},
		overlayVisible() {
			return Game.overlayData.visible
		}
	},
	beforeRouteLeave(to, from, next) {
		this.navigateAwayModalActive = true
		this.handleNavigateAway = next
	}
}
</script>

<style>
* {
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

#root_container > div {
	position: absolute;
}

#game_container {
	left: 0px;
	top: 0px;
}

#game_overlay_view {
	top: 0;
	left: 0;
	z-index: 1050;
	background-color: #1e1f1f;
	border: 2px solid #4f4f4f;
	border-radius: 4px;
}

canvas {
	border: 3px solid #4f4f4f;
	background-color: #1e1f1f;
	/* border-radius: 4px; */
}

.ui {
	border: 3px solid #4f4f4f;
	background-color: #1e1f1f;
	border-radius: 4px;
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
	z-index: 5;
	/*margin-top: -150px;*/
}
</style>
