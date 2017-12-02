<template>
    <v-container>
        <v-layout row>
            <v-flex xs4><b>Learned Spells</b></v-flex>
        </v-layout>
        <v-layout row style="margin-top: 5px;">
            <v-flex
                xs1
                col
                v-on:click=""
                v-for="(spell, i) in getSpells()"
                v-bind:key="i"
            >
                <v-tooltip bottom align-center>
                    <p class="text-xs-center ma-0">
                        Cast {{spell.name}}<br />
                        {{spell.description}}
                    </p>
                    <img
                        v-bind:class="{selectedSpell : highlightSpell(spell), spell : ! highlightSpell(spell)}"
                        v-bind:src="getSpellSplashArt('conjuration', 'magic_dart')"
                        slot="activator"
                    />
                </v-tooltip>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import {Game} from '@/assets/js/game/Game.js'
export default {
    data () {
        return {
            spells : Game.player.cb.spells,
        };
    },
    methods : {
        highlightSpell(spell) {
            return Game.player.currentSpell === spell;
        },
        getSpellSplashArt(school, name) {
            return `../static/images/spells/${school}/${name}.png`;
        },
        getSpells() {
            return this.spells;
        }
    },
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
