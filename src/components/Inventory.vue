<template v-if="rows !== null">
    <v-layout v-for="(row, index) in 4" class="inventory_row" row v-bind:key="index">
        <inventory-slot :index="index"></inventory-slot>
    </v-layout>
</template>


<script>
import inventorySlot from './inventorySlot.vue';

    /* import other components here */
    export default {
        name: 'inventory',
        data() {
            return {
                inventory: null,
                rows: [1, 2, 3, 4],
            };
        },
        components : {
            'inventory-slot' : inventorySlot,
        },
        computed () {
            return {
                inventory: Game.player.inventory,
                player: Game.player,
            }
        },
        methods: {
            getInventorySprite(id) {
                return `assets/images/inventory_sprites/${id}.png`;
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
</style>
