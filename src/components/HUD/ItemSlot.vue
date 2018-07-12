<template lang="html">
  <div class="item_slot pa-0 ma-0 text-xs-center">
      <v-tooltip open-delay="200" bottom v-if="item !== null" align-center>
          <p class="text-xs-center ma-0">
              {{item.getAction()}} {{item.type}}
              <br />
              <span v-if="'name' in item">{{"Name: " + item.name}}<br /></span> {{item.hoverInfo()}}
          </p>
          <v-layout ripple v-on:click="useItem(item, $event)" v-if="item !== null" slot="activator"  row>
              <v-badge overlay bottom color="grey" overlap style="max-height: 32px">
                  <span v-if="item.quantity !== undefined" slot="badge" dark>
                              <b>{{item.quantity}}</b>
                          </span>
                  <img v-bind:src="getInventorySprite(item.id)" />
              </v-badge>
          </v-layout>
      </v-tooltip>
      <img v-else-if="altSprite !== null" v-bind:src="altSprite" width="35" height="35" style="opacity: 0.5"/>
  </div>
</template>

<script>
export default {
	props: ['item', 'altSprite'],
	methods: {
		getInventorySprite(id) {
			return `../static/images/inventory_sprites/${id}.png`
		},
		colorSlot(item) {
			return true
		},
		useItem(item, evt) {
			// drop item
			if (evt.shiftKey) {
				item.drop()
			} else {
				// use item
				item.use()
			}
		},
		dropItem(item, evt) {
			// drop item
			item.drop()
		},
		getInventory() {
			return Game.player.inventory
		}
	}
}
</script>
<style>
.inventory_row {
	/*margin-left: 10px;*/
}

.item_slot {
	border: 2px solid #4f4f4f;
	background-color: #294646;
	border-radius: 4px;
	width: 40px;
	height: 40px;
}
/* #172525 */
.item_slot:hover {
	background-color: #698394;
	cursor: pointer;
}
</style>
