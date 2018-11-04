<template>
	<div id="console_container">
		<div v-for="(message, index) in messages" v-bind:key="index">
			<v-icon style="font-size: 14px;">fas fa-angle-right</v-icon><b class="pl-2" v-bind:style="{color : message[1]}">{{message[0]}}</b>
		</div>
		<!-- Temporary log item for displaying info that isn't stored (examine text, or "this is blocked")  -->
		<div v-for="(message, index) in tempMessages" :key="index+1*-1">
			<v-icon style="font-size: 14px;">fas fa-angle-left</v-icon><b class="pl-2" v-bind:style="{color : message[1]}">{{message[0]}}</b>
		</div>
	</div>
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
	mounted() {
		this.$watch('messages', () => {
			this.scrollToBottomConsole()
		})
		this.$watch('tempMessages', () => {
			this.scrollToBottomConsole()
		})
	},

	methods: {
		getTempMessages() {
			return this.tempMessages
		},
		getMessages() {
			return this.messages
		},
		resetOffset() {
			this.offset = 0
		},
		down() {
			if (this.offset > 0) this.offset--
		},
		up() {
			if (this.offset < this.messages.length - 10) this.offset++
		},
		scrollToBottomConsole() {
			const easeInOutQuad = (t, b, c, d) => {
				t /= d / 2
				if (t < 1) return (c / 2) * t * t + b
				t--
				return (-c / 2) * (t * (t - 2) - 1) + b
			}
			let elem = document.getElementById('console_container')
			const scrollTo = (element, to, duration) => {
				let start = element.scrollTop,
					change = to - start,
					currentTime = 0,
					increment = 30
				let animateScroll = () => {
					currentTime += increment
					var val = easeInOutQuad(currentTime, start, change, duration)
					element.scrollTop = val
					if (currentTime < duration) {
						setTimeout(animateScroll, increment)
					}
				}
				animateScroll()
			}
			scrollTo(elem, elem.scrollHeight, 600)
		}
	}
}
</script>

<style>
#console_container {
	overflow-y: hidden;
	width: 100%;
	min-height: 510px;
	max-height: 510px;
	background-color: #1e1f1f;
	font-size: 14px;
	font-style: normal;
	font-weight: normal;
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
