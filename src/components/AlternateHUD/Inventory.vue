<style scoped>
.selected_item {
	border: 2px solid #4f4f4f;
	background-color: #294646;
	border-radius: 4px;
}

.unselected_item {
	padding: 2px;
}

.unselected_item:hover {
	background-color: #5b6f7c;
	padding: 0px;
	border: 2px solid #4f4f4f;
	border-radius: 4px;
	cursor: pointer;
}

.picker {
	color: #636363;
}

/* .selectedItem {
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
} */
</style>

<template>
	<v-container fluid class="pa-0">
		<v-flex xs12 v-for="(cell, i) in getInventory()" v-bind:key="i">
			<v-layout wrap align-center :class="{selected_item: cell.selected , unselected_item: !cell.selected}" @click="cell.item.use()">
				<div>
					<img v-bind:src="getInventorySprite(cell.item.id)">
				</div>
				<div style="">
					<span class="pl-2">{{cell.item.name || cell.item.type}}</span>
				</div>
				<div style="flex-grow: 1">
					<span class="pl-2" style="color: #636363">{{cell.item.cb && cell.item.cb.equipped ? '[equipped]' : ''}}</span>
				</div>
			</v-layout>
		</v-flex>
		<v-dialog :v-model="anyContextMenuOpen()" :max-width="contextMenuWidth">
			<v-card :width="contextMenuWidth">
				<v-card-title>
					<v-layout justify-center>
						<span>{{selectedItemSlot.item.name || selectedItemSlot.item.type}}</span>
					</v-layout>
				</v-card-title>
				<v-layout class="pa-4" justify-flex-start align-center>
					{{ selectedItemSlot.item.hoverInfo()}}
				</v-layout>
				<v-card-actions>
					<v-spacer />
					<v-btn flat color="yellow darken-4">
						<span style="border-bottom: 1px solid #f57f17">D</span>rop
					</v-btn>
					<v-btn color="yellow darken-4">
						<span style="border-bottom: 1px solid #fff">
							{{selectedItemSlot.item.getAction().slice(0,1)}}
						</span>
						{{selectedItemSlot.item.getAction().substring(1)}}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'

/* import other components here */
export default {
	name: 'inventory',
	props: ['positioning'],
	data() {
		return {
			inventory: Game.player.inventory,
			selectedItemSlot: Game.player.selectedItemSlot,
			contextMenuOffset: 0,
			contextMenuWidth: 200,
			contextMenuHeight: 150,
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
		getContextMenuStyling() {
			let { left, top, width, height } = this.positioning
			return {
				zIndex: 1500,
				position: 'absolute',
				left: left + width / 2 - this.contextMenuWidth + 'px',
				top: top + this.contextMenuHeight / 2 + 'px',
				width: this.contextMenuWidth + 'px',
				height: this.contextMenuHeight + 'px'
			}
		},
		getSelectedItemSlot() {
			return this.selectedItemSlot
		},
		surroundFirstCharacterWithParens(s) {
			return `(${s.slice(0, 1)})` + s.substring(1)
		},
		anyContextMenuOpen() {
			console.log(
				this.inventory.reduce((p, v) => {
					return p || v.contextMenuOpen
				}, false)
			)
			return this.inventory.reduce((p, v) => {
				return p || v.contextMenuOpen
			})
		}
	}
}
</script>
