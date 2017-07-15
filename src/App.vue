<template>
    <v-container id="main_container">
        <v-layout row><h2>RottenSoup</h2></v-layout>
        <!-- Game Display and HUD-->
        <v-layout row>
            <game-display></game-display>
            <hud></hud>
        </v-layout>
        <!-- Inventory / Shop Modal -->
        <item-transfer-modal></item-transfer-modal>
        <!-- Death Modal-->
        <death-modal></death-modal>
        <!-- Github Logo -->
        <a id="git_logo" style="text-decoration: none;" href="https://github.com/Larkenx/Rotten-Soup">
            <v-btn icon ripple>
                <i i style="color: white; margin: auto;" class="fa fa-3x fa-github" aria-hidden="true"></i>
            </v-btn>
        </a>
    </v-container>
</template>

<script>
    import gameDisplay from './components/GameDisplay.vue';
    import itemTransferModal from './components/itemTransferModal.vue';
    import hud from './components/HUD.vue';
    import deathModal from './components/DeathModal.vue';

    export default {
        name: 'app',
        data () {
            return {
                player: null,
                actors: null,
            };
        },
        components: {
            'game-display': gameDisplay,
            'hud': hud,
            'item-transfer-modal': itemTransferModal,
            'death-modal' : deathModal,
        },
        created () {
            Game.init();
            this.player = Game.player;
            this.actors = Game.actors;
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
    @import url('https://fonts.googleapis.com/css?family=Droid+Sans+Mono|PT+Mono');
    * {
        font-family: "Droid Sans Mono";
    }

    #main_container {
        padding: 10px;
        height: 100%;
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

    .test {
        background-color: #824d03;
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
