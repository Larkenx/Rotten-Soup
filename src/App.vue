<template>
    <v-app v-if="playerSelected" dark>
        <v-container fluid id="main_container">
            <!-- Game Display and HUD-->
            <v-layout row>
                <game-display></game-display>
                <hud></hud>
            </v-layout>
            <!-- Inventory / Shop Modal -->
            <item-transfer-modal></item-transfer-modal>
            <!-- Death Modal-->
            <death-modal></death-modal>

            <!-- Help Dialog -->
            <help-dialog></help-dialog>

            <!-- Mouse Controls Slider  -->
            <div class="mouse_controls">
                <v-layout row align-justify-center>
                    <v-flex xs4>
                        <v-switch
                        color="yellow darken-4"
                        v-model="player.mouseEnabled"
                        ></v-switch>
                    </v-flex>
                    <v-flex xs6 style="padding-left: 20px">
                        <v-icon>mouse</v-icon>
                    </v-flex>
                </v-layout>
            </div>

            <!-- Github Logo -->
            <a id="git_logo" style="text-decoration: none;" target="_blank"
               href="https://github.com/Larkenx/Rotten-Soup">
                <v-btn icon ripple>
                    <i i style="color: white; margin: auto;" class="fa fa-3x fa-github"
                       aria-hidden="true"></i>
                </v-btn>
            </a>

            <!-- Loading Indicator  -->
            <div v-if="loading" fluid class="loading">
                <v-progress-circular indeterminate v-bind:size="140" v-bind:width="7" color="yellow darken-4">Loading...</v-progress-circular>
            </div>

        </v-container>
    </v-app>
    <start-menu v-else v-on:spriteSelected="loadGame" v-bind="{Game}"></start-menu>
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
Window.Game = Game

export default {
	name: 'app',
	data() {
		return {
			Game,
			mouseControls: false,
			loading: true,
			playerSelected: false,
			player: null,
			actors: null
		}
	},
	components: {
		'start-menu': startMenu,
		'game-display': gameDisplay,
		hud: hud,
		'item-transfer-modal': itemTransferModal,
		'death-modal': deathModal,
		'help-dialog': helpDialog
	},
	created() {
		// Game.init()
		// this.player = Game.player
	},
	mounted() {},
	methods: {
		readyToLoadGame() {
			console.log(this.playerSelected)
			return this.playerSelected
		},
		loadGame(id) {
			console.log(id)
			this.playerSelected = true
			this.selectedSprite = id
			this.Game.init(this.selectedSprite)
			this.player = this.Game.player

			this.Game.log('Welcome to Rotten Soup!', 'information')
			this.Game.log('Press ? to view the controls.', 'player_move')
			this.Game.drawViewPort()
			this.Game.drawMiniMap()
			this.Game.refreshDisplay()

			setInterval(() => {
				Game.turn++
				Game.updateDisplay()
			}, 500)
			setTimeout(() => {
				document.getElementById('game_container').appendChild(this.Game.display.getContainer())
				document.getElementById('minimap_container').appendChild(this.Game.minimap.getContainer())
				this.loading = false
			}, 500)
		}
	}
}
</script>
<style>
    @import url('https://fonts.googleapis.com/css?family=Droid+Sans+Mono|PT+Mono');

    * {
        font-family: "Droid Sans Mono", monospace;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
    }

    #main_container {
        /*padding: 10px;*/
        /*height: 100%;*/
    }

    #help {
        position: absolute;
        /* left: 50; */
        right:0px;
        top: 0px;
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
