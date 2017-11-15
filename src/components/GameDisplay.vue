<template>
    <v-flex column style="max-width: 1000px; ">
        <v-layout row style="padding: 0px;">
            <!--<item-transfer-modal></item-transfer-modal>-->
            <div style="margin:0; padding:0;" id="game_container">
            </div>
        </v-layout>
        <message-log></message-log>
    </v-flex>
</template>

<script>
    import itemTransferModal from './itemTransferModal.vue'
    import messageLog from './MessageLog.vue';
    /* import other components here */
    export default {
        components: {
            'message-log': messageLog,
            'item-transfer-modal': itemTransferModal
        },
    }
</script>
<style>
</style>
