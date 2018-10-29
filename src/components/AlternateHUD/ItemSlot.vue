<template>
	<v-tooltip open-delay="200" v-if="item !== null" align-center v-bind="tooltipConfiguration">
		<v-card width="40px" height="40px" style="cursor: pointer" slot="activator">
			<v-layout column justify-center align-center fill-height>
				<div class="item_slot pa-0 ma-0">
					<v-layout ripple v-on:click="useItem(item, $event)" v-if="item !== null" row>
						<v-badge overlay bottom color="transparent" overlap style="max-height: 32px; max-width: 32px;">
							<span v-if="item.quantity !== undefined" slot="badge" dark>
								<b>{{item.quantity}}</b>
							</span>
							<img v-bind:src="getInventorySprite(item.id)" />
						</v-badge>
					</v-layout>
					<img v-else-if="altSprite !== null" v-bind:src="altSprite" width="32px" height="32px" style="opacity: 0.5" />
				</div>
			</v-layout>
		</v-card>
		<p class="text-xs-center ma-0">
			{{item.getAction()}} {{item.type}}
		</p>
	</v-tooltip>
	<v-card v-else width="40px" height="40px">
		<v-layout column justify-center align-center fill-height>
			<div class="item_slot pa-0 ma-0">
				<img v-if="altSprite !== null" v-bind:src="altSprite" width="32px" height="32px" style="opacity: 0.5" />
			</div>
		</v-layout>
	</v-card>
</template>

<script>
export default {
	props: ['item', 'altSprite', 'tooltipConfiguration'],
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
.item_slot {
	background-color: #424242;
	border-radius: 4px;
	width: 32px;
	height: 32px;
}
</style>
