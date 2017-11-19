<template>
    <div id="help">
        <v-tooltip left align-center>
            <span>Controls</span>
            <v-btn flat icon color="yellow darken-4" slot="activator" @click.stop="helpDialog=true">
              <v-icon>help</v-icon>
            </v-btn>
        </v-tooltip>
        <v-dialog v-model="helpDialog" max-width="525px" scrollable>
            <v-card>
              <v-card-text>
                  <h5>Controls</h5>
                  <v-card flat>
                      <v-card-text class="pb-0 pt-0">
                          <v-container>
                              <h5>Movement</h5>
                              <p>You can move with arrow keys, the numpad, or vi keys. You can move in all 8 directions.</p>
                              <v-container class="text-xs-center">
                                <pre>y  k  u      7  8  9  </pre>
                                <pre> \ | /        \ | /   </pre>
                                <pre> h-+-l        4-5-6   </pre>
                                <pre> / | \        / | \   </pre>
                                <pre>b  j  n      1  2  3  </pre>
                                <pre>vi-keys     numberpad </pre>
                              </v-container>
                          </v-container>
                      </v-card-text>
                  </v-card>
                  <v-divider></v-divider>
                  <v-card flat>
                      <v-card-text class="pt-0">
                          <v-container fluid>
                              <h5>Ladders, Resting, and Picking up Items</h5>
                              <p>To pick up items off the ground, press <code>,</code> or <code>g</code>.</p>
                              <p>To rest for a turn and restore a little health, press <code>.</code> or <code>5</code> on the numpad.</p>
                              <p>To climb ladders, press <code><</code> to go up and press <code>></code> to go down.</p>
                          </v-container>
                      </v-card-text>
                  </v-card>
                  <v-divider></v-divider>
                  <v-card flat>
                      <v-card-text class="pt-0">
                          <v-container fluid>
                              <h5>Inventory Management</h5>
                              <p>To equip a weapon or drink a potion, <code>click</code> the item in your inventory.<p>
                              <p>To drop an item, <code>shift+click</code> the item in your inventory.</p>
                              <p>To view details about items, simply <code>hover</code> over the item in your inventory and view the tooltip.
                              </p>
                          </v-container>
                      </v-card-text>
                  </v-card>
                  <v-divider></v-divider>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="yellow darken-4" flat @click.stop="helpDialog=false">Close</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

</template>
<script>
export default {
    name : 'help-dialog',
    data () {
        return {
            helpDialog : false
        }
    },
    mounted () {
        window.addEventListener("keydown", (evt) => {
            if (evt.getModifierState("Shift") && evt.keyCode === 191) {
                this.helpDialog = !this.helpDialog
            }
        });
    }
}
</script>
<style>
code {
    background-color: #2F3136;
    color: white;
}
</style>
