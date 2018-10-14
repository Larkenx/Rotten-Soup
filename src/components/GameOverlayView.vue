<template>
	<div id="game_overlay_view" v-show="overlayVisible()" :is="overlayData.component" />
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
import NPCDialogue from '@/components/NPCDialogue'
import inventoryEquipmentView from '@/components/AlternateHUD/InventoryEquipmentView'
export default {
	components: {
		'npc-dialogue': NPCDialogue,
		'inventory-equipment-view': inventoryEquipmentView
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
