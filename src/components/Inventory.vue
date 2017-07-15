<template>
    <span>
        <v-layout v-for="(row, index) in 4" class="inventory_row" row v-bind:key="index">
                 <v-flex xs1 col v-for="(slot, i) in getInventoryRow(index)" v-bind:key="i"
                         v-bind:class="{selectedItem : colorSlot(slot), inventory_slot : ! colorSlot(slot)}">
            <v-layout ripple
                      style="min-width: 32px; min-height: 32px;"
                      v-on:click="slot.item.use()"
                      v-tooltip:bottom="{html : slot.item.hoverInfo() }"
                      v-if="slot.item !== null">
                <img v-bind:src="getInventorySprite(slot.item.id)" alt="Sword"/>
            </v-layout>
                </v-flex>
        </v-layout>
    </span>
</template>

<script>
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
                return `../src/assets/images/inventory_sprites/${id}.png`;
            },
            colorSlot(slot) {
                return slot.item !== null && slot.item.cb.equipped;
            },
            getInventoryRow(n) {
                let inventory = Game.player.inventory;
                let offset = n * (inventory.length / this.rows.length);
                return inventory.slice(offset, offset + (inventory.length / this.rows.length));

            },
        },
    }
</script>
<style>
    .inventory_row {
        margin-left: 10px;
    }

    .inventory_slot {
        margin: 2px;
        border: 2px solid #4f4f4f;
        background-color: #294646;
        border-radius: 4px;
        /*margin: 2px;*/
        min-width: 40px;
        min-height: 40px;
    }

    .inventory_slot:hover {
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
