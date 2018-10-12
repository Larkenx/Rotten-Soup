<template>
	<v-app dark class="black">
		<v-content>
			<router-view></router-view>
		</v-content>
		<v-footer app v-if="showFooter">
			<span class="pl-2">RottenSoup</span>
			<v-spacer />
			<v-tooltip top>
				<v-btn slot="activator" active-class="" @click.native="backToGame()" icon ripple>
					<v-icon>fa-gamepad</v-icon>
				</v-btn>
				<span>Play the game!</span>
			</v-tooltip>
			<v-tooltip top>
				<v-btn slot="activator" active-class="" to="/voronoi" icon ripple>
					<v-icon>map</v-icon>
				</v-btn>
				<span>Map Generator</span>
			</v-tooltip>
			<v-tooltip top>
				<v-btn slot="activator" target="_blank" href="https://github.com/Larkenx/Rotten-Soup" icon ripple>
					<v-icon>fab fa-github</v-icon>
				</v-btn>
				<span>The source code</span>
			</v-tooltip>
			<v-tooltip top>
				<v-btn slot="activator" target="_blank" href="https://twitter.com/stevenlarken" icon ripple>
					<v-icon>fab fa-twitter</v-icon>
				</v-btn>
				<span>Tweet tweet!</span>
			</v-tooltip>
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
import gameOverlayView from './components/GameOverlayView.vue'

import messageLog from './components/MessageLog.vue'
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
	name: 'app',
	data() {
		return {
			showFooter
		}
	},
	components: {},
	created() {},
	methods: {
		backToGame() {
			window.location.replace(window.location.origin)
		}
	}
}
</script>

<style>
.black {
	background-color: black;
}
</style>
