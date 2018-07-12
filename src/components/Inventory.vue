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
  <v-layout>
    <v-flex xs4><b>Items</b></v-flex>
  </v-layout>
  <v-layout wrap class="inventory_row">
      <v-flex v-for="(cell, i) in getInventory()" v-bind:key="i" v-bind:class="{selectedItem : colorSlot(cell), inventory_cell : ! colorSlot(cell)}" align-center>
          <v-tooltip open-delay="200" bottom v-if="cell.item !== null" align-center>
              <p class="text-xs-center ma-0">
                  {{cell.item.getAction()}} {{cell.item.type}}
                  <br />
                  <span v-if="'name' in cell.item">{{"Name: " + cell.item.name}}<br /></span> {{cell.item.hoverInfo()}}
              </p>
              <v-layout ripple v-on:click="useItem(cell, $event)" v-if="cell.item !== null" slot="activator" @contextmenu="show(cell, $event)" row>
                  <v-menu offset-x :nudge-width="200" :close-on-click="true" v-model="cell.menu" absolute :position-x="x" :position-y="y">
                      <v-card>
                          <v-list>
                              <v-list-tile avatar>
                                  <v-list-tile-avatar>
                                      <img v-bind:src="getInventorySprite(cell.item.id)">
                                  </v-list-tile-avatar>
                                  <v-list-tile-content>
                                      <v-list-tile-title>{{cell.item.type}}</v-list-tile-title>
                                      <v-list-tile-sub-title>{{cell.item.hoverInfo()}}</v-list-tile-sub-title>
                                  </v-list-tile-content>
                              </v-list-tile>
                          </v-list>
                          <v-divider></v-divider>
                          <v-card-actions>
                              <v-btn flat color="blue" @click="useItem(cell, $event)">{{cell.item.getAction()}}</v-btn>
                              <v-btn flat color="red" @click="dropItem(cell, $event)">Drop</v-btn>
                          </v-card-actions>
                      </v-card>
                  </v-menu>
                  <v-badge bottom color="transparent" overlap style="max-height: 32px">
                      <span v-if="cell.item.quantity !== undefined" slot="badge" dark >
                        <span style="font-size: 11px">{{cell.item.quantity}}</span>
                      </span>
                      <img v-bind:src="getInventorySprite(cell.item.id)" />
                  </v-badge>
              </v-layout>
          </v-tooltip>
      </v-flex>
  </v-layout>
</v-container>

</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
import draggable from 'vuedraggable'

/* import other components here */
export default {
	components: {
		draggable
	},
	data() {
		return {
			inventory: [],
			length: Game.player.inventory,
			rows: [1, 2, 3, 4],
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
		getInventoryRow(n) {
			// let inventory = Game.player.inventory
			let offset = n * (Game.player.inventory.length / this.rows.length)
			return Game.player.inventory.slice(offset, offset + Game.player.inventory.length / this.rows.length)
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
			return Game.player.inventory
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
