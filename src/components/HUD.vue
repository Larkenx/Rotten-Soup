<template>
    <v-flex class="hud elevation-0" column>
        <!-- Health Bar -->
        <v-layout row align-center style=" margin-bottom: -10px;">
            <v-flex xs3 col><b>Health </b></v-flex>
            <v-flex xs6 col>
                <v-progress-linear :value="(getHP() / getMaxHP()) * 100" height="10"
                                   error></v-progress-linear>
            </v-flex>
            <v-flex xs4 col>{{getHP()}} / {{getMaxHP()}}</v-flex>
        </v-layout>
        <!-- Magic Bar -->
        <v-layout row align-center>
            <v-flex xs3 col><b>Magic</b></v-flex>
            <v-flex xs6 col>
                <v-progress-linear :value="(getMana() / getMaxMana()) * 100" height="10"
                                   info></v-progress-linear>
            </v-flex>
            <v-flex xs4 col>{{getMana()}} / {{getMaxMana()}}</v-flex>
        </v-layout>
        <!-- Mini-map -->
        <mini-map></mini-map>
        <!-- Enemies Description -->
        <enemy-overview></enemy-overview>
        <!-- Inventory -->
        <inventory></inventory>
    </v-flex>
</template>

<script>
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
        width: 32em;
    }
</style>
