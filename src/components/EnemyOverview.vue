<template>
    <v-container fluid style="min-height: 50px;">
        <v-layout row wrap v-if="getNearbyEnemies().length > 0">
            <v-flex

                    md4
                    col
                    v-for="(enemy, index) in getNearbyEnemies()"
                    v-bind:key="index"
            >
                <v-tooltip bottom>
                    <span align-center>
                        HP : {{enemy.cb.hp}} / {{enemy.cb.maxhp}}<br />
                        "{{enemy.description}}"<br />
                    </span>
                    <div class="enemy_col" fluid slot="activator">
                            <v-layout class="text-xs-center" align-center row style="font-size: 10px; margin: 0px auto -10px 0px;" >
                                <v-flex xs12>{{enemy.name.capitalize()}}</v-flex>
                            </v-layout>
                            <v-layout row style="margin: 0px;">
                                <v-flex xs12>
                                    <v-progress-linear :value="(enemy.cb.hp / enemy.cb.maxhp) * 100"
                                                       height="4"
                                                       color="error"
                                    ></v-progress-linear>
                                </v-flex>
                            </v-layout>
                    </div >
                </v-tooltip>
            </v-flex>
        </v-layout>
        <v-layout v-else row>
            <v-container fluid>
                No enemies in view
            </v-container>
        </v-layout>
    </v-container>

</template>

<script>
import { Game } from '@/assets/js/game/Game.js'

/* import other components here */
export default {
    data() {
        return {
            // player: Game.player,
            // enemies: Game.player.nearbyEnemies
        }
    },
    methods: {
        getNearbyEnemies() {
            return []
            // return Game.player.nearbyEnemies
        }
    },
    created() {}
}
</script>
<style>
.enemy_col {
    cursor: pointer;
    border: 2px solid #4f4f4f;
    background-color: #142929;
    border-radius: 4px;
    /* margin: 2px; */
    max-height: 35px;
}

.enemy_col:hover {
    cursor: pointer;
    border: 2px solid #4f4f4f;
    background-color: #557081;
    border-radius: 4px;
    /* margin: 2px; */
    max-height: 32px;
}
</style>
