<template>
  <v-card class="pa-4 ma-4">
    <v-card-title class="display-1">
      {{dialogueData.title}}
    </v-card-title>
    <v-card-text class="headline">
      {{dialogueData.text}}
    </v-card-text>
    <v-card-text>
      <v-layout wrap>
        <v-flex xs12 class="ma-1" v-for="(option, index) in dialogueData.choices" :key="index">
          <v-layout align-center>
            <v-flex xs1  style="max-width: 35px">
              <span v-if="index === selectedChoice" class="pa-1 headline" style="margin: auto; font-weight: bold;">{{'>'}}</span>
            </v-flex>
            <v-flex xs11 :class="{dialogue_choice: index === selectedChoice, selected_dialogue_choice: index !== selectedChoice}">
              <span class="pa-2 headline">
                <span class="pr-2 white--text">
                  <span class="yellow--text darken-4">{{index+1}}</span>)
                </span>
                {{option}}
              </span>
            </v-flex>
        </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
	// props: ['dialogueData'],
	mounted() {
		window.addEventListener('keydown', evt => {
			const { keyCode } = evt
		})
	},
	data() {
		return {
			dialogueData: {
				title: 'Leonard',
				text: 'You must be the adventurer we sent for. Take this key and clear out anything you find down there!',
				choices: ['Sure!', 'No thanks.']
			},
			selectedChoice: 0
		}
	},
	changeChoice(index) {
		this.selectedChoice = index
	}
}
</script>

<style lang="css">
.dialogue_choice {
  border: 2px solid #4f4f4f;
  background-color: #294646;
  border-radius: 4px;
}

.dialogue_choice:hover {
  background-color: #698394;
  cursor: pointer;
}

.selected_dialogue_choice {
  border: 2px solid #4f4f4f;
  background-color: #294646;
  border-radius: 4px;
}

.selected_dialogue_choice:hover {
  background-color: #698394;
  cursor: pointer;
}
</style>
