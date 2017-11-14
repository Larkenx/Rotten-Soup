<template>
    <v-container grid-list-xs fluid>
        <v-layout row wrap style="margin-left:10px; height: 100px;">
            <v-flex class="enemy_col"
                    xs1
                    col
                    justfy-center
                    v-for="(enemy, index) in getNearbyEnemies()"
                    v-bind:key="index"
            >
                <v-tooltip top>
                    <span align-center>
                        HP : {{enemy.getHP()}} / {{enemy.getMaxHP()}}<br />
                        DESC: "{{enemy.description()}}"<br />
                    </span>
                    <div slot="activator">
                        <v-layout class="text-xs-center" row style="font-size: 11px; margin: 0px auto -10px 0px;" >
                            {{enemy.name().capitalize()}}
                        </v-layout>
                        <v-layout row style="width: 100%; margin: 0 auto;">
                            <v-progress-linear :value="(enemy.getHP() / enemy.getMaxHP()) * 100"
                                               height="4"
                                               color="error"
                            ></v-progress-linear>
                        </v-layout>
                    </div>
                </v-tooltip>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import {Game} from '@/assets/js/game/Game.js'

    /* import other components here */
    export default {
        data ()  {
            return {
                player: Game.player,
                actors: Game.actors,
                enemies: Game.player.nearbyEnemies,
            }
        },
        methods: {
            getNearbyEnemies() {
                return Game.player.nearbyEnemies;
                33
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
