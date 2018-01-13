<template>
    <v-layout row>
        <v-container fluid>
            <v-layout v-for="(row, index) in 4" class="inventory_row" row v-bind:key="index">
                <draggable class="layout inventory_row row">
                    <v-flex
                        xs1
                        col
                        v-for="(cell, i) in getInventoryRow(index)"
                        v-bind:key="i*index"
                        v-bind:class="{selectedItem : colorSlot(cell), inventory_cell : ! colorSlot(cell)}"
                        align-center
                        style="max-width: 32px; margin: 4px;"
                        >
                            <v-tooltip open-delay="200" bottom v-if="cell.item !== null" align-center>
                                <p class="text-xs-center ma-0">
                                    {{cell.item.getAction()}} {{cell.item.type}}<br  />
                                    <span v-if="'name' in cell.item">{{"Name: " + cell.item.name}}<br /></span>
                                    {{cell.item.hoverInfo()}}
                                </p>
                                <v-layout
                                    ripple
                                    v-on:click="useItem(cell, $event)"
                                    v-if="cell.item !== null"
                                    slot="activator"
                                    @contextmenu="show(cell, $event)"
                                    row
                                >
                                <v-menu
                                    offset-x
                                    :nudge-width="200"
                                    :close-on-click="true"
                                    v-model="cell.menu"
                                    absolute
                                    :position-x="x"
                                    :position-y="y">
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
                                <v-badge overlay bottom color="grey" overlap>
                                    <span v-if="cell.item.quantity !== undefined" slot="badge" dark>
                                        <b>{{cell.item.quantity}}</b>
                                    </span>
                                    <img v-bind:src="getInventorySprite(cell.item.id)"/>
                                </v-badge>
                            </v-layout>
                        </v-tooltip>
                </v-flex>
            </draggable>
        </v-layout>
        </v-container>
    </v-layout>
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
			inventory: Game.player.inventory,
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
			let offset = n * (this.inventory.length / this.rows.length)
			return this.inventory.slice(offset, offset + this.inventory.length / this.rows.length)
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
		show(cell, e) {
			e.preventDefault()
			this.inventory.forEach(slot => {
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
<style>
.inventory_row {
    /*margin-left: 10px;*/
}

.inventory_cell {
    margin: 2px;
    border: 2px solid #4f4f4f;
    background-color: #294646;
    border-radius: 4px;
    min-width: 40px;
    min-height: 40px;
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
}

.selectedItem:hover {
    background-color: #009e00;
    cursor: pointer;
}
</style>
