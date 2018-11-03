<style>
.selected_item {
	/* background-color: #294646 !important; */
	border-radius: 2px;
	border: 1px solid #f57f17 !important;
	margin: 1px;
}

.unselected_item {
	margin: 1px;
	border: 1px solid #424242 !important;
	/* background-color: #294646 !important; */
	border-radius: 2px;
	cursor: pointer;
}

.picker {
	color: #333333;
}

div.v-expansion-panel__header {
	padding: 4px 8px;
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
	<v-container fluid class="pa-0">
		<v-expansion-panel id="panel-list" class="pr-2" style="overflow-y: auto; max-height: 620px; box-shadow: none;">
			<v-expansion-panel-content :id="`panel-${i}`" @click="selectItem(i)" :class="{selected_item: item === selectedItemSlot.item, unselected_item: item !== selectedItemSlot.item}" v-for="(item, i) in inventory" :key="i" :value="selectedItemSlot.index === i && selectedItemSlot.contextMenuOpen">
				<v-layout slot="header" wrap align-center @click="selectItem(i)">
					<div>
						<img width="25px" height="25px" v-bind:src="getInventorySprite(item.id)">
					</div>
					<div>
						<span class="pl-2">{{item.name || item.type}}</span>
					</div>
					<div style="flex-grow: 1">
						<span class="pl-2" style="color: #636363">{{item.cb && item.cb.equipped ? '[equipped]' : ''}}</span>
					</div>
				</v-layout>
				<v-card>
					<!-- If the chips for the hover information of an item have any details or that exceed 10 characters, and the 
					overall count of the attributes is greater than ~2, render them here in their own card body -->

					<div v-if="shouldRenderInPanelBody(item.hoverInfo())">
						<v-chip small class="text-xs-center mr-2" style="color: white" color="#1e1f1f" v-for="(chip, index) in item.hoverInfo()" :key="index">
							<b>
								{{chip.attribute}}
							</b>
							<span class="ml-1" style="height: 24px; width: 2px; background-color: #333333" />
							<v-tooltip top v-if="chip.value">
								<span slot="activator" class="pl-1 white--text text--darken-4">
									{{trimString(chip.value, 55)}}
								</span>
								{{chip.value}}
							</v-tooltip>
						</v-chip>
					</div>

					<v-card-actions>
						<div style="overflow-x: auto" v-if="!shouldRenderInPanelBody(item.hoverInfo())">
							<v-chip small class="text-xs-center mr-2" style="color: white" color="#1e1f1f" v-for="(chip, index) in item.hoverInfo()" :key="index">
								<b>
									{{chip.attribute}}
								</b>
								<span class="ml-1" style="height: 24px; width: 2px; background-color: #333333" />
								<span class="pl-1 white--text text--darken-4" v-if="chip.value">
									{{chip.value}}
								</span>
							</v-chip>
						</div>
						<v-spacer />
						<v-btn small class="text-xs-center" flat color="yellow darken-4" @click="dropSelectedItem()">
							<span style="border-bottom: 1px solid #f57f17">D</span>
							<span style="padding-bottom: 1px">rop</span>
						</v-btn>
						<v-btn small v-if="item.getAction()" class="text-xs-center" color="yellow darken-4" @click="useSelectedItem()">
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
			y: 0,
			smoothScrolling: true,
			scrollingToIndex: Game.player.selectedItemSlot.index
		}
	},
	created() {},
	mounted() {
		this.$watch(
			'selectedItemSlot',
			() => {
				if (this.selectedItemSlot.index !== null) {
					this.scrollingToIndex = this.selectedItemSlot.index
					const easeInOutQuad = (t, b, c, d) => {
						t /= d / 2
						if (t < 1) return (c / 2) * t * t + b
						t--
						return (-c / 2) * (t * (t - 2) - 1) + b
					}
					let elem = document.getElementById(`panel-${this.selectedItemSlot.index}`)
					console.log(elem)

					let topPos = elem.offsetTop

					const scrollTo = (element, to, duration, index) => {
						let start = element.scrollTop,
							change = to - start,
							currentTime = 0,
							increment = 30

						console.log('Scrolling from ' + start + ' to ' + to)

						let animateScroll = () => {
							if (this.smoothScrolling && this.scrollingToIndex === index) {
								currentTime += increment
								var val = easeInOutQuad(currentTime, start, change, duration)
								element.scrollTop = val
								if (currentTime < duration) {
									setTimeout(animateScroll, increment)
								}
							}
						}

						if (this.smoothScrolling && this.scrollingToIndex === index) {
							animateScroll()
						} else {
							element.scrollTop = this.scrollTo
						}
					}
					this.scrollTo = topPos - 200
					scrollTo(document.getElementById('panel-list'), topPos - 200, 150, this.selectedItemSlot.index)
				}
			},
			{ deep: true }
		)
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
