<template>
    <v-container class="modal elevation-24" v-if="inventoryModalOpened" align-center>
        <v-layout row>
            <!-- Non-player inventory items -->
            <v-flex xs5 col> </v-flex>
            <!-- Middle functionality (?) -->
            <v-flex xs2 col></v-flex>
            <!-- Player Inventory -->
            <inventory></inventory>
        </v-layout>
    </v-container>
</template>

<script>
    /* import other components here */
    export default {
        data() {
            return {
                inventoryModalOpened: false,
            };
        },
        methods: {},
    }

</script>
<style>
</style>
