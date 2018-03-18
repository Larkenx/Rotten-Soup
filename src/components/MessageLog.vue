<template>
    <v-layout row style="padding: 5px 0 0 0; margin: 0px">
        <v-list id="console"
                style="overflow:hidden; padding-top: 8px; position: relative;">
            <li v-for="(message, index) in getMessages()" v-bind:key="index">
                <p><b v-bind:style="{color : message[1]}">{{message[0]}}</b></p>
            </li>
            <!-- Temporary log item for displaying info that isn't stored (examine text, or "this is blocked")  -->
            <li v-for="(message, index) in getTempMessages()">
                <p><b v-bind:style="{color : message[1]}">{{message[0]}}</b> </p>
            </li>
        </v-list>
    </v-layout>
</template>

<script>
import { Game } from '#/Game.js'

/* import your actions here */
export default {
	data() {
		return {
			player: Game.player,
			messages: Game.messageHistory,
			tempMessages: Game.tempMessages
		}
	},
	methods: {
		getTempMessages() {
			return this.tempMessages
		},
		getMessages() {
			return this.messages.slice(-10 + this.getTempMessages().length)
		}
	}
}
</script>

<style>

    #console {
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
