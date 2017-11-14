<template>
    <v-flex class="hud elevation-0" column justify-center>

        <!-- Health Bar -->
        <v-container grid-list-md>
            <v-layout row align-center style=" margin-bottom: -10px;">
                <v-flex md2 col><b>Health </b></v-flex>
                <v-flex md5 col>
                    <v-progress-linear color="error" :value="(getHP() / getMaxHP()) * 100" height="10"></v-progress-linear>
                </v-flex>
                <v-flex md3 col>{{getHP()}} / {{getMaxHP()}}</v-flex>
            </v-layout>
        </v-container>


        <!-- Magic Bar -->
        <v-container grid-list-md>
            <v-layout row align-center>
                <v-flex md2 col><b>Magic</b></v-flex>
                <v-flex md5 col>
                    <v-progress-linear :value="(getMana() / getMaxMana()) * 100" height="10"
                                       info></v-progress-linear>
                </v-flex>
                <v-flex md3 col>{{getMana()}} / {{getMaxMana()}}</v-flex>
            </v-layout>
        </v-container>

        <!-- Mini-map -->
        <mini-map></mini-map>
        <!-- Enemies Description -->
        <enemy-overview></enemy-overview>
        <!-- Inventory -->
        <inventory></inventory>
    </v-flex>
</template>

<script>
    import {Game} from '@/assets/js/game/Game.js'

    import inventory from './Inventory.vue';
    import enemyOverview from './EnemyOverview.vue';
    import minimap from './Minimap.vue';
    export default {
        data() {
            return {
                player: Game.player,
                actors: Game.actors,
                rows: [1, 2, 3, 4],
            };
        },
        methods: {
            getHP () {
                return Game.player.cb.hp;
            },
            getMaxHP() {
                return Game.player.cb.maxhp;
            },
            getMana() {
                return Game.player.cb.mana;
            },
            getMaxMana() {
                return Game.player.cb.maxmana;
            },
        },
        components: {
            'inventory': inventory,
            'enemy-overview': enemyOverview,
            'mini-map': minimap,
        },
        created() {
            this.actors = Game.actors;
        }
    }
</script>
<style>
    .hud {
        color: white;
        font-size: 13px;
        margin-left: 20px;
    }

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
