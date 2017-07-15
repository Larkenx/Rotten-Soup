<template>
    <v-flex class="hud elevation-0" column>
        <!-- Health Bar -->
        <v-layout row align-center style=" margin-bottom: -10px;">
            <v-flex xs2 col><b>Health </b></v-flex>
            <v-flex xs7 col> <v-progress-linear :value="(getHP() / getMaxHP()) * 100" height="10" error></v-progress-linear> </v-flex>
            <v-flex xs3 col> {{getHP()}} / {{getMaxHP()}}</v-flex>
        </v-layout>
        <!-- Magic Bar -->
        <v-layout row align-center>
            <v-flex xs2 col><b>Magic</b></v-flex>
            <v-flex xs7 col> <v-progress-linear :value="(getMana() / getMaxMana()) * 100" height="10" info></v-progress-linear> </v-flex>
            <v-flex xs3 col> {{getMana()}} / {{getMaxMana()}}</v-flex>
        </v-layout>
        <!-- Mini-map -->
        <mini-map></mini-map>
        <!-- Enemies Description -->
        <enemy-overview></enemy-overview>
        <!-- Inventory -->
        <v-layout v-for="(row, index) in 4" class="inventory_row" row v-bind:key="index">
            <v-flex xs1 col v-for="(slot, i) in getInventoryRow(index)" v-bind:key="i"  v-bind:class="{selectedItem : colorSlot(slot), inventory_slot : ! colorSlot(slot)}">
                <v-layout ripple
                          style="min-width: 32px; min-height: 32px;"
                          v-on:click="slot.item.use()"
                          v-tooltip:bottom="{html : slot.item.hoverInfo() }"
                          v-if="slot.item !== null">
                        <img class="inventory_image" v-bind:src="getInventorySprite(slot.item.id)" alt="Sword" />
                </v-layout>
            </v-flex>
        </v-layout>
    </v-flex>
</template>

<script>
// import inventory from './Inventory.vue';
import enemyOverview from './EnemyOverview.vue';
import inventorySlot from './inventorySlot.vue';
import minimap from './Minimap.vue';
export default {
    data() {
        return {

        };
    },
    methods : {
        getHP () {
            return Game.player.cb.hp;
        },
        getMaxHP() {
            return Game.player.cb.maxhp;
        },
        getMana() {
            return Game.player.cb.mana;
        },
        getMaxMana() {
            return Game.player.cb.maxmana;
        },
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
    components : {
        'inventory' : inventory,
        'enemy-overview' : enemyOverview,
        'mini-map' : minimap,
    }
}
</script>
<style>
.hud {
    background-color: black;
    color: white;
    font-size: 13px;
    margin-left: 20px;
    width: 30em;
}
</style>
