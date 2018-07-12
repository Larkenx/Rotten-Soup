<template>
      <!-- Equipment View  -->
      <v-container class="pa-0 text-xs-left">
        <!-- Helmet, Arrows  -->
        <v-layout style="margin-top: 4px;">
          <v-flex class="filler" xs2 v-for="i in 1" :key="i"/>
          <v-flex xs2 class="filler"><item-slot :item="equipment.head"  altSprite="../static/images/equipment_placeholders/head.png" index="head"  /></v-flex>
          <v-flex xs2 class="filler"><item-slot :item="equipment.ammo" altSprite="../static/images/equipment_placeholders/quiver.png" index="ammo" /></v-flex>
        </v-layout>
        <!-- Main, Torso, Off-hand  -->
        <v-layout style="margin-top: 4px;">
          <!-- <v-flex class="filler" xs2 v-for="i in 1" :key="i"/> -->
          <v-flex xs2 class="filler"><item-slot :item="equipment.weapon" altSprite="../static/images/equipment_placeholders/stiletto.png" index="weapon" /></v-flex>
          <v-flex xs2 class="filler"><item-slot :item="equipment.torso" altSprite="../static/images/equipment_placeholders/chest-armor.png" index="torso" /></v-flex>
        </v-layout>
        <!-- Legs  -->
        <v-layout style="margin-top: 4px;">
          <!-- <v-flex class="filler" xs2 v-for="i in 1" :key="i"/> -->
          <v-flex xs2 class="filler"><item-slot :item="equipment.ring" altSprite="../static/images/equipment_placeholders/ring.png" index="weapon" /></v-flex>
          <v-flex xs2 class="filler"><item-slot :item="equipment.legs" altSprite="../static/images/equipment_placeholders/leg-armor.png" index="legs" /></v-flex>
        </v-layout>
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
	margin: 0px 8px 0px 8px;
	width: 40px;
	height: 40px;
}
</style>
