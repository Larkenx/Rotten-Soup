<template>
    <v-container fluid class="pa-0">
        <v-layout row>
            <v-flex xs4><b>Spells</b></v-flex>
        </v-layout>
        <v-layout row id="spell_bar">
            <div
                xs1
                v-for="(spell, i) in getSpells()"
                v-on:click="selectSpell(spell)"
                v-bind:class="{selectedSpell : highlightSpell(spell), spell : ! highlightSpell(spell)}"
                v-bind:key="i"
            >
                <v-tooltip bottom align-center>
                    <p class="text-xs-center ma-0" style="max-width: 200px">
                        Cast {{spell.name}} <br/>
                        Costs <b style="color: blue;">{{spell.manaCost}} Mana</b><br/>
                        {{spell.hoverInfo}}
                    </p>
                    <img
                        v-bind:src="getSpellSplashArt(spell.type.toLowerCase(), spell.splashArt)"
                        slot="activator"
                        width="26" height="26"
                    />
                </v-tooltip>
            </div>
            <div class="spell" xs1 v-for="(cell, i) in fillerSpellSlots()">
                <img width="26" height="26" style="opacity: 0.7" src="static/images/equipment_placeholders/bookmarklet.png" />
            </div>
        </v-layout>
    </v-container>
</template>
<script>
import { Game } from '@/assets/js/game/Game.js'
export default {
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
	/* margin: 2px; */
}

.selectedSpell {
	margin: 2px;
	max-width: 30px;
	height: 30px;
	cursor: pointer;
	border: 2px solid #4f4f4f;
	border-radius: 4px;
	background-color: #294646;
}
</style>
