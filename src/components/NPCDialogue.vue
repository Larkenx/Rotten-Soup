<template>
  <v-card class="pa-4 ma-4" v-if="overlayData.visible">
    <v-card-title class="display-1">
      {{getDialogue().getTitle()}}
    </v-card-title>
    <v-card-text class="headline">
      {{getDialogue().getText()}}
    </v-card-text>
    <v-card-text>
      <v-layout wrap>
        <v-flex xs12 class="ma-1" v-for="(choice, index) in getDialogue().getChoices()" :key="index">
          <v-layout align-center>
            <v-flex xs1  style="max-width: 35px">
              <span v-if="index === getDialogue().selectedChoice" class="pa-1 headline" style="margin: auto; font-weight: bold;">{{'>'}}</span>
            </v-flex>
            <v-flex xs11 :class="{dialogue_choice: index !== getDialogue().selectedChoice, selected_dialogue_choice: index === getDialogue().selectedChoice}" @click="">
              <span class="pa-2 headline">
                <span class="pr-2 white--text">
                  <span class="yellow--text darken-4">{{index+1}}</span>)
                </span>
                <span :class="{'grey--text': choice.visited}">
                  {{choice.text}}
                </span>
              </span>
            </v-flex>
        </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'

export default {
	data() {
		return {
			overlayData: Game.overlayData,
			dialogue: Game.overlayData.dialogue
		}
	},
	methods: {
		getDialogue() {
			return Game.overlayData.dialogue
		}
	}
}
</script>

<style lang="css">
.dialogue_choice {
  padding: 10px;
  border: 2px solid #4f4f4f;
  background-color: #294646;
  border-radius: 4px;
}

/* .dialogue_choice:hover {
  background-color: #698394;
  cursor: pointer;
} */

.selected_dialogue_choice {
  padding: 10px;
  border: 2px solid #f57f17;
  background-color: #294646;
  border-radius: 4px;
}

/* .selected_dialogue_choice:hover {
  background-color: #698394;
  cursor: pointer;
} */
</style>
