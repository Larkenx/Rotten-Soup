<template lang="html">
  <v-container class="pa-0" fill-height>
    <v-container class="pa-0" v-show="playerSelected">
      <!-- Game Display and HUD-->
      <v-layout fill-height justify-center style="max-height: 806px">
            <!-- <game-overlay-view ref="gameOverlayView" /> -->
            <span id="game_container"/>
            <hud v-if="playerSelected" />
      </v-layout>
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
    </v-container>
    <start-menu v-show="!playerSelected" v-on:spriteSelected="loadGame"></start-menu>
  </v-container>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
// components
import startMenu from '@/components/StartMenu.vue'
import altHud from '@/components/AlternateHUD/AltHud.vue'
import deathModal from '@/components/DeathModal.vue'
import gameOverlayView from '@/components/GameOverlayView.vue'
export default {
	name: 'AltGame',
	data() {
		return {
			navigateAwayModalActive: false,
			handleNavigateAway: () => {},
			mouseControls: false,
			playerSelected: false
		}
	},
	mounted() {
		if (window.location.host.includes('localhost')) this.loadGame(4219)
	},
	components: {
		'game-overlay-view': gameOverlayView,
		'start-menu': startMenu,
		hud: altHud,
		'death-modal': deathModal
	},
	methods: {
		loadGame(id) {
			this.playerSelected = true
			Game.init(id, { width: 1280, height: 800 })
			Game.log('Welcome to Rotten Soup!', 'information')
			Game.log('Press ? to view the controls.', 'player_move')
		},
		navigate(didNavigate) {
			this.navigateAwayModalActive = false
			this.handleNavigateAway(didNavigate)
		}
	},
	beforeRouteLeave(to, from, next) {
		this.navigateAwayModalActive = true
		this.handleNavigateAway = next
	}
}
</script>

<style>
.black {
	background-color: black;
}

html {
	overflow: hidden;
}

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
