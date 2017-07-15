<template>
    <v-flex column>
        <v-layout row style="padding: 0px;">
            <div style="margin:0; padding:0;"  id="game_container"></div>
        </v-layout>
        <message-log></message-log>
    </v-flex>
</template>

<script>
    import messageLog from './MessageLog.vue';
    /* import other components here */
    export default {
        components : {
            'message-log' : messageLog,
        },
    }
</script>
<style>
</style>
