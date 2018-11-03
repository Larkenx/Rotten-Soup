<template>
  <!-- Equipment View  -->
  <v-container class="pa-2">
    <!-- Helmet, Arrows  -->
    <v-layout style="margin-top: 4px;" align-content-end>
      <div class="filler" v-for="i in 1" :key="i" />
      <div class="filler">
        <item-slot :item="equipment.head" altSprite="../static/images/equipment_placeholders/head.png" :tooltip-configuration="{top: true}" index="head" />
      </div>
      <div class="filler">
        <item-slot :item="equipment.ammo" altSprite="../static/images/equipment_placeholders/quiver.png" index="ammo" :tooltip-configuration="{right: true}" />
      </div>
    </v-layout>
    <!-- Main, Torso, Off-hand  -->
    <v-layout style="margin-top: 4px;" align-content-end>
      <!-- <div class="filler"  v-for="i in 1" :key="i"/> -->
      <div class="filler">
        <item-slot :item="equipment.weapon" altSprite="../static/images/equipment_placeholders/sword.png" index="weapon" :tooltip-configuration="{left: true}" />
      </div>
      <div class="filler">
        <item-slot :item="equipment.torso" altSprite="../static/images/equipment_placeholders/chest-armor.png" index="torso" :tooltip-configuration="{right: true}" />
      </div>
    </v-layout>
    <!-- Legs  -->
    <v-layout style="margin-top: 4px;" align-content-end>
      <!-- <div class="filler"  v-for="i in 1" :key="i"/> -->
      <div class="filler">
        <item-slot :item="equipment.ring" altSprite="../static/images/equipment_placeholders/ring.png" index="weapon" :tooltip-configuration="{left: true}" />
      </div>
      <div class="filler">
        <item-slot :item="equipment.legs" altSprite="../static/images/equipment_placeholders/leg-pants.png" index="legs" :tooltip-configuration="{right: true}" />
      </div>
    </v-layout>
    <!-- Boots  -->
    <v-layout style="margin-top: 4px;" align-content-end>
      <div class="filler" v-for="i in 1" :key="i" />
      <div class="filler">
        <item-slot :item="equipment.boots" altSprite="../static/images/equipment_placeholders/boots.png" index="boots" :tooltip-configuration="{right: true}" />
      </div>
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
			equipment: Game.player.cb.equipment, // head, torso, legs, weapon, ammo,
			config: { top: false, bottom: false, left: false, right: false }
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
