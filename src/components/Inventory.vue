<template>
    <v-flex>
        <v-layout v-for="(row, index) in 4" class="inventory_row" row v-bind:key="index">
            <v-flex
                xs1
                col
                v-for="(cell, i) in getInventoryRow(index)"
                v-bind:key="i"
                v-bind:class="{selectedItem : colorSlot(cell), inventory_cell : ! colorSlot(cell)}"
                align-center
                style="max-width: 32px; margin: 3px;"
            >
            <v-tooltip bottom v-if="cell.item !== null" align-center>
                <p class="text-xs-center ma-0">
                    {{cell.item.action}} {{cell.item.type}}<br  />
                    <span v-if="'name' in cell.item">{{"Name: " + cell.item.name}}<br /></span>
                    {{cell.item.hoverInfo()}}
                </p>
                <v-layout
                    ripple
                    v-on:click="useItem(cell.item, $event)"
                    v-if="cell.item !== null"
                    slot="activator"
                    row
                >
                <v-badge overlay bottom color="grey" overlap>
                    <span v-if="cell.item.quantity !== undefined" slot="badge" dark>
                        <b>{{cell.item.quantity}}</b>
                    </span>
                    <img v-bind:src="getInventorySprite(cell.item.id)"/>
                </v-badge>
            </v-layout>
        </v-tooltip>

    </v-flex>
</v-layout>
</v-flex>
</template>

<script>
import {Game} from '@/assets/js/game/Game.js'

/* import other components here */
export default {
    data() {
        return {
            inventory: null,
            rows: [1, 2, 3, 4],
        };
    },
    methods: {
        getInventorySprite(id) {
            return `../static/images/inventory_sprites/${id}.png`;
        },
        colorSlot(cell) {
            if (cell.item !== null && "cb" in cell.item) {
                return cell.item.cb.equipped;
            } else {
                return false;
            }
        },
        getInventoryRow(n) {
            let inventory = Game.player.inventory;
            let offset = n * (inventory.length / this.rows.length);
            return inventory.slice(offset, offset + (inventory.length / this.rows.length));

        },
        useItem(item, evt) {
            // drop item
            if (evt.shiftKey) {
                item.drop();
            } else { // use item
                item.use();
            }
        }
    },
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
