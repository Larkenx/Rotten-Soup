<template>
    <!-- Death Modal -->
    <v-container class="modal elevation-24" v-if="playerIsDead()">
        <v-layout class="text-xs-center" row>
            <v-flex xs12><h2 class="red--text">You died</h2></v-flex>
        </v-layout>
        <v-layout>
            <v-flex class="text-xs-center" xs12>
                <v-btn block success dark class="flat" v-on:click.native="startNewGame()"
                       style="margin: 0 auto;"><b>Play Again?</b></v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import {Game} from '@/assets/js/game/Game.js'
    /* import other components here */
    export default {
        data() {
            return {
                player: Game.player,
            };
        },
        methods: {
            startNewGame() {
                location.reload();
            },
            playerIsDead() {
                return this.player.isDead();
            }
        },
    }
</script>
<style>
</style>
