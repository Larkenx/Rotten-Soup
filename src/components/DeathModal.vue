<template>
    <!-- Death Modal -->
    <v-container class="modal elevation-24" v-if="playerIsDead()" align-center>
           <pre>
                 _____  _____
                <     `/     |
                 >          (
                |   _     _  |
                |  |_) | |_) |
                |  | \ | |   |
                |            |
 ______.______%_|            |__________  _____
_/                                       \|     |
|                    Here lies
|_____.-._________      '@'   ____/|___________|
                |            |
                |            |
                |            |
                |            |
                |   _        <
                |__/         |
                 / `--.      |
               %|            |%
           |/.%%|          -< @%%%
           `\%`@|     v      |@@%@%%
         .%%%@@@|%    |    % @@@%%@%%%%
    _.%%%%%%@@@@@@%%_/%\_%@@%%@@@@@@@%%%%%%
    </pre>
        <v-layout>
            <v-btn success class="btn--light-flat-pressed" v-on:click.native="startNewGame()"
                   style="margin: 0 auto;"><b>Play Again?</b></v-btn>
        </v-layout>
    </v-container>
</template>
<script>
    /* import other components here */
    export default {
        data() {
            return {
                player : Game.player,
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
