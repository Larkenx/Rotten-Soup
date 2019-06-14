<template>
  <div id="help">
    <v-tooltip
      bottom
      align-center
    >
      <span>Help</span>
      <v-btn
        small
        flat
        icon
        color="yellow darken-4"
        slot="activator"
        @click.stop="helpDialog=true"
      >
        <v-icon small>fa-question-circle</v-icon>
      </v-btn>
    </v-tooltip>
    <v-dialog
      v-model="helpDialog"
      max-width="800px"
    >
      <v-card style="background-color: #1e1f1f">
        <v-card-text class="text-xs-center">
          <h2 class="pa-1">Controls</h2>
        </v-card-text>
        <v-card-text>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <div
                slot="header"
                class="pl-2"
              >
                <b>All Keybinds</b>
              </div>
              <v-card flat>
                <v-card-text class="pb-0 pt-0">
                  <v-container>
                    <v-layout
                      row
                      class="pb-2"
                    >
                      <v-flex xs6>
                        <b>Keys</b>
                      </v-flex>
                      <v-flex xs6>
                        <b>Description</b>
                      </v-flex>
                    </v-layout>
                    <v-layout
                      row
                      wrap
                      v-for="(cheat, index) in cheatSheet"
                      :key="index"
                    >
                      <v-flex xs6>
                        <v-layout justify-start>
                          <div
                            v-for="code in cheat.code.split('|')"
                            :key="code"
                          >
                            <code class="mr-2 text-xs-center">{{code}}</code>
                          </div>
                        </v-layout>
                      </v-flex>
                      <v-flex xs6>
                        <p>{{cheat.description}}</p>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <div
                slot="header"
                class="pl-2"
              >
                <b>Magic and Ranged Combat</b>
              </div>
              <v-card flat>
                <v-card-text class="pt-0">
                  <v-container fluid>
                    <p>
                      <b>Magic</b>
                    </p>
                    <p>
                      To cast a spell, first select a spell from your spellbook by opening it with
                      <code>s</code> or
                      <code>m</code>. Then, you can press
                      <code>z</code>
                      to cast the selected spell. If your spell is targeted, you will enter targeting mode.
                    </p>
                    <p>
                      <b>Ranged</b>
                    </p>

                    <p>
                      If you have a ranged weapon and proper ammunition equipped, press
                      <code>f</code> to enter targeting mode to fire your ranged weapon.
                    </p>

                    <p>
                      <b>Targeting</b>
                    </p>In targeting mode, you can select a tile to cast a spell or shoot a projectile so long as it's within range. By default, targeting will select the nearest enemy. You can change the selected tile with the standard
                    <code>movement</code> keys. You can also cycle through enemies in view with
                    <code>tab</code>,
                    <code>=</code>, and
                    <code>/</code>. You cannot select a tile that is blocked or out of your line of sight. Pressing
                    <code>escape</code> will cancel your spell or ranged attack.
                  </v-container>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <div
                slot="header"
                class="pl-2"
              >
                <b>Movement and Examining</b>
              </div>
              <v-card flat>
                <v-card-text class="pb-0 pt-0">
                  <v-container>
                    <p>You can move with arrow keys, the numpad, or vi keys. You can move in all 8 directions.</p>
                    <v-container class="text-xs-center">
                      <pre>y  k  u      7  8  9  </pre>
                      <pre> \ | /        \ | /   </pre>
                      <pre> h-+-l        4-5-6   </pre>
                      <pre> / | \        / | \   </pre>
                      <pre>b  j  n      1  2  3  </pre>
                      <pre>vi-keys     numberpad </pre>
                    </v-container>
                    <p>
                      When in targeting mode, you can use these keys to switch to different tiles. Press
                      <code>x</code> to examine your surroundings. Press
                      <code>x</code> or
                      <code>escape</code> to leave the examine mode.
                    </p>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <div
                slot="header"
                class="pl-2"
              >
                <b>Melee Combat</b>
              </div>
              <v-card flat>
                <v-card-text class="pt-0">
                  <v-container fluid>
                    <p>
                      To fight an enemy with your fists or melee weapon, simply
                      <code>move</code> into a tile where they are standing.
                    </p>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <v-expansion-panel-content>
              <v-card flat>
                <div
                  slot="header"
                  class="pl-2"
                >
                  <b>Ladders, Resting, and Picking up Items</b>
                </div>
                <v-card-text class="pt-0">
                  <v-container fluid>
                    <p>
                      To pick up items off the ground, press
                      <code>,</code> or
                      <code>g</code>.
                    </p>
                    <p>
                      To rest for a turn and restore a little health, press
                      <code>.</code> or
                      <code>5</code> on the numpad.
                    </p>
                    <p>
                      To climb ladders, press either
                      <code>&lt;</code> or
                      <code>&gt;</code> to use a ladder.
                    </p>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <v-expansion-panel-content>
              <div
                slot="header"
                class="pl-2"
              >
                <b>Inventory Management</b>
              </div>
              <v-card flat>
                <v-card-text class="pt-0">
                  <v-container fluid>
                    <p>
                      You can open the inventory screen by pressing
                      <code>i</code>. From here, you can use the movement keys to go back and forth between items. You can then press
                      <code>d</code> to drop the selected item, or either
                      <code>e</code> or
                      <code>enter</code> to interact with the selected item. Detailed information about the item will be shown in the view in the upper right.
                    </p>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="yellow darken-4"
            flat
            @click.stop="helpDialog=false"
          >Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
	name: 'help-dialog',
	data() {
		return {
			helpDialog: false,
			cheatSheet: [
				{ code: '.|5', description: 'Rest for a turn' },
				{ code: ',|g', description: 'Pick up an item' },
				{ code: 'e|space| + a direction', description: 'Interact with entity in a direction' },

				{ code: '<|>|+|-', description: 'Use a ladder' },
				{ code: 'tab|Numpad-0', description: 'Autoexplore' },
				{ code: 'f', description: 'Fire a ranged weapon' },
				{ code: 'Z|m|s', description: 'Open spellbook' },
				{ code: 'i', description: 'Open inventory' },
				{ code: 'z', description: 'Cast a spell' },
				{ code: 'x', description: 'Examine the area' }
			]
		}
	},
	mounted() {
		window.addEventListener('keydown', evt => {
			if ((evt.getModifierState('Shift') && evt.keyCode === 191) || (evt.keyCode === 27 && this.helpDialog)) {
				this.helpDialog = !this.helpDialog
			}
		})
	}
}
</script>
<style>
#help {
	z-index: 12500;
}
code {
	background-color: #1e1f1f !important;
	color: white !important;
}
</style>
