<template>
    <v-card class="pa-4 ma-4">
        <v-card-title class="display-1">
            Inventory & Equipment
        </v-card-title>
        <v-layout justify-space-around>
            <div style="width: 650px;">
                <inventory />
            </div>
            <div style="width: 275px;">
                <equipment />
            </div>
        </v-layout>
    </v-card>
</template>

<script>
import inventory from '@/components/AlternateHUD/Inventory.vue'
import equipment from '@/components/AlternateHUD/Equipment.vue'

export default {
	name: 'inventory-equipment-view',
	components: {
		inventory: inventory,
		equipment: equipment
	}
}
</script>
