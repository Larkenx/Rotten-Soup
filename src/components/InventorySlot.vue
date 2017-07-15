<template v-if="rows !== null">
        <v-flex xs1 col v-for="(slot, i) in getInventoryRow(index)" v-bind:key="i"  v-bind:class="{selectedItem : colorSlot(slot), inventory_slot : ! colorSlot(slot)}">
            <v-layout ripple
                      style="min-width: 32px; min-height: 32px;"
                      v-on:click="slot.item.use()"
                      v-tooltip:bottom="{html : slot.item.hoverInfo() }"
                      v-if="slot.item !== null">
                    <img class="inventory_image" v-bind:src="getInventorySprite(slot.item.id)" alt="Sword" />
            </v-layout>
        </v-flex>
</template>


<script>
    /* import other components here */
    export default {
        props: ['index'],
        data() {
            return {
                inventory: null,
                rows: [1, 2, 3, 4],
            };
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
