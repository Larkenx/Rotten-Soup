<template>
	<v-layout id="console_container">
		<v-flex align-start>
			<v-layout wrap id="console" class="pt-3">
				<v-flex xs12 v-for="(message, index) in getMessages()" v-bind:key="index">
					<v-icon style="font-size: 14px;">fas fa-angle-right</v-icon><b class="pl-2" v-bind:style="{color : message[1]}">{{message[0]}}</b>
				</v-flex>
				<!-- Temporary log item for displaying info that isn't stored (examine text, or "this is blocked")  -->
				<v-flex xs12 v-for="(message, index) in getTempMessages()" :key="index+1*-1">
					<v-icon style="font-size: 14px;">fas fa-angle-left</v-icon><b class="pl-2" v-bind:style="{color : message[1]}">{{message[0]}}</b>
				</v-flex>
			</v-layout>
		</v-flex>
		<!-- <v-flex id="scroll_controls" class="text-xs-center" style="max-width: 27px">
			<v-layout>
				<v-flex xs12 class="text-xs-center">
					<v-icon class="scroll_controls" v-on:click="up()" small>fa-angle-up</v-icon>
				</v-flex>
			</v-layout>
			<v-layout style="height: 70px;" />
			<v-layout>
				<v-flex xs12 class="text-xs-center">
					<v-icon class="scroll_controls" v-on:click="down()" small>fa-angle-down</v-icon>
				</v-flex>
			</v-layout>
			<v-layout>
				<v-flex xs12 class="text-xs-center">
					<v-icon class="scroll_controls" v-on:click="resetOffset()" small>fa-angle-double-down</v-icon>
				</v-flex>
			</v-layout>
		</v-flex> -->
	</v-layout>
</template>

<script>
import { Game } from '#/Game.js'

/* import your actions here */
export default {
	name: 'message-log',
	data() {
		return {
			messages: Game.messageHistory,
			tempMessages: Game.tempMessages,
			offset: 0
		}
	},
	methods: {
		getTempMessages() {
			return this.tempMessages
		},
		getMessages() {
			return this.messages.slice(-15 + -this.offset + this.getTempMessages().length)
		},
		resetOffset() {
			this.offset = 0
		},
		down() {
			if (this.offset > 0) this.offset--
		},
		up() {
			if (this.offset < this.messages.length - 10) this.offset++
		}
	}
}
</script>

<style>
#console_container {
	/* border-top: 4px solid #4f4f4f; */
	background-color: #1e1f1f;
}

#console {
	font-size: 14px;
	font-style: normal;
	font-weight: normal;
	overflow: hidden;
	position: relative;
	background-color: inherit;
}

.scroll_controls {
	padding: 3px;
	cursor: pointer;
}

.scroll_controls:hover {
	cursor: pointer;
	border-radius: 4px;
	background-color: #4a5d69;
}

ul {
	padding: 0;
	list-style-type: none;
}
</style>
