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

.v-expansion-panel__header {
	padding: 0px;
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
		<v-expansion-panel :value="selectedItemSlot.selectedInventoryItemIndex">
			<v-expansion-panel-content class="expansion_panel_header" v-for="(item, i) in inventory" :key="i">
				<v-layout slot="header" wrap align-center @click="selectItem(i)" >
					<div>
						<img v-bind:src="getInventorySprite(item.id)">
					</div>
					<div style="">
						<span class="pl-2">{{item.name || item.type}}</span>
					</div>
					<div style="flex-grow: 1">
						<span class="pl-2" style="color: #636363">{{item.cb && item.cb.equipped ? '[equipped]' : ''}}</span>
					</div>
				</v-layout>
				<v-card>
				<v-layout class="pa-4" justify-flex-start align-center>
					{{ item.hoverInfo()}}
				</v-layout>
				<v-card-actions>
					<v-spacer />
					<v-btn class="text-xs-center"  flat color="yellow darken-4" @click="dropSelectedItem()">
						<span style="border-bottom: 1px solid #f57f17">D</span>
						<span style="padding-bottom: 1px">rop</span>
					</v-btn>
					<v-btn v-if="item.getAction()" class="text-xs-center" color="yellow darken-4" @click="useSelectedItem()">
						<span style="border-bottom: 1px solid #fff">
							{{item.getAction().slice(0,1)}}
						</span>
						<span style="padding-bottom: 1px">{{item.getAction().substring(1)}}</span>
					</v-btn>
				</v-card-actions>
			</v-card>

			</v-expansion-panel-content>
		</v-expansion-panel>

		<!-- <v-flex xs12 v-for="(item, i) in inventory" v-bind:key="i">
			<v-layout wrap align-center :class="{selected_item: item === selectedItemSlot.item, unselected_item: item !== selectedItemSlot.item}" @click="selectItem(i)">
				<div>
					<img v-bind:src="getInventorySprite(item.id)">
				</div>
				<div style="">
					<span class="pl-2">{{item.name || item.type}}</span>
				</div>
				<div style="flex-grow: 1">
					<span class="pl-2" style="color: #636363">{{item.cb && item.cb.equipped ? '[equipped]' : ''}}</span>
				</div>
			</v-layout>
		</v-flex>
		<v-dialog v-model="selectedItemSlot.contextMenuOpen" :max-width="contextMenuWidth">
			<v-card v-if="selectedItemSlot.item !== null" :width="contextMenuWidth">
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
					<v-btn class="text-xs-center"  flat color="yellow darken-4" @click="dropSelectedItem()">
						<span style="border-bottom: 1px solid #f57f17">D</span>
						<span style="padding-bottom: 1px">rop</span>
					</v-btn>
					<v-btn v-if="selectedItemSlot.item.getAction()" class="text-xs-center" color="yellow darken-4" @click="useSelectedItem()">
						<span style="border-bottom: 1px solid #fff">
							{{selectedItemSlot.item.getAction().slice(0,1)}}
						</span>
						<span style="padding-bottom: 1px">{{selectedItemSlot.item.getAction().substring(1)}}</span>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog> -->
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
		useSelectedItem() {
			Game.player.useSelectedItem()
		},
		dropSelectedItem() {
			Game.player.dropSelectedItem()
		},
		selectItem(index) {
			console.log(index)
			Game.player.selectItemAtIndex(index)
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
		},
		selectedItem(item) {
			console.log(item === this.selectedItemSlot.item)
			return item === this.selectedItemSlot.item
		}
	}
}
</script>
