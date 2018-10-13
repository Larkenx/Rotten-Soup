<template>
	<div id="game_overlay_view" v-show="overlayVisible()" :is="overlayData.component" />
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
import NPCDialogue from '@/components/NPCDialogue'
import Inventory from '@/components/Inventory'
export default {
	components: {
		'npc-dialogue': NPCDialogue,
		inventory: Inventory
		// NPC Dialog
		// Trading
		// Inventory
		// Skills
		// Map
	},
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
