<template>
    <v-layout class="hud elevation-0" column style="max-width: 450px;">
        <v-container grid-list-sm fluid>
            <!-- Health Bar -->
                <v-layout row align-center style="margin-bottom: -20px;">
                    <v-flex style="min-width: 75px;" md1 col><b>Health </b></v-flex>
                    <v-flex md4 col>
                        <v-progress-linear
                            id="hpBar"
                            color="error"
                            :value="(getHP() / getMaxHP()) * 100"
                            height="13"
                       ></v-progress-linear>
                    </v-flex>
                    <v-flex md3 col style="padding-left: 5px;">{{getHP()}} / {{getMaxHP()}}</v-flex>
                </v-layout>

            <!-- Magic Bar -->
                <v-layout row align-center>
                    <v-flex md1 style="min-width: 75px;" col><b>Magic</b></v-flex>
                    <v-flex md4 col>
                        <v-progress-linear
                            id="manaBar"
                            :value="(getMana() / getMaxMana()) * 100"
                            height="13"
                            info
                        ></v-progress-linear>
                    </v-flex>
                    <v-flex md3 col style="padding-left: 5px;">{{getMana()}} / {{getMaxMana()}}</v-flex>
                </v-layout>

            <!-- Current World -->
                <v-layout row align-center>
                    <v-flex xs5  col><b>Location: {{getCurrentLevel().capitalize()}}</b></v-flex>
                    <v-flex v-if="getCurrentLevelDepth() > 0" col><b>Level: {{getCurrentLevelDepth()}}</b></v-flex>
                </v-layout>

            <!-- Mini-map -->
            <mini-map></mini-map>

            <!-- Tabbed Menu (Stats, Enemies, Spellbook) -->
            <v-layout row>
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
                        <v-tabs-content key="stats" id="stats" >
                            <v-card flat class="v-tab-card">
                                <stats-tab-content></stats-tab-content>
                            </v-card>
                        </v-tabs-content>
                        <v-tabs-content key="enemyOverview" id="enemyOverview" >
                            <v-card flat class="v-tab-card">
                                <enemy-overview></enemy-overview>
                            </v-card>
                        </v-tabs-content>
                        <v-tabs-content key="spellBook" id="spellBook" >
                            <v-card flat class="v-tab-card">
                                <spellbook></spellbook>
                            </v-card>
                        </v-tabs-content>
                    </v-tabs-items>
                </v-tabs>
            </v-layout>
            <!-- Inventory -->
            <inventory></inventory>
        </v-container>
    </v-layout>
</template>

<script>
    import {Game} from '@/assets/js/game/Game.js'
    import inventory from './Inventory.vue';
    import enemyOverview from './EnemyOverview.vue';
    import minimap from './Minimap.vue';
    import statsTabContent from './HUD/StatsTabContent.vue'
    import spellBook from './HUD/Spellbook.vue'
    export default {
        data() {
            return {
                activeTab: null,
                currentLevel : Game.currentLevel,
                player: Game.player,
                x : Game.player.x,
                y : Game.player.y,
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
            getCurrentLevel() {
                let levelName = Game.player.currentLevel.replace(/[0-9]/g, "");
                return levelName;
            },
            getCurrentLevelDepth() {
                return parseInt(Game.player.currentLevel.replace(/[^0-9]/g, ""));
            }
        },
        components: {
            'inventory': inventory,
            'enemy-overview': enemyOverview,
            'mini-map': minimap,
            'stats-tab-content' : statsTabContent,
            'spellbook' : spellBook
        },
        created() {
            this.player = Game.player;
        }
    }
</script>
<style>
    .hud {
        color: white;
        font-size: 13px;
        margin-left: 20px;
    }

    #hpBar {
        border : solid 2px hsl(0, 59%, 40%);
        border-radius: 2px;
    }
    #manaBar {
        border : solid 2px rgb(20, 99, 177);;
        border-radius: 2px;
    }

    .statsBar {
        /*border : solid 2px goldenrod;*/
        /*border-radius: 2px;*/
    }

    .xpCircleFont {
        font-size: 5px;
    }

    .v-tab-card {
        min-height: 103px;
    }
</style>
