<template>
    <v-layout row style="padding: 5px 0 0 0; margin: 0px">
        <v-list id="fix_scroll" class="console"
                style="overflow:hidden; padding-top: 8px; position: relative;">
            <li v-for="(message, index) in getMessages()" v-bind:key="index">
                <p><b v-bind:style="{color : message[1]}">{{message[0]}}</b></p>
            </li>
        </v-list>
    </v-layout>
</template>

<script>
    import {Game} from '@/assets/js/game/Game.js'

    /* import your actions here */
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

<style scoped>

    .list {
        background-color: black;
    }

    .console {
        font-size: 14px;
        font-style: normal;
        font-weight: normal;
        background-color: black;
        height: 175px;
        line-height: 0;
    }

    ul {
        padding: 0;
        list-style-type: none;
    }
</style>
