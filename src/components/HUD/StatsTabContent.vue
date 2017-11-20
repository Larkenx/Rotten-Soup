<template>
    <v-container>
        <!-- Level -->
        <v-flex class="stat-row">
            <v-layout  row align-center>
                <v-flex md1 style="min-width: 70px;" col><b>Level</b></v-flex>
                <v-flex md2 col style="padding-left: 5px;">{{getLevel()}}</v-flex>
                <v-flex md6 col>{{Math.floor(getRemainingXP())}}XP until level {{getLevel()+1}}</v-flex>
                <v-flex md2 col>
                    <v-progress-circular
                        :rotate="270"
                        style="xpCircleFont"
                        color="success"
                        fill="success"
                        size="18"
                        :value="Math.floor(getPercentToLevel() * 100)"
                    >
                    <!-- {{Math.floor(getPercentToLevel() * 100)}}% -->
                    </v-progress-circular>
                </v-flex>
            </v-layout>
        </v-flex>
        <!-- Damage -->
        <v-flex class="stat-row">
            <v-layout  row align-center>
                <v-flex md1 style="min-width: 70px;" col><b>Damage</b></v-flex>
                <v-flex md3 col style="padding-left: 5px;">{{getDamageRange()}}</v-flex>
            </v-layout>
        </v-flex>
        <!-- Strength -->
        <v-flex class="stat-row">
            <v-layout  row align-center>
                <v-flex md1 style="min-width: 70px;" col><b>Strength</b></v-flex>
                <v-flex md3 col style="padding-left: 5px;">{{getStrength()}}</v-flex>
            </v-layout>
        </v-flex>
        <!-- Defence -->
        <v-flex class="stat-row">
            <v-layout   row align-center>
                <v-flex md1 style="min-width: 70px;" col><b>Defence</b></v-flex>
                <v-flex md3 col style="padding-left: 5px;">{{getDefence()}}</v-flex>
            </v-layout>
        </v-flex>
    </v-container>
</template>

<script>
import {Game} from '@/assets/js/game/Game.js'
import {xp_levels} from '#/entities/Entity.js'

export default {
    data() {
        return {
            player: Game.player,
        }
    },
    methods : {
        getHP () {
            return Game.player.cb.hp;
        },
        getMaxHP() {
            return Game.player.cb.maxhp;
        },
        getMana() {
            return Game.player.cb.mana;
        },
        getMaxMana() {
            return Game.player.cb.maxmana;
        },
        getStrength() {
            return Game.player.cb.str;
        },
        getDefence() {
            return Game.player.cb.def;
        },
        getDamageRange() {
            return Game.player.getMinDmg() + "-" + Game.player.getMaxDmg();
        },
        getLevel() {
            return Game.player.cb.level;
        },
        getRemainingXP() {
            return Game.player.remainingXP();
        },
        getPercentToLevel() {
            let experienceTowardsNext = xp_levels[this.getLevel()+1] - this.getRemainingXP();
            return experienceTowardsNext / xp_levels[this.getLevel()+1];
        }
    }
}
</script>
<style>
.stat-row {
    cursor: pointer;
}

.stat-row:hover {
    background-color: #4e4e4e;
}
</style>
