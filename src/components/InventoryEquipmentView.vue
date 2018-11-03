<template>
    <v-card class="pa-3">
        <v-layout>
            <inventory :positioning="positioning" />
            <!-- <div style="width: 225px;">
                <equipment />
            </div> -->
        </v-layout>
    </v-card>
</template>

<script>
import inventory from '@/components/Inventory.vue'
import equipment from '@/components/Equipment.vue'

export default {
	name: 'inventory-equipment-view',
	props: ['positioning'],
	components: {
		inventory: inventory,
		equipment: equipment
	}
}
</script>
