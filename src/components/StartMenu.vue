<template>
    <v-app dark>
        <v-container>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Welcome to Rotten Soup</h3>
                        <div></div>
                    </div>
                </v-card-title>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
export default {
	name: 'start-menu',
	props: ['Game', 'playerSelected'],
	data() {
		return {
			selectedSprite: null,
			playerSprites: []
		}
	},
	created() {
		console.log(this.Game)
		console.log(this.playerSelected)
	},
	methods: {
		loadGame() {
			Game.init(this.selectedSprite)
			this.playerSelected = true
			this.player = Game.player
			document.getElementById('game_container').appendChild(Game.display.getContainer())
			document.getElementById('minimap_container').appendChild(Game.minimap.getContainer())
			Game.log('Welcome to Rotten Soup!', 'information')
			Game.log('Press ? to view the controls.', 'player_move')
			Game.drawViewPort()
			Game.drawMiniMap()
			Game.refreshDisplay()
			setInterval(() => {
				Game.turn++
				Game.updateDisplay()
			}, 500)
			setTimeout(() => {
				this.loading = false
			}, 1000)
		}
	}
}
</script>
