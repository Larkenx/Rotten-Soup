import {Actor} from "#/entities/actors/Actor.js";
import {Game} from "#/Game.js";
import ROT from "rot-js";

export default class Lich extends Actor {
    constructor(x, y, id) {
        super(x, y, {
            id: id,
            name: "Lich",
            description: "Once a powerful necromancer, now transformed into a lich.",
            visible: true,
            blocked: true,
            chasing: false,
            combat: {
                /* options.combat, dedicated to all things related to combat */
                description: [" attacked "],
                /* max stats */
                maxhp: 120,
                maxmana: 25,
                /* current stats */
                hp: 120,
                mana: 25,
                str: 10,
                def: 5,
                /* misc */
                hostile: true,
                range: 7,
                invulnerable: false,
            }
        });
    }

    act() {
        Game.engine.lock();
        // To make these computations more efficient, we can determine whether or not the SimpleEnemy
        // is rendered on the current game screen. If not, we shouldn't really worry about what the enemy can see
        // or its path to the player. So, we can essentially skip their turn.
        let dx = Math.abs(this.x - Game.player.x);
        let dy = Math.abs(this.y - Game.player.y);
        if (dx > (Game.width / 2) || dy > (Game.height / 2)) {
            Game.engine.unlock();
            super.act();
            return;
        }

        Game.player.recalculatePath();

        let fov = new ROT.FOV.PreciseShadowcasting(function(x, y) {
            return (Game.inbounds(x, y) && Game.map.data[y][x].visible());
        });

        let visibleTiles = [];
        fov.compute(this.x, this.y, this.cb.range, function(x, y, r, visibility) {
            // console.log(x + ',' + y);
            if (Game.inbounds(x, y))
                visibleTiles.push(Game.map.data[y][x]);
        });

        let allVisibleActors = visibleTiles.reduce((actors, tile) => {
            return actors.concat(tile.actors);
        }, []);
        let pathToPlayer = [];
        if (allVisibleActors.some(a => { return a === Game.player })) {
            if (!this.chasing)
                Game.log(`A ${this.name} sees you.`, 'alert');
            this.chasing = true;
            Game.player.path.compute(this.x, this.y, function(x, y) {
                pathToPlayer.push([x, y]);
            });
        }

        if (pathToPlayer.length >= 1) { // we can physically reach the player & the player is in view
            // move towards the player
        }

        Game.engine.unlock();
        super.act();

    }

    interact(actor) {
        if (actor === Game.player) {
            let dmg = this.attack(actor);
            if (this.cb.empowered) {
                let amtHealed = Math.floor(dmg / 2);
                Game.log(`The empowered orc steals your health and regenerates ${amtHealed} health!`, "alert");
                this.heal(amtHealed);
            }
        } else {
            actor.react(this);
        }
    }
}
