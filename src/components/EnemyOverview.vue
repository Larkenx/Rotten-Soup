<template>
    <v-layout row wrap style="margin-left:10px;height: 100px;">
        <v-flex class="enemy_col" xs2 col align-center v-for="(enemy, index) in getSurroundingEnemies()" align-center row v-bind:key="index" v-tooltip:bottom="{html : enemy.getHoverInfo() }">
            <v-layout row  style="font-size: 11px; margin: 0px auto -10px 0px">{{enemy.name().capitalize()}}</v-layout>
            <v-layout row  style="width: 100%; margin: 0 auto;"><v-progress-linear :value="(enemy.getHP() / enemy.getMaxHP()) * 100" height="4" error></v-progress-linear></v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    /* import other components here */
    export default {
        data() {
            return {
            };
        },
        computed () {
            return {
            }
        },
        methods: {
            getSurroundingEnemies() {
                return Game.getNearbyEnemies();
            },
        },
    }

</script>
<style>
</style>
