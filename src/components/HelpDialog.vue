<template>
    <div id="help">
        <v-tooltip left align-center>
            <span>Controls</span>
            <v-btn flat icon color="yellow darken-4" slot="activator" @click.stop="helpDialog=true">
              <v-icon>help</v-icon>
            </v-btn>
        </v-tooltip>
        <v-dialog v-model="helpDialog" max-width="510px" scrollable>
            <v-card>
              <v-card-text>
                  <h4>Controls</h4>
                  <v-card flat>
                      <v-card-text>
                          <v-container fluid>
                              <h5>Movement</h5>
                              <p>You can move with arrow keys, the numpad, or vi keys.</p>
                              <v-container class="text-xs-center">
                                <pre>y  k  u      7  8  9</pre>
                                <pre> \ | /        \ | /</pre>
                                <pre> h-+-l        4-5-6</pre>
                                <pre> / | \        / | \</pre>
                                <pre>b  j  n      1  2  3</pre>
                                <pre>vi-keys      numpad</pre>
                              </v-container>
                          </v-container>
                      </v-card-text>
                  </v-card>

                  <v-card flat>
                      <v-card-text>
                          <v-container fluid>
                              <h5>Ladders, Resting, and Picking up Items</h5>
                              <p>To pick up items off the ground, press <code dark>,</code> or <code>g</code></p>

                          </v-container>
                      </v-card-text>
                  </v-card>
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
            helpDialog : true
        }
    }
}
</script>
