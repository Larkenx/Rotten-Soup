<template>
    <v-container>
        <v-layout row>
            <v-flex xs4><b>Learned Spells</b></v-flex>
        </v-layout>
        <v-layout row wrap style="margin-top: 5px;">
            <v-flex
                xs1
                col
                v-for="(spell, i) in getSpells()"
                v-on:click="selectSpell(spell)"
                v-bind:key="i"
                style="margin: 4px;"
            >
                <v-tooltip bottom align-center>
                    <p class="text-xs-center ma-0" style="max-width: 200px">
                        Cast {{spell.name}} <br/>
                        Costs <b style="color: blue;">{{spell.manaCost}} Mana</b><br/>
                        {{spell.hoverInfo}}
                    </p>
                    <img
                        v-bind:class="{selectedSpell : highlightSpell(spell), spell : ! highlightSpell(spell)}"
                        v-bind:src="getSpellSplashArt(spell.type.toLowerCase(), spell.splashArt)"
                        slot="activator"
                    />
                </v-tooltip>
            </v-flex>
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
		selectSpell(spell) {
			Game.player.selectSpell(spell)
		}
	}
}
</script>
<style>
    .spell {
        cursor: pointer;
        border: 2px solid #4f4f4f;
        border-radius: 4px;
    }

    .selectedSpell {
        cursor: pointer;
        border: 2px solid #113BA7;
        border-radius: 4px;
    }
</style>
