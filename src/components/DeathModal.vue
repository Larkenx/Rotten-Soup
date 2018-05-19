<template>
  <v-dialog v-model="deathDialog" persistent max-width="400px">
    <v-card>
      <v-card-text class="text-xs-center">
        <h1 class="red--text lighten-1">You have died!</h1>
      </v-card-text>
      <v-card-text>
        <v-layout>
          <v-flex>
            <img src="static/images/tombstone.png" width="100px" height="100px" />
          </v-flex>
          <v-flex>
            You were level {{cb.level}}.
            Your strength was level {{cb.str}}.
            You knew {{cb.spells.length}} {{cb.spells.length > 1 ? "spells" : "spell"}}.
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-text>

      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="green darken-3" raised @click.stop="startNewGame()">Play Again</v-btn>
        <v-spacer />

      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
/* import other components here */
export default {
	data() {
		return {
			cb: Game.player.cb,
			deathDialog: true
		}
	},
	methods: {
		startNewGame() {
			location.reload()
		},
		playerIsDead() {
			if (Game.player) return Game.player.isDead()
			else return false
		}
	}
}
</script>
<style>
</style>
