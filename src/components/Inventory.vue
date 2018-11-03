<style>
.selected_item {
	/* background-color: #294646 !important; */
	border-radius: 2px;
	border: 2px solid #f57f17 !important;
}

.unselected_item {
	border: 2px solid #424242 !important;
	/* background-color: #294646 !important; */
	border-radius: 2px;
	cursor: pointer;
}

.picker {
	color: #535353;
}

div.v-expansion-panel__header {
	padding: 4px 8px;
}

#panel_list {
	max-height: 750px;
	min-height: 750px;
	overflow-y: auto;
	background-color: #303030;
}

#selected_item {
	background-color: #303030;
}

#equipment {
	background-color: #303030;
}

#status {
	background-color: #303030;
}

#inventory_container {
	margin: 2px;
	max-height: 750px;
	min-height: 750px;
	border-radius: 2px;
}

code {
	background-color: #424242;
	color: white;
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
	background-color: #009e00;2
	cursor: pointer;
} */
</style>

<template>
	<v-layout justify-space-between style="max-height: 750px; min-height: 750px;">
		<v-flex xs7 id="inventory_container">
			<v-card flat id="panel_list" class="pa-1">
				<v-layout class="pa-1">
					<span class="headline pl-2" style="color: #535353">Inventory</span>
					<v-spacer />
					<span class="pr-233" style="color: #535353">
						press <code>d</code> to drop. press <code>e</code> to interact
					</span>
				</v-layout>
				<v-layout v-for="(index, row) in Math.ceil(inventory.length / 3)" :key="row" justify-start style="margin-left: 25px;">
					<v-card :id="`panel-${row*3 + i}`" :class="{selected_item: item === selectedItemSlot.item, unselected_item: item !== selectedItemSlot.item}" class="ma-2" width="200px" v-for="(item, i) in inventory.slice(row*3, (row+1)*3)" :key="row*3 + i" @click.native="selectItem(row*3 + i)">
						<v-layout class="pa-2" wrap align-center justify-center>
							<v-flex>
								<img width="25px" height="25px" v-bind:src="getInventorySprite(item.id)">
							</v-flex>
							<v-flex class="pl-1" style="flex-grow: 1">
								<span>{{item.name || item.type}}</span>
							</v-flex>
						</v-layout>
					</v-card>
				</v-layout>
			</v-card>
		</v-flex>
		<v-flex xs5 justify-center>
			<v-layout column class="pa-0" fill-height>
				<v-layout class="mb-2" justify-center style="max-height: 325px">
					<div>
						<v-card flat width="475px" id="selected_item" class="pa-1">
							<v-layout class="pa-1">
								<span class="headline pl-2" style="color: #535353">Selected Item</span>
							</v-layout>
							<v-card width="450px" class="ma-2" v-if="selectedItemSlot.item !== null">
								<v-layout class="pa-2" wrap align-center>
									<v-flex>
										<img width="32px" height="32px" v-bind:src="getInventorySprite(selectedItemSlot.item.id)">
									</v-flex>
									<v-flex class="pl-12" style="flex-grow: 1">
										<span>{{selectedItemSlot.item.name || selectedItemSlot.item.type}}</span>
									</v-flex>
								</v-layout>
								<v-layout class="pa-2" wrap align-center>
									<v-chip small class="text-xs-center mr-2" style="color: white" color="#1e1f1f" v-for="(chip, index) in selectedItemSlot.item.hoverInfo()" :key="index">
										<b>
											{{chip.attribute}}
										</b>
										<span class="ml-1" style="height: 24px; width: 2px; background-color: #333333" />
										<v-tooltip top v-if="chip.value" style="z-index: 1200;">
											<span slot="activator" class="pl-1 white--text text--darken-4">
												{{ trimString(chip.value, 45)}}
											</span>
											{{ chip.value}}
										</v-tooltip>
									</v-chip>
								</v-layout>
								<v-card-actions>
									<v-spacer />
									<v-btn small class="text-xs-center" flat color="yellow darken-4" @click="dropSelectedItem()">
										Drop
									</v-btn>
									<v-btn small v-if="selectedItemSlot.item.getAction()" class="text-xs-center" color="yellow darken-4" @click="useSelectedItem()">
										{{selectedItemSlot.item.getAction()}}
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-card>
					</div>
				</v-layout>
				<v-layout justify-center style="max-height: 240px">
					<div>
						<v-card flat width="475px" height="240px" id="equipment" class="pa-1">
							<v-layout class="pa-1">
								<span class="headline pl-2" style="color: #535353">Equipment</span>
							</v-layout>
							<v-layout justify-space-around align-center>
								<v-card width="275px" height="175px" class="pa-2">
									<status />
								</v-card>
								<div>
									<equipment />
								</div>
							</v-layout>
						</v-card>
					</div>
				</v-layout>
				<!-- <v-layout justify-center style="max-height: 180px">
					<div>
						<v-card flat width="475px" height="180px" id="status" class="pa-1">
							<v-layout class="pa-1">
								<span class="headline pl-2" style="color: #535353">Status</span>
							</v-layout>
							<v-layout style="overflow-y: auto; max-height: 140px" class="pa-1">
								<status />
							</v-layout>
						</v-card>
					</div>
				</v-layout> -->
			</v-layout>
		</v-flex>
	</v-layout>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
