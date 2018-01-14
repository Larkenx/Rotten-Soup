<template>
    <v-app dark>
        <v-container>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Select your hero</h3>
                        <v-container fluid>
                            <v-layout row>
                                <v-flex
                                    style="padding: 10px"
                                    xs4
                                    v-for="(sprite, index) in playerSprites"
                                    :key="index"
                                >
                                    <v-card style="padding: 10px">
                                        <v-layout row>
                                            <div>
                                                <h5>{{sprite.name}}</h5>
                                                <p>{{sprite.description}}</p>
                                            </div>
                                        </v-layout>
                                        <v-layout row justify-center>
                                            <v-flex style="margin: 5px" col xs1 v-for="id in sprite.sprites" :key="id">
                                                <v-layout row align-center>
                                                    <v-flex>
                                                            <img
                                                                v-on:click="selectSprite(id)"
                                                                v-bind:class="{spriteIsSelected : (selectedSprite === id), sprite : (selectedSprite !== id)}"
                                                                :src="getPlayerSpriteImage(id)"
                                                            />
                                                    </v-flex>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </div>
                </v-card-title>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
export default {
	name: 'start-menu',
	props: ['Game'],
	data() {
		return {
			selectedSprite: null,
			playerSprites: [
				{
					name: 'Monk',
					description: 'A master of martial arts with special healing abilities',
					sprites: [4812, 4453, 3859, 4219]
				},
				{
					name: 'Ninja',
					description: 'A sneaky, hidden ninja of a secret order with the ability to stealth',
					sprites: [4334, 4814]
				},
				{
					name: 'Knight',
					description: 'A proud knight, sworn to uphold chivalric values',
					sprites: [4213, 4693, 3853]
				},
				{
					name: 'Barbarian',
					description: 'A wild and vicious savage with extreme strength and rage',
					sprites: [4337, 4336]
				},
				{
					name: 'Wizard',
					description: 'A scholar of the arcane and all things magical',
					sprites: [8161, 3858, 4218, 4813]
				}
			]
		}
	},
	created() {},
	methods: {
		getPlayerSpriteImage(id) {
			return `../static/images/player_sprites/${id}.png`
		},
		selectSprite(id) {
			this.$emit('spriteSelected', id)
			// this.selectedSprite = id
			// this.loadGame()
		}
	}
}
</script>
<style>
    .sprite {
        cursor: pointer
    }

    .sprite:hover {
        cursor: pointer;
        background-color: #565656;
        border-radius: 2px;
    }

    .spriteIsSelected {
        cursor: pointer;
        background-color: rgb(103, 141, 255);
        border-radius: 2px;
    }
</style>
