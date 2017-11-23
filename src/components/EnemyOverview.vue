<template>
    <v-container grid-list-xs style="min-height: 50px; margin-left: 10px;">
        <v-layout row wrap v-if="getNearbyEnemies().length > 0">
            <v-flex
                    class="enemy_col"
                    xs3
                    col
                    v-for="(enemy, index) in getNearbyEnemies()"
                    v-bind:key="index"
                    style="min-width: 50px;"
            >
                <v-tooltip bottom>
                    <span align-center>
                        HP : {{enemy.getHP()}} / {{enemy.getMaxHP()}}<br />
                        "{{enemy.description}}"<br />
                    </span>
                    <div slot="activator">
                            <v-layout class="text-xs-center"align-center row style="font-size: 10px; margin: 0px auto -10px 0px;" >
                                {{enemy.name.capitalize()}}
                            </v-layout>
                            <v-layout row style="margin: 0 auto;">
                                <v-progress-linear :value="(enemy.getHP() / enemy.getMaxHP()) * 100"
                                                   height="4"
                                                   color="error"
                                ></v-progress-linear>
                            </v-layout>
                    </div>
                </v-tooltip>
            </v-flex>
        </v-layout>
        <v-layout v-else row>
            <v-container>
                No enemies in view
            </v-container>
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