import equipment from '@/components/Equipment.vue'
import status from '@/components/Status.vue'

/* import other components here */
export default {
	name: 'inventory',
	components: {
		equipment,
		status
	},
	props: ['positioning'],
	data() {
		return {
			inventory: Game.player.inventory,
			selectedItemSlot: Game.player.selectedItemSlot,
			contextMenuOffset: 0,
			contextMenuWidth: 200,
			contextMenuHeight: 150,
			x: 0,
			y: 0,
			smoothScrolling: true,
			scrollingToIndex: Game.player.selectedItemSlot.index
		}
	},
	created() {},
	mounted() {
		// this.$watch(
		// 	'selectedItemSlot',
		// 	() => {
		// 		if (this.selectedItemSlot.index !== null) {
		// 			this.scrollingToIndex = this.selectedItemSlot.index
		// 			const easeInOutQuad = (t, b, c, d) => {
		// 				t /= d / 2
		// 				if (t < 1) return (c / 2) * t * t + b
		// 				t--
		// 				return (-c / 2) * (t * (t - 2) - 1) + b
		// 			}
		// 			let elem = document.getElementById(`panel-${this.selectedItemSlot.index}`)
		// 			let topPos = elem.offsetTop
		// 			const scrollTo = (element, to, duration, index) => {
		// 				let start = element.scrollTop,
		// 					change = to - start,
		// 					currentTime = 0,
		// 					increment = 30
		// 				let animateScroll = () => {
		// 					if (this.smoothScrolling && this.scrollingToIndex === index) {
		// 						currentTime += increment
		// 						var val = easeInOutQuad(currentTime, start, change, duration)
		// 						element.scrollTop = val
		// 						if (currentTime < duration) {
		// 							setTimeout(animateScroll, increment)
		// 						}
		// 					}
		// 				}
		// 				if (this.smoothScrolling && this.scrollingToIndex === index) {
		// 					animateScroll()
		// 				} else {
		// 					element.scrollTop = this.scrollTo
		// 				}
		// 			}
		// 			this.scrollTo = topPos - 200
		// 			scrollTo(document.getElementById('panel-list'), topPos - 200, 600, this.selectedItemSlot.index)
		// 		}
		// 	},
		// 	{
		// 		deep: true
		// 	}
		// )
	},
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
		},
		trimString(s, n) {
			if (s.length <= n) return s
			return s.slice(0, n) + '...'
		},
		shouldRenderInPanelBody(hoverInfo) {
			return hoverInfo.length >= 4 || hoverInfo.some(info => info.attribute.length >= 20 || (info.value && info.value.length >= 20))
		}
	}
}
</script>
