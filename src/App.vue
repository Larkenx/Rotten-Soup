

<template>

<v-app v-if="playerSelected" dark class="black">
    <v-container fluid id="main_container">
      <v-layout row v-if="unstableBuildMessage">
        <v-flex xs7>
          <v-alert color="yellow darken-4" type="warning" dismissible v-model="unstableBuildMessage">
            This build is unstable. A lot of working is going on under the hood! Expect lots of broken, weird things
          </v-alert>
        </v-flex>
      </v-layout>
        <!-- Game Display and HUD-->
        <v-layout row>
            <v-flex column style="max-width: 1120px;">
                <v-layout row style="padding: 0px;">
                    <!--<item-transfer-modal></item-transfer-modal>-->
                    <div style="margin:0; padding:0;" id="game_container">
                    </div>
                </v-layout>
                <message-log></message-log>
            </v-flex>
            <hud></hud>
        </v-layout>
        <!-- Inventory / Shop Modal -->
        <item-transfer-modal></item-transfer-modal>
        <!-- Death Modal-->
        <death-modal></death-modal>

        <!-- Help Dialog -->

        <!-- Mouse Controls Slider  -->
        <!-- <div class="mouse_controls">
            <v-layout row align-justify-center>
                <v-flex xs4>
                    <v-switch color="yellow darken-4" v-model="player.mouseEnabled"></v-switch>
                </v-flex>
                <v-flex xs6 style="padding-left: 20px">
                    <v-icon>mouse</v-icon>
                </v-flex>
            </v-layout>
        </div> -->

        <!-- Github Logo -->
        <a id="git_logo" style="text-decoration: none;" target="_blank" href="https://github.com/Larkenx/Rotten-Soup">
            <v-btn icon ripple>
                <i i style="color: white; margin: auto;" class="fa fa-3x fa-github" aria-hidden="true"></i>
            </v-btn>
        </a>

        <!-- Loading Indicator  -->
        <div v-if="loading" fluid class="loading">
            <v-progress-circular indeterminate v-bind:size="140" v-bind:width="7" color="yellow darken-4">Loading...</v-progress-circular>
        </div>

    </v-container>
</v-app>
<start-menu v-else v-on:spriteSelected="loadGame"></start-menu>

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

export default {
	name: 'app',
	data() {
		return {
			// Game: Game,
			mouseControls: false,
			loading: true,
			playerSelected: false,
			player: null,
			actors: null,
			unstableBuildMessage: true
		}
	},
	components: {
		'start-menu': startMenu,
		'game-display': gameDisplay,
		'hud': hud,
		'item-transfer-modal': itemTransferModal,
		'death-modal': deathModal,
		'help-dialog': helpDialog,
		'message-log': messageLog
	},
	created() {
		// this.loadGame(4693)
	},
	mounted() {},
	methods: {
		readyToLoadGame() {
			console.log(this.playerSelected)
			return this.playerSelected
		},
		loadGame(id) {
			this.selectedSprite = id
			// console.log(document.getElementById('game_container'))
			Game.init(this.selectedSprite)
			// this.player = Game.player
			Game.log('Welcome to Rotten Soup!', 'information')
			Game.log('Press ? to view the controls.', 'player_move')
      this.playerSelected = true
			setTimeout(() => {
				document.getElementById('minimap_container').appendChild(Game.minimap.getContainer())
				document.getElementById('game_container').appendChild(Game.display.getContainer())
			}, 200)
			setTimeout(() => {
				this.loading = false
			}, 500)
		}
	}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Droid+Sans+Mono|PT+Mono');
.black {
	background-color: black;
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
	/* Non-prefixed version, currently
    }

    #main_container {
        /*padding: 10px;*/
	/*height: 100%;*/
}

#git_logo {
	position: absolute;
	padding: 20px;
	bottom: 0px;
	right: 0px;
}

.mouse_controls {
	position: absolute;
	/* min-width: 200px; */
	bottom: 0px;
	left: 90%;
}

.loading {
	position: absolute;
	padding: 20px;
	/* min-width: 200px; */
	bottom: 50%;
	left: 25%;
}

.test {
	background-color: #824d03;
}

canvas {
	padding: 0;
	margin: 0;
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
