<template>
  <div id="game_overlay_view" :is="data.component" />
</template>

<script>
import NPCDialogue from '@/components/NPCDialogue'
export default {
	props: ['data'],
	components: {
		'npc-dialogue': NPCDialogue
		// NPC Dialog
		// Trading
		// Inventory
		// Skills
		// Map
	},
	name: 'game-overlay-view'
}
</script>

<style>
#game_overlay_view {
	width: 100%;
	height: 100%;
	z-index: 2;
	position: relative;
	background-color: #1e1f1f;
	border: 2px solid #4f4f4f;
	border-radius: 4px;
}
</style>
