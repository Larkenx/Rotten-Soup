<template>
    <div>
        <v-tooltip right align-center>
            <span>Settings</span>
            <v-btn flat icon color="yellow darken-4" slot="activator" @click.stop="toolDialog=true">
                <v-icon>fa-cog</v-icon>
            </v-btn>
        </v-tooltip>
        <v-dialog v-model="toolDialog" max-width="400px" >
            <v-card>
                <v-card-text class="text-xs-center">
                    <h2>Settings</h2>
                </v-card-text>
                <v-card-text>
                    <v-layout row>
                        <v-flex>Enable Mouse Controls*</v-flex>
                        <span>
                          <v-switch color="yellow darken-4" v-model="mouseEnabled"></v-switch>
                        </span>
                    </v-layout>

                    <v-layout row>
                        <v-flex>Show HP Bars*</v-flex>
                        <span>
                          <v-switch color="yellow darken-4" @click.stop="toggleHPBars" v-model="userSettings.hpBars"></v-switch>
                        </span>
                    </v-layout>

                    <v-layout row>
                        <v-flex>Enable attacking animations*</v-flex>
                        <span>
                          <v-switch color="yellow darken-4" @click.stop="toggleAnimations" v-model="userSettings.animationsEnabled"></v-switch>
                        </span>
                    </v-layout>

                </v-card-text>
                <v-card-actions>
                    <small>* may cause performance issues</small>
                    <v-spacer></v-spacer>
                    <v-btn color="yellow darken-4" flat @click.stop="toolDialog=false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'

export default {
	name: 'help-dialog',
	data() {
		return {
			userSettings: Game.userSettings,
			toolDialog: false,
			mouseEnabled: false,
			showHPBars: Game.userSettings.hpBars,
			turnOffAnimation: false
		}
	},
	watch: {
		mouseEnabled(newState, oldState) {
			Game.player.mouseEnabled = newState
		}
	},
	methods: {
		toggleHPBars() {
			Game.userSettings.hpBars = !Game.userSettings.hpBars
		},
		toggleAnimations() {
			Game.userSettings.animationsEnabled = !Game.userSettings.animationsEnabled
		}
	}
}
</script>
