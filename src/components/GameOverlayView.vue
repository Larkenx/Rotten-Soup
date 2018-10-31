<template>
	<div id="game_overlay_view" v-show="overlayVisible()" :is="overlayData.component" />
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'

export default {
	name: 'game-overlay-view',
	data() {
		return {
			overlayData: Game.overlayData
		}
	},
	methods: {
		overlayVisible() {
			return Game.overlayData.visible
		}
	}
}
</script>

<style>
</style>
