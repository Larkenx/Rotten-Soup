<style scoped>
.inventory_row {
	margin-left: 10px;
}

.inventory_cell {
	margin: 2px;
	border: 2px solid #4f4f4f;
	background-color: #294646;
	border-radius: 4px;
	min-width: 40px;
	min-height: 40px;
	max-width: 40px !important;
	max-height: 40px !important;
}

.inventory_cell:hover {
	background-color: #698394;
	cursor: pointer;
}

.selectedItem {
	background-color: green;
	margin: 2px;
	border: 2px solid #3d3d3d;
	border-radius: 4px;
	min-width: 40px;
	min-height: 40px;
	max-width: 40px !important;
	max-height: 40px !important;
}

.selectedItem:hover {
	background-color: #009e00;
	cursor: pointer;
}
</style>

<template>
	<v-container fluid class="pa-0">
		<v-flex xs12 v-for="(cell, i) in getInventory()" v-bind:key="i">
			<v-layout wrap align-center>
				<img v-bind:src="getInventorySprite(cell.item.id)">
				{{cell.item.type}}
				{{cell.item.hoverInfo()}}
				<v-btn small flat color="blue" @click="useItem(cell, $event)">{{cell.item.getAction()}}</v-btn>
				<v-btn small flat color="red" @click="dropItem(cell, $event)">Drop</v-btn>
			</v-layout>
		</v-flex>
	</v-container>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'

/* import other components here */
export default {
	name: 'inventory',
	data() {
		return {
			inventory: Game.player.inventory,
			x: 0,
			y: 0
		}
	},
	created() {},
	methods: {
		getInventorySprite(id) {
			return `../static/images/inventory_sprites/${id}.png`
		},
		colorSlot(cell) {
			if (cell.item !== null && 'cb' in cell.item) {
				return cell.item.cb.equipped
			} else {
				return false
			}
		},
		swapInventorySlots(args) {
			const [oldIndex, newIndex, dragEvent] = args
			return Game.player.swapInventorySlots(oldIndex, newIndex)
		},
		useItem(cell, evt) {
			// drop cell.item
			if (evt.shiftKey) {
				cell.item.drop()
			} else {
				// use cell.item
				cell.item.use()
			}
		},
		dropItem(cell, evt) {
			// drop cell.item
			cell.item.drop()
		},
		getInventory() {
			this.inventory = Game.player.inventory
			return Game.player.inventory.filter(s => s.item !== null)
		},
		show(cell, e) {
			e.preventDefault()
			Game.player.inventory.forEach(slot => {
				slot.menu = false
			})
			this.x = e.clientX
			this.y = e.clientY
			this.$nextTick(() => {
				cell.menu = true
			})
		}
	}
}
</script>
