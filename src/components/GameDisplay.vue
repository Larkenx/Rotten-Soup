<template>
    <v-flex column>
        <!-- Game Display-->
        <v-layout row style="padding: 0px;"> <div style="margin:0; padding:0;" class="" id="game_container"></div></v-layout>
        <!-- Game Console / Messages -->
        <v-layout id="row2" row style="padding: 5px 0 0 0; margin: 0px">
            <v-list id="fix_scroll" class="console" style="overflow:hidden; padding-top: 8px; position: relative;">
                <v-list-item v-for="(message, index) in getMessages()" v-bind:key="index">
                    <p><b v-bind:style="{color : message[1]}">{{message[0]}}</b></p>
                </v-list-item>
            </v-list>
        </v-layout>
    </v-flex>
</template>

<script>
    /* import other components here */
    export default {
        data() {
            return {
                messages: Game.message_history,
            };
        },
        methods: {
            getMessages() {
                return this.messages;
            },
        },
    }

</script>
<style>
    .console {
        font-size: 13px;
        height: 175px;
        line-height: 0;
    }
</style>
