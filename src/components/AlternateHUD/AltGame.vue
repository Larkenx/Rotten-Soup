<template lang="html">
  <v-container class="pa-0" fill-height>
    <div class="pa-0" v-show="playerSelected">
		<div id="root_container">
			<!-- Game Display -->
			<div id="game_container" :style="getGameContainerStyling()" />
			<!-- The game overlay  -->
			<div id="game_overlay_view" 
				v-show="overlayVisible()" 
				:is="overlayData.component" 
				:style="getGameOverlayStyling()" 
			/>
			<!-- The HUD -->
			<div id="hud" :style="getHUDStyling()" v-if="playerSelected">
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
import inventoryEquipmentView from '@/components/AlternateHUD/InventoryEquipmentView.vue'
export default {
	name: 'AltGame',
	data() {
		return {
			width: 1280,
			hudWidth: 250,
			height: 800,
			footerHeight: 32,
			widthOffset: 0,
			heightOffset: 0,
			overlayOffset: 20,
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
		let { clientWidth, clientHeight } = document.documentElement
		let uiWidth = this.width + this.hudWidth
		this.widthOffset = clientWidth > uiWidth ? (clientWidth - uiWidth) / 2 : 0
		this.heightOffset = clientHeight > this.height ? (clientHeight - this.height) / 2 : 0
		Game.openInventory()
	},
	components: {
		'game-overlay-view': gameOverlayView,
		'npc-dialogue': NPCDialogue,
		'start-menu': startMenu,
		'inventory-equipment-view': inventoryEquipmentView,
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
		},
		getGameOverlayStyling() {
			return {
				left: this.widthOffset + this.overlayOffset + 'px',
				top: this.heightOffset + this.overlayOffset - this.footerHeight + 'px',
				width: this.width - this.overlayOffset * 4 + 'px',
				height: this.height - this.overlayOffset * 4 + 'px'
			}
		},
		getGameContainerStyling() {
			return {
				left: this.widthOffset + 0 + 'px',
				top: this.heightOffset - this.footerHeight + 'px'
			}
		},
		getHUDStyling() {
			return {
				left: this.widthOffset + this.width + this.borderWidth + 'px',
				top: this.heightOffset - this.footerHeight + 'px'
			}
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

#game_overlay_view {
	z-index: 1050;
	background-color: #1e1f1f;
	border: 2px solid #4f4f4f;
	border-radius: 4px;
}

canvas {
	border: 3px solid #4f4f4f;
	background-color: #1e1f1f;
	z-index: -1;
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
