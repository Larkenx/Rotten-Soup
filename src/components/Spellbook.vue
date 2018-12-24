<style>
#spellbook {
	background-color: #303030;
}

#active_spell {
	background-color: #303030;
}

code {
	background-color: #424242;
	color: white;
}

.selected_spell {
	/* background-color: #294646 !important; */
	border-radius: 2px;
	border: 2px solid #f57f17 !important;
}

.active_spell_image {
	border: 2px solid #142ee9;
	margin: 2px;
	border-radius: 4px;
}

.unselected_spell {
	border: 2px solid #424242 !important;
	/* background-color: #294646 !important; */
	border-radius: 2px;
	cursor: pointer;
}
</style>


<template>
  <v-card class="pa-3">
    <!-- <v-layout justify-space-between>
			<v-flex>
				<v-card flat id="active_spell" height="250px" class="pa-1">
					<v-layout class="pa-1">
						<span class="headline pl-2" style="color: #535353">Active Spell</span>
					</v-layout>
					<v-layout wrap justify-space-around>
						<v-card class="ma-2 pa-2" width="300px">
							<v-layout fill-height column>
								<v-layout wrap align-content-center align-center justify-center>
									<v-flex>
										<img width="32px" height="32px" v-bind:src="getSpellSplashArt(selectedSpellSlot.spell.type.toLowerCase(), selectedSpellSlot.spell.splashArt)">
									</v-flex>
									<v-flex style="flex-grow: 1">
										<span>{{selectedSpellSlot.spell.name}}</span>
									</v-flex>
								</v-layout>
								<v-layout justify-center align-center column fill-height>
									<span class="pa-1">{{spell.hoverInfo}}</span>
								</v-layout>
							</v-layout>
						</v-card>
					</v-layout>
				</v-card>
			</v-flex>
    </v-layout>-->
    <v-layout justify-space-between>
      <v-flex>
        <v-card flat id="spellbook" height="750px" class="pa-1">
          <v-layout class="pa-1">
            <span class="headline pl-2" style="color: #535353">Spellbook</span>
            <v-spacer/>
            <span class="pr-233" style="color: #535353">press
              <code>e</code> or
              <code>⏎</code> to set active spell
            </span>
          </v-layout>
          <v-layout wrap>
            <v-flex xs4 v-for="(spell, index) in spells" :key="index">
              <v-card
                class="ma-2 pa-3"
                width="300px"
                height="200px"
                :class="{selected_spell: spell === selectedSpellSlot.spell, unselected_spell: spell !== selectedSpellSlot.spell}"
                @click.native="selectSpellAtIndex(index)"
              >
                <v-layout fill-height column>
                  <v-layout wrap align-content-center align-center justify-center>
                    <v-flex>
                      <img
                        :class="{active_spell_image: isActiveSpell(spell)}"
                        width="32px"
                        height="32px"
                        v-bind:src="getSpellSplashArt(spell.type.toLowerCase(), spell.splashArt)"
                      >
                    </v-flex>
                    <v-flex style="flex-grow: 1">
                      <span>{{spell.name}}</span>
                    </v-flex>
                  </v-layout>
                  <v-layout justify-center align-center column fill-height>
                    <span class="pa-2">{{spell.hoverInfo}}</span>
                  </v-layout>
                  <v-card-actions>
                    <v-chip
                      small
                      style="color: white"
                      color="#1e1f1f"
                    >{{spell.manaCost}} mana points</v-chip>
                    <v-spacer/>
                    <v-btn
                      v-if="!isActiveSpell(spell)"
                      small
                      flat
                      color="yellow darken-4"
                      @click.native="setActiveSpell(spell)"
                    >Select Spell</v-btn>
                    <v-btn v-else disabled small flat color="yellow darken-4">Active Spell</v-btn>
                  </v-card-actions>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
export default {
	name: 'spellbook',
	data() {
		return {
			spells: Game.player.cb.spells,
			selectedSpellSlot: Game.player.selectedSpellSlot,
			activeSpell: Game.player.cb.currentSpell
		}
	},
	methods: {
		getSpellSplashArt(school, name) {
			return `images/spells/${school}/${name}.png`
		},
		selectSpellAtIndex(index) {
			Game.player.selectSpellAtIndex(index)
		},
		setActiveSpell(spell) {
			Game.player.selectSpell(spell)
		},
		isActiveSpell(spell) {
			return Game.player.cb.currentSpell === spell
		}
	}
}
</script>
<style>
.spell {
	margin: 2px;
	max-width: 30px;
	height: 30px;
	cursor: pointer;
	border: 2px solid #4f4f4f;
	border-radius: 4px;
	background-color: #294646;
}

.spell:hover {
	background-color: #698394;
	cursor: pointer;
}

#spell_bar {
	margin-left: 18px;
}

.selectedSpell {
	margin: 2px;
	max-width: 30px;
	height: 30px;
	cursor: pointer;
	border: 2px solid #142ee9;
	border-radius: 4px;
	background-color: #294646;
}
</style>
