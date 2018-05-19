<template>
  <v-container fluid class="pa-0">
    <v-layout>
      <v-flex md1 style="min-width: 75px;"> <b>Equipment</b></v-flex>
    </v-layout>
    <!-- Equipment View  -->
    <v-container fluid class="pa-0 text-xs-left">
      <!-- Helmet, Arrows  -->
      <v-layout style="margin-top: 4px;">
        <v-flex class="filler" xs1 v-for="i in 4" :key="i"/>
        <v-flex xs1 class="filler"><item-slot :item="equipment.head"  altSprite="../static/images/equipment_placeholders/head.png" index="head"  /></v-flex>
        <v-flex xs1 class="filler"><item-slot :item="equipment.ammo" altSprite="../static/images/equipment_placeholders/quiver.png" index="ammo" /></v-flex>
      </v-layout>
      <!-- Main, Torso, Off-hand  -->
      <v-layout style="margin-top: 4px;">
        <v-flex class="filler" xs1 v-for="i in 3" :key="i"/>
        <v-flex xs1 class="filler"><item-slot :item="equipment.weapon" altSprite="../static/images/equipment_placeholders/stiletto.png" index="weapon" /></v-flex>
        <v-flex xs1 class="filler"><item-slot :item="equipment.torso" altSprite="../static/images/equipment_placeholders/chest-armor.png" index="torso" /></v-flex>
      </v-layout>
      <!-- Legs  -->
      <v-layout style="margin-top: 4px;">
        <v-flex class="filler" xs1 v-for="i in 3" :key="i"/>
        <v-flex xs1 class="filler"><item-slot :item="equipment.ring" altSprite="../static/images/equipment_placeholders/ring.png" index="weapon" /></v-flex>
        <v-flex xs1 class="filler"><item-slot :item="equipment.legs" altSprite="../static/images/equipment_placeholders/leg-armor.png" index="legs" /></v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
import itemSlot from './ItemSlot.vue'

export default {
	components: {
		'item-slot': itemSlot
	},
	data() {
		return {
			equipment: Game.player.cb.equipment // head, torso, legs, weapon, ammo
		}
	}
}
</script>
<style>
.filler {
	margin: 0px 4px 0px 4px;
	width: 40px;
	height: 40px;
}
</style>
