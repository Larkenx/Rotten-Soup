<style>
#spellbook {
	background-color: #303030;
}

code {
	background-color: #424242;
}
</style>


<template>
    <v-card class="pa-3">
		<v-layout justify-space-between>
			<v-flex>
				<v-card flat id="spellbook" height="750px" class="pa-1">
					<v-layout class="pa-1">
						<span class="headline pl-2" style="color: #535353">Spellbook</span>
						<v-spacer />
						<span class="pr-233" style="color: #535353">
							press <code>e</code> to set active spell
						</span>
					</v-layout>
					<v-layout wrap justify-space-around>
						<v-card class="ma-2 pa-2" width="300px" v-for="(spell, index) in spells" :key="index">
							<v-layout fill-height column>
								<v-layout wrap align-content-center align-center justify-center>
									<v-flex>
										<img width="32px" height="32px" v-bind:src="getSpellSplashArt(spell.type.toLowerCase(), spell.splashArt)">
									</v-flex>
									<v-flex style="flex-grow: 1">
										<span>{{spell.name}}</span>
									</v-flex>
								</v-layout>
								<!-- <v-layout justify-center align-center column fill-height>
									<span class="pa-1">{{spell.hoverInfo}}</span>
								</v-layout> -->
							</v-layout>
						</v-card>
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
			spells: Game.player.cb.spells
		}
	},
	methods: {
		highlightSpell(spell) {
			return Game.player.cb.currentSpell === spell
		},
		getSpellSplashArt(school, name) {
			return `../static/images/spells/${school}/${name}.png`
		},
		getSpells() {
			return this.spells
		},
		fillerSpellSlots() {
			if (this.spells.length < 11) return 11 - this.spells.length

			return 0
		},
		selectSpell(spell) {
			Game.player.selectSpell(spell)
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
