<template>
  <div id="death">
    <v-dialog v-if="playerIsDead()" v-model="deathDialog" persistent max-width="600px">
      <v-card>
        <v-card-text class="text-xs-center">
          <h1 class="red--text lighten-1">
            You have died!
          </h1>
        </v-card-text>
        <v-card-text>
          <v-layout>

            <v-flex id="death_text">
              You played for {{cb.turnsTaken}} turns.
              <p />

              You were level {{cb.level}}.
              Your strength was level {{cb.str}}.
              <p />

              You knew {{formatNoOrMultiple("spell", cb.spells.length, "spells")}}.
              You casted {{formatNoOrMultiple("spell", cb.spellsCast, "spells")}}.
              <p />

              You dealt {{cb.damageDealt}} damage. You received {{cb.damageTaken}} damage.
              <p />

              You recovered {{formatNoOrMultiple("heath point", cb.healthRestored, "health points")}}.
              You consumed {{formatNoOrMultiple("potion", cb.potionsConsumed, "potions")}}.
              <p />

              You defeated {{formatNoOrMultiple("enemy", cb.enemiesKilled, "enemies")}}.
              <p />

              You explored {{formatNoOrMultiple("dungeon floor", cb.dungeonsExplored, "dungeon floors")}}.
              You looted {{formatNoOrMultiple("treasure chest", cb.chestsOpened, "treasure chests")}}.
              <p />

            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <img src="static/images/death_icons/tombstone.png" width="100px" height="100px" />
          <v-spacer />
          <v-btn color="green darken-3" raised @click.stop="startNewGame()">Play Again</v-btn>
          <v-spacer />
          <img src="static/images/death_icons/hasty-grave.png" width="120px" height="100px" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
/* import other components here */
export default {
	data() {
		return {
			cb: Game.player.cb,
			dead: Game.player.cb.dead,
			deathDialog: true
		}
	},
	methods: {
		startNewGame() {
			location.reload()
		},
		formatNoOrMultiple(s, n, pluralString) {
			return `${n === 0 ? 'no' : n} ${n === 1 ? s : pluralString}`
		},
		playerIsDead() {
			return Game.player.isDead()
		}
	}
}
</script>
<style>
#death {
	z-index: 12500;
}
</style>
