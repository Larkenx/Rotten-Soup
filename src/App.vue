<template>
    <v-app id="app">
        <v-container style="padding: 10px; height: 100%;">
            <v-layout row><h2>RottenSoup</h2></v-layout>
            <v-layout row>
                <game-display></game-display>
                <hud></hud>
            </v-layout>
            <!-- Inventory / Shop Modal -->
            <!-- <item-transfer-modal></item-transfer-modal> -->
            <!-- Github Logo -->
            <a id="git_logo" style="text-decoration: none;" href="https://github.com/Larkenx/Rotten-Soup">
                <v-btn icon ripple>
                    <i i style="color: white; margin: auto;" class="fa fa-3x fa-github" aria-hidden="true"></i>
                </v-btn>
            </a>
        </v-container>
    </v-app>
</template>

<script>
import gameDisplay from './components/GameDisplay.vue';
import itemTransferModal from './components/itemTransferModal.vue';
import hud from './components/HUD.vue';

export default {
    name: 'app',
    data () {
        return {
            player: null,
            actors: null,
        };
    },
    components : {
        'game-display' : gameDisplay,
        'hud' : hud,
    },
    computed () {
        return {
            inventory: Game.player.inventory,
            player: Game.player,
            actors: Game.map.actors
        }
    },
    methods: {
        getPlayerCoords() {
            return [Game.player.x, Game.player.y];
        },
        getSurroundingEnemies() {
            return Game.getNearbyEnemies();
        },
        startNewGame() {
            console.log("Starting new game...");
            $('#fix_scroll').empty();
            Game.init();
            $('#game_container').html(Game.display.getContainer());
            $('#minimap_container').html(Game.minimap.getContainer());
        },
    },
    created () {
        Game.init();
        this.player = Game.player;
        this.inventory = Game.player.inventory;
    },
    mounted () {
        $('#game_container').html(Game.display.getContainer());
        $('#minimap_container').html(Game.minimap.getContainer());
        Game.log("Welcome to Rotten Soup!", "information");
        Game.drawViewPort();
        Game.drawMiniMap();
        Game.refreshDisplay();
        setInterval(function () {
            Game.turn++;
            Game.updateDisplay();
        }, 500)
    },
}
</script>
<style>
    /*@import url('https://fonts.googleapis.com/css?family=Droid+Sans+Mono|PT+Mono');*/
    body {
        background-color: black;
        font-family: 'inconsolata';
    }

    #git_logo {
        position: absolute;
        padding: 10px;
        top: 0;
        right: 0;
    }

    .modal {
        border: 2px solid #3d3d3d;
        border-radius: 4px;
        background-color: black;
        color: white;
        /*width: 500px;*/
        padding: 10px;
        height: 600px;
        position: absolute;
        left: 40%;
        top: 5%;
        margin-left: -150px;
        z-index: 2;
        /*margin-top: -150px;*/
    }

    .inventory_row {
        margin-left: 10px;
    }

    .inventory_slot {
        margin: 2px;
        border: 2px solid #4f4f4f;
        background-color: #294646;
        border-radius: 4px;
        /*margin: 2px;*/
        min-width: 40px;
        min-height: 40px;
    }

    .inventory_slot:hover {
        background-color: #698394;
        cursor: pointer;
    }

    .inventory_image {
        /*position: absolute;*/
        /*clip: rect(0px,32px,32px,0px);*/
    }

    .selectedItem {
        background-color: green;
        margin: 2px;
        border: 2px solid #3d3d3d;
        border-radius: 4px;
        min-width: 40px;
        min-height: 40px;
    }

    .selectedItem:hover {
        background-color: #009e00;
        cursor: pointer;
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

    .test {
        background-color: #824d03;
    }

    ul {
        padding: 0;
        list-style-type: none;
    }

    canvas {
        padding: 0;
        margin: 0;
    }

    /* Overriding Vuetify's tool tip so that it is centered :) */
    [data-tooltip] {
        position: relative;
        text-align: center;
    }
</style>
