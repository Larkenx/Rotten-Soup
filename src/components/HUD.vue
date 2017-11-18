<template>
    <v-layout fluid class="hud elevation-0" column>
        <!-- Health Bar -->
        <v-flex>
            <v-layout row align-center style=" margin-bottom: -40px;">
                <v-flex style="min-width: 75px;" md1 col><b>Health </b></v-flex>
                <v-flex md4 col>
                    <v-progress-linear
                        class="statsBar"
                        color="error"
                        :value="(getHP() / getMaxHP()) * 100"
                        height="10"
                   ></v-progress-linear>
                </v-flex>
                <v-flex md3 col style="padding-left: 5px;">{{getHP()}} / {{getMaxHP()}}</v-flex>
            </v-layout>
        </v-flex>

        <!-- Magic Bar -->
        <v-flex>
            <v-layout row align-center>
                <v-flex md1 style="min-width: 75px;" col><b>Magic</b></v-flex>
                <v-flex md4 col>
                    <v-progress-linear
                        class="statsBar"
                        :value="(getMana() / getMaxMana()) * 100"
                        height="10"
                        info
                    ></v-progress-linear>
                </v-flex>
                <v-flex md3 col style="padding-left: 5px;">{{getMana()}} / {{getMaxMana()}}</v-flex>
            </v-layout>
        </v-flex>


        <!-- Mini-map -->
        <mini-map></mini-map>
        <v-flex>
            <v-tabs :scrollable="false" grow v-model="activeTab"
                    style="max-width: 350px; margin-top: 10px; margin-bottom: 10px; font-size: 11px;">
                <v-tabs-bar class="cyan darken-4" dark>
                    <v-tabs-item key="stats" href="#stats" ripple>
                        Stats
                    </v-tabs-item>
                    <v-tabs-item key="enemyOverview" href="#enemyOverview" ripple >
                        Enemy Overview
                    </v-tabs-item>
                    <v-tabs-item key="spellBook" href="#spellBook" ripple >
                        Spellbook
                    </v-tabs-item>
                    <v-tabs-slider color="yellow"></v-tabs-slider>
                </v-tabs-bar>

                <v-tabs-items>
                    <v-tabs-content key="enemyOverview" id="enemyOverview" >
                        <v-card flat>
                            <enemy-overview></enemy-overview>
                        </v-card>
                    </v-tabs-content>

                    <v-tabs-content key="spellBook" id="spellBook" >
                        <v-card flat>
                            <v-container>
                                Nothing here yet :)
                            </v-container>
                        </v-card>
                    </v-tabs-content>

                    <v-tabs-content key="stats" id="stats" >
                        <v-card flat>
                            <stats-tab-content></stats-tab-content>
                        </v-card>
                    </v-tabs-content>
                </v-tabs-items>
            </v-tabs>
        </v-flex>

        <!-- Inventory -->
        <inventory></inventory>
    </v-layout>
</template>

<script>
    import {Game} from '@/assets/js/game/Game.js'
    import inventory from './Inventory.vue';
    import enemyOverview from './EnemyOverview.vue';
    import minimap from './Minimap.vue';
    import statsTabContent from './HUD/StatsTabContent.vue'
    export default {
        data() {
            return {
                activeTab: null,
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
            'stats-tab-content' : statsTabContent
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

    .statsBar {
        border : solid 2px goldenrod;
        border-radius: 2px;
    }

    .xpCircleFont {
        font-size: 5px;
    }
</style>
