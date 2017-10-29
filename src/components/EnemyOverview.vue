<template>
    <v-layout row wrap style="margin-left:10px;height: 100px;">
        <v-flex class="enemy_col"
                xs3
                col
                align-center
                v-for="(enemy, index) in getNearbyEnemies()"
                align-center
                row
                v-bind:key="index"
                v-tooltip:bottom="{html : enemy.getHoverInfo() }"
        >
            <v-layout row style="font-size: 11px; margin: 0px auto -10px 0px">
                {{enemy.name().capitalize()}}
            </v-layout>
            <v-layout row style="width: 100%; margin: 0 auto;">
                <v-progress-linear :value="(enemy.getHP() / enemy.getMaxHP()) * 100"
                                   height="4"
                                   error
                ></v-progress-linear>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    /* import other components here */
    export default {
        data ()  {
            return {
                player: Game.player,
                actors: Game.actors,
                enemies: Game.player.nearbyEnemies,
            }
        },
        methods : {
            getNearbyEnemies() {
                return Game.player.nearbyEnemies;33
            },
        },
        created () {
            this.actors = Game.actors
        }
    }
</script>
<style>
    .enemy_col {
        cursor: pointer;
        border: 2px solid #4f4f4f;
        background-color: #142929;
        border-radius: 4px;
        margin: 2px;
        max-height: 30px;
    }

    .enemy_col:hover {
        cursor: pointer;
        border: 2px solid #4f4f4f;
        background-color: #557081;
        border-radius: 4px;
        margin: 2px;
        max-height: 30px;
    }
</style>
